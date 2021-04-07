const Item = require("../model/menuitems");

exports.getMenuItems = async (req, res) => {
  const { restaurantId } = req.query;
  const sort = 1;
  try {
    const resp = await Item.find({ restaurantId }).sort({ "itemPrice": sort });
    res
      .status(200)
      .json({ message: "Menu items fetched successfully", items: resp });
  } catch (e) {
    res.status(500).json({ error: err });
  }
};
