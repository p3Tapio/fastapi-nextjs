export interface IUser {
  id: number
  email: string
  username: string
  // group: string[]
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
