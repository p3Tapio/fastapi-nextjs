/* eslint-disable import/prefer-default-export */
const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/post`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

export const handleGetUserPosts = (token: string): Promise<Response> => {
  const requestHeaders = { ...headers, Authorization: `bearer ${token}` }
  return fetch(`${baseUrl}/`, {
    method: 'GET',
    headers: requestHeaders,
  })
}
