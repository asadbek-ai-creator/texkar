'use client'

import { Phone, BookOpen, Clock, User, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type LeadStatus = 'new' | 'pending_contact' | 'contacted'

interface LeadCardProps {
    id: number
    firstName: string
    lastName: string
    courseInterest: string
    phoneNumber: string
    conversationDate: Date
    conversationTimeFrame: string
    status: LeadStatus
    wantsManagerContact: boolean
    contactedAt?: Date
    onStatusUpdate: (id: number, newStatus: LeadStatus) => void
}

export default function LeadCard({
    id,
    firstName,
    lastName,
    courseInterest,
    phoneNumber,
    conversationDate,
    conversationTimeFrame,
    status,
    wantsManagerContact,
    contactedAt,
    onStatusUpdate,
}: LeadCardProps) {
    const { t } = useLanguage()

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date)
    }

    const formatDateTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(date)
    }

    const getStatusBadge = () => {
        switch (status) {
            case 'new':
                return (
                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {t('leads.newLead')}
                    </div>
                )
            case 'pending_contact':
                return (
                    <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        {t('leads.needsManager')}
                    </div>
                )
            case 'contacted':
                return (
                    <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        <CheckCircle className="h-3 w-3" />
                        {t('leads.contacted')}
                    </div>
                )
        }
    }

    const handleTalkedTo = () => {
        onStatusUpdate(id, 'contacted')
    }

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            {/* Header with Name and Icon */}
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            {firstName} {lastName}
                        </h3>
                        <p className="text-sm text-slate-500">
                            {formatDate(conversationDate)}
                        </p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>

            {/* Manager Request Indicator */}
            {wantsManagerContact && status === 'pending_contact' && (
                <div className="mb-4 rounded-md bg-orange-50 border border-orange-200 px-3 py-2">
                    <p className="text-sm font-medium text-orange-800">
                        🔔 {t('leads.requestedManager')}
                    </p>
                </div>
            )}

            {/* Lead Details */}
            <div className="space-y-3">
                {/* Course Interest */}
                <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            {t('leads.courseInterest')}
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                            {courseInterest}
                        </p>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                        <p className="text-xs font-medium text-slate-500">{t('leads.phoneNumber')}</p>
                        <p className="text-sm font-medium text-slate-700">{phoneNumber}</p>
                    </div>
                </div>

                {/* Time Frame */}
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            {t('leads.conversationTime')}
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                            {conversationTimeFrame}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contacted Timestamp */}
            {status === 'contacted' && contactedAt && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                        {t('leads.contactedOn')} {formatDateTime(contactedAt)}
                    </p>
                </div>
            )}

            {/* Talked To Button */}
            {status === 'pending_contact' && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <button
                        onClick={handleTalkedTo}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
                    >
                        <CheckCircle className="h-5 w-5" />
                        {t('leads.talkedTo')}
                    </button>
                </div>
            )}
        </div>
    )
}
