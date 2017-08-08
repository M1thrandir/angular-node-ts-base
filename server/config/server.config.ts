"use strict"

import * as path from "path"

export class ServerSettings {
  public static httpsPort = 3008
  public static httpPort = ServerSettings.httpsPort
  public static appPort = 4200

  public static domain = "http://localhost"
  public static ip = "127.0.0.1"
  public static appUrl: string = `${ServerSettings.domain}:${ServerSettings.appPort}`
  public static root = path.normalize(`${__dirname}/../..`)
  public static tokenAgeInMinutes = 60*5

  public static seedDB: boolean = false
  public static usePassport: boolean = false

  public static secrets = {
    session: "base-secret"
  }

  public static facebook = {
    clientID:     "470257669848563",
    clientSecret: "a4278103b2da0dcd5c0c39dddc63b0d9",
    callbackURL:  `${ServerSettings.domain}:${ServerSettings.httpsPort}/auth/facebook/callback`
  }
  
  public static twitter = {
    clientID:     "36LwYpi132fVTnyVnTCIEWMg1",
    clientSecret: "4w5KrYPx6UQyN08Jf6sJWVNGZbDlxqo367QSsSbFnkYWuIbmBy",
    callbackURL:  `${ServerSettings.domain}:${ServerSettings.httpsPort}/auth/twitter/callback`,
  }

  public static google = {
    clientID:     "241716334068-263eb40evdrd3la4h8ap89nr618tar7n.apps.googleusercontent.com",
    clientSecret: "uc2VOBlb8Kyw3x2S_plqpYcw",
    callbackURL:  `${ServerSettings.domain}:${ServerSettings.httpsPort}/auth/google/callback`
  }
}
