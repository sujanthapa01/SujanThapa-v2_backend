function login(req, res) {
  res.json({ msg: "login form server by sujan thapa" });
}

function signup(req, res) {
  res.json({ msg: "this is signup page" });
}

module.exports = { login, signup };