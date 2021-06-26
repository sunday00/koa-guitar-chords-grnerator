const db = require("../../models");

exports.create = async (ctx, next) => {
  const { provider, chord } = ctx.request.body;

  const { name, strings, memo } = chord;

  const modifiedStrings = strings.map((s) => {
    switch (s) {
      case true:
        return "t";
      case false:
        return "f";
      default:
        return s;
    }
  });

  await db.Chord.create({
    setId: provider,
    strings: modifiedStrings.join("/"),
    name,
    memo,
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

      next();
    });
};

exports.list = async (ctx, next) => {
  let data = await db.Chord.findAll({
    attributes: ["id", "setId", "name", "strings", "memo", "createdAt"],
    include: {
      model: db.Provider,
    },
    where: {
      setId: ctx.request.query.provider,
    },
  });

  data = await data.map(
    ({ id, setId, name, strings, memo, createdAt, Provider }) => {
      strings = [...strings.split("/")].map((s) => {
        switch (s) {
          case "f":
            return false;
          case "t":
            return true;
          default:
            return parseInt(s);
        }
      });

      return {
        id,
        setId,
        name,
        strings,
        memo,
        createdAt,
        provider: { id: Provider.id, name: Provider.name },
      };
    }
  );

  ctx.body = data;

  await next();
};

exports.read = async (ctx, next) => {
  let data = await db.Chord.findOne({
    attributes: ["id", "setId", "name", "strings", "memo", "createdAt"],
    include: {
      model: db.Provider,
    },
    where: {
      setId: ctx.request.query.provider,
      id: ctx.request.query.id,
    },
  });

  let { id, setId, name, strings, memo, createdAt, Provider } = await data;

  strings = [...strings.split("/")].map((s) => {
    switch (s) {
      case "f":
        return false;
      case "t":
        return true;
      default:
        return parseInt(s);
    }
  });

  ctx.body = {
    id,
    setId,
    name,
    strings,
    memo,
    createdAt,
    provider: { id: Provider.id, name: Provider.name },
  };

  await next();
};
