export interface IPostBase {
  title: string
  description: string
}

export interface IPostUpdate extends IPostBase {
  id: number
}

export interface IPost extends IPostUpdate {
  owner_id: number
}

export type TPostStatus = 'LOADING' | 'READY' | 'ERROR'

export interface IPostState {
  userPosts: { [id: number]: IPost }
  status: TPostStatus
  error: { status: number; message: string } | false
}
