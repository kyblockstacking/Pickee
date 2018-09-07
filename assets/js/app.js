// variables for ajax call 
// will replace with jquery locator, using placeholder for now 
var city = "los angeles"

var date = "20180920"

//ticketmaster music events 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ugXRSfv8iRIcixf8XbiSrD0iIgYgOHFq&classificationName=music&city=" + city + "&startDate=" + date,
    method: "GET"
}).then(function(response){
    console.log(response);
    var musicEvents = response._embedded.events;
    console.log(musicEvents);
    var musicEventName = musicEvents[9].name;
    var musicEventUrl = musicEvents[9].url;
    var musicEventImage = musicEvents[9].images[0].url;
    console.log(musicEventName);
    console.log(musicEventUrl);
    console.log(musicEventImage);
    
})

// ticketmaster sports events 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ugXRSfv8iRIcixf8XbiSrD0iIgYgOHFq&classificationName=sports&city=" + city + "&startDate=" + date,
    method: "GET"
}).then(function(response){
    console.log(response);
    var sportsEvents = response._embedded.events;
    console.log(sportsEvents);
    var sportsEventName = sportsEvents[9].name;
    var sportsEventUrl = sportsEvents[9].url;
    var sportsEventImage = sportsEvents[9].images[0].url;
    console.log(sportsEventName);
    console.log(sportsEventUrl);
    console.log(sportsEventImage);
})



