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
const LocalStrategu = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
require("dotenv").config();

//port
const port = 8080;

// Express middleware set up
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(flash());

//Hnadlebars set up
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//Session
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());
