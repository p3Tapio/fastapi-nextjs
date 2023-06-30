interface IUserBase {
  email: string
  username: string
}

export interface IUser extends IUserBase {
  id: number
  // group: string[]
}

export interface IUserRegister extends IUserBase {
  password: string
}

export interface IAuthDetails {
  user: IUser
  accessToken: string
}

export interface IRouteChildren {
  label: string | false
  path: string
  element: React.ReactNode
  type: 'unauthenticated' | 'authenticated' | 'public'
}
