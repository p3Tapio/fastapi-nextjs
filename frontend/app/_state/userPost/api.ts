import { IPostBase, IPostUpdate } from '../../_types/post'

const url = 'api/post'
const headers = { 'content-type': 'application/json;charset=UTF-8' }

const getHeader = (token: string) => {
  return { ...headers, Authorization: `bearer ${token}` }
}

export const handleCreatePost = (token: string, post: IPostBase): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(url, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(post),
  })
}

export const handleGetUserPosts = (token: string): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  })
}

export const handleUpdatePost = (token: string, post: IPostUpdate): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(url, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(post),
  })
}

export const handleDeletePost = (token: string, id: number): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(`${url}?id=${id}`, {
    method: 'DELETE',
    headers: requestHeaders,
  })
}
