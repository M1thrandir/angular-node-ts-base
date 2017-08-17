"use strict"
// http://www.khanacademy.org/api/v1/topic/root

import * as Q from "q"
import _ = require("lodash")

import { ServerSettings } from "../../config/server.config"
import { Utils } from "../../utils"
import { HttpRequest } from "../http-request"
import { ISubject, ISubjectDocument, Subject } from "./subject.model"

export class SubjectController {
  public static initial(req, res) {
    const url = "http://www.khanacademy.org/api/v1/topic"
    HttpRequest.get(`${url}/root`)
      .then(response => {
        const responseData = JSON.parse(response.data)
        const subjects = responseData.children
          .filter(subject => {
            return subject.id === "math"
                || subject.id === "science"
                || subject.id === "economics-finance-domain"
                || subject.id === "humanities"
                || subject.id === "computing"
                || subject.id === "test-prep"
          })
        console.log(subjects.map(child => child.id))

        const subjectResponses: Q.Promise<{ data: any }>[] = subjects
          .map(nextSubject => HttpRequest.get(`${url}/${nextSubject.id}`))
        Q.allSettled(subjectResponses)
          .then(responses => {
            return responses
              .map(childResponse => {
                const data = JSON.parse(childResponse.value.data)
                return SubjectController.formatData(data)
              })
              .map((data: any[]) => new Subject(data))
          })
          .then(subjectData => subjectData.map(subjectItem => subjectItem.save()))
          .then((subjectData: any[]) => {
            res.status(200).json(subjectData)
          })
          .catch(err => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err))
  }

  public static formatData(data: any) {
    if (!data) return {}
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      children: data.children ? data.children.map(child => SubjectController.formatData(child)) : []
    }
  }

  /**
   * Get list of users
   */
  public static getAll(req, res) {
    Subject.find({})
      .then(resources => res.status(200).json(resources))
      .catch(err => res.status(500).send(err))
  }

  /**
   * Creates a new Subject
   */
  public static createResource(req, res, next) {
    var newUser = new Subject(req.body)
    newUser.save()
      .then(resource => res.json(resource))
      .catch(err => SubjectController.validationError(res, err))
  }

  /**
   * Get a single Subject
   */
  public static getById(req, res, next) {
    var userId = req.params.id
    Subject.findById(userId)
      .then(resource => {
        if (!resource) return res.status(401).send("Unauthorized")
        res.json(resource)
      })
      .catch(next.bind(this))
  }

  /**
   * Deletes a Subject
   * restriction: "admin"
   */
  public static deleteResource(req, res) {
    Subject.findByIdAndRemove(req.params.id)
      .then(resource => res.status(204).send("No Content"))
      .catch(err => res.status(500).send(err))
  }

  /**
   * Change a users contact info
   */
  public static updateResource(req, res, next) {
    const resourceId = req.body._id
    Subject.findById(resourceId, (err, subject) => {
      const resource = req.body
      let updated = _.merge(resource, subject)
      updated.save(err => {
        if (err) return SubjectController.validationError(res, err)
        res.status(200).send("OK")
      })

    })
  }

  public static validationError(res, err) {
    return res.status(422).json(err)
  }
}