"use client"

export default function AdminNotificationsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1000px]">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test page - Notifications module working!
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <p>Notifications page is loading correctly!</p>
        <p>If you see this, the routing is working.</p>
      </div>
    </div>
  )
}
