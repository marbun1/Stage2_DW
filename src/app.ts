import express from "express";
import router from "./routes/product";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
