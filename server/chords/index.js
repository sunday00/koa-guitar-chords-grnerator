const Router = require('koa-router');

const api = new Router();
const controller = require('./controller');

api.get('/read', controller.read);
api.get('/list', controller.list);

module.exports = api;