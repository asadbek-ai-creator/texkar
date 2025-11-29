'use client'

import { CheckCircle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PricingSection() {
  const { t } = useLanguage()

  const features = [
    { text: t('pricing.features.account') },
    { text: t('pricing.features.replies') },
    { text: t('pricing.features.sheets') },
    { text: t('pricing.features.availability') },
    { text: t('pricing.features.analytics') },
    { text: t('pricing.features.support') },
  ]

  return (
    <section id="pricing" className="scroll-mt-20 bg-white px-4 py-20 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Pricing Card */}
            <div className="group relative rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-blue-500 hover:shadow-2xl md:p-10">
              {/* Badge */}
              <div className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-1 text-xs font-bold text-white">
                <Sparkles className="h-4 w-4" />
                {t('pricing.mostPopular')}
              </div>

              {/* Plan Name */}
              <div className="mt-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-900">{t('pricing.free')}</h3>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-slate-900">$0</p>
                <p className="text-slate-600">{t('pricing.perMonth')}</p>
              </div>

              {/* Description */}
              <p className="mb-8 text-slate-600">
                {t('pricing.description')}
              </p>

              {/* CTA Button */}
              <button className="mb-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                {t('pricing.cta')}
              </button>

              {/* Divider */}
              <div className="mb-8 border-t border-slate-200"></div>

              {/* Features List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-900">{t('pricing.whatsIncluded')}</p>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-slate-600">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Footer Text */}
              <p className="mt-8 text-center text-xs text-slate-500">
                {t('pricing.footer')}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 rounded-xl bg-slate-50 p-8 text-center">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{t('pricing.proPlan')}</span> {t('pricing.comingSoon')}
          </p>
        </div>
      </div>
    </section>
  )
}
