const User = require("../model/users");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
    const response = await User.find({_id: req.loggedInUser.id});
    console.log(response);
      res.status(200).json({
        message: "Users Fetched Successfully",
        users: response,
      });
};

exports.addNewUser = async (req, res) => {

  const requestBody = req.body;
  const email = requestBody.email;
  const password = requestBody.password;
  const fname = requestBody.firstName;
  const lname = requestBody.lastName;
  User.find({ email: email })
    .then((response) => {
      if (response.length > 0) {
        res.status(500).json({ error: "User already exists" });
      } else {
        const user = new User({
          email: email,
          password: password,
          first_name: fname,
          last_name: lname,
        });
        user
          .save()
          .then((resp) => {
            res
              .status(200)
              .json({ message: "User registered successfully", user: resp });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.loginUser = (req, res) => {
  const requestBody = req.body;
  const email = requestBody.email;
  const password = requestBody.password;  
  User.find({ email: email, password: password })
    .then((resp) => {
      if (resp.length > 0) {
        const loggedInUser = {
          id: resp[0]._id,
          email: resp[0].email,
          firstName: resp[0].first_name,
          lastName: resp[0].last_name,
        };
        console.log(loggedInUser);
        const accessToken = jwt.sign(
          loggedInUser,
          process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({ accessToken,isLoggedIn: true });
      } else {
        res.status(200).json({
          message: "User login not successful, incorrect credentials",
          isLoggedIn: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
