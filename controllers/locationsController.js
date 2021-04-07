const City = require('../model/locations');

exports.getLocations = (req, res) => {
    City.find()
        .then(response => { res.status(200).json({ message: "Locations Fetched Successfully", locations: response }) }
        )
        .catch(err => console.log(err)
        )
}

exports.getLocationNameById = (req, res) => {
    const locationId = parseInt(req.params.locationId);
    City.find({ location_id: locationId })
        .then(response => {
            const locationName = response[0].city
            res.status(200).json({ name: locationName })
        })
        .catch(err => console.log(err))
}