"use strict"

import { Schema, model, Document } from "mongoose"

export interface ISubject {
  name: string,
  title: string,
  description: string,
  children: object[],
}

export interface ISubjectDocument extends ISubject, Document {}

const SubjectSchema: Schema = new Schema({
  name: String,
  title: String,
  description: String,
  children: [Object],
})

export const Subject = model<ISubjectDocument>("Subject", SubjectSchema)
