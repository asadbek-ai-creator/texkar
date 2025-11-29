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
            {analyticsData ? `${t('analytics.dataFor')} ${new Date(analyticsData.date).toLocaleDateString()}` : t('analytics.loading')}
          </p>
        </div>
        {!loading && (
          <div className="text-sm text-slate-500">
            {t('analytics.autoRefresh')}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
          <p className="font-semibold">{t('analytics.error')}</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-500">{t('analytics.loading')}</p>
        </div>
      ) : analyticsData ? (
        <>
          {/* Analytics Overview - 6 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Conversations Today */}
            <StatCard
              title={t('analytics.conversationsToday')}
              value={analyticsData.conversations_today}
              icon={MessageSquare}
              description={t('analytics.conversationsTodayDesc')}
            />

            {/* Leads Today */}
            <StatCard
              title={t('analytics.leadsToday')}
              value={analyticsData.leads_today}
              icon={Users}
              description={t('analytics.leadsTodayDesc')}
            />

            {/* Active Conversations */}
            <StatCard
              title={t('analytics.activeConversations')}
              value={analyticsData.active_conversations}
              icon={Activity}
              description={t('analytics.activeConversationsDesc')}
            />

            {/* Conversion Rate */}
            <StatCard
              title={t('analytics.conversionRate')}
              value={`${analyticsData.conversion_rate.toFixed(1)}%`}
              icon={TrendingUp}
              description={t('analytics.conversionRateDesc')}
            />

            {/* Average Lead Score */}
            <StatCard
              title={t('analytics.avgLeadScore')}
              value={analyticsData.avg_lead_score.toFixed(1)}
              icon={Star}
              description={t('analytics.avgLeadScoreDesc')}
            />

            {/* Messages Today */}
            <StatCard
              title={t('analytics.messagesToday')}
              value={analyticsData.messages_today}
              icon={Mail}
              description={t('analytics.messagesTodayDesc')}
            />
          </div>

          {/* Summary Card */}
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t('analytics.todaysSummary')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-100 text-sm">{t('analytics.conversations')}</p>
                <p className="text-3xl font-bold">{analyticsData.conversations_today}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">{t('analytics.leads')}</p>
                <p className="text-3xl font-bold">{analyticsData.leads_today}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">{t('analytics.conversion')}</p>
                <p className="text-3xl font-bold">{analyticsData.conversion_rate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">{t('analytics.leadQuality')}</p>
                <p className="text-3xl font-bold">{analyticsData.avg_lead_score.toFixed(0)}/100</p>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Message Trends Chart */}
      {!loading && messagesData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">{t('analytics.messageVolume')}</h2>
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
          <h2 className="mb-4 text-lg font-bold text-slate-800">{t('analytics.courseDistribution')}</h2>
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
