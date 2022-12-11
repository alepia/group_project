//Modules
const express = require("express");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const { engine } = require("express-handlebars");
const session = require("express-session");
const fs = require("fs");
const https = require("https");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
const userRoutes = require("./router/userRoutes");
const controller = require("./controller/userController");
var bodyParser = require("body-parser");
require("dotenv").config();

//port
const port = 8080;

// Express middleware set up
const app = express();
// app.use(flash());
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Handlebars set up
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

// //Session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// //Passport
// app.use(passport.initialize());
// app.use(passport.session());

// //Check if the user is authenticated
// //

// //Sign Up
// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       const user = await knex("users").where({ email }).first();
//       if (user) {
//         return done(null, false, {
//           message: "This email is already taken.",
//         });
//       }

//       const hash = await bcrypt.hash(password, 10);
//       let newUser = {
//         email,
//         password: hash,
//       };

//       const id = await knex("users").inert(newUser).returning("id");
//       newUser.id = id[0]["id"];
//       return done(null, newUser);
//     }
//   )
// );

// //Login
// passport.use(
//   "local-login",
//   new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//     const user = await knex("users").where({ email }).first();

//     if (!user) {
//       return done(null, false, { message: "Wrong email or password" });
//     }

//     const result = await bcrypt.compare(password, user.password);
//     if (result) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   })
// );

// //Serialize
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// //Deserialize
// passport.deserializeUser(async (id, done) => {
//   const user = await knex("users").where({ id }).first();
//   return user ? done(null, true) : done(null, false);
// });
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    style: "styles.css",
  });
});
app.use("/api/users", userRoutes);

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    style: "login.css",
  });
});
app.post("/login", urlencodedParser, controller.userLogin);



// const productService = new ProductService(knex);
// app.get("/product", (req, res) => {
//   productService.list((data) => {
//     res.send(data);
//     console.log(data);
//   });
// });

app.listen(port, () => {
  console.log("Listening to ", port);
});
