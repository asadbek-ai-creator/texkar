import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET() {
    try {
        // Fetch leads directly
        const leadsResponse = await fetch(
            `${API_BASE_URL}/api/leads/?limit=10`,
            { cache: 'no-store' }
        )

        if (!leadsResponse.ok) {
            return NextResponse.json({
                error: 'Leads API failed',
                status: leadsResponse.status
            })
        }

        const leadsData = await leadsResponse.json()

        // Aggregate
        const leadCounts: Record<string, number> = {}

        if (Array.isArray(leadsData)) {
            leadsData.forEach((lead: any) => {
                const course = lead.interested_course
                if (course) {
                    leadCounts[course] = (leadCounts[course] || 0) + 1
                }
            })
        }

        return NextResponse.json({
            totalLeads: leadsData.length,
            leadCounts,
            sampleLeads: leadsData.slice(0, 3).map((l: any) => ({
                username: l.username,
                course: l.interested_course,
                status: l.status
            }))
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
