"use strict"

import * as jwt from "jsonwebtoken"
import * as Q from "q"
import * as _ from "lodash"

import { ServerSettings } from "../../config/server.config"
import { Utils } from "../../utils"
import { HttpRequest } from "../http-request"
import { IUser, User } from "./user.model"


export class UserController {
  /**
   * Get list of users
   * restriction: "admin"
   */
  public static getAll(req, res) {    
    User.find({}, "-salt -hashedPassword")
      .then(resources => res.status(200).json(resources))
      .catch(err => res.status(500).send(err))
  }

  /**
   * Creates a new user
   */
  public static createResource(req, res, next) {
    var newUser = new User(req.body)
    newUser.provider = "local"
    newUser.role = "user"
    newUser.save()
      .then(user => {
        const token = jwt.sign({_id: user._id }, ServerSettings.secrets.session, { expiresInMinutes: 60*5 })
        return res.json({ token: token })
      })
      .catch(err => UserController.validationError(res, err))
  }

  /**
   * Get a single user
   */
  public static getById(req, res, next) {
    var userId = req.params.id
    User.findById(userId)
      .then(user => {
        if (!user) return res.status(401).send("Unauthorized")
        res.json(user.profile)
      })
      .catch(next.bind(this))
  }

  /**
   * Deletes a user
   * restriction: "admin"
   */
  public static deleteResource(req, res) {
    User.findByIdAndRemove(req.params.id)
      .then(user => res.status(204).send("No Content"))
      .catch(err => res.status(500).send(err))
  }

  /**
   * Change a users password
   */
  public static changePassword(req, res, next) {
    var userId = req.user._id
    var oldPass = String(req.body.oldPassword)
    var newPass = String(req.body.newPassword)

    User.findById(userId)
      .then(user => {
        if (user.authenticate(oldPass)) {
          user.password = newPass
          user.save(err => {
            if (err) return UserController.validationError(res, err)
            res.status(200).send("OK")
          })
        } else {
          res.status(403).send("Forbidden")
        }
      })
      .catch(err => res.status(500).send(err))
  }

  /**
   * Change a users contact info
   */
  public static updateResource(req, res, next) {
    const userId = req.user._id
    User.findById(userId, (err, user) => {
      let updated = _.merge(document, user)
      updated.save(err => {
        if (err) return UserController.validationError(res, err)
        res.status(200).send("OK")
      })

    })
  }

  /**
   * Get my info
   */
  public static me(req, res, next) {
    var userId = req.user._id
    User.findOne({ _id: userId }, "-salt -hashedPassword")
      .then(user => {
        if (!user) return res.status(401).send("Unauthorized")
        return res.json(user)
      })
      .catch(next.bind(this))
  }

  /**
   * Authentication callback
   */
  public static authCallback(req, res, next) {
    res.redirect("/")
  }

  public static validationError(res, err) {
    return res.status(422).json(err)
  }
}