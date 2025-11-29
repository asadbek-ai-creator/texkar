/**
 * API Service for TechLearn AI Assistant
 * Connects to the backend API at Railway
 */

// Use local Next.js API routes to avoid CORS issues
const API_BASE_URL = ''

/**
 * Analytics Overview Response Interface
 */
export interface AnalyticsOverview {
  conversations_today: number
  leads_today: number
  active_conversations: number
  conversion_rate: number
  avg_lead_score: number
  messages_today: number
  date: string
}

/**
 * Fetch analytics overview from backend
 * @returns Promise<AnalyticsOverview>
 */
export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  try {
    const response = await fetch(`/api/analytics/overview`, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.log(response)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: AnalyticsOverview = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching analytics overview:', error)
    throw error
  }
}

/**
 * Lead Detail Response Interface
 */
export interface LeadDetail {
  id: number
  user_id: number
  username: string
  telegram_id: string
  phone_number: string
  interested_course: string
  status: string
  lead_score: number
  created_at: string
  contacted_at: string | null
  enrolled_at: string | null
  conversation_id: number | null
}

/**
 * Conversation Message Interface
 */
export interface ConversationMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  agent_name: string | null
  created_at: string
}

/**
 * Conversation Detail Response Interface
 */
export interface ConversationDetail {
  id: number
  session_id: string
  user_id: number
  username: string
  current_stage: string
  current_agent: string
  interested_course: string
  message_count: number
  lead_score: number
  is_active: boolean
  started_at: string
  last_message_at: string
  messages: ConversationMessage[]
}

/**
 * FAQ Response Interface
 */
export interface FAQ {
  question: string
  category: string
  count: number
  last_asked: string
  common_course: string
}

/**
 * Course Interest Response Interface
 */
export interface CourseInterest {
  course_name: string
  period_start: string
  mentions_count: number
  questions_count: number
  leads_count: number
  enrollments_count: number
  avg_lead_score: number
  conversion_rate: number
}

/**
 * Analytics Counts Response Interface
 */
export interface AnalyticsCounts {
  total_courses: number
  total_faqs: number
  total_leads: number
  total_conversations: number
  total_enrolled: number
}

/**
 * Get lead details by ID
 */
export async function getLeadDetail(leadId: number): Promise<LeadDetail> {
  try {
    const response = await fetch(`/api/leads/${leadId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching lead detail:', error)
    throw error
  }
}

/**
 * Get conversation details by conversation ID
 */
export async function getConversationDetail(conversationId: number): Promise<ConversationDetail> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching conversation detail:', error)
    throw error
  }
}

/**
 * Get auth headers with token from localStorage
 */
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available (client-side only)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

/**
 * Get conversation messages by conversation ID
 */
export async function getConversationMessages(conversationId: number): Promise<ConversationMessage[]> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching conversation messages:', error)
    throw error
  }
}

/**
 * Get user's conversations by user ID
 */
export async function getUserConversations(userId: number): Promise<any[]> {
  try {
    const response = await fetch(`/api/users/${userId}/conversations`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user conversations:', error)
    return []
  }
}

/**
 * Get frequently asked questions
 */
export async function getFAQs(limit: number = 20): Promise<FAQ[]> {
  try {
    const response = await fetch(`/api/analytics/faqs?limit=${limit}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    throw error
  }
}

/**
 * Get course interest trends
 */
export async function getCourseInterest(periodType: 'daily' | 'weekly' | 'monthly' = 'daily', daysBack: number = 30): Promise<CourseInterest[]> {
  try {
    const response = await fetch(
      `/api/analytics/courses/raw?period_type=${periodType}&days_back=${daysBack}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching course interest:', error)
    throw error
  }
}

/**
 * Get analytics counts
 */
export async function getAnalyticsCounts(): Promise<AnalyticsCounts> {
  try {
    const response = await fetch('/api/analytics/counts', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching analytics counts:', error)
    throw error
  }
}

/**
 * List conversations
 */
export async function getConversations(skip: number = 0, limit: number = 50, activeOnly: boolean = false) {
  try {
    const response = await fetch(
      `/api/conversations?skip=${skip}&limit=${limit}&active_only=${activeOnly}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching conversations:', error)
    throw error
  }
}

// Export the backend URL for direct server-side usage
export const BACKEND_URL = 'https://web-production-11f5.up.railway.app'
