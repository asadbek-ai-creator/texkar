import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Get auth headers from the incoming request
        const authHeader = request.headers.get('Authorization')
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }
        if (authHeader) {
            headers['Authorization'] = authHeader
        }

        const response = await fetch(
            `${API_BASE_URL}/api/conversations/${params.id}/messages`,
            {
                cache: 'no-store',
                headers,
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: `API returned ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch conversation messages:', error)
        return NextResponse.json(
            { error: 'Failed to fetch conversation messages' },
            { status: 500 }
        )
    }
}
