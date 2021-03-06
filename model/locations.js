const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country_name: {
        type: String
    }
});

module.exports = mongoose.model('city', locationSchema);