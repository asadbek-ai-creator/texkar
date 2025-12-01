'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Menu, X } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Desktop: Fixed, Mobile: Drawer */}
        <div
          className={`
            fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:z-auto
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50 lg:ml-64">
          {/* Mobile Header with Hamburger */}
          <div className="sticky top-0 z-30 flex items-center gap-4 bg-white px-4 py-3 shadow-sm lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Dialogic"
                className="h-8 w-8 rounded-lg bg-blue-600 p-1"
              />
              <span className="text-lg font-bold text-slate-900">DIALOGIC</span>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
}
