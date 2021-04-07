const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    restaurantId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemType: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('menuitem', menuItemSchema);