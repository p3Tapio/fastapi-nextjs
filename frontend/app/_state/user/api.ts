const url = 'api/user'
const headers = { 'content-type': 'application/json;charset=UTF-8' }

export const handleSignIn = (email: string, password: string): Promise<Response> => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password, path: 'signin' }),
  })
}

export const handleRegister = (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, email, password, path: 'register' }),
  })
}
