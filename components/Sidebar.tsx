'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Settings,
  UserCircle,
  LogOut,
  Users,
  TrendingUp,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

interface SidebarProps {
  onCloseMobile?: () => void
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
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
      // Clear session data
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      sessionStorage.clear()

      // Redirect to login page
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Dialogic"
              className="h-8 w-8 rounded-lg bg-blue-600 p-1"
            />
            <span className="text-lg font-bold text-white">DIALOGIC</span>
          </Link>
          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 lg:hidden transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        <Link
          href="/dashboard"
          className={getLinkClassName('/dashboard')}
          onClick={onCloseMobile}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.dashboard')}</span>
        </Link>

        <Link
          href="/dashboard/leads"
          className={getLinkClassName('/dashboard/leads')}
          onClick={onCloseMobile}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.leads')}</span>
        </Link>

        <Link
          href="/dashboard/insights"
          className={getLinkClassName('/dashboard/insights')}
          onClick={onCloseMobile}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.insights')}</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className={getLinkClassName('/dashboard/settings')}
          onClick={onCloseMobile}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">{t('sidebar.settings')}</span>
        </Link>

        <Link
          href="/dashboard/account"
          className={getLinkClassName('/dashboard/account')}
          onClick={onCloseMobile}
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
