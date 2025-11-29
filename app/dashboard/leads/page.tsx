'use client'

import { useEffect, useState } from 'react'
import { Eye, Flame } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Lead {
    id: number
    name: string
    email: string
    phone: string
    course: string
    status: 'new_lead' | 'enrolled' | 'churned'
    score: number
    createdAt: string
}

export default function LeadsPage() {
    const { t } = useLanguage()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchLeads() {
            try {
                const res = await fetch('/api/leads')
                const data = await res.json()
                setLeads(data)
            } catch (error) {
                console.error('Failed to fetch leads:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeads()
    }, [])

    const getStatusBadge = (status: Lead['status']) => {
        const badges = {
            new_lead: 'bg-blue-100 text-blue-700 border-blue-200',
            enrolled: 'bg-green-100 text-green-700 border-green-200',
            churned: 'bg-gray-100 text-gray-700 border-gray-200',
        }

        const labels = {
            new_lead: 'New Lead',
            enrolled: 'Enrolled',
            churned: 'Churned',
        }

        return (
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badges[status]}`}>
                {labels[status]}
            </span>
        )
    }

    const renderLeadScore = (score: number) => {
        if (score > 80) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{score.toFixed(1)}</span>
                    <Flame className="h-4 w-4 text-orange-500" />
                </div>
            )
        } else {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{score.toFixed(1)}</span>
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>
            )
        }
    }

    const handleViewDetails = (leadId: number) => {
        // In a real app, this would navigate to a detail page or open a modal
        console.log('View details for lead:', leadId)
        alert(`View details for lead ID: ${leadId}`)
    }

    return (
        <div className="space-y-6 p-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{t('leads.title')}</h1>
                <p className="mt-2 text-slate-600">{t('leads.subtitle')}</p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-600">New Leads</p>
                    <p className="text-2xl font-bold text-blue-700">
                        {leads.filter((l) => l.status === 'new_lead').length}
                    </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-600">Enrolled</p>
                    <p className="text-2xl font-bold text-green-700">
                        {leads.filter((l) => l.status === 'enrolled').length}
                    </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-600">Churned</p>
                    <p className="text-2xl font-bold text-gray-700">
                        {leads.filter((l) => l.status === 'churned').length}
                    </p>
                </div>
            </div>

            {/* Leads Table */}
            {loading ? (
                <div className="text-center text-slate-500">Loading leads...</div>
            ) : leads.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Phone
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Course
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Lead Score
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="transition-colors hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">{lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">{lead.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">{lead.course}</div>
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                                    <td className="px-6 py-4">{renderLeadScore(lead.score)}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewDetails(lead.id)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-12">
                    <h3 className="mb-2 text-lg font-semibold text-slate-700">
                        {t('leads.noLeadsYet')}
                    </h3>
                    <p className="text-slate-500">{t('leads.noLeadsMessage')}</p>
                </div>
            )}
        </div>
    )
}
