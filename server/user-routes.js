const express = require('express'),
      _       = require('lodash'),
      config  = require('./config'),
      jwt     = require('jsonwebtoken');

const app = module.exports = express.Router();

//database of users goes here
const users = [{
  id: 1,
  username: 'Admin',
  password: '123'
}];

const createToken = user => {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
}

const createFamilyKey = user => {
  let id = (Math.random().toString(36)+'00000000000000000').slice(2, 5 + 2);

  return user.familyName + id;
}

const getUserScheme = req => {
  let username,
      type,
      userSearch = {};

  // POST contains a username and not an email
  if (req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // POST contains an email and not an username
  else if (req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.post('/family/create', (req, res) => {

  const userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password || !req.body.familyName) {
    return res.status(400).send("Missing username or password or family name.");
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("That username is taken.");
  }

  let profile = _.pick(req.body, userScheme.type, 'password', 'familyName', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile),
    family_token: createFamilyKey(profile)
  });
});

app.post('/sessions/create', function(req, res) {

  let userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  let user = _.find(users, userScheme.userSearch);

  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
