'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, User, Bot, Clock, Award, BookOpen } from 'lucide-react'
import { getConversationMessages, getLeadDetail, ConversationMessage } from '@/lib/api'

interface Lead {
    id: number
    user_id: number
    username: string
    telegram_id: string
    phone_number: string
    interested_course: string
    status: string
    lead_score: number
    created_at: string
    conversation_id: number | null
}

interface Conversation {
    id: number
    session_id: string
    user_id: number
    messages: ConversationMessage[]
}

export default function LeadDetailPage() {
    const router = useRouter()
    const params = useParams()
    const leadId = params?.id as string

    const [lead, setLead] = useState<Lead | null>(null)
    const [messages, setMessages] = useState<ConversationMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchLeadDetails() {
            if (!leadId) return

            try {
                setLoading(true)
                setError(null)

                // Fetch lead details
                const leadData = await getLeadDetail(parseInt(leadId))
                setLead(leadData)

                // Fetch conversation messages if conversation_id exists
                if (leadData.conversation_id) {
                    try {
                        const conversationMessages = await getConversationMessages(leadData.conversation_id)
                        setMessages(conversationMessages)
                    } catch (msgError) {
                        console.error('Error fetching messages:', msgError)
                        // Don't throw error, just leave messages empty
                    }
                }
            } catch (err) {
                console.error('Error fetching lead details:', err)
                setError('Failed to load lead details. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchLeadDetails()
    }, [leadId])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            new_lead: 'bg-blue-100 text-blue-700 border-blue-200',
            contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            enrolled: 'bg-green-100 text-green-700 border-green-200',
            churned: 'bg-gray-100 text-gray-700 border-gray-200',
            completed: 'bg-purple-100 text-purple-700 border-purple-200',
            returning: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        }

        return (
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badges[status] || badges.new_lead}`}>
                {status.replace('_', ' ').toUpperCase()}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-slate-600">Loading lead details...</p>
                </div>
            </div>
        )
    }

    if (error || !lead) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-4 text-red-600">{error || 'Lead not found'}</p>
                    <button
                        onClick={() => router.push('/dashboard/leads')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Back to Leads
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => router.push('/dashboard/leads')}
                    className="mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Leads
                </button>
                <h1 className="text-3xl font-bold text-slate-800">Lead Details</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Lead Info Sidebar */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <User className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{lead.username}</h2>
                                <p className="text-sm text-slate-500">ID: {lead.id}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</p>
                                <div className="mt-1">{getStatusBadge(lead.status)}</div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
                                <p className="mt-1 text-sm font-medium text-slate-900">{lead.phone_number || 'Not provided'}</p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Telegram ID</p>
                                <p className="mt-1 text-sm font-medium text-slate-900">{lead.telegram_id}</p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">User ID</p>
                                <p className="mt-1 text-sm font-medium text-slate-900">{lead.user_id}</p>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Award className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Lead Score</span>
                                </div>
                                <div className="mt-2 flex items-center gap-3">
                                    <span className="text-2xl font-bold text-slate-900">{lead.lead_score.toFixed(1)}</span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                                            style={{ width: `${lead.lead_score}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Interested Course</span>
                                </div>
                                <p className="mt-2 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-900">
                                    {lead.interested_course || 'Not specified'}
                                </p>
                                {lead.status !== 'enrolled' && lead.status !== 'completed' && (
                                    <p className="mt-2 text-xs text-amber-600">
                                        ⚠️ Not enrolled yet
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Created</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-900">{formatDate(lead.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-slate-800">Conversation History</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                {messages.length > 0 ? `${messages.length} messages` : 'No messages yet'}
                            </p>
                        </div>

                        <div className="max-h-[600px] overflow-y-auto p-6">
                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {message.role === 'assistant' && (
                                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                                    <Bot className="h-5 w-5 text-blue-600" />
                                                </div>
                                            )}

                                            <div
                                                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                                    message.role === 'user'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-900'
                                                }`}
                                            >
                                                {message.agent_name && (
                                                    <p className="mb-1 text-xs font-semibold opacity-75">
                                                        {message.agent_name}
                                                    </p>
                                                )}
                                                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                                                <p
                                                    className={`mt-2 text-xs ${
                                                        message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                                                    }`}
                                                >
                                                    {formatDate(message.created_at)}
                                                </p>
                                            </div>

                                            {message.role === 'user' && (
                                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                                                    <User className="h-5 w-5 text-slate-600" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center text-slate-500">
                                    <Bot className="mx-auto mb-4 h-12 w-12 text-slate-300" />
                                    <p>No conversation history available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
