import { IPostBase } from '../../types/post'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/post`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

const getHeader = (token: string) => {
  return { ...headers, Authorization: `bearer ${token}` }
}

export const handleGetUserPosts = (token: string): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(`${baseUrl}/`, {
    method: 'GET',
    headers: requestHeaders,
  })
}

export const handleCreatePost = (
  token: string,
  post: IPostBase
): Promise<Response> => {
  const requestHeaders = getHeader(token)
  return fetch(`${baseUrl}/`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(post),
  })
}
