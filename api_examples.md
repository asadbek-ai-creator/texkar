Nursultan Koshekbaev, [11/29/2025 2:25 AM]
# TechLearn AI Assistant - API Documentation for Frontend Developers

## 📌 Base Information

Base URL (Local): http://localhost:8000  
Base URL (Production): https://web-production-11f5.up.railway.app  
API Version: 2.0.0  
Authentication: None (Open API - Add authentication later if needed)

## 📚 Interactive Documentation

- Swagger UI: {BASE_URL}/docs
- ReDoc: {BASE_URL}/redoc

---

## 🔍 Table of Contents

1. [Analytics Endpoints](#analytics-endpoints)
2. [Conversations Endpoints](#conversations-endpoints)
3. [Leads Endpoints](#leads-endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)

---

## 📊 Analytics Endpoints

### 1. Get Dashboard Overview

Endpoint: GET /api/analytics/overview

Description: Get today's analytics overview including conversations, leads, and conversion rates.

Request:
curl -X GET "http://localhost:8000/api/analytics/overview"

JavaScript (Fetch):
fetch('http://localhost:8000/api/analytics/overview')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

JavaScript (Axios):
import axios from 'axios';

const getOverview = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/analytics/overview');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

Response (200 OK):
{
  "conversations_today": 45,
  "leads_today": 12,
  "active_conversations": 8,
  "conversion_rate": 26.67,
  "avg_lead_score": 72.5,
  "messages_today": 234,
  "date": "2025-11-28"
}

---

### 2. Get Frequently Asked Questions

Endpoint: GET /api/analytics/faqs

Query Parameters:
- limit (integer, optional, default: 20, max: 100) - Number of FAQs to return

Request:
curl -X GET "http://localhost:8000/api/analytics/faqs?limit=10"

JavaScript:
const getFAQs = async (limit = 20) => {
  const response = await fetch(`http://localhost:8000/api/analytics/faqs?limit=${limit}`);
  const data = await response.json();
  return data;
};

// Usage
getFAQs(10).then(faqs => {
  faqs.forEach(faq => {
    console.log(`Q: ${faq.question} (asked ${faq.count} times)`);
  });
});

Response (200 OK):
[
  {
    "question": "qanday kurslar bor",
    "category": "course_info",
    "count": 145,
    "last_asked": "2025-11-28T15:30:00",
    "common_course": "Python Dasturlash"
  },
  {
    "question": "narxi qancha",
    "category": "pricing",
    "count": 89,
    "last_asked": "2025-11-28T14:20:00",
    "common_course": "Web Development"
  }
]

---

### 3. Get Message Time Series

Endpoint: GET /api/analytics/messages

Query Parameters:
- period_type (string, required) - One of: hourly, daily, weekly, monthly
- days_back (integer, optional, default: 30, max: 365) - Number of days to look back

Request:
curl -X GET "http://localhost:8000/api/analytics/messages?period_type=daily&days_back=7"

JavaScript (Chart.js Example):
const getMessageStats = async () => {
  const response = await fetch(
    'http://localhost:8000/api/analytics/messages?period_type=daily&days_back=7'
  );
  const data = await response.json();
  
  // Format for Chart.js
  const chartData = {
    labels: data.map(d => new Date(d.period_start).toLocaleDateString()),
    datasets: [
      {
        label: 'Total Messages',
        data: data.map(d => d.total_messages),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Conversations',
        data: data.map(d => d.total_conversations),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };
  
  return chartData;
};

Nursultan Koshekbaev, [11/29/2025 2:25 AM]
Response (200 OK):
[
  {
    "period_start": "2025-11-22T00:00:00",
    "period_end": "2025-11-23T00:00:00",
    "total_messages": 456,
    "user_messages": 234,
    "assistant_messages": 222,
    "total_conversations": 45,
    "total_leads": 12,
    "avg_lead_score": 68.5
  },
  {
    "period_start": "2025-11-23T00:00:00",
    "period_end": "2025-11-24T00:00:00",
    "total_messages": 389,
    "user_messages": 198,
    "assistant_messages": 191,
    "total_conversations": 38,
    "total_leads": 9,
    "avg_lead_score": 71.2
  }
]

---

### 4. Get Course Interest Trends

Endpoint: GET /api/analytics/courses

Query Parameters:
- period_type (string, required) - One of: daily, weekly, monthly
- days_back (integer, optional, default: 30, max: 365)

Request:
const getCourseInterest = async () => {
  const response = await fetch(
    'http://localhost:8000/api/analytics/courses?period_type=daily&days_back=30'
  );
  return await response.json();
};

// Usage with visualization
getCourseInterest().then(data => {
  // Group by course
  const courses = {};
  data.forEach(item => {
    if (!courses[item.course_name]) {
      courses[item.course_name] = [];
    }
    courses[item.course_name].push(item);
  });
  
  console.log('Course trends:', courses);
});

Response (200 OK):
[
  {
    "course_name": "Python Dasturlash",
    "period_start": "2025-11-28T00:00:00",
    "mentions_count": 45,
    "questions_count": 23,
    "leads_count": 12,
    "enrollments_count": 3,
    "avg_lead_score": 75.5,
    "conversion_rate": 25.0
  },
  {
    "course_name": "Web Development",
    "period_start": "2025-11-28T00:00:00",
    "mentions_count": 38,
    "questions_count": 19,
    "leads_count": 8,
    "enrollments_count": 2,
    "avg_lead_score": 70.2,
    "conversion_rate": 25.0
  }
]

---

### 5. Get Lead Analytics

Endpoint: GET /api/analytics/leads

Query Parameters:
- days_back (integer, optional, default: 7, max: 365)

Request:
const getLeadAnalytics = async (daysBack = 7) => {
  const response = await fetch(
    `http://localhost:8000/api/analytics/leads?days_back=${daysBack}`
  );
  return await response.json();
};

Response (200 OK):
{
  "conversion_funnel": {
    "total_conversations": 156,
    "info_gathering": 89,
    "closing_attempt": 45,
    "enrolled": 23
  },
  "agent_distribution": {
    "InfoGuide": 78,
    "Closer": 45,
    "Engagement": 33
  }
}

---

### 6. Get Agent Performance

Endpoint: GET /api/analytics/agents

Query Parameters:
- hours (integer, optional, default: 24, max: 720)

Request:
const getAgentPerformance = async (hours = 24) => {
  const response = await fetch(
    `http://localhost:8000/api/analytics/agents?hours=${hours}`
  );
  const data = await response.json();
  return data.agent_distribution;
};

Response (200 OK):
{
  "agent_distribution": {
    "InfoGuide": 45,
    "Closer": 23,
    "Engagement": 12
  }
}

---

## 💬 Conversations Endpoints

### 1. List Conversations

Endpoint: GET /api/conversations

Query Parameters:
- skip (integer, optional, default: 0) - Number of records to skip (pagination)
- limit (integer, optional, default: 50, max: 100) - Max records to return
- active_only (boolean, optional, default: false) - Only return active conversations

Request:
const getConversations = async (page = 0, pageSize = 50, activeOnly = false) => {
  const skip = page * pageSize;
  const url = `http://localhost:8000/api/conversations?skip=${skip}&limit=${pageSize}&active_only=${activeOnly}`;
  
  const response = await fetch(url);
  return await response.json();
};

// Usage
const page1 = await getConversations(0, 20); // First 20 conversations
const activeChatters = await getConversations(0, 50, true); // Active only

Nursultan Koshekbaev, [11/29/2025 2:25 AM]
Response (200 OK):
[
  {
    "id": 123,
    "session_id": "123456_1701234567",
    "user_id": 45,
    "username": "John",
    "current_stage": "info_gathering",
    "current_agent": "InfoGuide",
    "interested_course": "Python Dasturlash",
    "message_count": 12,
    "lead_score": 75.5,
    "is_active": true,
    "started_at": "2025-11-28T10:30:00",
    "last_message_at": "2025-11-28T10:45:00"
  }
]

---

### 2. Get Conversation Details

Endpoint: GET /api/conversations/{conversation_id}

Parameters:
- conversation_id (integer, required) - ID of the conversation

Request:
const getConversationDetail = async (conversationId) => {
  const response = await fetch(
    `http://localhost:8000/api/conversations/${conversationId}`
  );
  
  if (!response.ok) {
    throw new Error('Conversation not found');
  }
  
  return await response.json();
};

// Usage
getConversationDetail(123).then(conversation => {
  console.log('Conversation:', conversation);
  console.log('Messages:', conversation.messages);
});

Response (200 OK):
{
  "id": 123,
  "session_id": "123456_1701234567",
  "user_id": 45,
  "username": "John",
  "current_stage": "info_gathering",
  "current_agent": "InfoGuide",
  "interested_course": "Python Dasturlash",
  "message_count": 12,
  "lead_score": 75.5,
  "is_active": true,
  "started_at": "2025-11-28T10:30:00",
  "last_message_at": "2025-11-28T10:45:00",
  "conversation_quality_score": 85.3,
  "predicted_conversion_probability": 0.72,
  "is_human_takeover": false,
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "Assalomu alaykum",
      "agent_name": null,
      "created_at": "2025-11-28T10:30:00"
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "Wa alaykum assalom! ...",
      "agent_name": "InfoGuide",
      "created_at": "2025-11-28T10:30:05"
    }
  ]
}

Error Response (404 Not Found):
{
  "detail": "Conversation not found"
}

---

### 3. Get Conversation Messages

Endpoint: GET /api/conversations/{conversation_id}/messages

Parameters:
- conversation_id (integer, required) - ID of the conversation

Query Parameters:
- limit (integer, optional, default: 100, max: 500)

Request:
const getMessages = async (conversationId, limit = 100) => {
  const response = await fetch(
    `http://localhost:8000/api/conversations/${conversationId}/messages?limit=${limit}`
  );
  return await response.json();
};

// Display in chat UI
getMessages(123).then(messages => {
  messages.forEach(msg => {
    const isBot = msg.role === 'assistant';
    displayMessage(msg.content, isBot, msg.created_at);
  });
});

Response (200 OK):
[
  {
    "id": 1,
    "role": "user",
    "content": "Assalomu alaykum",
    "agent_name": null,
    "created_at": "2025-11-28T10:30:00"
  },
  {
    "id": 2,
    "role": "assistant",
    "content": "Wa alaykum assalom! Xush kelibsiz!",
    "agent_name": "InfoGuide",
    "created_at": "2025-11-28T10:30:05"
  }
]

---

### 4. Enable Human Takeover

Endpoint: POST /api/conversations/{conversation_id}/takeover

Description: Enable human agent to take over the conversation

Request:
const enableHumanTakeover = async (conversationId) => {
  const response = await fetch(
    `http://localhost:8000/api/conversations/${conversationId}/takeover`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return await response.json();
};

Response (200 OK):
{
  "message": "Human takeover enabled",
  "conversation_id": 123
}

---

### 5. Disable Human Takeover

Endpoint: DELETE /api/conversations/{conversation_id}/takeover

Request:
const disableHumanTakeover = async (conversationId) => {
  const response = await fetch(
    `http://localhost:8000/api/conversations/${conversationId}/takeover`,
    {
      method: 'DELETE'
    }
  );
  return await response.json();
};

Response (200 OK):
{
  "message": "Human takeover disabled",
  "conversation_id": 123
}

---

## 👥 Leads Endpoints

### 1. List/Filter Leads

Endpoint: GET /api/leads

Nursultan Koshekbaev, [11/29/2025 2:25 AM]
Query Parameters:
- skip (integer, optional, default: 0) - Pagination offset
- limit (integer, optional, default: 50, max: 100)
- status (string, optional) - Filter by status: new_lead, contacted, enrolled, completed, churned, returning

Request:
const getLeads = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.skip) params.append('skip', filters.skip);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.status) params.append('status', filters.status);
  
  const response = await fetch(
    `http://localhost:8000/api/leads?${params.toString()}`
  );
  return await response.json();
};

// Usage examples
const allLeads = await getLeads({ limit: 20 });
const newLeads = await getLeads({ status: 'new_lead', limit: 50 });
const enrolledStudents = await getLeads({ status: 'enrolled' });

Response (200 OK):
[
  {
    "id": 45,
    "user_id": 123,
    "username": "John",
    "telegram_id": "123456789",
    "phone_number": "+998901234567",
    "interested_course": "Python Dasturlash",
    "status": "contacted",
    "lead_score": 85.5,
    "created_at": "2025-11-28T10:30:00",
    "contacted_at": "2025-11-28T11:00:00",
    "enrolled_at": null
  }
]

---

### 2. Get Lead Details

Endpoint: GET /api/leads/{lead_id}

Parameters:
- lead_id (integer, required)

Request:
const getLeadDetail = async (leadId) => {
  const response = await fetch(
    `http://localhost:8000/api/leads/${leadId}`
  );
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Lead not found');
    }
    throw new Error('Failed to fetch lead');
  }
  
  return await response.json();
};

