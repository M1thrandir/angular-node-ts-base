"use strict"
import * as https from "https"

import { Router } from "express"
import { SubjectController } from "./subject.controller"

export const SubjectRouter = Router()

SubjectRouter.get("/", SubjectController.getAll)
SubjectRouter.get("/:id", SubjectController.getById)
SubjectRouter.put("/:id", SubjectController.updateResource)
SubjectRouter.post("/", SubjectController.createResource)
SubjectRouter.delete("/:id", SubjectController.deleteResource)
SubjectRouter.get("/initiate/resources", SubjectController.initial)
