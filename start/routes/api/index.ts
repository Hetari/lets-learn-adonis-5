import Route from "@ioc:Adonis/Core/Route";
import postRoutes from "./v1/posts";

Route.group(() => {
  
  Route.group(() => {

    postRoutes();
    require("./v1/series");

  }).prefix("/v1").as("v1");

}).prefix("/api").as("api");
