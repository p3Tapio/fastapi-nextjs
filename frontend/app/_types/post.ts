export interface IPostBase {
  title: string
  description: string
}

export interface IPostCreate extends IPostBase {
  public: boolean
}

export interface IPostUpdate extends IPostBase {
  public: boolean
  id: number
}

export interface IUserPost extends IPostUpdate {
  public: boolean
  owner_id: number
}

export interface IPublicPost extends IPostBase {
  id: number
  owner_name: string
}

export type TPostStatus = 'LOADING' | 'READY' | 'ERROR'

export interface IUserPostState {
  posts: { [id: number]: IUserPost }
  status: TPostStatus
  error: { status: number; message: string } | false
}

export interface IPublicPostState {
  posts: { [id: number]: IPublicPost }
  status: TPostStatus
  error: { status: number; message: string } | false
}
