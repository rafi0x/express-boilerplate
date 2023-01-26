import "dotenv/config";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import moment from "moment";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pathToKey = path.join(__dirname, "../../keys", "private.key");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

export const signJWT = (user) => {
    return jwt.sign({ ...user }, PRIV_KEY, {
        expiresIn: moment().add(1, "minutes").unix(),
        algorithm: "RS256",
    });
};

export const makeRefreshToken = (data) => {
    return jwt.sign(data, PRIV_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        algorithm: "RS256",
    });
};
