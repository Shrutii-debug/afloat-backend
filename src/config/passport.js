import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { findUserByEmail, createUser } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // Optional safety
        if (!profile.emails[0].verified) {
          return done(new Error("Email not verified"), null);
        }

        let user = await findUserByEmail(email);

        if (!user) {
          user = await createUser({
            name,
            email,
            google_id: googleId,
            password_hash: null,
            role: "student",
            department: null,
            year: null,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;