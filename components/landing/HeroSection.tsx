'use client'

import { ArrowRight, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-20 sm:py-32 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Primary Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t('hero.title')}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Button and Trust Text */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-105">
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-sm text-slate-600">
                {t('hero.noCreditCard')}
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 border-t border-slate-200 pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-white"
                  ></div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">500+</span> {t('hero.socialProof')}
              </p>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Dashboard Mockup Container */}
            <div className="relative w-full max-w-md">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-30"></div>

              {/* Card */}
              <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
                {/* Chat mockup */}
                <div className="space-y-4">
                  {/* Message 1 */}
                  <div className="flex justify-start">
                    <div className="rounded-lg rounded-bl-none bg-slate-100 px-4 py-2 text-sm text-slate-600 max-w-xs">
                      {t('hero.chat1')}
                    </div>
                  </div>

                  {/* Message 2 - Bot reply */}
                  <div className="flex justify-end">
                    <div className="flex items-end gap-2">
                      <div className="rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-sm text-white max-w-xs">
                        {t('hero.reply1')}
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                    </div>
                  </div>

                  {/* Message 3 */}
                  <div className="flex justify-start">
                    <div className="rounded-lg rounded-bl-none bg-slate-100 px-4 py-2 text-sm text-slate-600 max-w-xs">
                      {t('hero.chat2')}
                    </div>
                  </div>

                  {/* Message 4 - Bot reply */}
                  <div className="flex justify-end">
                    <div className="flex items-end gap-2">
                      <div className="rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-sm text-white max-w-xs">
                        {t('hero.reply2')}
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-slate-500">{t('hero.analyzing')}</span>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
