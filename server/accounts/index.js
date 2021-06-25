const Router = require("koa-router");

const api = new Router();
const controller = require("./controller");

api.get("/generate", controller.generate);

module.exports = api;
