'use client'

import { useState } from 'react'
import { Sheet } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  isConnected: boolean
}

export default function IntegrationsCard() {
  const { t } = useLanguage()
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google-sheets',
      name: t('settings.integrations.googleSheets.name'),
      description: t('settings.integrations.googleSheets.description'),
      icon: <Sheet className="h-6 w-6 text-green-600" />,
      isConnected: false,
    },
  ])

  const [connectingId, setConnectingId] = useState<string | null>(null)

  const handleConnect = async (integrationId: string) => {
    setConnectingId(integrationId)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === integrationId
          ? { ...integration, isConnected: true }
          : integration
      )
    )

    setConnectingId(null)
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t('settings.integrations.title')}</h2>
      </div>

      {/* Integration Items */}
      <div className="space-y-4">
        {integrations.map(integration => (
          <div
            key={integration.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-6 hover:border-slate-300 transition"
          >
            {/* Left: Icon and Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-lg bg-slate-100 p-3">
                {integration.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{integration.name}</p>
                <p className="text-sm text-slate-600">{integration.description}</p>
              </div>
            </div>

            {/* Right: Button or Status */}
            {integration.isConnected ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-sm font-medium text-green-700">{t('settings.integrations.connected')}</span>
              </div>
            ) : (
              <button
                onClick={() => handleConnect(integration.id)}
                disabled={connectingId === integration.id}
                className="px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connectingId === integration.id ? t('settings.integrations.connecting') : t('settings.integrations.connect')}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
        <p className="text-sm text-slate-700">
          {t('settings.integrations.comingSoon')}
        </p>
      </div>
    </div>
  )
}
