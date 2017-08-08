"use strict"

import * as express from "express"
import * as passport from "passport"
import { AuthService } from "../auth.service"

export const LocalPassportRouter = express.Router()

LocalPassportRouter.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const error = err || info
    if (error) return res.status(401).json(error)
    if (!user) return res.status(404).json({message: "Something went wrong, please try again."})
    console.log(AuthService)
    const token = AuthService.signToken(user._id)
    res.json({token: token})
  })(req, res, next)
})