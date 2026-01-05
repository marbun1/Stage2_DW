import Express = require("express");
import router from "./routes/post-route";

const app = Express();
const port = 3002;

app.use(Express.json()); 
app.use("/api/v1", router);

app.listen(port, () => {
  console.log("server is running");
});
