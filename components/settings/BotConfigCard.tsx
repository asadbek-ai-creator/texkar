'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BotConfigCard() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState(t('settings.botConfig.defaultPrompt'))
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setSavedMessage(false)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSaving(false)
    setSavedMessage(true)

    // Hide message after 3 seconds
    setTimeout(() => setSavedMessage(false), 3000)
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t('settings.botConfig.title')}</h2>
        <p className="mt-2 text-sm text-slate-600">
          {t('settings.botConfig.description')}
        </p>
      </div>

      {/* Text Area */}
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
          {t('settings.botConfig.promptLabel')}
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={8}
          placeholder={t('settings.botConfig.promptPlaceholder')}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      {/* Success Message */}
      {savedMessage && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
          <p className="text-sm font-medium text-green-800">{t('settings.botConfig.success')}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200 disabled:cursor-not-allowed"
        >
          {isSaving ? t('settings.botConfig.saving') : t('settings.botConfig.save')}
        </button>
      </div>
    </div>
  )
}
