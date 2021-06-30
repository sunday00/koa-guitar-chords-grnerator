const Router = require("koa-router");
const { checkToken } = require("../utils/jwt");

const api = new Router();
const controller = require("./controller");

api.get("/read", controller.read);
api.get("/list", controller.list);

api
  .use(checkToken)
  .post("/create", controller.create)
  .patch("/update", controller.update);

module.exports = api;
