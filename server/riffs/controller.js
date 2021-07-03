const db = require("../../models");

exports.read = async (ctx, next) => {
  let data = await db.Riff.findOne({
    attributes: [
      "id",
      "tab1",
      "tab2",
      "tab3",
      "tab4",
      "riffOption",
      "providerId",
      "songId",
      "version",
      "memo",
      "createdAt",
    ],
    where: {
      id: ctx.params.id,
    },
  });

  ctx.body = data;

  await next();
};

exports.list = async (ctx, next) => {
  let data = await db.Provider.findAll({
    attributes: ["id", "name", "description", "createdAt"],
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
    memo: memo.text,
    version: process.env.VERSION,
  })
    .then((result) => {
      ctx.body = {
        result: "success",
        songId: song,
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

exports.update = async (ctx, next) => {
  const { provider, song, riff } = ctx.request.body;

  const { id, tabs, riffOption, memo } = riff;

  await db.Riff.update(
    {
      providerId: provider,
      songId: song,
      tab1: JSON.stringify(tabs[0]),
      tab2: JSON.stringify(tabs[1]),
      tab3: JSON.stringify(tabs[2]),
      tab4: JSON.stringify(tabs[3]),
      riffOption: JSON.stringify(riffOption),
      memo,
      version: process.env.VERSION,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      ctx.body = {
        result: "success",
        songId: song,
        id,
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
