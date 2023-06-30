const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/user`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

export const handleSignIn = (
  email: string,
  password: string
): Promise<Response> => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
}

export const handleRegister = (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  return fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, email, password }),
  })
}
