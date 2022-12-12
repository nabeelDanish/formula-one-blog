const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  // Getting the token from the request
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // If token not found, error
  if (!token) {
    return res.status(403).send("A token is required for Authentication");
  }

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token!");
  }

  return next();
};

module.exports = verifyToken;
