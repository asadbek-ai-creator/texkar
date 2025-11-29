/**
 * API Service for TechLearn AI Assistant
 * Connects to the backend API at Railway
 */

const API_BASE_URL = 'https://web-production-11f5.up.railway.app'

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
    const response = await fetch(`${API_BASE_URL}/api/analytics/overview`, {
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
 * Additional API functions can be added here
 */

// Export the base URL for use in other API functions
export { API_BASE_URL }
