import "dotenv/config";
import config from "./db.config.js";
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(process.env.DB_CONNECTION_URI, config.development);