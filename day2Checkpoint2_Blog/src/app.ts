import express, { Request, Response } from "express";
import postRoutes from "./routes/post-route"; 
import userRoutes from "./routes/user-route";

const app = express(); 

app.use(express.json()); 
app.use("/api/v1", postRoutes); 
app.use("/api/v1", userRoutes); 


app.listen(process.env.PORT || 3003, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3003}`
  );
});
