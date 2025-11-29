# TechLearn AI Assistant - Frontend API Integration

This package provides a complete JavaScript API service for connecting your frontend to the TechLearn AI Assistant backend.

## 📁 Files Included

1. **api.js** - Complete API service class with all endpoints
2. **api-usage-examples.js** - Comprehensive usage examples
3. **index.html** - Working demo dashboard (matches your screenshot)

## 🚀 Quick Start

### Option 1: Use the Demo HTML File

Simply open `index.html` in a web browser or serve it with a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (http-server)
npx http-server

# Then open: http://localhost:8080
```

### Option 2: Import into Your Project

```javascript
import APIService from './api.js';

// Get analytics overview
const overview = await APIService.getOverview();
console.log(overview);

// Get all leads
const leads = await APIService.getLeads();
console.log(leads);

// Update lead status
await APIService.updateLeadStatus(45, 'contacted');
```

## 📊 Available API Methods

### Analytics Endpoints

```javascript
// Get dashboard overview
const overview = await APIService.getOverview();
// Returns: { conversations_today, leads_today, conversion_rate, ... }

// Get FAQs
const faqs = await APIService.getFAQs(20);
// Returns: [{ question, category, count, ... }]

// Get message analytics
const messages = await APIService.getMessages('daily', 7);
// Returns: [{ period_start, total_messages, ... }]

// Get course trends
const courses = await APIService.getCourses('daily', 30);
// Returns: [{ course_name, mentions_count, leads_count, ... }]

// Get lead analytics
const leadAnalytics = await APIService.getLeadAnalytics(7);
// Returns: { conversion_funnel, agent_distribution }

// Get agent performance
const agents = await APIService.getAgentPerformance(24);
// Returns: { agent_distribution: {...} }
```

### Conversations Endpoints

```javascript
// List conversations with pagination
const conversations = await APIService.getConversations(0, 50, false);
// skip=0, limit=50, activeOnly=false

// Get conversation details
const conversation = await APIService.getConversationDetail(123);
// Returns full conversation with messages

// Get conversation messages
const messages = await APIService.getConversationMessages(123, 100);
// Returns: [{ id, role, content, agent_name, created_at }]

// Enable human takeover
await APIService.enableHumanTakeover(123);

// Disable human takeover
await APIService.disableHumanTakeover(123);
```

### Leads Endpoints

```javascript
// Get all leads
const allLeads = await APIService.getLeads();

// Get leads by status
const newLeads = await APIService.getLeads('new_lead');
const enrolled = await APIService.getLeads('enrolled');
const churned = await APIService.getLeads('churned');

// Get lead details
const lead = await APIService.getLeadDetail(45);

// Update lead status
await APIService.updateLeadStatus(45, 'contacted');
// Status options: 'new_lead', 'contacted', 'enrolled', 'completed', 'churned', 'returning'

// Get high-quality leads (hot leads)
const hotLeads = await APIService.getHighQualityLeads(80, 20);
// minScore=80, limit=20
```

## 🎯 Common Use Cases

### 1. Display Leads Table (Like Your Screenshot)

```javascript
// Load leads and display in a table
async function displayLeadsTable() {
  const leads = await APIService.getLeads(null, 0, 100);

  leads.forEach(lead => {
    // Create table row with:
    // - lead.username
    // - lead.telegram_id or lead.email
    // - lead.phone_number
    // - lead.interested_course
    // - lead.status
    // - lead.lead_score
  });
}
```

### 2. Update Lead Status

```javascript
// When user clicks "Mark as Contacted"
async function markAsContacted(leadId) {
  try {
    await APIService.updateLeadStatus(leadId, 'contacted');
    alert('Lead marked as contacted!');
    // Reload the leads table
    displayLeadsTable();
  } catch (error) {
    alert('Failed to update lead status');
  }
}
```

### 3. Show Lead Counts (Top Cards)

```javascript
async function loadLeadCounts() {
  const [newLeads, enrolled, churned] = await Promise.all([
    APIService.getLeads('new_lead'),
    APIService.getLeads('enrolled'),
    APIService.getLeads('churned')
  ]);

  document.getElementById('new-leads-count').textContent = newLeads.length;
  document.getElementById('enrolled-count').textContent = enrolled.length;
  document.getElementById('churned-count').textContent = churned.length;
}
```

### 4. Real-time Dashboard Updates

```javascript
// Auto-refresh every 30 seconds
setInterval(async () => {
  const overview = await APIService.getOverview();
  updateDashboard(overview);
}, 30000);
```

## 🔧 Configuration

The API base URL is set in `api.js`:

```javascript
static BASE_URL = 'https://web-production-11f5.up.railway.app';
```

To change it (for local development):

```javascript
// In api.js, line 7:
static BASE_URL = 'http://localhost:8000';  // For local development
```

Or override it dynamically:

```javascript
APIService.BASE_URL = 'http://localhost:8000';
```

## 📱 Lead Status Values

Your backend uses these status values:

- `new_lead` - Fresh lead, not contacted
- `contacted` - Manager has contacted the lead
- `enrolled` - Lead enrolled in a course
- `completed` - Completed the course
- `churned` - Lost interest
- `returning` - Returning customer

## 🎨 Styling Classes (for your UI)

The demo HTML includes these CSS classes:

```css
.status-badge          /* Base status badge */
.status-new_lead       /* Blue badge */
.status-contacted      /* Yellow badge */
.status-enrolled       /* Green badge */
.status-churned        /* Gray badge */

.score-high            /* Red (80+) */
.score-medium          /* Orange (60-79) */
.score-low             /* Gray (<60) */
```

## 🔄 Error Handling

All API methods include error handling:

```javascript
try {
  const leads = await APIService.getLeads();
  // Success - use the data
  console.log(leads);
} catch (error) {
  // Error occurred
  console.error('Failed to load leads:', error);
  alert('Unable to load leads. Please try again.');
}
```

## 📊 Complete Dashboard Example

See `index.html` for a complete working example that includes:

- ✅ Lead statistics cards (New Leads, Enrolled, Churned)
- ✅ Filterable leads table
- ✅ View lead details modal
- ✅ Update lead status buttons
- ✅ Real-time auto-refresh
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

## 🌐 CORS Note

If you're running this on a different domain than your API, make sure CORS is properly configured on your backend:

```python
# FastAPI backend should have:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔍 API Documentation

Your backend provides interactive API documentation at:

- Swagger UI: https://web-production-11f5.up.railway.app/docs
- ReDoc: https://web-production-11f5.up.railway.app/redoc

## 💡 Tips

1. **Use async/await** - All API methods are asynchronous
2. **Handle errors** - Always wrap API calls in try/catch
3. **Show loading states** - Display loading indicators while fetching data
4. **Auto-refresh** - Use setInterval for real-time updates (every 30-60 seconds)
5. **Validate data** - Check if data exists before displaying (use optional chaining)

## 📞 Support

For backend API issues, visit: https://web-production-11f5.up.railway.app/docs

For frontend integration questions, refer to `api-usage-examples.js` for detailed examples.

---

**Built for TechLearn AI Assistant** 🚀
