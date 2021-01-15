$(document).ready(() => {
    let results;
    $("#searchBtn").on("click", () => {
        const hoge = ({ result, message }) => {
            if (result) {
                results = result;
                setDate(result[0]);
                if (result.length <= 1) {
                    $("#page").empty();
                    $("#page").addClass("hidden");
                } else {
                    pagenation(result.length);
                }
            } else {
                results = null;
                $("#resultMsg").text(message);
                $("#result").addClass("hidden");
                $("#resultMsg").removeClass("hidden");
                $("#page").empty();
                $("#page").addClass("hidden");
            }
            $("#resultBox").removeClass("hidden");
        }
        $.ajax({
            url: "/",
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "hoge",
            data: { zipcode: $("#zipcodeInput").val() }
        })
        .done(hoge)
        .fail((jqXHR) => {
            if (jqXHR.status == 404) {
                eval(jqXHR.responseText);
            } else {
                $("#result").text("エラー");
            }
        });
    });

    function setDate (data) {
        $("#jis").text(data.jis);
        $("#oldZipcode").text(data.oldZipcode);
        $("#zipcode").text(data.zipcode);
        $("#address21").text(data.address21);
        $("#address11").text(data.address11);
        $("#address22").text(data.address22);
        $("#address12").text(data.address12);
        $("#address23").text(data.address23);
        $("#address13").text(data.address13);
        $("#a")[data.a == "0" ? "addClass" : "removeClass"]("hidden");
        $("#b")[data.b == "0" ? "addClass" : "removeClass"]("hidden");
        $("#c")[data.c == "0" ? "addClass" : "removeClass"]("hidden");
        $("#d")[data.d == "0" ? "addClass" : "removeClass"]("hidden");
        const e = ["変更なし", "変更あり", "廃止"];
        $("#e").text(e[Number(data.e)]);
        const f = ["変更なし", "市政・区政・町政・分区・政令指定都市施行", "住居表示の実施", "区画整理", "郵便区調整等", "訂正", "廃止"]
        $("#f").text(f[Number(data.f)]);
        $("#result").removeClass("hidden");
        $("#resultMsg").addClass("hidden");
    }

    function pagenation (num) {
        $("#page").empty();
        for (let i = 0; i < num; i++) {
            $("<button></button>", {
                text: i + 1,
                class: "mx-2 px-2 hover:text-gray-300 focus:outline-none",
                "data-num": i,
                on: {
                    click: function (event) {
                        setData(results[Number($(event.target).data("num"))]);
                    }
                }
            }).appendTo("#page");
        }
        $("#page").removeClass("hidden");
    }
});