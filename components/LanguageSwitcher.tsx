'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function LanguageSwitcher({
    variant = 'dark',
    direction = 'up'
}: {
    variant?: 'dark' | 'light',
    direction?: 'up' | 'down'
}) {
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
        { code: 'uz' as const, name: t('language.uzbek') },
        { code: 'kaa' as const, name: t('language.kaa') },
    ]

    const currentLanguage = languages.find(lang => lang.code === language)

    const baseButtonClass = "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors"
    const variantButtonClass = variant === 'dark'
        ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"

    const dropdownBaseClass = "absolute left-0 w-full rounded-lg border shadow-lg overflow-hidden z-50"
    const dropdownVariantClass = variant === 'dark'
        ? "border-slate-700 bg-slate-800"
        : "border-slate-200 bg-white"

    const dropdownPositionClass = direction === 'up'
        ? "bottom-full mb-2"
        : "top-full mt-2"

    const itemBaseClass = "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
    const getItemClass = (langCode: string) => {
        if (variant === 'dark') {
            return language === langCode
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-slate-300 hover:bg-slate-700'
        } else {
            return language === langCode
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${baseButtonClass} ${variantButtonClass}`}
            >
                <Globe className="h-5 w-5" />
                <div className="flex items-center gap-2">
                    <span className="font-medium">{language.toUpperCase()}</span>
                </div>
            </button>

            {isOpen && (
                <div className={`${dropdownBaseClass} ${dropdownVariantClass} ${dropdownPositionClass}`}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code)
                                setIsOpen(false)
                            }}
                            className={`${itemBaseClass} ${getItemClass(lang.code)}`}
                        >
                            <span className="font-medium">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
