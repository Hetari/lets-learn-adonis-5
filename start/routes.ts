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

Route.get("/", async () => {
  // Generate a URL for the "api.v1.posts.show" route with the parameter "id" set to 1.
  const postUrl = Route.makeUrl("api.v1.posts.show", [1], {
    prefixUrl: "http://localhost:3333",
  });

  // Generate a URL for the "api.v1.posts.show" route using a fluent API.
  const postUrlBuilder = Route.builder()
    .prefixUrl("http://localhost:3333") // Specify the base URL for the route.
    .params({ id: 1 }) // Set the parameter "id" to 1.
    .make("api.v1.posts.show"); // Generate the URL.

  // Generate a signed URL for the "/test-signature" route with the parameter "email" set to "foo@bar.com".
  // The `expiresIn` option specifies the expiration time of the signed URL.
  const postUrlSigned = Route.makeSignedUrl(
    "/test-signature",
    {
      email: "foo@bar.com",
    },
    {
      expiresIn: "10s",
      prefixUrl: "http://localhost:3333",
    }
  );

  // Generate a signed URL for the "/test-signature" route using a fluent API.
  const postUrlBuilderSigned = Route.builder()
    .prefixUrl("http://localhost:3333") // Specify the base URL for the route.
    .params({ email: "foo@bar.com" }) // Set the parameter "email" to "foo@bar.com".
    .makeSigned("/test-signature", { expiresIn: "10s" }); // Generate the signed URL.

  // Return the generated URLs as a response.
  return { postUrl, postUrlBuilder, postUrlSigned, postUrlBuilderSigned };
});

Route.get("/test-signature", async () => {
  return true;
}).mustBeSigned();

Route.get("/posts/topics/:topic?", async (ctx) => {
  return `Topic: ${ctx.params.topic}`;
}).where("topic", Route.matchers.slug());

require("./routes/api");
// Route.on("/testing").redirect("/test");
// Route.on("/googleIt").redirectToPath("https://google.com");
