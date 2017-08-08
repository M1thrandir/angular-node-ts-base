"use strict"

import * as express from "express"
import * as passport from "passport"
import { AuthService } from "../auth.service"

export const TwitterPassportRouter = express.Router()

TwitterPassportRouter
.get("/", passport.authenticate("twitter", {
  failureRedirect: "/signup",
  session: false
}))

.get("/callback", passport.authenticate("twitter", {
  failureRedirect: "/signup",
  session: false
}), AuthService.setTokenCookie)
