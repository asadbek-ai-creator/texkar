'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DangerZoneCard() {
  const { t } = useLanguage()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In a real app, this would redirect to login or home page after deletion
    console.log('Account deleted')
    alert(t('accountSettings.dangerZone.successAlert'))
    window.location.href = '/'
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm border-l-4 border-red-500">
      {/* Card Header */}
      <div className="mb-6 flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t('accountSettings.dangerZone.title')}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('accountSettings.dangerZone.description')}
          </p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation ? (
        <div className="space-y-4 rounded-lg bg-red-50 p-6 border border-red-200">
          <div>
            <h3 className="font-semibold text-red-900 mb-2">{t('accountSettings.dangerZone.confirmTitle')}</h3>
            <p className="text-sm text-red-800 mb-4">
              {t('accountSettings.dangerZone.confirmMessage')}
            </p>
            <p className="text-sm text-red-800">{t('accountSettings.dangerZone.typeEmail')}</p>
          </div>

          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            disabled={isDeleting}
          />

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={handleCancel}
              disabled={isDeleting}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('accountSettings.dangerZone.cancel')}
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed"
            >
              {isDeleting ? t('accountSettings.dangerZone.deleting') : t('accountSettings.dangerZone.delete')}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={handleDeleteClick}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          >
            {t('accountSettings.dangerZone.delete')}
          </button>
        </div>
      )}
    </div>
  )
}
