import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/?limit=100`, {
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`)
        }

        const data = await response.json()

        // Transform to match frontend expectations
        const transformed = data.map((lead: any) => ({
            id: lead.id,
            name: lead.username || `User ${lead.user_id}`,
            email: `user${lead.user_id}@example.com`, // API doesn't provide email
            phone: lead.phone_number,
            course: lead.interested_course,
            status: lead.status, // API uses same status enum
            score: lead.lead_score,
            createdAt: lead.created_at,
        }))

        return NextResponse.json(transformed)
    } catch (error) {
        console.error('Failed to fetch leads:', error)

        // Return mock data as fallback
        const leads = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '+1 (555) 123-4567',
                course: 'Web Development Bootcamp',
                status: 'new_lead',
                score: 85.5,
                createdAt: '2025-11-28T10:30:00Z',
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '+1 (555) 234-5678',
                course: 'Data Science Fundamentals',
                status: 'enrolled',
                score: 92.3,
                createdAt: '2025-11-27T14:15:00Z',
            },
            {
                id: 3,
                name: 'Michael Chen',
                email: 'mchen@example.com',
                phone: '+1 (555) 345-6789',
                course: 'Digital Marketing',
                status: 'churned',
                score: 45.8,
                createdAt: '2025-11-26T18:45:00Z',
            },
            {
                id: 4,
                name: 'Emily Rodriguez',
                email: 'emily.r@example.com',
                phone: '+1 (555) 456-7890',
                course: 'UI/UX Design',
                status: 'new_lead',
                score: 78.2,
                createdAt: '2025-11-28T11:20:00Z',
            },
            {
                id: 5,
                name: 'David Park',
                email: 'david.park@example.com',
                phone: '+1 (555) 567-8901',
                course: 'Mobile App Development',
                status: 'enrolled',
                score: 88.7,
                createdAt: '2025-11-27T15:50:00Z',
            },
            {
                id: 6,
                name: 'Lisa Anderson',
                email: 'lisa.a@example.com',
                phone: '+1 (555) 678-9012',
                course: 'Cybersecurity Basics',
                status: 'new_lead',
                score: 65.4,
                createdAt: '2025-11-26T09:30:00Z',
            },
            {
                id: 7,
                name: 'James Wilson',
                email: 'jwilson@example.com',
                phone: '+1 (555) 789-0123',
                course: 'Cloud Computing',
                status: 'enrolled',
                score: 94.1,
                createdAt: '2025-11-25T16:00:00Z',
            },
            {
                id: 8,
                name: 'Maria Garcia',
                email: 'maria.g@example.com',
                phone: '+1 (555) 890-1234',
                course: 'Python Programming',
                status: 'churned',
                score: 52.3,
                createdAt: '2025-11-24T13:45:00Z',
            },
        ]

        return NextResponse.json(leads)
    }
}
