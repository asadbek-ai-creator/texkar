'use client'

import BotConfigCard from '@/components/settings/BotConfigCard'
import IntegrationsCard from '@/components/settings/IntegrationsCard'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SettingsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{t('settings.title')}</h1>
      </div>

      {/* Bot Configuration Section */}
      <section>
        <BotConfigCard />
      </section>

      {/* Integrations Section */}
      <section>
        <IntegrationsCard />
      </section>
    </div>
  )
}
