/**
 * Yelp API Request & Information Collection
 */

// Variables
// -------------------------------------------------->
const userParams = {
    dataTime: "20180920",
    location: "los angeles",
    maxBudget: "100"
};

// DOM Selections
// -------------------------------------------------->


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

    return byBestRating.splice(0, 10);
};

// Get, sort, create & display yelp business elements -->
const getSortCreateYelpBusinessElements = (userParams) => {
    const encodedLocation = encodeURI(userParams.location),
        url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=${encodedLocation}`;
    console.log(encodedLocation);

    $.ajax({
        url,
        method: "GET",
        headers: {
            Authorization: "Bearer EJvbHZiIs5OmP2i5jEPAjK0KB_29Wfx32FSli4YZvCVm4Gk6No0ahTnITakE3XdySd5oVBrVAAMnOIekQUe4dTRbRLsRFp--ND9BPuY7WbBqiGcsulqlu6XI3oWRW3Yx"
        }
    }).then(res => {
        const {businesses} = res;
        // TEST: -->
        console.log(sortYelpBusinesses(businesses));
    });
};

// TEST: -->
getSortCreateYelpBusinessElements(userParams);

// Main
// -------------------------------------------------->
