import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/courses?period_type=daily&days_back=30`, {
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`)
        }

        const data = await response.json()

        // Aggregate course data by course name
        const courseMap: Record<string, { mentions: number, leads: number }> = {}

        data.forEach((item: any) => {
            if (!courseMap[item.course_name]) {
                courseMap[item.course_name] = { mentions: 0, leads: 0 }
            }
            courseMap[item.course_name].mentions += item.mentions_count
            courseMap[item.course_name].leads += item.leads_count
        })

        // Calculate totals
        const totalLeads = Object.values(courseMap).reduce((sum, course) => sum + course.leads, 0)

        // Transform to pie chart format
        const courses = Object.entries(courseMap).map(([name, stats]) => {
            const value = stats.leads
            const percentage = totalLeads > 0 ? Math.round((value / totalLeads) * 100) : 0

            return {
                name,
                value,
                percentage,
            }
        })

        // Sort by value descending
        courses.sort((a, b) => b.value - a.value)

        // Take top 5 courses
        const topCourses = courses.slice(0, 5)

        return NextResponse.json(topCourses)
    } catch (error) {
        console.error('Failed to fetch courses data:', error)

        // Return mock data as fallback
        const courses = [
            {
                name: 'Python Programming',
                value: 145,
                percentage: 45,
            },
            {
                name: 'Web Development',
                value: 97,
                percentage: 30,
            },
            {
                name: 'Data Science',
                value: 48,
                percentage: 15,
            },
            {
                name: 'Mobile Development',
                value: 32,
                percentage: 10,
            },
        ]

        return NextResponse.json(courses)
    }
}
