// variables for ajax call 
// will replace with jquery locator, using placeholder for now 
var city = "los angeles"

var date = "20180920"

//ticketmaster music events 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ugXRSfv8iRIcixf8XbiSrD0iIgYgOHFq&classificationName=music&size=50&city=" + city + "&startDate=" + date,
    method: "GET"
}).then(function(response){
    
    var musicEvents = response._embedded.events;
    var eventsWithPriceRanges = musicEvents.filter(function(event) {
        return event.priceRanges;
    });
    eventsWithPriceRanges = eventsWithPriceRanges.slice(0, 12);
    console.log(eventsWithPriceRanges);
    
    eventsWithPriceRanges.forEach((event) => {
        var musicEventName = event.name;
        var musicEventUrl = event.url;
        var musicEventImage = event.images[0].url;
        var priceMax = event.priceRanges[0].max;
        console.log(musicEventName);
        console.log(musicEventUrl);
        console.log(musicEventImage);
        console.log(priceMax);
    });
    {
      
    
    
}


})

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
    eventsWithPriceRanges = eventsWithPriceRanges.slice(0, 12);
    console.log(eventsWithPriceRanges);

    eventsWithPriceRanges.forEach(event => {
        var sportsEventName = event.name;
        var sportsEventUrl = event.url;
        var sportsEventImage = event.images[0].url;
        var priceMax = event.priceRanges[0].max;
        console.log(sportsEventName);
        console.log(sportsEventUrl);
        console.log(sportsEventImage);
        console.log(priceMax);
        
    });
    
    
    
    
})



