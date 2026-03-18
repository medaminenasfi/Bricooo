"use client"

import { useEffect, useState } from "react"
import { Bell, Loader2 } from "lucide-react"
import { type NotificationDto } from "@/lib/api"
import { useAuth } from "./auth-context"
import { useRouter } from "next/navigation"

export function NotificationBell() {
  const { token, user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize demo notifications
  const initializeDemoNotifications = (): NotificationDto[] => {
    const baseNotifications = [
      {
        id: 'demo-1',
        title: 'Nouveau lead reçu',
        content: 'Un nouveau lead a été soumis et nécessite votre attention.',
        isSeen: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo-2',
        title: 'Rappel de suivi',
        content: 'N\'oubliez pas de suivre les leads en attente depuis plus de 24h.',
        isSeen: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'demo-3',
        title: 'Devis envoyé',
        content: 'Un devis a été envoyé au client avec succès.',
        isSeen: true,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ]

    // Add role-specific notifications
    if (user?.role === 'ADMIN') {
      baseNotifications.push({
        id: 'demo-4',
        title: 'Nouvel utilisateur inscrit',
        content: 'Un nouvel utilisateur commercial s\'est inscrit sur la plateforme.',
        isSeen: false,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      })
    } else if (user?.role === 'COMMERCIAL') {
      baseNotifications.push({
        id: 'demo-5',
        title: 'Lead assigné',
        content: 'Un nouveau lead vous a été assigné. Veuillez le traiter rapidement.',
        isSeen: false,
        createdAt: new Date(Date.now() - 900000).toISOString()
      })
    } else if (user?.role === 'SUPERVISOR') {
      baseNotifications.push({
        id: 'demo-6',
        title: 'Rapport d\'activité',
        content: 'Le rapport d\'activité hebdomadaire est disponible.',
        isSeen: false,
        createdAt: new Date(Date.now() - 2700000).toISOString()
      })
    }

    return baseNotifications
  }

  useEffect(() => {
    const loadNotifications = async () => {
      console.log('Notification bell: Loading notifications from backend...')
      if (!token) return
      setIsLoading(true)
      
      try {
        // Try to load from backend API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (res.ok) {
          const data = await res.json()
          console.log('Notification bell: Backend notifications response:', data)
          
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
          const unread = notifications.filter(n => !n.isSeen).length
          setUnreadCount(unread)
          console.log('Notification bell: Loaded from backend, unread count:', unread)
        } else {
          console.log('Notification bell: Backend API failed, using demo notifications')
          throw new Error('Backend API not available')
        }
      } catch (error) {
        console.error("Notification bell: Failed to load notifications from backend:", error)
        
        // Fallback to demo notifications when backend fails
        const demoNotifications = initializeDemoNotifications()
        setNotifications(demoNotifications)
        setUnreadCount(demoNotifications.filter(n => !n.isSeen).length)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotifications()
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [token, user])

  const handleClick = () => {
    console.log('Notification bell clicked, navigating to notifications')
    try {
      router.push('/admin/notifications')
    } catch (error) {
      console.error('Router navigation error:', error)
      // Fallback: use window.location
      window.location.href = '/admin/notifications'
    }
  }

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      title="Notifications"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Bell size={18} />
      )}
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
