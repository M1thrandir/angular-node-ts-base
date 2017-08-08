import * as passport from "passport"
import { Strategy } from "passport-local"
import { ServerSettings } from "../../config/server.config"

class LocalPassportSetup {
  public setup(User) {
    passport.use(new Strategy({
        usernameField: "email",
        passwordField: "password" // this is the virtual field on the model
      },
      function(email, password, done) {
        User.findOne({ email: email.toLowerCase() })
          .then((user) => {

            if (!user) {
              return done(null, false, { message: "This email is not registered." })
            }
            if (!user.authenticate(password)) {
              return done(null, false, { message: "This password is not correct." })
            }
            return done(null, user)
          })
          .catch(err => done(err))
      }
    ))
  }
}

export const LocalPassport = new LocalPassportSetup()