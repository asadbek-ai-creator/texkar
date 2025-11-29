'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProfileCard() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [savedMessage, setSavedMessage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    setSavedMessage(false)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsUpdating(false)
    setSavedMessage(true)

    // Hide message after 3 seconds
    setTimeout(() => setSavedMessage(false), 3000)
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t('accountSettings.profile.title')}</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
            {t('accountSettings.profile.fullName')}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t('accountSettings.profile.fullNamePlaceholder')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-slate-100"
            disabled={isUpdating}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            {t('accountSettings.profile.email')}
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            placeholder={t('accountSettings.profile.emailPlaceholder')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-100 text-slate-600 cursor-not-allowed"
            disabled
            readOnly
          />
          <p className="mt-2 text-xs text-slate-500">{t('accountSettings.profile.emailNote')}</p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <p className="text-sm font-medium text-green-800">{t('accountSettings.profile.success')}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200 disabled:cursor-not-allowed"
          >
            {isUpdating ? t('accountSettings.profile.updating') : t('accountSettings.profile.update')}
          </button>
        </div>
      </div>
    </div>
  )
}
