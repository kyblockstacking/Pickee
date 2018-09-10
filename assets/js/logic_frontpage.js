$(document).ready(function () {
// Saves user input when submit button is clicked
    $("#submit_button").click(function(){

        var date_input = $("#dateInput").val();
        var budget_input = $("#budgetInput option:selected").val();
        var city_input = $("#cityInput").val();

        localStorage.setItem("date", date_input);
        localStorage.setItem("budget", budget_input);
        localStorage.setItem("city", city_input);
    });
});