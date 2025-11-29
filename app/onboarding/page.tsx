'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Instagram, Send, CheckCircle2, ArrowLeft } from 'lucide-react'

type OnboardingStep = 1 | 2 | 3

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [formData, setFormData] = useState({
    businessName: '',
    businessCategory: '',
  })

  const categories = [
    'Education & Training',
    'E-commerce',
    'Healthcare',
    'Real Estate',
    'Hospitality',
    'Professional Services',
    'Technology',
    'Other'
  ]

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true')
    router.push('/dashboard')
  }

  const handleContinue = () => {
    if (currentStep === 1 && formData.businessName && formData.businessCategory) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true')
    router.push('/dashboard')
  }

  const handleConnectInstagram = () => {
    alert('Instagram connection coming soon!')
  }

  const handleConnectTelegram = () => {
    alert('Telegram connection coming soon!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="Dialogic"
              className="h-16 w-16 rounded-lg bg-blue-600 p-3"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Dialogic!</h1>
          <p className="text-lg text-gray-600">
            Let's get your AI assistant ready to help your customers.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
              {currentStep === 1 && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Skip for now
                </button>
              )}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
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
                  value={formData.businessCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessCategory: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleContinue}
                disabled={!formData.businessName || !formData.businessCategory}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Connect Accounts */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Account</h2>
                <p className="text-gray-600">Link your Instagram or Telegram account to start automating messages.</p>
              </div>

              {/* Instagram Card */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
                      <p className="text-sm text-gray-600 mt-1">Connect your Instagram business account</p>
                    </div>
                  </div>
                  <button
                    onClick={handleConnectInstagram}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                  >
                    Connect
                  </button>
                </div>
              </div>

              {/* Telegram Card */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Telegram</h3>
                      <p className="text-sm text-gray-600 mt-1">Connect your Telegram bot for messaging</p>
                    </div>
                  </div>
                  <button
                    onClick={handleConnectTelegram}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                  >
                    Connect
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Continue
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact support</a>
              </p>
            </div>
          )}

          {/* Step 3: Completion */}
          {currentStep === 3 && (
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">You're all set!</h2>
                <p className="text-lg text-gray-600">Your account is ready to go. Start automating your DMs now.</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Go to your dashboard to view your accounts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Set up automation rules for your accounts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Start engaging with your audience automatically</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Go to Dashboard
              </button>

              <p className="text-sm text-gray-500">
                Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact support</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
