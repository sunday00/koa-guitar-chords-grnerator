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

exports.checkToken = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if(!token){
    ctx.body = {
      result: "error",
      message: "You need to logged in",
    };

    return;
  }

  await jwt.verify(token, jwtSec+jwtSlt, async(err, validated) => {
    if(err){
      ctx.body = {
        result: "error",
        message: err.message,
      };
      return;
    }

    console.log(validated);

    await next();
  });
}