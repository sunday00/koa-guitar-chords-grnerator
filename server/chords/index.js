const Router = require("koa-router");

const api = new Router();
const controller = require("./controller");

api.get("/read", controller.read);
api.get("/list", controller.list);

api.post("/create", controller.create);

module.exports = api;
