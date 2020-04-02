$(document).ready(function () {
    var date = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthIndex = date.getMonth();
    var dayIndex = date.getDay();
    // $("#currentDay").html(days[dayIndex] + ", " + months[monthIndex] + " " + date.getDate());
    $("#currentDay").html(moment().format('dddd, MMMM Do'));
});