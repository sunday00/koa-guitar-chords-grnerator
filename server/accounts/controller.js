const db = require("../../models");
const printer = require("../utils/Printer");
const jwt = require("../utils/jwt");

exports.generate = async (ctx, next) => {
  const a = await db.Account.findOne({
    attributes: ["id", "userId", "email"],
    where: {
      userId: process.env.MASTER_USER,
      //TODO: 지금은 걍 내 아이디만 만들어서 1인용 사용 ㅋ
      // 나중에 ip 로 튕구고 막 좀 더 정교하게 ㅋㅋ
    },
  }).then(async (a) => {
    if (a === null) {
      printer.info("\n\nNOW GENERATE ONE USER\n\n\n");

      a = await db.Account.create({
        userId: process.env.MASTER_USER,
        password: db.Account.hash(process.env.MASTER_PASS),
        email: process.env.MASTER_MAIL,
        ip: ctx.request.ip,
      }).then((res) => {
        return {
          id: res.id,
        };
      });

      return await a;
    }

    return { id: a.dataValues.id };
  });

  printer.success(`\n\nCOMPLETE:: user serial id => `);
  printer.light(`${a.id}\n\n`);

  await next();
};

exports.login = async (ctx, next) => {
  const user = await db.Account.findOne({
    attributes: ["id", "userId", "email"],
    where: {
      userId: ctx.request.body.id,
      password: db.Account.hash(ctx.request.body.pass),
    },
  });

  const token = await jwt.genToken(user);

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });

  ctx.body = await {
    result: "success",
    token,
  };

  await next();
};

exports.logout = async (ctx, next) => {
  ctx.cookies.set("access_token", "", {
    httpOnly: true,
    maxAge: 0,
  });

  ctx.body = await {
    result: "success",
  };

  await next();
}
