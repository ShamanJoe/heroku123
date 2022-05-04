import express from "express";
import * as path from "path";
import {ArticleApi} from "./articleApi.js";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config()

const app = express();
app.use(express.static("../client/dist"));

const mongoClient = new MongoClient(process.env.MONGODB_URL)
await mongoClient.connect().then(async() =>{
    console.log("Connected to mongodb");
    app.use("/api/article", ArticleApi(mongoClient.db(process.env.MONGO_DATABASE || "PG6301eksamen")))
})




app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"))
    } else {
        next();
    }
})

app.listen(process.env.PORT || 3000);