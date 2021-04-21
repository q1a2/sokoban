const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
const argon2 = require("argon2");

// connect to the database
mongoose.connect('mongodb://localhost:27017/sokoban', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  completedLevels: Number,
  minMoveLevels: Number
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password'))
    return next();
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};
userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}
const User = mongoose.model('User', userSchema);

const levelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  minMoves: Number,
  creator: String,
  tiles: Array
});
const Level = mongoose.model('Level', levelSchema);

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};

//API Calls

app.get('/api/currentUser', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.post('/api/register', async (req, res) => {
  try {
    console.log("Received Register Request:\n", req.body);
    if(await User.findOne({username: req.body.name}) != null) {
      res.send({error: "Username already exists!"});
      return;
    }
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
  const user = new User({
    username: req.body.name,
    password: req.body.pass,
    completedLevels: 0,
    minMoveLevels: 0
  });
  try {
    await user.save();
    req.session.userID = user._id;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/login', async (req, res) => {
  console.log("Received Login Request:\n", req.body);
  try {
    let user = await User.findOne({
      username: req.body.name,
    });
    if (user == null) {
      console.log("Unknown User");
      res.send({error: "Incorrect username or password."});
    }
    else {
      console.log(user);
      if (await user.comparePassword(req.body.pass)) {
        req.session.userID = user._id;
        res.send(user);
      }
      else {
        res.send({error: "Incorrect username or password."});
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/updatePassword', validUser, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {username: req.body.username},
      {"$set":{"password": await argon2.hash(req.body.password)}}
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/deleteUser/:username', validUser, async (req, res) => {
  try {
    await User.deleteOne({
      username: req.params.username,
    });
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/currentUser', validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.put('/api/beatLevel', validUser, async (req, res) => {
  try {
    await User.update(
      {username: req.body.name},
      {"$set":{"completedLevels": req.body.levels}}
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/beatPerfectly', validUser, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {username: req.body.name},
      {"$set":{"completedLevels": req.body.levels, "minMoveLevels": req.body.perfectLevels}}
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/newLevel', validUser, async (req, res) => {
  const level = new Level({
    id: req.body.id,
    name: req.body.name,
    minMoves: req.body.minMoves,
    tiles: req.body.tiles,
    creator: req.body.creator
  });
  try {
    await level.save();
    res.send(level);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/levels/:username', validUser, async (req, res) => {
  try {
    let levels = await Level.find({
      creator: req.params.username
    });
    res.send(levels);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/deleteLevel/:creator/:name', validUser, async (req, res) => {
  try {await Level.deleteOne({
      creator: req.params.creator,
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
