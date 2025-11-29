'use client'

import {
  Bot,
  Database,
  Clock,
  MessageCircle,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: t('features.autoReplies.title'),
      description: t('features.autoReplies.description'),
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: t('features.leadCollection.title'),
      description: t('features.leadCollection.description'),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t('features.availability.title'),
      description: t('features.availability.description'),
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: t('features.sheets.title'),
      description: t('features.sheets.description'),
    },
  ]

  return (
    <section id="features" className="scroll-mt-20 bg-white px-4 py-20 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-slate-200 bg-slate-50 p-8 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >
              {/* Icon Container */}
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
