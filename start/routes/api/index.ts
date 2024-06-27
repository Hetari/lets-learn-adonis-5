import Route from "@ioc:Adonis/Core/Route";
import postRoutes from "./v1/posts";

Route.group(() => {
  
  Route.group(() => {

    postRoutes();
    require("./v2/series");

  }).prefix("/v2").as("v2");

}).prefix("/api").as("api");
