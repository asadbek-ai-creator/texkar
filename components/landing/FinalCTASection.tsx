'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FinalCTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 sm:py-32 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {t('finalCTA.title')}
        </h2>

        {/* Subheadline */}
        <p className="mb-10 text-xl leading-relaxed text-blue-100 sm:text-2xl">
          {t('finalCTA.subtitle')}
        </p>

        {/* CTA Button */}
        <button className="inline-flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 font-bold text-blue-600 transition-all hover:scale-105 hover:shadow-2xl sm:px-10 sm:py-5 sm:text-lg">
          {t('finalCTA.cta')}
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row items-center justify-center sm:gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-blue-100">{t('finalCTA.activeUsers')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50K+</p>
            <p className="text-blue-100">{t('finalCTA.messagesAutomated')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.9★</p>
            <p className="text-blue-100">{t('finalCTA.averageRating')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
