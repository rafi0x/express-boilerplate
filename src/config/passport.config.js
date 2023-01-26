import fs from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pathToKey = path.join(__dirname, "../../keys", "public.key");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

export default (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PUB_KEY,
        algorithms: [ "RS256" ],
    };

    passport.use(
        new Strategy(options, function (jwt_payload, done) {
            return done(null, jwt_payload);
        })
    );

    passport.serializeUser(function (user, done) {
        process.nextTick(function () {
            done(null, user);
        });
    });

    passport.deserializeUser(function (user, done) {
        process.nextTick(function () {
            return done(null, user);
        });
    });
};
