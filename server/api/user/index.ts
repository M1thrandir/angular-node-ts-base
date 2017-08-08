"use strict"
import * as https from "https"

import { Router } from "express"
import { UserController } from "./user.controller"

export const UserApi = Router()

UserApi.get("/", UserController.getAll)
UserApi.get("/:id", UserController.getById)
UserApi.put("/:id/password", UserController.changePassword)
UserApi.get("/me", UserController.me)
UserApi.post("/", UserController.createResource)
UserApi.delete("/:id", UserController.deleteResource)