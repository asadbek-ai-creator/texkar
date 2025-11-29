'use client'

import { Instagram, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AccountCardProps {
  platform: 'instagram' | 'telegram'
  username: string
  stats: {
    messages: number
    leads: number
  }
  status: string
}

export default function AccountCard({
  platform,
  username,
  stats,
  status,
}: AccountCardProps) {
  const { t } = useLanguage()

  const platformIcon = platform === 'instagram' ? (
    <Instagram className="h-8 w-8 text-pink-500" />
  ) : (
    <Send className="h-8 w-8 text-blue-500" />
  )

  const platformName = platform === 'instagram' ? 'Instagram' : 'Telegram'

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
      {/* Left: Platform icon and username */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-lg bg-slate-100 p-3">
          {platformIcon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">{platformName}</p>
          <p className="text-lg font-semibold text-slate-900">@{username}</p>
        </div>
      </div>

      {/* Center: Stats */}
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-sm text-slate-600">{t('dashboard.messages')}</p>
          <p className="text-xl font-bold text-slate-900">
            {stats.messages.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">{t('leads.title')}</p>
          <p className="text-xl font-bold text-slate-900">
            {stats.leads.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right: Status badge and Manage button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-slate-700">{status}</span>
        </div>
        <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
          {t('common.edit')}
        </button>
      </div>
    </div>
  )
}
