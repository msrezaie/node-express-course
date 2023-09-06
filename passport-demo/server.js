require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/User");
const authRoutes = require("./routes/auth-routes");
const authMiddleware = require("./middleware/access-control");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoDBStore({
  uri: process.env.URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);

app.get("/restricted", authMiddleware, (req, res) => {
  if (!req.session.pageCount) {
    req.session.pageCount = 1;
  } else {
    req.session.pageCount++;
  }
  res.render("restricted", { pageCount: req.session.pageCount });
});

app.get("/", (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("index", { messages });
});

const PORT = process.env.PORT;
const start = async () => {
  try {
    await mongoose.connect(process.env.URI);
    app.listen(PORT, console.log(`server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
