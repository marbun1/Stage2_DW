import Express = require("express");
import router from "./routes/cart-route";
import orderRouter from "./routes/order-route";

const app = Express();
const port = 3002;

app.use(Express.json()); 
app.use("/api/v1", router);
app.use("/api/v1", orderRouter)

app.listen(port, () => {
  console.log("server is running");
});
