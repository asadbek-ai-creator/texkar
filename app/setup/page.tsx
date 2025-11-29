'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Instagram, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SetupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    businessCategory: '',
    instagramHandle: '',
    instagramConnected: false,
    telegramConnected: false,
  })

  const totalSteps = 3

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleConnect = (platform: 'instagram' | 'telegram') => {
    setIsLoading(true)
    // Simulate connection delay
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        [platform === 'instagram' ? 'instagramConnected' : 'telegramConnected']: true,
      }))
      setIsLoading(false)
    }, 1000)
  }

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!formData.businessName || !formData.businessCategory) {
        alert('Please fill in all fields')
        return
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSkipSetup = () => {
    router.push('/dashboard')
  }

  const handleCompleteSetup = async () => {
    setIsLoading(true)
    try {
      // TODO: Save setup data to backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center pt-8">
          <img
            src="/dialogic-logo.png"
            alt="Dialogic"
            className="h-16 w-16 rounded-lg mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('setup.title')}</h1>
          <p className="text-gray-600">{t('setup.subtitle')}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <button
              onClick={handleSkipSetup}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Skip for now
            </button>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your business</h2>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g., My Awesome Business"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Category
                </label>
                <select
                  id="businessCategory"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a category</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="agency">Agency</option>
                  <option value="creator">Content Creator</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleNextStep}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Connect Social Platforms */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('setup.step1.title')}</h2>
                <p className="text-gray-600 text-sm">{t('setup.step1.description')}</p>
              </div>

              {/* Instagram */}
              <div className="rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-3">
                      <Instagram size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Instagram</h3>
                      <p className="text-sm text-gray-600">Connect your Instagram business account</p>
                    </div>
                  </div>
                  {formData.instagramConnected ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-3 h-3 rounded-full bg-green-600" />
                      <span className="font-medium">{t('settings.integrations.connected')}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect('instagram')}
                      disabled={isLoading}
                      className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? t('settings.integrations.connecting') : t('settings.integrations.connect')}
                    </button>
                  )}
                </div>
              </div>

              {/* Telegram */}
              <div className="rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-500 p-3">
                      <Send size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Telegram</h3>
                      <p className="text-sm text-gray-600">Connect your Telegram bot for messaging</p>
                    </div>
                  </div>
                  {formData.telegramConnected ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-3 h-3 rounded-full bg-green-600" />
                      <span className="font-medium">{t('settings.integrations.connected')}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect('telegram')}
                      disabled={isLoading}
                      className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? t('settings.integrations.connecting') : t('settings.integrations.connect')}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!formData.instagramConnected && !formData.telegramConnected}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Setup Complete */}
          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="text-6xl">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900">You're all set!</h2>
                <p className="text-gray-600 text-lg">
                  Your account is ready to go. Start automating your DMs now.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-6 border border-blue-200 text-left space-y-3">
                <h3 className="font-semibold text-gray-900">What's next?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    Go to your dashboard to view your accounts
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    Set up automation rules for your accounts
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    Start engaging with your audience automatically
                  </li>
                </ul>
              </div>

              <button
                onClick={handleCompleteSetup}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition disabled:cursor-not-allowed"
              >
                {isLoading ? 'Going to Dashboard...' : t('setup.dashboardButton')}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help?{' '}
            <a href="mailto:support@aidm.com" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
