export interface IUser {
  accessToken: string
  user: {
    id: number
    email: string
    username: string
    group: string[]
  }
}
