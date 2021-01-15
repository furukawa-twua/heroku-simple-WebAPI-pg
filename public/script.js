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
            data: { code: $("#zipcodeInput").val() }
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
        $("#jis").text(result.jis);
        $("#oldZipcode").text(result.oldZipcode);
        $("#zipcode").text(result.zipcode);
        $("#address21").text(result.address21);
        $("#address11").text(result.address11);
        $("#address22").text(result.address22);
        $("#address12").text(result.address12);
        $("#address23").text(result.address23);
        $("#address13").text(result.address13);
        $("#a")[result.a == "0" ? "addClass" : "removeClass"]("hidden");
        $("#b")[result.b == "0" ? "addClass" : "removeClass"]("hidden");
        $("#c")[result.c == "0" ? "addClass" : "removeClass"]("hidden");
        $("#d")[result.d == "0" ? "addClass" : "removeClass"]("hidden");
        const e = ["変更なし", "変更あり", "廃止"];
        $("#e").text(e[Number(result.e)]);
        const f = ["変更なし", "市政・区政・町政・分区・政令指定都市施行", "住居表示の実施", "区画整理", "郵便区調整等", "訂正", "廃止"]
        $("#f").text(f[Number(result.f)]);
        $("#result").removeClass("hidden");
        $("#resultMsg").addClass("hidden");
    }

    function pagenation (num) {
        $("#page").empty();
        for (let i = 0; i < num; i++) {
            $("<button></button>", {
                value: i + 1,
                class: ["mx-2", "px-2", "hover:text-gray-300", "focus:outline-none"],
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