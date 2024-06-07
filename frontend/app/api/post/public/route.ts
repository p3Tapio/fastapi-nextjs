import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/post/public`

const makeRequest = async (method: string, query?: string) => {
  const url = `${baseUrl}${query || ''}`
  const response = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json;charset=UTF-8' },
    cache: 'no-store',
  })
  if (response.ok) {
    const responseJson = await response.json()
    return NextResponse.json({ data: responseJson }, { status: response.status })
  }
  return NextResponse.json({ data: response.statusText }, { status: response.status })
}

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    return await makeRequest('GET')
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
