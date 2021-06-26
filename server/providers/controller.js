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

exports.create = async (ctx, next) => {

  const { provider } = ctx.request.body;

  const { name, description } = provider;

  await db.Provider.create({
    name,
    description,
    accountId: ctx.state.validated.id
  })
    .then((result) => {
      ctx.body = {
        result: "success",
        id: result.id,
      };

      next();
    })
    .catch((err) => {
      ctx.body = {
        result: "error",
        message: err.message,
      };

      console.log( err.message );

      next();
    });
};