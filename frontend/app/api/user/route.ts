import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/user`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
  try {
    const requestData = await request.json()
    let requestBody

    if (requestData.path === 'register') {
      const { username, email, password } = requestData
      requestBody = JSON.stringify({ username, email, password })
    } else if (requestData.path === 'signin') {
      const { email, password } = requestData
      requestBody = JSON.stringify({ email, password })
    } else {
      throw new Error('Malformed request')
    }

    const res = await fetch(`${baseUrl}/${requestData.path}`, {
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
