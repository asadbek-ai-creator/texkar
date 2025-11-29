import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 overflow-auto bg-slate-50">
        {children}
      </div>
    </div>
  )
}
