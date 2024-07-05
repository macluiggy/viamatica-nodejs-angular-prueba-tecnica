// src/infrastructure/middleware/passport.ts
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
// import { UserRepository } from "../repositories/UserRepository";
import envVariables from "../../config/envVariables";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envVariables.jwtSecret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // const userRepository = new UserRepository();
      // const user = await userRepository.getUserById(jwt_payload.id);
      // if (user) {
      //   return done(null, user);
      // } else {
      //   return done(null, false);
      // }
      // throw new Error("Not implemented");
      return done(null, jwt_payload);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
