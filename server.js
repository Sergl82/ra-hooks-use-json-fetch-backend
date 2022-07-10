const http = require("http");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const app = new Koa();
app.use(
  cors({
    origin: "*",
    credentials: true,
    "Access-Control-Allow-Origin": true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(async (ctx, next) => {
  ctx.response.set(
    "Access-Control-Allow-Origin",
    ""
  );
  await next();
});

app.use(koaBody());

const router = new Router();
router.get("/data", async (ctx, next) => {
  ctx.response.body = { status: "ok" };
});
router.get("/error", async (ctx, next) => {
  ctx.response.status = 500;
  ctx.response.body = { status: "Internal Error" };
});
router.get("/loading", async (ctx, next) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  ctx.response.body = { status: "ok" };
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
