import { Response, Request, NextFunction } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      done(null, payload);
    }
  )
);

export const authGuard = passport.authenticate("jwt", { session: false });
// export const authGuard = (req, res: Response, next: NextFunction) => {
//   passport.authenticate("jwt", { session: false });
//   next();
// };
