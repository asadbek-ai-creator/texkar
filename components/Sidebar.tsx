'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Settings,
  UserCircle,
  LogOut,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { t } = useLanguage()

  const isActive = (href: string) => {
    return pathname === href
  }

  const getLinkClassName = (href: string) => {
    const baseClass = 'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors'
    const activeClass = 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
    const inactiveClass = 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'

    return `${baseClass} ${isActive(href) ? activeClass : inactiveClass}`
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      // TODO: Replace with actual logout API call
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Clear any session data
      // In a real app, this would clear auth tokens, session storage, etc.
      localStorage.removeItem('authToken')
      sessionStorage.clear()

      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-700 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/dialogic-logo.png"
            alt="Dialogic"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold text-white">DIALOGIC</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        <Link
          href="/dashboard"
          className={getLinkClassName('/dashboard')}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.dashboard')}</span>
        </Link>

        <Link
          href="/dashboard/leads"
          className={getLinkClassName('/dashboard/leads')}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.leads')}</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className={getLinkClassName('/dashboard/settings')}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.settings')}</span>
        </Link>

        <Link
          href="/dashboard/account"
          className={getLinkClassName('/dashboard/account')}
        >
          <UserCircle className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.account')}</span>
        </Link>
      </nav>

      {/* Footer - Language Switcher & Logout */}
      <div className="border-t border-slate-700 px-3 py-6 space-y-4">
        <LanguageSwitcher />

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">
            {isLoggingOut ? t('common.loggingOut') : t('common.logout')}
          </span>
        </button>
      </div>
    </div>
  )
}
