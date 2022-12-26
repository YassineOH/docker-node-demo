import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import cors from "cors"

import {
    MONGO_IP,
    MONGO_PASSWORD,
    MONGO_USERNAME,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SECRET_SESSION,
} from "./config/config.js";
import postRoute from "./router/Post.js";
import userRouter from "./router/User.js";
import { protect } from "./middleware/authMiddleware.js"

const app = express();
app.use(cors())

let RedisStore = connectRedis(session);
let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

app.enable("trust proxy")
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SECRET_SESSION,
        cookie: {
            secure: false,
            maxAge: 1 * 60 * 1000,
            httpOnly: true,
            resave: false,
            saveUninitialized: false,
        },
    })
);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) =>
    res.send("<h1>Hello, node-docker this update is from VIM editor (prod)</h1>")
);

app.use("/api/v1/posts", protect, postRoute);
app.use("/api/v1/users", userRouter);

const startApp = async () => {
    try {
        const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
        mongoose.set("strictQuery", false);
        await mongoose.connect(url);
        const port = process.env.PORT || 3000;
        app.listen(port, () =>
            console.log(`The server is running on port ${port}`)
        );
    } catch (error) {
        console.log("An error has occurred:\n");
        console.error(error);
    }
};
startApp();