Response (200 OK):
{
  "id": 45,
  "user_id": 123,
  "username": "John",
  "telegram_id": "123456789",
  "phone_number": "+998901234567",
  "interested_course": "Python Dasturlash",
  "status": "contacted",
  "lead_score": 85.5,
  "created_at": "2025-11-28T10:30:00",
  "contacted_at": "2025-11-28T11:00:00",
  "enrolled_at": null
}

---

### 3. Update Lead Status

Endpoint: PATCH /api/leads/{lead_id}/status

Parameters:
- lead_id (integer, required)

Request Body:
{
  "status": "contacted"
}

Valid status values: new_lead, contacted, enrolled, completed, churned, returning

Request:
const updateLeadStatus = async (leadId, newStatus) => {
  const response = await fetch(
    `http://localhost:8000/api/leads/${leadId}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: newStatus
      })
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to update lead status');
  }
  
  return await response.json();
};

// Usage
await updateLeadStatus(45, 'contacted');
await updateLeadStatus(46, 'enrolled');

Response (200 OK):
{
  "id": 45,
  "status": "contacted",
  "message": "Lead status updated successfully"
}

---

### 4. Get High-Quality Leads

Endpoint: GET /api/leads/high-score/list

Query Parameters:
- min_score (float, optional, default: 70, min: 0, max: 100)
- limit (integer, optional, default: 50, max: 100)

Request:
const getHighQualityLeads = async (minScore = 70, limit = 50) => {
  const response = await fetch(
    `http://localhost:8000/api/leads/high-score/list?min_score=${minScore}&limit=${limit}`
  );
  return await response.json();
};

