const tokenController = require('../util/tokenController');
const Families = require('./familyModel');

const familyController = {};

familyController.createFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyName) {
    return res.status(400).send('Missing username or password or family name.');
  }

  Families.sync().then(() => {
    Families.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(result => {
      if (result !== null) {
        return res.status(400).send('That username is already taken.');
      }

      let familyKey = tokenController.createFamilyKey(req.body);

      familyController.createUser(req.body, familyKey, true);

      res.status(201).send({
        id_token: tokenController.createAdminToken(req.body, familyKey),
        family_key: familyKey
      });
    })
    .catch(err => {
      console.log('Error finding username in db:', err.message);
    });
  });
};

familyController.joinFamily = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.familyKey) {
    return res.status(400).send('Missing username or password or family key.');
  }

  Families.sync().then(() => {
    Families.findOne({
      where: {
        familyKey: req.body.familyKey
      }
    })
    .then(result => {
      if (result === null) {
        return res.status(400).send('Invalid family key.');
      }

      familyController.createUser(req.body, req.body.familyKey, false);

      res.status(201).send({
        id_token: tokenController.createToken(req.body, familyKey)
      });
    })
    .catch(err => {
      console.log('Error finding family with that key:', err.message);
    });
  });
};

familyController.createUser = (profile, familyKey, isAdmin) => {
  const user = {
      familyKey: familyKey,
      username: profile.username,
      password: profile.password,
      adminFlag: isAdmin
  };

  Families.create(user);
};

module.exports = familyController;