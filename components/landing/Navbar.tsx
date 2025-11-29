'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { label: t('navbar.features'), href: '#features' },
    { label: t('navbar.pricing'), href: '#pricing' },
    { label: t('navbar.howItWorks'), href: '#how-it-works' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/dialogic-logo.png"
              alt="Dialogic"
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900">DIALOGIC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="w-40">
              <LanguageSwitcher variant="light" direction="down" />
            </div>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {t('common.login')}
            </Link>
            <Link href="/auth/signup" className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
              {t('common.signUpFree')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 pb-4 md:hidden">
            <div className="space-y-3 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="px-2">
                  <LanguageSwitcher variant="light" direction="down" />
                </div>
                <Link
                  href="/auth/login"
                  className="block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
                <Link href="/auth/signup" className="block w-full rounded-lg bg-blue-600 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                  {t('common.signUpFree')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
