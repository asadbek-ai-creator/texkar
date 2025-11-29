# API Service Documentation

## Overview

This directory contains the API service layer for connecting to the TechLearn AI backend.

## Usage

### Importing the API Service

```typescript
import { getAnalyticsOverview, AnalyticsOverview } from '@/lib/api'
```

### Getting Analytics Overview

```typescript
// Basic usage
const data = await getAnalyticsOverview()
console.log(data.conversations_today) // 45
console.log(data.conversion_rate)     // 26.67

// With error handling
try {
  const overview = await getAnalyticsOverview()
  // Use the data
  setAnalyticsData(overview)
} catch (error) {
  console.error('Failed to fetch analytics:', error)
  // Handle error (show message to user, etc.)
}

// In a React component
useEffect(() => {
  async function loadData() {
    const data = await getAnalyticsOverview()
    setState(data)
  }
  loadData()
}, [])
```

## API Reference

### `getAnalyticsOverview()`

Fetches today's analytics overview from the backend.

**Returns:** `Promise<AnalyticsOverview>`

**Throws:** `Error` if the request fails

**Cache:** `no-store` (always fetches fresh data)

### `AnalyticsOverview` Interface

```typescript
interface AnalyticsOverview {
  conversations_today: number    // Total conversations started today
  leads_today: number           // New leads generated today
  active_conversations: number  // Currently ongoing conversations
  conversion_rate: number       // Percentage (0-100)
  avg_lead_score: number        // Average score (0-100)
  messages_today: number        // Total messages exchanged
  date: string                  // ISO date string
}
```

### `API_BASE_URL`

The base URL for all API requests.

**Value:** `'https://web-production-11f5.up.railway.app'`

**Usage:**
```typescript
import { API_BASE_URL } from '@/lib/api'

const customEndpoint = `${API_BASE_URL}/api/custom-endpoint`
```

## Examples

### Display All Metrics

```typescript
const overview = await getAnalyticsOverview()

console.log(`
  📊 Today's Analytics (${overview.date})

  💬 Conversations: ${overview.conversations_today}
  👥 Leads: ${overview.leads_today}
  🟢 Active: ${overview.active_conversations}
  📈 Conversion: ${overview.conversion_rate}%
  ⭐ Avg Score: ${overview.avg_lead_score}
  ✉️ Messages: ${overview.messages_today}
`)
```

### Auto-Refresh Pattern

```typescript
useEffect(() => {
  async function fetchData() {
    try {
      const data = await getAnalyticsOverview()
      setAnalytics(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Initial fetch
  fetchData()

  // Auto-refresh every 30 seconds
  const interval = setInterval(fetchData, 30000)

  // Cleanup
  return () => clearInterval(interval)
}, [])
```

### With Loading State

```typescript
const [data, setData] = useState<AnalyticsOverview | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  async function load() {
    try {
      setLoading(true)
      setError(null)
      const overview = await getAnalyticsOverview()
      setData(overview)
    } catch (err) {
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }
  load()
}, [])

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage text={error} />
if (!data) return null

return <Dashboard data={data} />
```

## Adding New API Functions

To add a new API function:

1. **Define the interface:**
```typescript
export interface LeadData {
  id: number
  name: string
  status: string
}
```

2. **Create the function:**
```typescript
export async function getLeads(): Promise<LeadData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
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
    console.error('Error fetching leads:', error)
    throw error
  }
}
```

3. **Use it in your component:**
```typescript
import { getLeads, LeadData } from '@/lib/api'

const leads = await getLeads()
```

## Best Practices

### ✅ DO

- Always handle errors with try/catch
- Use TypeScript interfaces for type safety
- Use `cache: 'no-store'` for real-time data
- Show loading states while fetching
- Display user-friendly error messages

### ❌ DON'T

- Don't forget to handle loading states
- Don't ignore errors silently
- Don't cache data that needs to be real-time
- Don't expose sensitive data in the frontend
- Don't make unnecessary API calls

## Error Handling Best Practices

```typescript
async function safeFetch() {
  try {
    const data = await getAnalyticsOverview()
    return { success: true, data }
  } catch (error) {
    // Log for debugging
    console.error('API Error:', error)

    // Return user-friendly error
    return {
      success: false,
      error: 'Unable to load analytics. Please try again later.'
    }
  }
}

// Usage
const result = await safeFetch()

if (result.success) {
  // Use result.data
} else {
  // Show result.error to user
}
```

## Performance Tips

1. **Debounce rapid requests:**
```typescript
const debouncedFetch = debounce(getAnalyticsOverview, 1000)
```

2. **Use SWR or React Query for caching:**
```typescript
import useSWR from 'swr'

const { data, error } = useSWR('/analytics', getAnalyticsOverview, {
  refreshInterval: 30000
})
```

3. **Batch requests when possible:**
```typescript
const [overview, messages, courses] = await Promise.all([
  getAnalyticsOverview(),
  getMessages(),
  getCourses()
])
```

## Testing

### Unit Test Example

```typescript
import { getAnalyticsOverview } from './api'

describe('API Service', () => {
  it('fetches analytics overview', async () => {
    const data = await getAnalyticsOverview()

    expect(data).toHaveProperty('conversations_today')
    expect(data).toHaveProperty('leads_today')
    expect(typeof data.conversion_rate).toBe('number')
  })

  it('handles errors gracefully', async () => {
    // Mock fetch to fail
    global.fetch = jest.fn(() => Promise.reject('API is down'))

    await expect(getAnalyticsOverview()).rejects.toThrow()
  })
})
```

## Troubleshooting

### Problem: CORS errors

**Solution:** Make sure the backend has CORS enabled:
```python
# FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problem: Stale data

**Solution:** Use `cache: 'no-store'` (already implemented)

### Problem: Slow requests

**Solution:**
- Check network tab in DevTools
- Verify backend performance
- Consider adding a loading timeout

---

**Need Help?** Check the main [BACKEND-INTEGRATION.md](../BACKEND-INTEGRATION.md) document.
