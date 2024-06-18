const Users = require("../model/DBmodel")
const bcrypt = require('bcrypt')


async function handlenewUser(req, res) {
  try {
    const { fullname, email, password } = req.body;

const saltRounds = 10;
const hashPassword = await bcrypt.hash(password, saltRounds);

    const entry = await Users.create({
      fullname: fullname,
      email : email,
      password : hashPassword,
    });
    console.log("User saved successfully:", entry);
    res.status(201).json({ message: "User created successfully", data: entry });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error user not registered" });
  }
}
function login(req, res) {
  res.json({ msg: "login form server by sujan thapa" });
}


module.exports = { login, handlenewUser };