import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        // Get auth headers from the incoming request
        const authHeader = request.headers.get('Authorization')
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }
        if (authHeader) {
            headers['Authorization'] = authHeader
        }

        // Backend doesn't have a user conversations endpoint
        // Return empty array - we'll get conversation_id from lead data instead
        return NextResponse.json([])
    } catch (error) {
        console.error('Failed to fetch user conversations:', error)
        return NextResponse.json([])
    }
}
