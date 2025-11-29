import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json(
                { detail: 'Not authenticated' },
                { status: 401 }
            )
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
                'Authorization': authHeader,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { detail: 'Failed to get user info.' },
            { status: 500 }
        )
    }
}
