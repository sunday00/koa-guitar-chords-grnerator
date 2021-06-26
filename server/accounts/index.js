const Router = require("koa-router");

const api = new Router();
const controller = require("./controller");

api.get("/generate", controller.generate);
api.post("/login", controller.login);
api.get("/logout", controller.logout);

module.exports = api;