// Get top quality leads for priority follow-up
const hotLeads = await getHighQualityLeads(80, 20);

Response (200 OK):
[
  {
    "id": 45,
    "user_id": 123,
    "username": "John",
    "telegram_id": "123456789",
    "phone_number": "+998901234567",
    "interested_course": "Python Dasturlash",
    "status": "new_lead",
    "lead_score": 92.5,
    "created_at": "2025-11-28T10:30:00",
    "contacted_at": null,
    "enrolled_at": null
  }
]

---

## 📦 Data Models

Nursultan Koshekbaev, [11/29/2025 2:25 AM]
### Lead Status Enum
type LeadStatus = 
  | 'new_lead'      // Fresh lead, not contacted
  | 'contacted'     // Manager contacted the lead
  | 'enrolled'      // Lead enrolled in a course
  | 'completed'     // Completed the course
  | 'churned'       // Lost interest
  | 'returning';    // Returning customer

### Conversation Stage Enum
type ConversationStage = 
  | 'info_gathering'     // Getting user information
  | 'closing_attempt'    // Trying to get phone number
  | 'objection_handling' // Handling objections
  | 'enrolled'          // Successfully enrolled
  | 'follow_up'         // Follow-up stage
  | 'churned';          // Conversation ended without conversion

### Period Type Enum
type PeriodType = 
  | 'hourly'   // Messages: hourly data
  | 'daily'    // All endpoints
  | 'weekly'   // Courses, messages
  | 'monthly'; // Courses, messages

