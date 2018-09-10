$(document).ready(function () {
// Saves user input when submit button is clicked
    $("#submit_button").click(function(){

        var date_input = $("#dateInput").val()
        var budget_input = $("#budgetInput").val()
        var zip_input = $("#zipInput").val()
    
        console.log(date_input);
        console.log(budget_input);
        console.log(zip_input);

    });
});