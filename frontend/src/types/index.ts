interface Token {
  access_token: string
  token_type: string
}
export interface IAuthDetails {
  id: number
  email: string
  username: string
  token: Token
  // group: string[]
}

export interface IRouteChildren {
  label: string | false
  path: string
  element: React.ReactNode
  type: 'unauthenticated' | 'authenticated' | 'public'
}
