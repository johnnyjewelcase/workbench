$(document).ready(function () {
    $("#currentDay").html(moment().format("dddd, MMMM Do"));
    var hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    var currentHour = moment().format("k");
    for (i = 0; i < hours.length; i++) {
        var tr = $("<tr class='row'>");
        var tdHour = $("<td class='col-2 hour'>");
        var tdEvent = $("<td class='col-9 event'>");

        var tdSave = $("<td class='col-1 saveBtn'>")
            .css({
                "text-align": "center",
                padding: "25px"
            })
            .html("<h3><i class='fas fa-save'></i></h3>");

        if (hours[i] <= 12) {
            tdHour.html(hours[i] + " AM");
        } else tdHour.html(hours[i] - 12 + " PM");

        if (hours[i] < currentHour) {
            tdEvent.addClass("past");
        } else if (hours[i] == currentHour) {
            tdEvent.addClass("present");
        } else if (hours[i] > currentHour) {
            tdEvent.addClass("future");
        }

        tr.append(tdHour, tdEvent, tdSave);

        $("tbody").append(tr);
    }

    $(".event").click(function () {
        if ($(this).hasClass("past")) {
            var txt = $(this).text();
            $(this)
                .html("You can't create events in the past!")
                .css("color", "red")
                .addClass("error");

            setTimeout(function () {
                txt =
                    $(".error").html(txt).css("color", "white");
            }, 1000);
        } else {
            $("textarea").remove();
            $(this).append($("<textarea />"));
            $("textarea").css("width", "100%");
            $("textarea").focus();
        }
    });

    $(".saveBtn").click(function () {
        var eventText = $("textarea").val();
        console.log(eventText);
        $(this)
            .prev()
            .html(eventText);
    });
});