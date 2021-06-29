const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const serve = require('koa-static');
const send = require('koa-send');
const path = require('path');

const accounts = require("./accounts");
const providers = require("./providers");
const chords = require("./chords");
const riffs = require("./riffs");
const songs = require("./songs");

const app = new Koa();
const router = new Router();

app.use(bodyParser());


app.use(serve(__dirname + '/../build'));

router.use("/account", accounts.routes());
router.use("/api/provider", providers.routes());
router.use("/api/song", songs.routes());
router.use("/api/riff", riffs.routes());
router.use("/api/chord", chords.routes());

// router.get("/", (ctx, next) => {
//   ctx.body = "home";
//   next();
// });

// router.get("/api/chord/read", (ctx, next) => {
//   ctx.body = ctx.request.query;
//   next();
// });

router.get("/(.*)", async (ctx, next) => {
  if(ctx.status === 404) await send(ctx, 'index.html', { root: path.resolve('./') + '/build/' });
  next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
