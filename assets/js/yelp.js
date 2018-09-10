/**
 * Yelp API Request & Information Collection
 */

// Variables
// -------------------------------------------------->
const userParams = {
    dataTime: "20180920",
    location: "los angeles",
    maxBudget: "100"
},
dollars = {
    $: "$10.00 or less",
    $$: "$11.00 - $30.00",
    $$$: "$31.00 - $60.00",
    $$$$: "Over $60.00"
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

// Create single yelp business element -->
const createSingleYelpElement = (business) => {
    const $div = $("<div>").html(`
        <img src="${business.image_url}" alt="${business.name}" />
        <h4>${business.name}</h4>
        <h4>Price: ${dollars[business.price]}</h4>
        <h4>Rating: ${business.rating}/5</h4>
        <p>Phone: ${business.phone}</p>
    `);
    return $div;
};

// Create yelp business elements -->
const createYelpBusinessElements = (businesses) => {
    const $documentFrag = $(document.createDocumentFragment());
    businesses.forEach(business => $documentFrag.append(createSingleYelpElement(business)));
    return $documentFrag;
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
        $businessElements = createYelpBusinessElements(sortedBusinesses);
        // TEST: -->
        console.log($businessElements);
    });
};

// TEST: -->
getSortCreateYelpBusinessElements(userParams);

// Main
// -------------------------------------------------->
