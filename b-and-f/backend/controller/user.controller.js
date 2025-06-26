const User = require("../model/user.model");

async function findAll(req, res) {
  res.send(await User.findAll({ raw: false }));
}

async function createUser(req, res) {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "no name" });
    }
    if (!req.body.course) {
      return res.status(400).json({ message: "no course" });
    }
    if (!req.body.ira) {
      return res.status(400).json({ message: "no ira" });
    }
    if (req.body.ira < "0" || req.body.ira > "10") {
      return res.status(400).json({ message: "invalid ira" });
    }
    const new_user = new User(req.body);

    await new_user.save();

    return res.json(new_user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
}

async function deleteById(req, res) {
  const del_user = await User.findByPk(req.params.id);
  await del_user.destroy();
  res.json(del_user);
}

async function updateById(req, res) {
  const user_to_update = await User.findByPk(req.params.id);
  const updated_user = await user_to_update.update(req.body);
  res.json(updated_user);
}

module.exports = {
  findAll,
  createUser,
  deleteById,
  updateById,
};
