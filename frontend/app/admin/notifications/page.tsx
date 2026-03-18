"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell, CheckCheck, Loader2 } from "lucide-react"
import { type NotificationDto } from "@/lib/api"
import { useAuth } from "@/components/admin/auth-context"
import { toast } from "@/hooks/use-toast"

export default function AdminNotificationsPage() {
  const { token, user } = useAuth()
  const [notifications, setNotifications] = useState<NotificationDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isSeen).length,
    [notifications],
  )

  
  const loadNotifications = async () => {
    if (!token) return
    setIsLoading(true)
    
    try {
      // Load from backend API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (res.ok) {
        const data = await res.json()
        
        // Backend returns user notifications with nested notification data
        let notifications: NotificationDto[] = []
        
        if (Array.isArray(data)) {
          // Map backend UserNotification to frontend NotificationDto
          notifications = data.map((userNotif: any) => ({
            id: userNotif.notification.id,
            title: userNotif.notification.title,
            content: userNotif.notification.content,
            isSeen: userNotif.isSeen,
            createdAt: userNotif.notification.createdAt
          }))
        } else if (data.data && Array.isArray(data.data)) {
          // Handle wrapped response
          notifications = data.data.map((userNotif: any) => ({
            id: userNotif.notification.id,
            title: userNotif.notification.title,
            content: userNotif.notification.content,
            isSeen: userNotif.isSeen,
            createdAt: userNotif.notification.createdAt
          }))
        }
        
        setNotifications(notifications)
      } else {
        throw new Error('Backend API not available')
      }
    } catch (error) {
      console.error("Failed to load notifications from backend:", error)
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les notifications. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadNotifications()
  }, [token])

  const markSeen = async (id: string) => {
    if (!token) return
    setIsSubmitting(true)
    try {
      // Call backend API to mark as seen
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/seen`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (res.ok) {
        // Update local state
        const updatedNotifications = notifications.map((notification) =>
          notification.id === id ? { ...notification, isSeen: true } : notification,
        )
        setNotifications(updatedNotifications)
        
        toast({ title: "Notification lue", description: "La notification a été marquée comme lue." })
      } else {
        // Fallback: Update local state only
        const updatedNotifications = notifications.map((notification) =>
          notification.id === id ? { ...notification, isSeen: true } : notification,
        )
        setNotifications(updatedNotifications)
        
        toast({ title: "Notification lue", description: "La notification a été marquée comme lue (mode local)." })
      }
    } catch (error) {
      toast({
        title: "Action impossible",
        description: "Impossible de marquer la notification comme lue.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const markAllRead = async () => {
    if (!token) return
    setIsSubmitting(true)
    try {
      // Mark each notification as seen individually (backend doesn't have markAllRead endpoint)
      const markPromises = notifications
        .filter(n => !n.isSeen)
        .map(notification => 
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notification.id}/seen`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        )
      
      await Promise.allSettled(markPromises)
      
      // Update local state
      const updatedNotifications = notifications.map((notification) => ({ ...notification, isSeen: true }))
      setNotifications(updatedNotifications)
      
      toast({ title: "Notifications mises a jour", description: "Toutes les notifications sont lues." })
    } catch (error) {
      toast({
        title: "Action impossible",
        description: "Impossible de marquer toutes les notifications comme lues.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1000px]">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Suivez les alertes systeme et marquez-les comme lues.
          </p>
        </div>

        <button
          onClick={markAllRead}
          disabled={isSubmitting || unreadCount === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-[#0A1F35] disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCheck size={14} />}
          Tout marquer lu
        </button>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Chargement des notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Aucune notification.</div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start justify-between gap-3 ${
                  notification.isSeen ? "bg-card" : "bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <Bell size={16} className="mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {notification.title || "Notification"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                      {notification.content || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.createdAt
                        ? new Intl.DateTimeFormat("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(notification.createdAt))
                        : ""}
                    </p>
                  </div>
                </div>

                {!notification.isSeen ? (
                  <button
                    onClick={() => void markSeen(notification.id)}
                    disabled={isSubmitting}
                    className="text-xs text-primary hover:underline shrink-0"
                  >
                    Marquer lu
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground shrink-0">Lue</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
