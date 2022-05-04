import express from "express";
import * as path from "path";
import { ArticleApi } from "./articleApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

//USER PROFILE/LOGIN
app.get("/api/login", async (req, res) => {
  const { access_token } = req.signedCookies;

  //FOR GOOGLE LOG IN
  /*const { userinfo_endpoint } = await fetchJSON(
       "https://accounts.google.com/.well-known/openid-configuration"
    );*/
  const { userinfo_endpoint } = await fetchJSON(
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration"
  );
  const userinfo = await fetch(userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (userinfo.ok) {
    res.json(await userinfo.json());
  } else {
    console.log(`Failed to fetch ${userinfo.status} ${userinfo.statusText}`);
    res.sendStatus(500);
  }
});

app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});

//MONGODB connection
const mongoClient = new MongoClient(process.env.MONGODB_URL);
await mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use(
    "/api/article",
    ArticleApi(mongoClient.db(process.env.MONGO_DATABASE || "PG6301eksamen"))
  );
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.listen(process.env.PORT || 3000);
