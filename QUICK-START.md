# 🚀 TechLearn AI - Quick Start Guide

## 📁 What You Have

I've created a **complete frontend dashboard** for your TechLearn AI Assistant with full API integration.

### Files Created:

1. **api.js** - Complete API service (16 endpoints)
2. **dashboard.html** - Analytics Dashboard with GET /api/analytics/overview
3. **index.html** - Leads Management Page
4. **welcome.html** - Landing page with navigation
5. **api-usage-examples.js** - Code examples
6. **API-README.md** - Full documentation

---

## 🎯 How to Use

### Option 1: Open in Browser (Simplest)

1. **Double-click** `welcome.html` to start
2. Click on:
   - **📊 Analytics Dashboard** → See today's overview
   - **👥 Leads Management** → Manage leads

### Option 2: Run with Local Server (Recommended)

```bash
# Navigate to the folder
cd "C:\Users\User\Desktop\newAcademy121-main\newAcademy121-main"

# Start a local server (choose one):

# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080

# Then open: http://localhost:8080/welcome.html
```

---

## 📊 Analytics Dashboard (dashboard.html)

### What It Shows:

**GET /api/analytics/overview** endpoint displays:

✅ **Conversations Today** - Total conversations started
✅ **Leads Today** - New leads generated
✅ **Active Conversations** - Currently ongoing
✅ **Conversion Rate** - Success percentage
✅ **Average Lead Score** - Quality metric
✅ **Messages Today** - Total messages exchanged

### Features:

- 🔄 Auto-refresh every 30 seconds
- 📈 Animated counters
- 🎨 Professional gradient design
- ✨ Real-time updates
- 🔗 Direct link to Leads page

### API Call Used:

```javascript
const overview = await APIService.getOverview();
// Fetches from: GET /api/analytics/overview
```

**Response Example:**
```json
{
  "conversations_today": 45,
  "leads_today": 12,
  "active_conversations": 8,
  "conversion_rate": 26.67,
  "avg_lead_score": 72.5,
  "messages_today": 234,
  "date": "2025-11-29"
}
```

---

## 👥 Leads Management (index.html)

### What It Shows:

- Lead statistics (New, Enrolled, Churned)
- Complete leads table with:
  - Name
  - Email/Telegram
  - Phone
  - Course interest
  - Status
  - Lead score
  - Actions

### Features:

- Filter by status (All, New, Contacted, Enrolled, Churned)
- View detailed lead information
- Update lead status (Contacted, Enrolled, Churned)
- Real-time updates
- Professional table design

### API Calls Used:

```javascript
// Get all leads
const leads = await APIService.getLeads();

// Get filtered leads
const newLeads = await APIService.getLeads('new_lead');

// Update lead status
await APIService.updateLeadStatus(leadId, 'contacted');
```

---

## 🔌 API Service (api.js)

### All Available Methods:

#### Analytics (6 methods)
```javascript
APIService.getOverview()                    // Today's overview
APIService.getFAQs(limit)                   // Frequently asked questions
APIService.getMessages(periodType, days)    // Message time series
APIService.getCourses(periodType, days)     // Course trends
APIService.getLeadAnalytics(days)           // Lead analytics
APIService.getAgentPerformance(hours)       // Agent performance
```

#### Conversations (5 methods)
```javascript
APIService.getConversations(skip, limit, activeOnly)
APIService.getConversationDetail(conversationId)
APIService.getConversationMessages(conversationId, limit)
APIService.enableHumanTakeover(conversationId)
APIService.disableHumanTakeover(conversationId)
```

#### Leads (4 methods)
```javascript
APIService.getLeads(status, skip, limit)
APIService.getLeadDetail(leadId)
APIService.updateLeadStatus(leadId, status)
APIService.getHighQualityLeads(minScore, limit)
```

---

## 🎨 Page Navigation

```
welcome.html (Start Here)
    ├── dashboard.html (Analytics Overview)
    │   └── Links to: index.html
    └── index.html (Leads Management)
        └── Links to: dashboard.html
```

---

## ⚙️ Configuration

### Change API URL:

Edit `api.js` line 7:

```javascript
// Current (Production)
static BASE_URL = 'https://web-production-11f5.up.railway.app';

// For local development
static BASE_URL = 'http://localhost:8000';
```

