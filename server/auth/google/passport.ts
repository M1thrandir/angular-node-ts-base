import * as passport from "passport"
import { OAuth2Strategy } from "passport-google-oauth"
import { Utils } from "../../utils"
import { UserController } from  "../../api/user/user.controller"
import { ServerSettings } from "../../config/server.config"

class GooglePassportSetup {
  public setup(User) {
    passport.use(new OAuth2Strategy({
        clientID: ServerSettings.google.clientID,
        clientSecret: ServerSettings.google.clientSecret,
        callbackURL: ServerSettings.google.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
          $or: [
            { "email": profile.emails[0].value },
            { "google.id": profile.id }
          ]
        }, function(err, user) {
          if (!user) {
            console.log(profile)
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "user",
              username: profile.emails[0].value.split("@")[0],
              provider: "google",
              google: profile._json,
            })
            console.log(user)
            user.save()
              .then(results => done(null, user))
              .catch(err => done(err))
          } else {
            user.google = profile._json
            console.log(user)
            user.save()
              .then((results) => done(null, user))
              .catch((err) => done(err))
          }
        })
      }
    ))
  }
}

export const GooglePassport = new GooglePassportSetup()