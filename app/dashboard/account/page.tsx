'use client'

import ProfileCard from '@/components/account/ProfileCard'
import SecurityCard from '@/components/account/SecurityCard'
import DangerZoneCard from '@/components/account/DangerZoneCard'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AccountPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{t('accountSettings.title')}</h1>
      </div>

      {/* Profile Section */}
      <section>
        <ProfileCard />
      </section>

      {/* Security Section */}
      <section>
        <SecurityCard />
      </section>

      {/* Danger Zone Section */}
      <section>
        <DangerZoneCard />
      </section>
    </div>
  )
}
