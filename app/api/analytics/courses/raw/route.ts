import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const periodType = searchParams.get('period_type') || 'daily'
        const daysBack = searchParams.get('days_back') || '30'

        // Fetch real leads data (PRIMARY and ONLY source for lead counts)
        const leadsResponse = await fetch(
            `${API_BASE_URL}/api/leads/?limit=100`,
            { cache: 'no-store' }
        )

        if (!leadsResponse.ok) {
            throw new Error(`Leads API returned ${leadsResponse.status}`)
        }

        const leadsData = await leadsResponse.json()

        // Aggregate leads by course (this is the source of truth)
        const leadCounts: Record<string, number> = {}
        const enrolledCounts: Record<string, number> = {}

        if (Array.isArray(leadsData)) {
            leadsData.forEach((lead: any) => {
                const course = lead.interested_course
                if (course) {
                    leadCounts[course] = (leadCounts[course] || 0) + 1

                    if (lead.status === 'enrolled' || lead.status === 'completed') {
                        enrolledCounts[course] = (enrolledCounts[course] || 0) + 1
                    }
                }
            })
        }

        // Create result data using ONLY leads data
        const today = new Date()
        const periodStart = new Date(today)
        periodStart.setDate(today.getDate() - parseInt(daysBack))

        const result = Object.keys(leadCounts).map(courseName => ({
            course_name: courseName,
            period_start: periodStart.toISOString(),
            mentions_count: 0,  // Not available from leads data
            questions_count: 0,  // Not available from leads data
            leads_count: leadCounts[courseName],
            enrollments_count: enrolledCounts[courseName] || 0,
            avg_lead_score: 0,
            conversion_rate: enrolledCounts[courseName]
                ? (enrolledCounts[courseName] / leadCounts[courseName]) * 100
                : 0
        }))

        // Sort by leads count descending
        result.sort((a, b) => b.leads_count - a.leads_count)

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('❌ Failed to fetch course interest:', error)
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        })
        return NextResponse.json(
            {
                error: 'Failed to fetch course interest',
                details: error.message
            },
            { status: 500 }
        )
    }
}
