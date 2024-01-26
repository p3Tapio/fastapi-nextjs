import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/user`
const headers = { 'content-type': 'application/json;charset=UTF-8' }

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
  try {
    const requestJson = await request.json()
    const url = new URL(request.url)
    const path = url.searchParams.get('path')

    const res = await fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestJson),
      cache: 'no-store',
    })
    const resJson = await res.json()
    return NextResponse.json({ data: resJson }, { status: res.status })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