### Adjust Auto-Refresh Interval:

Both pages auto-refresh every 30 seconds. To change:

**In dashboard.html:**
```javascript
// Line ~400, change 30000 to your desired milliseconds
setInterval(() => {
    loadDashboardOverview();
}, 30000); // 30 seconds
```

**In index.html:**
```javascript
// Change interval (30000 = 30 seconds)
setInterval(() => {
    loadLeads(currentFilter);
    loadStats();
}, 30000);
```

---

## 🔍 Testing the API Connection

### Method 1: Check Browser Console

1. Open any page
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Look for:
   - ✅ "Dashboard Overview: {...}" = Success
   - ❌ "Error loading dashboard" = Failed

### Method 2: Use Welcome Page

1. Open `welcome.html`
2. Check the status indicator at the bottom:
   - 🟢 "System Ready" = Connected
   - 🔴 "Connection Error" = Check console

### Method 3: Manual Test

```javascript
// Open browser console (F12) on any page
import('./api.js').then(async ({ default: APIService }) => {
    const overview = await APIService.getOverview();
    console.log('Overview:', overview);
});
```

---

## 📱 Mobile Responsive

All pages are fully responsive and work on:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile phones

---

## 🎯 Quick Examples

### Example 1: Get Today's Overview
```javascript
import APIService from './api.js';

const overview = await APIService.getOverview();
console.log(`Today we had ${overview.conversations_today} conversations!`);
console.log(`Conversion rate: ${overview.conversion_rate}%`);
```

### Example 2: Get All New Leads
```javascript
const newLeads = await APIService.getLeads('new_lead');
console.log(`We have ${newLeads.length} new leads!`);
```

### Example 3: Mark Lead as Contacted
```javascript
await APIService.updateLeadStatus(123, 'contacted');
console.log('Lead marked as contacted!');
```

### Example 4: Get Hot Leads (Score > 80)
```javascript
const hotLeads = await APIService.getHighQualityLeads(80, 10);
console.log(`Found ${hotLeads.length} hot leads!`);
```

---

## 🐛 Troubleshooting

### Issue: "Failed to load dashboard data"

**Solutions:**
1. Check internet connection
2. Verify API is running: https://web-production-11f5.up.railway.app/docs
3. Check browser console for errors (F12)
4. Verify API URL in `api.js` is correct

### Issue: CORS Error

**Solution:**
Make sure your backend allows CORS from your frontend domain.

### Issue: Data not updating

**Solution:**
1. Click the "🔄 Refresh" button
2. Hard refresh browser (Ctrl + Shift + R)
3. Clear browser cache

---

## 📊 Data Flow

```
Browser → api.js → Your Backend API
                     ↓
              Railway Server
        (web-production-11f5.up.railway.app)
                     ↓
              Database
                     ↓
              JSON Response
                     ↓
           Frontend Display
```

---

## 🎨 Customization

### Change Colors:

**Dashboard page** - Edit CSS variables:
```css
/* Line ~50-60 in dashboard.html */
.stat-card.blue { --color-start: #3b82f6; }
.stat-card.purple { --color-start: #8b5cf6; }
```

**Leads page** - Edit status badge colors:
```css
/* Line ~100-120 in index.html */
.status-new_lead { background: #dbeafe; }
.status-enrolled { background: #d1fae5; }
```

---

## 📚 Learn More

- **Full API Documentation**: See `API-README.md`
- **Code Examples**: See `api-usage-examples.js`
- **Backend API Docs**: https://web-production-11f5.up.railway.app/docs

---

## ✅ Checklist

Before deploying:

- [ ] Test `welcome.html` - Does it load?
- [ ] Test `dashboard.html` - Do numbers appear?
- [ ] Test `index.html` - Does leads table show?
- [ ] Test API connection - Check browser console
- [ ] Test on mobile - Does it look good?
- [ ] Update API URL if needed (in `api.js`)

---

## 🚀 You're Ready!

Everything is set up and ready to use. Just open **welcome.html** to start!

**Questions?** Check the console (F12) for errors and logs.

---

**Built with ❤️ for TechLearn AI Assistant**
