'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function CallToActionCard() {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">{t('ctaCard.title')}</h3>
      <p className="mt-2 text-slate-600">
        {t('ctaCard.description')}
      </p>
      <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
        {t('ctaCard.button')}
      </button>
    </div>
  )
}
