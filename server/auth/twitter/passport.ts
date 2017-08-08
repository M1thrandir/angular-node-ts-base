import * as passport from "passport"
import { Strategy } from "passport-twitter"
import { Utils } from "../../utils"
import { UserController } from  "../../api/user/user.controller"
import { ServerSettings } from "../../config/server.config"

class TwitterPassportSetup {
  public setup(User) {
    passport.use(new Strategy({
        consumerKey: ServerSettings.twitter.clientID,
        consumerSecret: ServerSettings.twitter.clientSecret,
        callbackURL: ServerSettings.twitter.callbackURL
      },
      function (token, tokenSecret, profile, done) {
        User.findOne({
          $or: [
            {"twitter.id_str": profile.id}
          ]
        }, function (err, user) {
          if (err) {
            return done(err)
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              username: profile.username,
              role: "user",
              provider: "twitter",
              twitter: profile._json
            })
            user.save()
              .then((results) => done(null, user))
              .catch((err) => done(err))
          } else {
            user.twitter = profile._json
            user.save()
              .then((results) => done(null, user))
              .catch((err) => done(err))
          }
        })
      }
    ))
  }
}

export const TwitterPassport = new TwitterPassportSetup()
