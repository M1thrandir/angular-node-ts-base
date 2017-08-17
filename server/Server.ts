/// <reference path="typings.d.ts" />
"use strict"

// Libraries
import * as bodyParser from "body-parser"
import * as express from "express"
import * as helmet from "helmet"
import * as path from "path"
import * as cors from "cors"
import * as requestLogger from "morgan"
import * as logger from "winston"
import * as https from "https"
import * as http from "http"
import * as fs from "fs"
import * as ejs from "ejs"
import { connection } from "mongoose"
import * as compression from "compression"
import * as methodOverride from "method-override"
import * as cookieParser from "cookie-parser"
import * as passport from "passport"
import * as session from "express-session"
import * as connectMongo from "connect-mongo"
import * as favicon from "serve-favicon"

const mongoStore = connectMongo(session)

// Your own modules
import { DatabaseSettings } from "./config/database.config"
import { MongoManager } from "./MongoManager"
import { ServerSettings } from "./config/server.config"
import { UserRouter } from "./api/user"
import { SubjectRouter } from "./api/subject"
import { AuthRouter } from "./auth"
import { BaseServer } from "./BaseServer"

export class Server extends BaseServer {
  constructor() {
    super(3008)
  }

  public initRoutes(): void {
    this.app.set("view options", {layout: false})
    this.app.engine("html", ejs.renderFile)
    this.app.set("view engine", "html")
    this.app.use(express.static("../app/build"))

    this.app.use(favicon(path.join(ServerSettings.root, "app", "src", "favicon.ico")))

    this.app.use("/api/users", UserRouter)
    this.app.use("/api/subjects", SubjectRouter)
    this.app.use("/auth", AuthRouter)

    this.app.route("/:url(node_modules|assets|server|src)/*")
    .get(Server.PageNotFound404)
  }
}

exports = new Server().app
