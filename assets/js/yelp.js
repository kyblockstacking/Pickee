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

// DOM Selections
// -------------------------------------------------->
const restaurantColumns = $(".carouselRestaurants .business");

// Functions
// -------------------------------------------------->

// Get businesses with prices -->
const getBusinessesWithPrices = (businesses) => {
    return businesses.filter((business) => business.price);
}

// Sort yelp businesses -->
const sortYelpBusinesses = (businesses) => {
    const byBestRating = businesses.slice();

    byBestRating.sort((a, b) => {
        if (b.rating < a.rating) {
            return -1;
        } else if (a.rating < b.rating) {
            return 1;
        }

        if (a.price && b.price) {
            if (b.price > a.price) {
                return -1;
            } else if (a.price > b.price) {
                return 1;
            }
        }
        
        return 0;
    });        
    
    return byBestRating.splice(0, 12);
};

// Append yelp business elements -->
const appendYelpBusinessElements = (businesses) => {
    restaurantColumns.each(function(index) {
        let {rating, url, image_url, price, name} = businesses[index];
        price = price ? dollars[price] : "No Price";
        
        $(this).find("img").attr("src", image_url);
        $(this).append(`
            <p class="my-0">
                <a href="${url}" target="_blank">${name}</a>
            </p>
            <p class="my-0">Rating: ${rating}</p>
            <p class="my-0">Price: $${price.toFixed(2)}
                <button style="margin-left: 70px;" class="btn btn-sm btn-outline-danger favorite" event-image="${image_url}" event-name="${name}" event-price="${price}"><i class="far fa-heart"></i></button>
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
    }).then((res) => {
        const {businesses} = res,
        businessesWithPrices = getBusinessesWithPrices(businesses),
        sortedBusinesses = sortYelpBusinesses(businessesWithPrices);
        appendYelpBusinessElements(sortedBusinesses);

        // TEST:
        console.log(sortedBusinesses);
    });
};

// Main
// -------------------------------------------------->
getSortCreateYelpBusinessElements(userParams);
