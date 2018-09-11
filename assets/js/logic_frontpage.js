$(document).ready(function () {
// Saves user input when submit button is clicked
    $("#submit_button").click(function(){

        var date_input = $("#dateInput").val();
        var budget_input = $("#budgetInput option:selected").val();
        var city_input = $("#cityInput").val();

        var datePattern = /^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i
        var locationPattern = /^\w{2,}(\s\w{2,}){0,2}$/i;
        
        var valid = datePattern.test(date_input);
        
        if (valid) {
            $("#dateInput").removeClass("wrong-input");
            $(".c-date").empty();
            $(".submit").attr("href", "homepage.html")
            localStorage.setItem("date", date_input);
        } else {
            $("#dateInput").addClass("wrong-input");
            $("#dateInput").attr("placeholder", "YYYY-MM-DD");
            $(".c-date").text("Incorrect date format");
            $(".submit").attr("href", "#")
            event.preventDefault();
        }
        

        var valid = locationPattern.test(city_input);

        if (valid) {
            $("#cityInput").removeClass("wrong-input");
            $(".c-city").empty();
            $(".submit").attr("href", "homepage.html")
            localStorage.setItem("city", city_input);
        } else {
            $("#cityInput").addClass("wrong-input");
            $(".c-city").text("Invalid city");
            $(".submit").attr("href", "#")
            event.preventDefault();
            
        }

        if(budget_input === "Select budget"){
            $("#budgetInput").addClass("wrong-input");
            $(".c-budget").text("Choose Budget");
            $(".submit").attr("href", "#")
            event.preventDefault();
        }
        else {
            $("#budgetInput").removeClass("wrong-input");
            $(".c-budget").empty();
            $(".submit").attr("href", "homepage.html")
            localStorage.setItem("budget", budget_input);
        }

        
        
    });
});