import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const periodType = searchParams.get('period_type') || 'daily'
        const daysBack = searchParams.get('days_back') || '30'

        const response = await fetch(
            `${API_BASE_URL}/api/analytics/courses?period_type=${periodType}&days_back=${daysBack}`,
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
        console.error('Failed to fetch course interest:', error)
        return NextResponse.json(
            { error: 'Failed to fetch course interest' },
            { status: 500 }
        )
    }
}
