'use client'

import { CheckCircle, LinkIcon, Zap, Rocket } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HowItWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      number: 1,
      icon: <LinkIcon className="h-8 w-8" />,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      number: 2,
      icon: <Zap className="h-8 w-8" />,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
    },
    {
      number: 3,
      icon: <Rocket className="h-8 w-8" />,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
    },
  ]

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-slate-50 px-4 py-20 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile) */}
              {index !== steps.length - 1 && (
                <div className="absolute -right-4 top-20 hidden h-1 w-8 bg-gradient-to-r from-blue-600 to-transparent md:block lg:-right-6 lg:w-12"></div>
              )}

              {/* Step Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                {/* Number Badge */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-lg font-bold text-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 text-blue-600">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-slate-600">
                  {step.description}
                </p>

                {/* Checkmark */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  {t('howItWorks.done')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30">
            {t('howItWorks.cta')}
            <Rocket className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
