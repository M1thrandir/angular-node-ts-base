"use strict"

import * as express from "express"
import * as passport from "passport"
import { AuthService } from "../auth.service"
import { ServerSettings } from "../../config/server.config"

export const FacebookPassportRouter = express.Router()

FacebookPassportRouter
.get("/", passport.authenticate("facebook", {
  scope: ["email", "user_about_me"],
  failureRedirect: ServerSettings.appUrl + "#/login?loginMessage=Unable to login with facebook&intendedLogout=false",
  session: false
}))
.get("/callback", passport.authenticate("facebook", {
  failureRedirect: ServerSettings.appUrl + "#/login?loginMessage=Unable to login with facebook&intendedLogout=false",
  session: false
}), AuthService.setTokenCookie)
