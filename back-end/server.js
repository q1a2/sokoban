const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/*
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/profilePictures',
  limits: {
    fileSize: 10000000
  }
});
*/

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  completedLevels: Number,
  minMoveLevels: Number
});
const User = mongoose.model('User', userSchema);

const levelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  minMoves: Number,
  creator: String,
  tiles: Array
});
const Level = mongoose.model('Level', levelSchema);


app.post('/api/register', async (req, res) => {
  try {
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
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    let user = await User.findOne({
      username: req.body.name,
      password: req.body.pass,
    });
    if (user == null) {
      res.send({error: "Incorrect username or password."});
    }
    else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/updatePassword', async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {username: req.body.name},
      {"$set":{"password": req.body.password}}
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/deleteUser', async (req, res) => {
  try {
    await User.deleteOne({
      username: req.body.name,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/beatLevel', async (req, res) => {
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

app.put('/api/beatPerfectly', async (req, res) => {
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

app.post('/api/newLevel', async (req, res) => {
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

app.get('/api/levels/:username', async (req, res) => {
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

app.delete('/api/deleteLevel/:creator/:name', async (req, res) => {
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

/*// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item.
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit an item.
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOneAndUpdate(
      {_id: req.params.id},
      {"$set":{"title": req.body.title, "description": req.body.description}}
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});*/

app.listen(3000, () => console.log('Server listening on port 3000!'));
