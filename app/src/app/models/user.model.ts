export interface IProfileUser {
  name: string
  role: string
}

export interface ITokenUser {
  _id: string
  role: string
}

export interface IUserModel extends IProfileUser {
  email: string
  phone: Number
  role: string
  username: string
  hashedPassword: string
  provider: string
  salt: string
  facebook: object
  twitter: object
  google:object
}

export interface IOptionalUser {
  password?: string
  profile?: { name: string, role: string },
  token?: { _id: string, role: string },
  authenticate?: Function
}

export class User {
  public _id?: string = ""
  public email: string = ""
  public phone: number
  public role: string = ""
  public username: string = ""
  public hashedPassword: string = ""
  public provider: string = ""
  public salt: string = ""
  public facebook: object = {}
  public twitter: object = {}
  public google: object = {}
}
