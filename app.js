const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000
// const fs = require('fs');
// const csvSync = require('csv-parse/lib/sync');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// async function hoge () {
//     let data = fs.readFileSync("38EHIME.CSV");
//     let parsed = csvSync(data);
//     console.log(parsed);
//     let insert = "INSERT INTO zipcodes (jis, oldZipcode, zipcode, address11, address12, address13, address21, address22, address23, a, b, c, d, e, f) VALUES ";
//     for (let i in parsed) {
//         if (i == 0) {
//             insert += `('${parsed[i][0]}','${parsed[i][1]}','${parsed[i][2]}','${parsed[i][3]}','${parsed[i][4]}','${parsed[i][5]}','${parsed[i][6]}','${parsed[i][7]}','${parsed[i][8]}','${parsed[i][9]}','${parsed[i][10]}','${parsed[i][11]}','${parsed[i][12]}','${parsed[i][13]}','${parsed[i][14]}')`;
//         } else {
//             insert += `\n,('${parsed[i][0]}','${parsed[i][1]}','${parsed[i][2]}','${parsed[i][3]}','${parsed[i][4]}','${parsed[i][5]}','${parsed[i][6]}','${parsed[i][7]}','${parsed[i][8]}','${parsed[i][9]}','${parsed[i][10]}','${parsed[i][11]}','${parsed[i][12]}','${parsed[i][13]}','${parsed[i][14]}')`;
//         }
//     }
//     insert += ";";
//     fs.writeFileSync("ehime.sql", insert);
// }
// hoge();

app.get('/', async (req, res) => {
    try {
        const zipcode = req.query.zipcode;
        const callback = req.query.callback || "kbc";
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM zipcodes WHERE zipcode = $1', [zipcode]);
        if (result) {
            res.send(`${callback}({ result: ${JSON.stringify(result.rows)}, message: null })`);
        } else {
            res.status(404).send(`${callback}({ result: null, message: '存在しません' })`);
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

app.listen(port, () => {
  console.log(`Heroku simple WebAPI pg app listening.`);
})