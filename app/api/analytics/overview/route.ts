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

        // Return data as-is to match AnalyticsOverview interface
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch analytics overview:', error)

        // Return fallback data matching AnalyticsOverview interface
        return NextResponse.json({
            conversations_today: 0,
            leads_today: 0,
            active_conversations: 0,
            conversion_rate: 0,
            avg_lead_score: 0,
            messages_today: 0,
            date: new Date().toISOString()
        })
    }
}
