
export interface ClientUser extends User {
  _id?: string
}

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