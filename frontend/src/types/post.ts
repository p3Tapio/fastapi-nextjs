export interface IPostBase {
  title: string
  description: string
}

export interface IPost extends IPostBase {
  id: number
  owner_id: number
}

export type TPostStatus = 'LOADING' | 'READY' | 'ERROR'

export interface IPostState {
  userPosts: { [id: number]: IPost }
  status: TPostStatus
  error: { status: number; message: string } | false
}
