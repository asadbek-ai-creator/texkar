'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError(t('auth.login.emailRequired'))
      return
    }

    if (!isValidEmail(email)) {
      setError(t('auth.login.emailInvalid'))
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Password reset email sent to:', email)
      setSubmitted(true)
    } catch (err) {
      setError(t('auth.forgotPassword.error'))
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.forgotPassword.successTitle')}</h1>
            <p className="text-gray-600">{t('auth.forgotPassword.successSubtitle')} {email}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700">
              {t('auth.forgotPassword.successMessage')}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {t('auth.forgotPassword.backToLogin')}
            </button>
            <p className="text-center text-sm text-gray-600">
              {t('auth.forgotPassword.noEmail')}{' '}
              <button
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {t('auth.forgotPassword.tryAgain')}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft size={20} />
            {t('auth.forgotPassword.backToLogin')}
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.forgotPassword.title')}</h1>
            <p className="text-gray-600">
              {t('auth.forgotPassword.subtitle')}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.forgotPassword.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? t('auth.forgotPassword.submitting') : t('auth.forgotPassword.submit')}
          </button>
        </form>

        {/* Help Text */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          {t('auth.forgotPassword.rememberPassword')}{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            {t('auth.forgotPassword.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
