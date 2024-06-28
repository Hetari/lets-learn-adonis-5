import { ApplicationContract } from "@ioc:Adonis/Core/Application";

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class RouteProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready

    // Imports the `Route` class from the AdonisJS core and assigns it to a constant
    // named `Route`. This is done to avoid having to import the class every time it is used.
    const Route = this.app.container.use("Adonis/Core/Route");

    // Define a macro for the Route class and its subclasses
    // This macro adds a middleware to check for a valid signature
    Route.Route.macro("mustBeSigned", function () {
      // Add middleware to check for a valid signature
      this.middleware(async (ctx, next) => {
        if (!ctx.request.hasValidSignature()) {
          return ctx.response.badRequest("Invalid signature");
        }

        await next();
      });

      return this;
    });

    // Define a macro for the RouteGroup class and its subclasses
    // This macro adds a middleware to check for a valid signature
    Route.RouteGroup.macro("mustBeSigned", function () {
      this.middleware(async (ctx, next) => {
        if (!ctx.request.hasValidSignature()) {
          return ctx.response.badRequest("Invalid signature");
        }

        await next();
      });

      return this;
    });

    // Define a macro for the BriskRoute class
    // This macro redirects the user to the home page
    Route.BriskRoute.macro("goHome", function () {
      this.redirect("/");

      return this;
    });

    // Define a macro for the RouteResource class
    // This macro adds a middleware to check for a valid signature
    Route.RouteResource.macro("mustBeSigned", function () {
      this.middleware({
        "*": async (ctx, next) => {
          if (!ctx.request.hasValidSignature()) {
            return ctx.response.badRequest("Invalid signature");
          }

          await next();
        },
      });

      return this;
    });

    // Define a macro for the RouteMatchers class
    // This macro creates a regular expression matcher for alpha strings
    Route.RouteMatchers.macro("alphaString", function () {
      // Create a regular expression matcher for alpha strings
      return {
        match: /^[a-z]+$/i,
      };
    });
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
