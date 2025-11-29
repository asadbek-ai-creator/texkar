'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import StatCard from '@/components/dashboard/StatCard'
import AccountCard from '@/components/AccountCard'
import CallToActionCard from '@/components/CallToActionCard'
import { MessageSquare, Users, Activity, TrendingUp, Star, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getAnalyticsOverview, AnalyticsOverview } from '@/lib/api'

interface MessageData {
  date: string
  messages: number
}

interface CourseData {
  name: string
  value: number
  percentage: number
  [key: string]: string | number // Index signature for recharts compatibility
}

export default function DashboardPage() {
  const { t } = useLanguage()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsOverview | null>(null)
  const [messagesData, setMessagesData] = useState<MessageData[]>([])
  const [coursesData, setCoursesData] = useState<CourseData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        setError(null)

        // Fetch analytics overview from backend
        const overview = await getAnalyticsOverview()
        setAnalyticsData(overview)

        // Fetch messages data (using existing API route)
        const messagesRes = await fetch('/api/analytics/messages')
        if (messagesRes.ok) {
          const messages = await messagesRes.json()
          setMessagesData(messages)
        }

        // Fetch courses data (using existing API route)
        const coursesRes = await fetch('/api/analytics/courses')
        if (coursesRes.ok) {
          const courses = await coursesRes.json()
          setCoursesData(courses)
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        setError('Failed to load analytics data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-600 mt-1">
            {analyticsData ? `Data for ${new Date(analyticsData.date).toLocaleDateString()}` : 'Loading...'}
          </p>
        </div>
        {!loading && (
          <div className="text-sm text-slate-500">
            Auto-refreshes every 30 seconds
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-500">Loading analytics...</p>
        </div>
      ) : analyticsData ? (
        <>
          {/* Analytics Overview - 6 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Conversations Today */}
            <StatCard
              title="Conversations Today"
              value={analyticsData.conversations_today}
              icon={MessageSquare}
              description="Total conversations started today"
            />

            {/* Leads Today */}
            <StatCard
              title="Leads Today"
              value={analyticsData.leads_today}
              icon={Users}
              description="New leads generated today"
            />

            {/* Active Conversations */}
            <StatCard
              title="Active Conversations"
              value={analyticsData.active_conversations}
              icon={Activity}
              description="Currently ongoing conversations"
            />

            {/* Conversion Rate */}
            <StatCard
              title="Conversion Rate"
              value={`${analyticsData.conversion_rate.toFixed(1)}%`}
              icon={TrendingUp}
              description="Conversations to leads ratio"
            />

            {/* Average Lead Score */}
            <StatCard
              title="Average Lead Score"
              value={analyticsData.avg_lead_score.toFixed(1)}
              icon={Star}
              description="Quality score of today's leads"
            />

            {/* Messages Today */}
            <StatCard
              title="Messages Today"
              value={analyticsData.messages_today}
              icon={Mail}
              description="Total messages exchanged"
            />
          </div>

          {/* Summary Card */}
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Conversations</p>
                <p className="text-3xl font-bold">{analyticsData.conversations_today}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Leads</p>
                <p className="text-3xl font-bold">{analyticsData.leads_today}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Conversion</p>
                <p className="text-3xl font-bold">{analyticsData.conversion_rate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Lead Quality</p>
                <p className="text-3xl font-bold">{analyticsData.avg_lead_score.toFixed(0)}/100</p>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Message Trends Chart */}
      {!loading && messagesData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Message Volume (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Course Distribution Pie Chart */}
      {!loading && coursesData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Course Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={coursesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { name, percentage } = props
                  return `${name} (${percentage}%)`
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {coursesData.map((entry, index) => {
                  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                })}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Connected Accounts Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">{t('dashboard.yourAccounts')}</h2>
        </div>

        <div className="space-y-4">
          <AccountCard
            platform="instagram"
            username="myinstagram"
            stats={{ messages: analyticsData?.messages_today || 0, leads: analyticsData?.leads_today || 0 }}
            status={t('dashboard.activeStatus')}
          />
          <AccountCard
            platform="telegram"
            username="mybot"
            stats={{ messages: analyticsData?.messages_today || 0, leads: analyticsData?.leads_today || 0 }}
            status={t('dashboard.activeStatus')}
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <CallToActionCard />
    </div>
  )
}
