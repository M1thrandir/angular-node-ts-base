import { Model, Document } from "mongoose"
import * as Q from "q"
import * as _ from "lodash"

export class DbController {
  public static getAll<T extends Document>(Collection: Model<T>, ignore: string[]): Q.Promise<T[]> {
    const ignoreProperties = `-${ignore.join(" -")}`
    return Q.Promise<T[]>((resolve, reject) => {
      Collection.find({}, ignoreProperties, (err, documents: T[]) => {
        if (err) return reject(err)
        return resolve(documents)
      })
    })
  }

  public static getById<T extends Document>(Collection: Model<T>, id: string): Q.Promise<T> {
    return Q.Promise<T>((resolve, reject) => {
      Collection.findById(id, (err, document: T) => {
        if (err) return reject(err)
        return resolve(document)
      })
    })
  }

  public static getBy<T extends Document>(Collection: Model<T>, params: T): Q.Promise<T[]> {
    return Q.Promise<T[]>((resolve, reject) => {
      Collection.find(params, (err, documents: T[]) => {
        if (err) return reject(err)
        return resolve(documents)
      })
    })
  }

  // Creates a new state in the DB.
  public static create<T extends Document>(Collection: Model<T>, newItem: T): Q.Promise<T> {
    return Q.Promise<T>((resolve, reject) => {
      Collection.create(newItem, (err, document: T) => {
        if (err) return reject(err)
        return resolve(document)
      })
    })
  }

  // Updates an existing state in the DB.
  public static update<T extends Document>(Collection: Model<T>, activityUser: T): Q.Promise<T> {
    return Q.Promise<T>((resolve, reject) => {
      Collection.findById(activityUser._id, (err, document: T) => {
        if (err) {
          return reject(err)
        }
        if (!document) {
          return reject("Not Found")
        }
        let updated = _.merge(document, activityUser)
        updated.save(err => {
          if (err) return reject(err)
          return resolve(updated)
        })
      })
    })
  }

  // // Deletes a state from the DB.
  public static destroy<T extends Document>(Collection: Model<T>, id: string): Q.Promise<String> {
    return Q.Promise<String>((resolve, reject) => {
      Collection.find({_id: id}).remove(err => {
        if (err) {
          return reject(err)
        }
        return resolve("Deleted")
      })
    })
  }

  public static handleError(res, err) {
    console.error(err)
    return res.status(500).send({ error: err })
  }
}