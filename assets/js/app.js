$(document).ready(function () {
    // variables for ajax call 
    // will replace with jquery locator, using placeholder for now 
    var date = localStorage.getItem("date");
    var budget = localStorage.getItem("budget");
    var city = localStorage.getItem("city");

    $(".show-budget").text(budget);
    //ticketmaster music events 
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=6mHrAZ3CTRq1nKViJch0zM8cMGHPzav6&classificationName=music&size=50&city=" + city + "&startDate=" + date,
        method: "GET"
    }).then(function (response) {

        var musicEvents = response._embedded.events;
        //creates array with only events that have price ranges 
        var eventsWithPriceRanges = musicEvents.filter(function (event) {
            return event.priceRanges;
        });
        // creates array with only events that have a max price within user budget 
        var eventsInBudget = eventsWithPriceRanges.filter(function (event) {
            return event.priceRanges[0].max <= budget;
        });
        console.log(eventsInBudget);
        // creates array with only 12 events 
        eventsInBudget = eventsInBudget.slice(0, 12);
        console.log(eventsInBudget);

        var concertCarouselItems = $(".carouselConcerts .carousel-item .concert");

        concertCarouselItems.each(function (i) {
            var imageIndex = eventsInBudget[i].images.findIndex(function (image) {
                return image.width === 205;
            });
            var eventImage = eventsInBudget[i].images[imageIndex].url;
            var eventUrl = eventsInBudget[i].url;
            var eventPrice = eventsInBudget[i].priceRanges[0].min;
            var eventName = eventsInBudget[i].name;
            var eventDate = eventsInBudget[i].dates.start.localDate;
            $(this).find("img").attr("src", eventImage);
            $(this).append(`
            <p><a href= "${eventUrl}" class="data-url-link" target = '_blank'>${eventName}</a></p>
            <h5>${eventDate}</h5> 
            <h5>$${eventPrice}<button style='margin-left: 70px;' class = "btn btn-sm btn-outline-danger favorite" event-image ="${eventImage}" event-name = "${eventName}" event-price = "${eventPrice}" event-url = "${eventUrl}"><i class='far fa-heart'></i></button></h5>
        `);

        });

    })
    var chosenPrices = [];
    var total = 0;
    var favorites = {}
    var over = false;
    $(".total").text(total);
    $(document).on("click", ".favorite", function () {
        $(".picked-events").show();
        var eventDiv = $("<div class = chosen-div>")
        var eventChosen = $("<img class = 'img-picked'>").attr("src", $(this).attr("event-image"));
        var eventTitle = $("<h6 class = 'favorite-title'>").append(`
        <p><a class = "data-url-link-2" href= "${$(this).attr("event-url")}" target = '_blank'>${$(this).attr("event-name")}</a></p> 
        `);
        var eventPrice = $("<h6 class = 'favorite-title'>").text('$' + $(this).attr("event-price") + " x ");
        var counter = $("<span data-id = '" + $(this).attr("event-name").replace("'","")+ "'>");
        eventPrice.append(counter);
        eventDiv.attr("chosen-price", $(this).attr("event-price"))
        eventDiv.append(eventChosen, eventTitle, eventPrice);
        if ($(this).attr("event-name") in favorites) {
            console.log("inside");
            favorites[$(this).attr("event-name")]++;
            $("span[data-id = '" + $(this).attr("event-name").replace("'","")+"']").text(favorites[$(this).attr("event-name")]);
           
        }
        else {
            console.log("outisde");
            favorites[$(this).attr("event-name")] = 1;
            $(".picked-events").append(eventDiv);
            counter.text(favorites[$(this).attr("event-name")]);
            
            
        }
        console.log(favorites);
        counter.text(favorites[$(this).attr("event-name")]);
        // update total every time a new event is added to favorites 
        chosenPrices.push(parseFloat(eventDiv.attr("chosen-price")));
        total = chosenPrices.reduce(add, 0);
        $(".total").text(total);
        
        if (total > parseFloat(budget) && (over === false)){
            over = true;
            var overBudget = $("<p class = 'budget over'>").text("Over Budget!");
            $(".over").append(overBudget);
            $(".picked-events").addClass("over-budget");
        }
    })
    
    
    $(document).on("click", ".clear", function () {
        $(".picked-events").empty();
        $(".picked-events").hide();
        $(".over").empty();
        $(".picked-events").removeClass("over-budget");
        over = false;
        chosenPrices = [];
        total = 0;
        favorites = {};
        $(".total").text(total);
    })

    function add(a, b) {
        return a + b;
    }


    // ticketmaster sports events 
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ugXRSfv8iRIcixf8XbiSrD0iIgYgOHFq&classificationName=sports&size=50&city=" + city + "&startDate=" + date,
        method: "GET"
    }).then(function (response) {

        var sportsEvents = response._embedded.events;
        console.log(sportsEvents);

        var eventsWithPriceRanges = sportsEvents.filter(function (event) {
            return event.priceRanges;
        });
        console.log(eventsWithPriceRanges);

        var eventsInBudget = eventsWithPriceRanges.filter(function (event) {
            return event.priceRanges[0].min <= budget;
        });
        console.log(eventsInBudget);

        eventsInBudget = eventsInBudget.slice(0, 12);
        console.log(eventsInBudget);


        var sportsCarouselItems = $(".carouselSports .carousel-item .sports");

        sportsCarouselItems.each(function (i) {
            var imageIndex = eventsInBudget[i].images.findIndex(function (image) {
                return image.width === 205;
            });
            var eventImage = eventsInBudget[i].images[imageIndex].url;
            var eventUrl = eventsInBudget[i].url;
            var eventPrice = eventsInBudget[i].priceRanges[0].min;
            var eventName = eventsInBudget[i].name;
            var eventDate = eventsInBudget[i].dates.start.localDate;

            $(this).find("img").attr("src", eventImage);
            $(this).append(`
            <p><a href= "${eventUrl}" class ="data-url-link-" target = '_blank'>${eventName}</a></p>
            <h5>${eventDate}</h5> 
            <h5>$${eventPrice}<button style='margin-left: 70px;' class = 'btn btn-sm btn-outline-danger favorite' event-image ="${eventImage}" event-name = "${eventName}" event-price = "${eventPrice}" event-url = "${eventUrl}"><i class='far fa-heart'></i></button> </h5>
        `);


        });


    })





});
