const MealType = require('../model/mealtypes');

exports.getMealTypes = (req, res) => {
    MealType.find()
        .then(response => {
            res.status(200).json({ message: "MealTypes Fetched Successfully", mealTypes: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getMealTypeNmaeById = (req, res) => {
    const mealtypeId = parseInt(req.params.mealtypeId);
    MealType.find({ meal_type: mealtypeId })
        .then(response => {
            const mealTypeName = response[0].name;
            res.status(200).json({ name: mealTypeName })    
        })
        .catch(err => { res.status(500).json({ error: err})})
}