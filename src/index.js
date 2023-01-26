/* eslint-disable no-unused-expressions */
import "dotenv/config";
import express from "express";
import passport from "passport";

import configurePassport from "./config/passport.config.js";

import { errlogger } from "./middlewares/logger/logger.js";

export default (api) => {
    const app = express();
    configurePassport(passport)
    app.use(passport.initialize());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", api);
    app.use(errlogger);
    return app;
};
