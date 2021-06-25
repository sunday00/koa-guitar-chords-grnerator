const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const chords = require("./chords");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.use("/api/chord", chords.routes());

// router.get("/", (ctx, next) => {
//   ctx.body = "home";
//   next();
// });

// router.get("/api/chord/read", (ctx, next) => {
//   ctx.body = ctx.request.query;
//   next();
// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
