// src/infrastructure/middleware/passport.ts
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
// import { UserRepository } from "../repositories/UserRepository";
import envVariables from "../../config/envVariables";
import { UserRepository } from "../repositories/UserRepository";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envVariables.jwtSecret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const userRepository = new UserRepository();
      const user = await userRepository.findByEmail(jwt_payload.email);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
