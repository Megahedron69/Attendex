// passport.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "../Models/UserModel.js";

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

export default passport;
