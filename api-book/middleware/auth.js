const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader, 'auth')
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, 'token..')
  if (!token || token == null) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  try {
    let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
    const decoded = jwt.verify(token, secret_key);
    console.log(decoded, ' decoded')
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = auth;