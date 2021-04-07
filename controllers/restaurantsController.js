const Restaurant = require('../model/restaurants')

exports.getRestaurantByLocation = (req, res) => {
    const locationId = parseInt(req.params.locationId);
     Restaurant.find({location_id: locationId})
        .then(response => {
            res.status(200).json({ message: "Restaurants Fetched Successfully", restaurants: response });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.find({_id: restaurantId })
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurant: response });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })

}

exports.filterRestaurants = (req, res) => {
    const requestBody = req.body;
    const mealtype = requestBody.mealtypeId;
    const location = requestBody.location;
    const cusine = typeof requestBody.cusine === 'undefined'? [] : requestBody.cusine; // Does filter by cusine name
    const hcost = requestBody.hcost;
    const lcost = requestBody.lcost;
    const sort = requestBody.sort ? requestBody.sort : 1;
    const page = requestBody.page ? requestBody.page : 1;
    const countPerPage = 2;
    let payload = {};

    if (location) {
        if (cusine.length===0 && typeof lcost === 'undefined' && typeof hcost === 'undefined') {
            payload = { mealtype_id: mealtype, location_id: location };
        }
        else if (typeof lcost === 'undefined' && typeof hcost === 'undefined') {
            payload = { mealtype_id: mealtype, location_id: location, cusine: { $elemMatch: { id: { $in: cusine} } } };
        }
        else if (cusine.length === 0) {
            payload = {
                mealtype_id: mealtype,
                location_id: location,
                min_price: { $lte: hcost, $gte: lcost }
            }
        }
        else {
            payload = {
                mealtype_id: mealtype,
                location_id: location,
                cusine: { $elemMatch: { id: { $in: cusine} } },
                min_price: { $lte: hcost, $gte: lcost }
            }
        }
    }
    else if (cusine.length > 0) {
        if (typeof lcost === 'undefined' && typeof hcost === 'undefined') {
            payload = { mealtype_id: mealtype, cusine: { $elemMatch: { id: { $in: cusine} } } };
        }
        else {
            payload = {
                mealtype_id: mealtype,
                cusine: { $elemMatch: { id: { $in: cusine} } },
                min_price: { $lte: hcost, $gte: lcost }
            }
        }
    }
    else if(lcost && hcost){
        payload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    else {
        payload = { mealtype_id: mealtype };
    }

    Restaurant.find(payload).sort({min_price: sort})
        .then(response => {
            let low = countPerPage * (page - 1);
            let high = countPerPage * (page);
            const numberOfPages = Math.ceil(response.length / countPerPage);
            res.status(200).json({ message: "Restaurants Filtered Successfully", restaurants: response.slice(low,high), pages: numberOfPages, pageNumber:  page});
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}