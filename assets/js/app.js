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
        // creates array with only 12 events 
        eventsInBudget = eventsInBudget.slice(0, 12);

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

    });

    var chosenPrices = [];
    var total = 0;
    var favorites = {}
    var over = false;
    var favString = localStorage.getItem("favs");
    var favs = favString ? JSON.parse(favString) : [];

    $(".total").text(total);

    if (favs.length > 0) {
        $(favs).each(function(index) {
            var $div = $("<div class='chosen-div'>");
            var $counter = $(`<span data-id="${favs[index].count}">`);
            var $favImage = $("<img class='img-picked' />").attr("src", favs[index].image);
            var $favTitle = $(`
                <h6 class="favorite-title">
                    <p>
                        <a href="${favs[index].url}" target="_blank">${favs[index].name}</a>
                    </p>
                </h6>
            `)
            var $favPrice = $(`<h6 class="favorite-title">$${favs[index].price} x ${favs[index].count}</h6>`);

            $favPrice.append($counter);
            $div.attr("chosen-price", favs[index].price);
            $div.append($favImage, $favTitle, $favPrice);

            chosenPrices.push(parseFloat(favs[index].price * favs[index].count));
            total = chosenPrices.reduce(add, 0);
            $(".total").text(total);
            
            
            $(".picked-events").append($div);
            $(".picked-events").show();

            if (total > parseFloat(budget) && !over) {
                var overBudget = $("<p class='budget over'>").text("Over Budget!");
                over = true;
                $(".budget").append(overBudget);
                $(".picked-events").addClass("over-budget");
            }
        });
    }

    $(document).on("click", ".favorite", function () {
        $(".picked-events").show();
        var eventDiv = $("<div class = chosen-div>");
        var counter = $("<span data-id = '" + $(this).attr("event-name").replace("'", "") + "'>");
        var eventChosen = $("<img class = 'img-picked'>").attr("src", $(this).attr("event-image"));
        var eventTitle = $("<h6 class = 'favorite-title'>").append(`
        <p><a class = "data-url-link-2" href= "${$(this).attr("event-url")}" target = '_blank'>${$(this).attr("event-name")}</a></p> 
        `);
        var eventPrice = $("<h6 class = 'favorite-title'>").text('$' + $(this).attr("event-price") + " x ");
        eventPrice.append(counter);
        eventDiv.attr("chosen-price", $(this).attr("event-price"));
        eventDiv.append(eventChosen, eventTitle, eventPrice);

        favString = localStorage.getItem("favs");
        favs = favString ? JSON.parse(favString) : favs;

        var eventNameString = $(this).attr("event-name");
        
        if (eventNameString in favorites && favorites.hasOwnProperty(eventNameString)) {
            favorites[eventNameString]++;
            $("span[data-id = '" + eventNameString.replace("'","")+"']").text(favorites[eventNameString]);
            
            var index = favs.findIndex((fav) => fav.name === eventNameString);
            favs[index].count += 1;
        } else {
            favorites[eventNameString] = 1;
            $(".picked-events").append(eventDiv);
            counter.text(favorites[eventNameString]);

            favs.push({
                image: $(this).attr("event-image"),
                name: eventNameString,
                price: $(this).attr("event-price"),
                url: $(this).attr("event-url"),
                count: favorites[eventNameString]
            });
        }

        localStorage.setItem("favs", JSON.stringify(favs));  

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
        localStorage.removeItem("favs");
        favs = [];
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

        var eventsWithPriceRanges = sportsEvents.filter(function (event) {
            return event.priceRanges;
        });

        var eventsInBudget = eventsWithPriceRanges.filter(function (event) {
            return event.priceRanges[0].min <= budget;
        });

        eventsInBudget = eventsInBudget.slice(0, 12);


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
            <p><a href= "${eventUrl}" class ="data-url-link" target = '_blank'>${eventName}</a></p>
            <h5>${eventDate}</h5> 
            <h5>$${eventPrice}<button style='margin-left: 70px;' class = 'btn btn-sm btn-outline-danger favorite' event-image ="${eventImage}" event-name = "${eventName}" event-price = "${eventPrice}" event-url = "${eventUrl}"><i class='far fa-heart'></i></button> </h5>
        `);


        });


    })





});
