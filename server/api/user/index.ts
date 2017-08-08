"use strict"
import * as https from "https"

import { Router } from "express"
import { UserController } from "./user.controller"

export const UserRouter = Router()

UserRouter.get("/", UserController.getAll)
UserRouter.get("/:id", UserController.getById)
UserRouter.put("/:id/password", UserController.changePassword)
UserRouter.get("/me", UserController.me)
UserRouter.post("/", UserController.createResource)
UserRouter.delete("/:id", UserController.deleteResource)