---

## ⚠️ Error Handling

### Standard Error Response Format
{
  "detail": "Error message here"
}

### HTTP Status Codes

| Code | Meaning | When it occurs |
|------|---------|----------------|
| 200 | OK | Request successful |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Invalid parameters |
| 500 | Server Error | Internal server error |

### Error Handling Example
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    // Show user-friendly error message
    throw error;
  }
};

// Usage
try {
  const data = await fetchWithErrorHandling('http://localhost:8000/api/analytics/overview');
  console.log(data);
} catch (error) {
  alert('Failed to load analytics. Please try again.');
}

---

## 🔧 Complete React Example

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Analytics Dashboard Component
const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/analytics/overview`);
        setOverview(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Conversations Today</h3>
          <p>{overview.conversations_today}</p>
        </div>
        <div className="stat-card">
          <h3>Leads Today</h3>
          <p>{overview.leads_today}</p>
        </div>
        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <p>{overview.conversion_rate}%</p>
        </div>
        <div className="stat-card">
          <h3>Messages Today</h3>
          <p>{overview.messages_today}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

---

## 🚀 Quick Start for Frontend

Nursultan Koshekbaev, [11/29/2025 2:25 AM]
// 1. Create API service file (api.js)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const api = {
  // Analytics
  getOverview: () => fetch(`${API_BASE_URL}/api/analytics/overview`).then(r => r.json()),
  getFAQs: (limit = 20) => fetch(`${API_BASE_URL}/api/analytics/faqs?limit=${limit}`).then(r => r.json()),
  
  // Conversations
  getConversations: (skip = 0, limit = 50) => 
    fetch(`${API_BASE_URL}/api/conversations?skip=${skip}&limit=${limit}`).then(r => r.json()),
  
  // Leads
  getLeads: (status = null) => {
    const url = status 
      ? `${API_BASE_URL}/api/leads?status=${status}`
      : `${API_BASE_URL}/api/leads`;
    return fetch(url).then(r => r.json());
  },
  
  updateLeadStatus: (leadId, status) =>
    fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(r => r.json())
};

// 2. Use in your components
import { api } from './api';

// Get analytics
const overview = await api.getOverview();

// Get FAQs
const faqs = await api.getFAQs(10);

// Get conversations
const conversations = await api.getConversations(0, 20);

// Update lead
await api.updateLeadStatus(45, 'contacted');

---

## 📞 Support

For questions or issues, contact the backend team or check the interactive docs at /docs.