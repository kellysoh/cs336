"use strict";

$(document).ready(function () {
    $("#button").click(
        function () {
//            $("<em>No data yet... </em>").appendTo("body");
            console.log('AJAX request issued...');
            let jsPromise = Promise.resolve($.ajax({
                url: "/hello",
                type: "GET",
                data: {
                    name: "Lab7"
                }
            }));
            jsPromise.then(function (result) {
                console.log('AJAX request succeeded...');
                $("div").html("<em>" + result.content + "</em>");
            }, function (xhr) {
                console.log('AJAX request failed...');
                $("div").html("<p>" + xhr.statusText + "</p>");
            });
        }
    );
    $.get("lab07.html", function () {
        myCallBack(param1, param2);
    });
});