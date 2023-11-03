import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/user`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
  try {
    const requestJson = await request.json()
    const { path } = requestJson

    let requestBody

    if (path === 'register') {
      const { username, email, password } = requestJson
      requestBody = JSON.stringify({ username, email, password })
    } else if (path === 'signin') {
      const { email, password } = requestJson
      requestBody = JSON.stringify({ email, password })
    } else {
      throw new Error('Malformed request')
    }

    const res = await fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers,
      body: requestBody,
    })
    const resJson = await res.json()
    return NextResponse.json({ data: resJson }, { status: res.status })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
