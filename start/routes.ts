/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import Route from "@ioc:Adonis/Core/Route";

Route.where("id", Route.matchers.number());
// Route.where("id", {
//   match: /^[0-9]+$/,
//   cast: (id) => Number(id),
// });

Route.get("/img/:userId/*", async ({ params }) => {
  return params;
});

Route.get("/", async (ctx) => {
  return ctx.view.render("welcome");
});

Route.get("/posts/topics/:topic?", async (ctx) => {
  return `Topic: ${ctx.params.topic}`;
}).where("topic", Route.matchers.slug());

require("./routes/api");
// Route.on("/testing").redirect("/test");
// Route.on("/googleIt").redirectToPath("https://google.com");
