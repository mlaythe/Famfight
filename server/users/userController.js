const tokenController = require('../util/tokenController'),
      Users = require('./userModel');

const userController = {};

userController.createFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyName) {
    return res.status(400).send('Missing username or password or family name.');
  }

  Users.sync().then( () => {
    Users.findOne({
      where: {
        username: req.body.username
      }
    })
    .then( result => {
      if (result !== null) {
        return res.status(400).send('That username is already taken.');
      }

      let familyKey = tokenController.createFamilyKey(req.body);

      userController.createUser(req.body, familyKey, true);

      res.status(201).send({
        id_token: tokenController.createAdminToken(req.body, familyKey),
        family_key: familyKey
      });
    })
    .catch( err => {
      console.log('Error finding username in db:', err.message);
    });
  });
};

userController.joinFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyKey) {
    return res.status(400).send('Missing username or password or family key.');
  }

  Users.sync().then( () => {
    Users.findOne({
      where: {
        familyKey: req.body.familyKey
      }
    })
    .then( result => {
      if (result === null) {
        return res.status(400).send('Invalid family key.');
      }

      userController.createUser(req.body, req.body.familyKey, false);

      res.status(201).send({
        id_token: tokenController.createToken(req.body, familyKey)
      });
    })
    .catch( err => {
      console.log('Error finding family with that key:', err.message);
    });
  });
};

userController.createUser = (profile, familyKey, isAdmin) => {
  const user = {
      familyKey: familyKey,
      username: profile.username,
      password: profile.password,
      adminFlag: isAdmin
  };

  Users.create(user);
};

module.exports = userController;