const jwtSec = process.env.JWT_SEC;
const jwtSlt = process.env.JWT_SLT;
const jwt = require("jsonwebtoken");

exports.genToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      userId: user.userId,
      email: user.email,
    },
    jwtSec + jwtSlt,
    {
      expiresIn: "1h",
    }
  );
};
