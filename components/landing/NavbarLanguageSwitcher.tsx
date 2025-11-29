'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function NavbarLanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const languages = [
        { code: 'en' as const, name: t('language.english') },
        { code: 'ru' as const, name: t('language.russian') },
    ]

    const currentLanguage = languages.find(lang => lang.code === language)

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <span className="uppercase">{language}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5 transition-all animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code)
                                    setIsOpen(false)
                                }}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${language === lang.code
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span>{lang.name}</span>
                                {language === lang.code && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
