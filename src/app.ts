    import express from "express";
    import productrouter from "./routes/product";
    import transferpointRouter from "./routes/transferPoint-route";

    const app = express();

    app.use(express.json());

    app.use("/api/v1", transferpointRouter);
    app.use("/api/v1", productrouter);

    //global error middleware
    app.use((err:any, req:any, res:any, next:any)=>{
        console.log(err);

        res.status(err.statusCode || 500).json({error:err.message || "internal server error" });
    });

    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
