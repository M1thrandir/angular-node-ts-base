import * as passport from "passport"
import { Strategy } from "passport-facebook"
import { Utils } from "../../utils"
import { UserController } from  "../../api/user/user.controller"
import { ServerSettings } from "../../config/server.config"

class FacebookPassportSetup {
  public setup(User): void {
    passport.use(new Strategy({
        clientID: ServerSettings.facebook.clientID,
        clientSecret: ServerSettings.facebook.clientSecret,
        callbackURL: ServerSettings.facebook.callbackURL,
        profileFields: ["id", "email", "first_name", "displayName", "gender", "last_name"]
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
            "facebook.id": profile.id
          },
          function(err, user) {
            if (err) {
              return done(err)
            }
            if (!user) {
              user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                role: "user",
                username: profile.username,
                provider: "facebook",
                facebook: profile._json
              })
              user.save()
                .then(results => {
                  console.log(results)
                  done(null, user)
                })
                .catch(err => {
                  done(err)
                })
            } else {
              user.facebook = profile._json
              user.save()
                .then(results => {
                  console.log(results)
                  done(null, user)
                })
                .catch(err => {
                  if (err) return done(err)
                  done(err, user)
                })
            }
          })
      }
    ))
  }
}

export const FacebookPassport = new FacebookPassportSetup()