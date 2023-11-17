import { NextResponse } from 'next/server'
import { headers as getHeadersFromRequest } from 'next/headers'
import { IPostBase } from '../../_types/post'

const apiUrl = process.env.API_URL
const baseUrl = `${apiUrl}/post/`
const baseHeader = { 'content-type': 'application/json;charset=UTF-8' }

// TODO middleware this?
const getHeader = () => {
  const requestHeaders = getHeadersFromRequest()
  const bearerToken = requestHeaders.get('authorization')
  if (bearerToken) {
    return { ...baseHeader, Authorization: bearerToken }
  }
  return undefined
}

const makeRequest = async (method: string, body?: IPostBase, query?: string) => {
  const headers = getHeader()
  if (!headers) {
    throw new Error('Malformed request')
  }
  const url = `${baseUrl}${query || ''}`
  const response = await fetch(url, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  if (!response.ok) {
    return NextResponse.json({ data: response.statusText }, { status: response.status })
  }
  const responseJson = await response.json()
  return NextResponse.json({ data: responseJson }, { status: response.status })
}

export async function POST(request: Request) {
  try {
    const requestJson = await request.json()
    return await makeRequest('POST', requestJson)
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}

export async function GET() {
  try {
    return await makeRequest('GET')
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const requestJson = await request.json()
    return await makeRequest('PUT', requestJson)
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    return await makeRequest('DELETE', undefined, `${id}`)
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
