const tokenController = require('../util/tokenController'),
      Users = require('./userModel');

const userController = {};

userController.createFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyName) {
    return res.status(400).send('Missing username or password or family name.');
  }

  let familyKey = tokenController.createFamilyKey(req.body);

  userController.createUser(req.body, familyKey, true);

  res.status(201).send({
    id_token: tokenController.createAdminToken(req.body, familyKey),
    family_key: familyKey
  });
};

userController.joinFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyKey) {
    return res.status(400).send('Missing username or password or family key.');
  }

  let familyKey = tokenController.createFamilyKey(req.body);

  userController.createUser(req.body, familyKey, false);

  res.status(201).send({
    id_token: tokenController.createToken(req.body, familyKey)
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