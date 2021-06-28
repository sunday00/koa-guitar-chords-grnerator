const Router = require("koa-router");
const { checkToken } = require("../utils/jwt");

const api = new Router();
const controller = require("./controller");

api.get("/list/:provider", controller.list);
api.get("/read/:provider/:song", controller.read);

api.use(checkToken).post("/create", controller.create);

module.exports = api;
