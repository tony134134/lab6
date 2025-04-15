import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import { router as articles } from "./routes/articles";

  
const app: Koa = new Koa();
//const router: Router = new Router();

/*const welcomeAPI = async (ctx: RouterContext, next:any) => {
  ctx.body = {message: "Welcome to the blog API!"};
  await next();
}

router.get('/api/v1', welcomeAPI);*/
// For Document:

app.use(logger());
app.use(json());
app.use(articles.middleware());




app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    console.log(ctx.status)
    if(ctx.status === 404){
      ctx.body = {err: "Resource not found"};
    }
  } catch(err: any) {
    ctx.body = {err: err};
  }
  
});

app.listen(10888, () => {
  console.log("Koa Started");
});