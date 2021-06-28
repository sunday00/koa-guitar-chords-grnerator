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
  const { provider, song, riff } = ctx.request.body;

  const { tabs, riffOption, memo } = riff;

  await db.Riff.create({
    providerId: provider,
    songId: song,
    tab1: JSON.stringify(tabs[0]),
    tab2: JSON.stringify(tabs[1]),
    tab3: JSON.stringify(tabs[2]),
    tab4: JSON.stringify(tabs[3]),
    riffOption: JSON.stringify(riffOption),
    memo,
    version: process.env.VERSION,
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

      console.log(err.message);

      next();
    });
};
