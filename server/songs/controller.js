const db = require("../../models");

exports.list = async (ctx, next) => {
  let data = await db.Song.findAll({
    attributes: ["id", "title", "description", "providerId", "createdAt"],
    where: {
      providerId: ctx.params.provider,
    },
  });
  ctx.body = data;
  await next();
};

exports.read = async (ctx, next) => {
  let data = await db.Song.findOne({
    attributes: ["id", "title", "description", "providerId", "createdAt"],
    where: {
      providerId: ctx.params.provider,
      id: ctx.params.song,
    },
    include: {
      model: db.Riff,
    },
  });

  ctx.body = data;
  await next();
};

exports.create = async (ctx, next) => {
  const { providerId, song } = ctx.request.body;

  const { title, description } = song;

  await db.Song.create({
    title,
    description,
    providerId,
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
