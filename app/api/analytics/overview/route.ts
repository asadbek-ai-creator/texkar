import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/overview`, {
            cache: 'no-store', // Always fetch fresh data
        })

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`)
        }

        const data = await response.json()

        // Transform to match frontend expectations
        return NextResponse.json({
            conversationsToday: data.conversations_today,
            conversationsTodayGrowth: 12.5, // Backend doesn't provide growth yet
            leadsToday: data.leads_today,
            leadsTodayGrowth: -3.2, // Backend doesn't provide growth yet
        })
    } catch (error) {
        console.error('Failed to fetch analytics overview:', error)

        // Return mock data as fallback
        return NextResponse.json({
            conversationsToday: 127,
            conversationsTodayGrowth: 12.5,
            leadsToday: 34,
            leadsTodayGrowth: -3.2,
        })
    }
}
