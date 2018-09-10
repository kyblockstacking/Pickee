$(document).ready(function(){
    // variables for ajax call 
// will replace with jquery locator, using placeholder for now 
var date = localStorage.getItem("date");
var budget = localStorage.getItem("budget");
var city = localStorage.getItem("city");

//ticketmaster music events 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=6mHrAZ3CTRq1nKViJch0zM8cMGHPzav6&classificationName=music&size=50&city=" + city + "&startDate=" + date,
    method: "GET"
}).then(function(response){
    
    var musicEvents = response._embedded.events;
    //creates array with only events that have price ranges 
    var eventsWithPriceRanges = musicEvents.filter(function(event) {
        return event.priceRanges;
    });
    // creates array with only events that have a max price within user budget 
    var eventsInBudget = eventsWithPriceRanges.filter(function(event){
        return event.priceRanges[0].max <= budget;
    });
    console.log(eventsInBudget);
    // creates array with only 12 events 
    eventsInBudget = eventsInBudget.slice(0, 12);
    console.log(eventsInBudget);

    var concertCarouselItems = $(".carouselConcerts .carousel-item .concert");
    
    concertCarouselItems.each(function(i) {
        var imageIndex = eventsInBudget[i].images.findIndex(function(image){
            return image.width === 205;
        });
        var eventImage = eventsInBudget[i].images[imageIndex].url;
        var eventUrl = eventsInBudget[i].url;
        var eventPrice = eventsInBudget[i].priceRanges[0].min;
        var eventName = eventsInBudget[i].name;
        var eventDate = eventsInBudget[i].dates.start.localDate;
        $(this).find("img").attr("src", eventImage);
        $(this).append(`
            <p><a href= "${eventUrl}" target = '_blank'>${eventName}</a></p>
            <h5>${eventDate}</h5> 
            <h5>$${eventPrice}<button style='margin-left: 70px;' class = "btn btn-sm btn-outline-danger favorite" event-image ="${eventImage}" event-name = "${eventName}" event-price = "${eventPrice}"><i class='far fa-heart'></i></button></h5>
        `);
        
    });

})
var chosenPrices = [];
var total; 

$(document).on("click", ".favorite", function(){
    var eventDiv = $("<div class = chosen-div>")
    var eventChosen = $("<img class = 'img-picked'>").attr("src", $(this).attr("event-image"));
    var eventTitle = $("<h6 class = 'favorite-title'>").append($(this).attr("event-name"));
    var eventPrice = $("<h6 class = 'favorite-title'>").text('$' + $(this).attr("event-price"));
    eventDiv.attr("chosen-price", $(this).attr("event-price"))
    eventDiv.append(eventChosen, eventTitle, eventPrice);
    $(".picked-events").append(eventDiv);
    chosenPrices.push(parseFloat(eventDiv.attr("chosen-price")));
    total = chosenPrices.reduce(add,0);
    $(".total").text(total);
     

})
$(document).on("click", ".clear", function(){
    $(".picked-events").empty();
    chosenPrices = [];
    total = 0;
    $(".total").text(total);
})

function add(a, b){
    return a + b;
}


// ticketmaster sports events 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ugXRSfv8iRIcixf8XbiSrD0iIgYgOHFq&classificationName=sports&size=50&city=" + city + "&startDate=" + date,
    method: "GET"
}).then(function(response){
    
    var sportsEvents = response._embedded.events;
    console.log(sportsEvents);

    var eventsWithPriceRanges = sportsEvents.filter(function(event){
        return event.priceRanges;
    });
    console.log(eventsWithPriceRanges);

    var eventsInBudget = eventsWithPriceRanges.filter(function(event){
        return event.priceRanges[0].min <= budget;
    });
    console.log(eventsInBudget);

    eventsInBudget = eventsInBudget.slice(0, 12);
    console.log(eventsInBudget);


    var sportsCarouselItems = $(".carouselSports .carousel-item .sports");
    
    sportsCarouselItems.each(function(i) {
        var imageIndex = eventsInBudget[i].images.findIndex(function(image){
            return image.width === 205;
        });
        var eventImage = eventsInBudget[i].images[imageIndex].url;
        var eventUrl = eventsInBudget[i].url;
        var eventPrice = eventsInBudget[i].priceRanges[0].min;
        var eventName = eventsInBudget[i].name;
        var eventDate = eventsInBudget[i].dates.start.localDate;

        $(this).find("img").attr("src", eventImage);
        $(this).append(`
            <p><a href= "${eventUrl}" target = '_blank'>${eventName}</a></p>
            <h5>${eventDate}</h5> 
            <h5>$${eventPrice}<button style='margin-left: 70px;' class = 'btn btn-sm btn-outline-danger favorite' event-image ="${eventImage}" event-name = "${eventName}" event-price = "${eventPrice}"><i class='far fa-heart'></i></button> </h5>
        `);
        
        
    });
  
    
})





});
