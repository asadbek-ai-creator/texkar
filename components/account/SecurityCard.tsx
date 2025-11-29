'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SecurityCard() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [error, setError] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChangePassword = async () => {
    setError('')

    // Validation
    if (!formData.currentPassword) {
      setError(t('accountSettings.security.currentRequired'))
      return
    }

    if (!formData.newPassword) {
      setError(t('accountSettings.security.newRequired'))
      return
    }

    if (formData.newPassword.length < 6) {
      setError(t('accountSettings.security.newLength'))
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('accountSettings.security.matchError'))
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      setError(t('accountSettings.security.sameError'))
      return
    }

    setIsUpdating(true)
    setSuccessMessage(false)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsUpdating(false)
    setSuccessMessage(true)
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(false), 3000)
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t('accountSettings.security.title')}</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Current Password Field */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-2">
            {t('accountSettings.security.currentPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder={t('accountSettings.security.currentPasswordPlaceholder')}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10 disabled:bg-slate-100"
              disabled={isUpdating}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              disabled={isUpdating}
            >
              {showPasswords.current ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-2">
            {t('accountSettings.security.newPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder={t('accountSettings.security.newPasswordPlaceholder')}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10 disabled:bg-slate-100"
              disabled={isUpdating}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              disabled={isUpdating}
            >
              {showPasswords.new ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
            {t('accountSettings.security.confirmPassword')}
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('accountSettings.security.confirmPasswordPlaceholder')}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10 disabled:bg-slate-100"
              disabled={isUpdating}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              disabled={isUpdating}
            >
              {showPasswords.confirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <p className="text-sm font-medium text-green-800">{t('accountSettings.security.success')}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleChangePassword}
            disabled={isUpdating}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200 disabled:cursor-not-allowed"
          >
            {isUpdating ? t('accountSettings.security.changing') : t('accountSettings.security.change')}
          </button>
        </div>
      </div>
    </div>
  )
}
