import App from "@/app";
import validateEnv from "@utils/validateEnv";
import AuthRoute from "./routes/auth.route";
import IndexRoute from "./routes/index.route";
import LikesRoute from "./routes/likes.route";
import PostsRoute from "./routes/posts.route";
import UsersRoute from "./routes/users.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new PostsRoute(),
  new LikesRoute(),
  new AuthRoute(),
]);

app.listen();
