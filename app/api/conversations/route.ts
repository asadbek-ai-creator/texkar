import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const skip = searchParams.get('skip') || '0'
        const limit = searchParams.get('limit') || '50'
        const activeOnly = searchParams.get('active_only') || 'false'

        const response = await fetch(
            `${API_BASE_URL}/api/conversations?skip=${skip}&limit=${limit}&active_only=${activeOnly}`,
            {
                cache: 'no-store',
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
        console.error('Failed to fetch conversations:', error)

        // Return empty array as fallback
        return NextResponse.json([])
    }
}
