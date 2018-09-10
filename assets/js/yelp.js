/**
 * Yelp API Request & Information Collection
 */

// Variables
// -------------------------------------------------->
const userParams = {
    location: localStorage.getItem("city"),
    maxBudget: localStorage.getItem("budget")
},
dollars = {
    $: 8,
    $$: 15,
    $$$: 40,
    $$$$: 61
};


console.log(userParams.location);
console.log(userParams.maxBudget);
console.log(typeof userParams.location);
console.log(typeof userParams.maxBudget);


// DOM Selections
// -------------------------------------------------->
const restaurantColumns = $(".carouselRestaurants .business");

// Functions
// -------------------------------------------------->

// Sort yelp businesses -->
const sortYelpBusinesses = (businesses) => {
    const byBestRating = businesses.slice();

    byBestRating.sort((a, b) => {
        if (b.rating < a.rating) {
            return -1;
        } else if (a.rating < b.rating) {
            return 1;
        }

        if (b.price.length > a.price.length) {
            return -1;
        } else if (a.price.length > b.price.length) {
            return 1;
        }

        if (b.name[0].toLowerCase() < a.name[0].toLowerCase()) {
            return -1;
        } else if (a.name[0].toLowerCase() < b.name[0].toLowerCase()) {
            return 1;
        }
        
        return 0;
    });

    return byBestRating.splice(0, 12);
};

// Append yelp business elements -->
const appendYelpBusinessElements = (businesses) => {
    restaurantColumns.each(function(index) {
        $(this).find("img").attr("src", businesses[index].image_url);
        $(this).append(`
            <p class="my-0">
                <a href="${businesses[index].url}" target="_blank">${businesses[index].name}</a>
            </p>
            <p class="my-0">Rating: ${businesses[index].rating}</p>
            <p class="my-0">Price: $${dollars[businesses[index].price].toFixed(2)}
                <button style="margin-left: 70px;" class="btn btn-sm btn-outline-danger favorite" event-image="${businesses[index].image_url}" event-name="${businesses[index].name}" event-price="${dollars[businesses[index].price]}"><i class="far fa-heart"></i></button>
            </p>
        `);
    });
};

// Get, sort, create & display yelp business elements -->
const getSortCreateYelpBusinessElements = (userParams) => {
    const encodedLocation = encodeURI(userParams.location),
        url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=${encodedLocation}`;

    $.ajax({
        url,
        method: "GET",
        headers: {
            Authorization: "Bearer EJvbHZiIs5OmP2i5jEPAjK0KB_29Wfx32FSli4YZvCVm4Gk6No0ahTnITakE3XdySd5oVBrVAAMnOIekQUe4dTRbRLsRFp--ND9BPuY7WbBqiGcsulqlu6XI3oWRW3Yx"
        }
    }).then(res => {
        const {businesses} = res,
        sortedBusinesses = sortYelpBusinesses(businesses);
        appendYelpBusinessElements(sortedBusinesses);

        // TEST:
        console.log(sortedBusinesses);
    });
};

// Main
// -------------------------------------------------->
getSortCreateYelpBusinessElements(userParams);