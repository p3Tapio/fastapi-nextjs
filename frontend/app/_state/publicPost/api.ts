const url = 'api/post/public'
// eslint-disable-next-line import/prefer-default-export
export const handleGetPublicPosts = (): Promise<Response> => {
  return fetch(url, {
    method: 'GET',
  })
}
