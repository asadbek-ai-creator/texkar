'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const footerColumns = [
    {
      title: t('footer.product'),
      links: [
        { label: t('navbar.features'), href: '#features' },
        { label: t('navbar.pricing'), href: '#pricing' },
        { label: t('navbar.howItWorks'), href: '#how-it-works' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'), href: '#' },
        { label: t('footer.contact'), href: '#' },
        { label: t('footer.blog'), href: '#' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacyPolicy'), href: '#' },
        { label: t('footer.termsOfService'), href: '#' },
        { label: t('footer.cookiePolicy'), href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-slate-200 bg-slate-800 text-slate-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Section - Logo and Description */}
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AI DM</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Links Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Bottom Section */}
        <div className="pt-8">
          <p className="text-center text-sm text-slate-400">
            © {currentYear} AI DM Automator. {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
