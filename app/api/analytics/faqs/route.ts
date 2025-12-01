import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = searchParams.get('limit') || '20'

        const response = await fetch(
            `${API_BASE_URL}/api/analytics/faqs?limit=${limit}`,
            {
                cache: 'no-store',
            }
        )
        console.log(response)

        if (!response.ok) {
            return NextResponse.json(
                { error: `API returned ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch FAQs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch FAQs' },
            { status: 500 }
        )
    }
}
