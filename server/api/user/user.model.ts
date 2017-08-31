"use strict"

import { Schema, model, Document } from "mongoose"
import { pbkdf2Sync, randomBytes } from "crypto"

import { IUserModel, ClientUser, IOptionalUser } from "../../user.model"

const authTypes = [
  "github",
  "twitter",
  "facebook",
  "google"
]

export interface IUser extends Document, IUserModel, IOptionalUser {}

let UserSchema: Schema = new Schema({
  name: String,
  email: String,
  phone: Number,
  role: {
    type: String,
    default: "user"
  },
  username: String,
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
})


function validatePresenceOf(value) {
  return !!value && value.length;
}

UserSchema
  .virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(() => {
    return this._password
  })

// Public profile information
UserSchema
  .virtual("profile")
  .get(() => {
    return {
      "name": this.name,
      "role": this.role,
    } 
  })

// Non-sensitive info we"ll be putting in the token
UserSchema
  .virtual("token")
  .get(() => {
    return {
      _id: this._id,
      role: this.role,
    }
  })

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path("email")
  .validate(email => {
      return authTypes.indexOf(this.provider) === -1 ? email.length : true
  }, "Email cannot be blank")

// Validate empty password
UserSchema
  .path("hashedPassword")
  .validate(function(hashedPassword) {
    return authTypes.indexOf(this.provider) === -1 ? hashedPassword.length : true
  }, "Password cannot be blank")

// Validate email is not taken
UserSchema
  .path("email")
  .validate(function(value, respond) {
    var self = this
    this.constructor.findOne({ email: value }, function(err, user) {
      if (err) {
        throw err
      }

      if (user) {
        return self.id === user.id ? respond(true) : respond(false)
      }
      return respond(true)
    })
  }, "The specified email address is already in use.")

/**
 * Pre-save hook
 */
UserSchema
  .pre("save", function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error("Invalid password"));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: plainText => {
    return this.encryptPassword(plainText) === this.hashedPassword
  },
  
  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: () => {
    return randomBytes(16).toString("base64")
  },
  
  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: password => {
    if (!password || !this.salt) return ""
    var salt = new Buffer(this.salt, "base64")
    return pbkdf2Sync(password, salt, 10000, 64, "base64").toString("base64")
  }
}

export const User = model<IUser>("User", UserSchema)
