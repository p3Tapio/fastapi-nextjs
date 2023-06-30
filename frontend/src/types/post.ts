export interface IPost {
  id: number
  title: string
  description: string
  owner_id: number
}

export type TPostStatus = 'LOADING' | 'READY' | 'ERROR'

export interface IPostState {
  userPosts: { [title: string]: IPost }
  postStatus: TPostStatus
}
