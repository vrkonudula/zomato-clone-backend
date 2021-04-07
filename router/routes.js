const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const locationController = require("../controllers/locationsController");
const mealtypeController = require("../controllers/mealtypesController");
const restaurantController = require("../controllers/restaurantsController");
const userController = require("../controllers/usersController");
const menuItemController = require("../controllers/menuItemsController");
const paymentController = require("../controllers/paymentsController");

router.get("/locations", locationController.getLocations);
router.get("/location/:locationId", locationController.getLocationNameById);
router.get("/mealtypes", mealtypeController.getMealTypes);
router.get("/mealtype/:mealtypeId", mealtypeController.getMealTypeNmaeById);
router.get(
  "/restaurantbylocation/:locationId",
  restaurantController.getRestaurantByLocation
);
router.get(
  "/menuitemsbyrestaurant",
  menuItemController.getMenuItems
);
router.post("/filter", restaurantController.filterRestaurants);
router.get(
  "/getrestaurantbyid/:restaurantId",
  restaurantController.getRestaurantDetailsById
);

router.get("/users/all", authenticateToken, userController.getUsers);
router.post("/users/signup", userController.addNewUser);
router.post("/users/login", userController.loginUser);

router.post("/payment", paymentController.payments);
router.post("/callback", paymentController.callback);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.send(401).json({ message: "Not authorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(403).json({ message: "Forbidden" });
    req.loggedInUser = user;
    next();
  });
}
module.exports = router;
