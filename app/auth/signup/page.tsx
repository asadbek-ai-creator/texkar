'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SignupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [agreeToTerms, setAgreeToTerms] = useState({
    privacy: false,
    terms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAgreeToTerms(prev => ({
      ...prev,
      [name]: checked,
    }))
    setError('')
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fullName.trim()) {
      setError(t('auth.signup.nameRequired'))
      return
    }

    if (formData.fullName.trim().length < 2) {
      setError(t('auth.signup.nameLength'))
      return
    }

    if (!formData.email.trim()) {
      setError(t('auth.login.emailRequired'))
      return
    }

    if (!isValidEmail(formData.email)) {
      setError(t('auth.login.emailInvalid'))
      return
    }

    if (!formData.password) {
      setError(t('auth.login.passwordRequired'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('auth.login.passwordLength'))
      return
    }

    if (!agreeToTerms.privacy) {
      setError(t('auth.signup.privacyRequired'))
      return
    }

    if (!agreeToTerms.terms) {
      setError(t('auth.signup.termsRequired'))
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // For now, just redirect to setup/dashboard on successful validation
      // In a real app, you would create account with a backend
      console.log('Signup attempt:', formData)
      router.push('/setup')
    } catch (err) {
      setError(t('auth.signup.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.password &&
    agreeToTerms.privacy &&
    agreeToTerms.terms

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm border border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/dialogic-logo.png"
              alt="Dialogic"
              className="h-12 w-12 rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('auth.signup.title')}</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.signup.fullName')}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t('auth.signup.fullName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              disabled={isLoading}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.signup.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.signup.password')}
            </label>
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('auth.signup.password')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10 disabled:bg-gray-100"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < passwordStrength
                        ? passwordStrength <= 1
                          ? 'bg-red-500'
                          : passwordStrength <= 2
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={agreeToTerms.privacy}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer mt-1"
              />
              <label htmlFor="privacy" className="ml-3 text-sm text-gray-600 cursor-pointer">
                {t('auth.signup.agreePrivacy')}{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                  {t('auth.signup.privacyPolicy')}
                </Link>
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={agreeToTerms.terms}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer mt-1"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600 cursor-pointer">
                {t('auth.signup.agreeTerms')}{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                  {t('auth.signup.termsOfService')}
                </Link>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6 disabled:cursor-not-allowed"
          >
            {isLoading ? t('auth.signup.submitting') : t('auth.signup.submit')}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          {t('auth.signup.hasAccount')}{' '}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {t('auth.signup.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
