const { Router, raw } = require('express');
const User = require('../model/user.model');

const router = Router();

router.get('/', async (req, res, next) => {
  res.send(await User.findAll({ raw: false }));
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  if (!req.body.name) {
    res.status(400).json({message: "no body"});
  }
  const new_user = new User(req.body);
  console.log(new_user);

  new_user.save();

  res.json(new_user);
})

module.exports = router;