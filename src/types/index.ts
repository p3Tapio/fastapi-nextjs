export interface IUser {
  accessToken: string
  user: {
    id: number
    email: string
    username: string
    group: string[]
  }
}

export interface IRouteChildren {
  label: string | false
  path: string
  element: React.ReactNode
  type: 'unauthenticated' | 'authenticated' | 'public'
}
