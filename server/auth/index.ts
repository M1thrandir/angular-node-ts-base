"use strict"

import { Router } from "express"
import * as passport from "passport"
import { ServerSettings } from "../config/server.config"
import { User } from "../api/user/user.model"

import { LocalPassport } from "./local/passport"
import { FacebookPassport } from "./facebook/passport"
import { GooglePassport } from "./google/passport"
import { TwitterPassport } from "./twitter/passport"

import { LocalPassportRouter } from "./local"
import { FacebookPassportRouter } from "./facebook"
import { TwitterPassportRouter } from "./twitter"
import { GooglePassportRouter } from "./google"

LocalPassport.setup(User)
FacebookPassport.setup(User)
GooglePassport.setup(User)
TwitterPassport.setup(User)

export const AuthRouter = Router()

AuthRouter.use("/local", LocalPassportRouter)
AuthRouter.use("/facebook", FacebookPassportRouter)
AuthRouter.use("/twitter", TwitterPassportRouter)
AuthRouter.use("/google", GooglePassportRouter)
