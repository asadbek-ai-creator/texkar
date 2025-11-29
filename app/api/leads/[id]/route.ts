import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${params.id}`, {
            cache: 'no-store',
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `API returned ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch lead detail:', error)
        return NextResponse.json(
            { error: 'Failed to fetch lead detail' },
            { status: 500 }
        )
    }
}
