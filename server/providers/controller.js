const db = require("../../models");

exports.list = async (ctx, next) => {
  let data = await db.Provider.findAll({
    attributes: ["id", "name", "description", "createdAt"],

    // TODO:
    // where: {
    //   userId: ...
    // },
  });

  ctx.body = data;

  await next();
};
