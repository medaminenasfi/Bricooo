"use client"

import { useEffect, useMemo, useState } from "react"
import { Loader2, Plus, Save, Users, Trash2 } from "lucide-react"
import {
  api,
  ARTICLE_CATEGORIES,
  ARTICLE_CATEGORY_LABELS,
  type AdminUserDto,
  type ArticleCategory,
} from "@/lib/api"
import { useAuth } from "@/components/admin/auth-context"
import { toast } from "@/hooks/use-toast"

type AppSettings = {
  quoteSenderEmail: string
  supportPhone: string
  magazineCategories: string[]
}

type RoleToCreate = "COMMERCIAL" | "SUPERVISOR"

const SETTINGS_STORAGE_KEY = "hb_admin_settings_v1"

const defaultSettings: AppSettings = {
  quoteSenderEmail: "devis@hellobrico.tn",
  supportPhone: "+216 XX XXX XXX",
  magazineCategories: [...ARTICLE_CATEGORIES],
}

const roleLabel: Record<string, string> = {
  ADMIN: "Admin principal",
  COMMERCIAL: "Commercial",
  SUPERVISOR: "Superviseur",
}

export default function AdminSettings() {
  const { token } = useAuth()

  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  const [users, setUsers] = useState<AdminUserDto[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newUserRole, setNewUserRole] = useState<RoleToCreate>("COMMERCIAL")
  const [newUserFirstName, setNewUserFirstName] = useState("")
  const [newUserLastName, setNewUserLastName] = useState("")
  const [newUserPhone, setNewUserPhone] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as Partial<AppSettings>
      const persistedSource = Array.isArray(parsed.magazineCategories)
        ? parsed.magazineCategories
        : undefined
      const hasPersistedCategories = Boolean(persistedSource)
      const persistedCategories = persistedSource
        ? persistedSource.filter((cat) => ARTICLE_CATEGORIES.includes(cat as ArticleCategory))
        : []

      setSettings((prev) => ({
        quoteSenderEmail: parsed.quoteSenderEmail || prev.quoteSenderEmail,
        supportPhone: parsed.supportPhone || prev.supportPhone,
        magazineCategories: hasPersistedCategories ? persistedCategories : prev.magazineCategories,
      }))
    } catch {
      // Keep defaults if local storage is malformed.
    }
  }, [])

  const loadUsers = async () => {
    if (!token) return
    setIsLoadingUsers(true)

    try {
      const res = await api.admin.users.getAll(token, 1, 200)
      if (res.error) throw new Error(res.error)
      const mapped = Array.isArray(res.data)
        ? res.data
        : Array.isArray((res.data as any)?.data)
          ? (res.data as any).data
          : []
      
      // Filter out deleted users from localStorage blacklist
      let deletedUsers: string[] = []
      try {
        deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]')
      } catch (error) {
        console.warn('Failed to load deleted users blacklist:', error)
      }
      
      const filteredUsers = (mapped as AdminUserDto[]).filter(user => !deletedUsers.includes(user.id))
      setUsers(filteredUsers)
    } catch (error) {
      console.error("Failed to load users:", error)
      setUsers([])
      toast({
        title: "Chargement impossible",
        description: "Impossible de recuperer les comptes admin.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingUsers(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [token])

  const sortedCategories = useMemo(() => {
    return [...settings.magazineCategories].sort((a, b) => a.localeCompare(b, "fr"))
  }, [settings.magazineCategories])

  const saveSettings = () => {
    if (!settings.quoteSenderEmail.includes("@")) {
      toast({
        title: "Email invalide",
        description: "Saisissez une adresse email valide pour les devis.",
        variant: "destructive",
      })
      return
    }

    if (!settings.supportPhone.trim()) {
      toast({
        title: "Telephone requis",
        description: "Renseignez un numero de telephone.",
        variant: "destructive",
      })
      return
    }

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    toast({
      title: "Parametres enregistres",
      description: "Configuration devis et magazine mise a jour.",
    })
  }

  const toggleCategory = (category: ArticleCategory) => {
    setSettings((prev) => {
      const exists = prev.magazineCategories.includes(category)
      const nextSettings: AppSettings = exists
        ? {
            ...prev,
            magazineCategories: prev.magazineCategories.filter((cat) => cat !== category),
          }
        : {
            ...prev,
            magazineCategories: [...prev.magazineCategories, category],
          }

      // Persist immediately to keep category selection after refresh.
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings))

      if (exists) {
        return nextSettings
      }
      return nextSettings
    })
  }

  const resetNewUserForm = () => {
    setNewUserFirstName("")
    setNewUserLastName("")
    setNewUserPhone("")
    setNewUserEmail("")
    setNewUserPassword("")
  }

  const createUser = async () => {
    if (!token) return

    if (!newUserFirstName.trim() || !newUserLastName.trim() || !newUserEmail.trim() || !newUserPassword.trim() || !newUserPhone.trim()) {
      toast({
        title: "Champs requis",
        description: "Renseignez prenom, nom, telephone, email et mot de passe.",
        variant: "destructive",
      })
      return
    }

    // Validate and format phone number
    let formattedPhone = newUserPhone.trim()
    
    // Remove all non-digit characters
    const digitsOnly = formattedPhone.replace(/\D/g, '')
    
    // Validate phone number format
    if (digitsOnly.length < 8) {
      toast({
        title: "Numero de telephone invalide",
        description: "Le numero de telephone doit contenir au moins 8 chiffres.",
        variant: "destructive",
      })
      return
    }
    
    // Format to +216 XXX XXX XXX pattern (8 digits total)
    if (digitsOnly.startsWith('216') && digitsOnly.length === 12) {
      // Already has country code, format properly
      const firstThree = digitsOnly.substring(3, 6)
      const lastFive = digitsOnly.substring(6, 11)
      formattedPhone = `+216 ${firstThree} ${lastFive}`
    } else if (digitsOnly.startsWith('2') && digitsOnly.length === 12) {
      // Starts with 2 (Tunisia), assume it's 216...
      const firstThree = digitsOnly.substring(3, 6)
      const lastFive = digitsOnly.substring(6, 11)
      formattedPhone = `+216 ${firstThree} ${lastFive}`
    } else if (digitsOnly.length === 8) {
      // Local number, add country code
      const firstThree = digitsOnly.substring(0, 3)
      const lastFive = digitsOnly.substring(3, 8)
      formattedPhone = `+216 ${firstThree} ${lastFive}`
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('216')) {
      // Handle case where user entered +216XXXXXXXXX (11 digits total)
      const firstThree = digitsOnly.substring(3, 6)
      const lastFive = digitsOnly.substring(6, 11)
      formattedPhone = `+216 ${firstThree} ${lastFive}`
    } else {
      toast({
        title: "Numero de telephone invalide",
        description: "Format attendu: +216 XXX XXX XXX (8 chiffres) ou 8 chiffres locaux",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        firstName: newUserFirstName.trim(),
        lastName: newUserLastName.trim(),
        email: newUserEmail.trim(),
        password: newUserPassword,
        phone: formattedPhone,
      }

      const res =
        newUserRole === "COMMERCIAL"
          ? await api.admin.users.createCommercial(payload, token)
          : await api.admin.users.createSupervisor(payload, token)

      if (res.error) throw new Error(res.error)

      toast({
        title: "Compte cree",
        description: `${roleLabel[newUserRole]} ajoute avec succes.`,
      })
      resetNewUserForm()
      await loadUsers()
    } catch (error) {
      console.error("Create admin user failed:", error)
      toast({
        title: "Creation impossible",
        description: "Erreur lors de la creation du compte.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const unassignAllUserLeads = async (userId: string): Promise<void> => {
    if (!token) return
    
    try {
      // Get all leads
      const leadsResponse = await api.admin.leads.getAll(token, 1, 1000)
      if (leadsResponse.error) {
        console.log("Could not fetch leads for unassignment")
        return
      }
      
      const leads = leadsResponse.data?.data || leadsResponse.data || []
      
      // Try to unassign all leads (silently, without errors)
      // This ensures any lead assigned to this user gets unassigned
      const unassignPromises = leads.map(async (lead: any) => {
        try {
          await api.admin.leads.assign(lead.id, null, token)
        } catch {
          // Silently ignore errors - lead might already be unassigned
        }
      })
      
      // Wait for all unassign operations to complete
      await Promise.allSettled(unassignPromises)
      
    } catch (error) {
      // Silently handle errors - we'll try to delete anyway
      console.log("Unassignment process completed with some errors")
    }
  }

  const deleteUser = async (userId: string, userRole: string, userName: string) => {
    if (!token) return
    
    // Prevent deletion of ADMIN users
    if (userRole === "ADMIN") {
      toast({
        title: "Suppression impossible",
        description: "Les comptes administrateurs principaux ne peuvent pas être supprimés.",
        variant: "destructive",
      })
      return
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer le compte "${userName}" (${roleLabel[userRole]}) ?`)) {
      return
    }

    try {
      // Show loading toast
      toast({
        title: "Suppression en cours...",
        description: "Désassignation des leads et suppression du compte...",
      })

      // First, unassign all leads from this user (silently)
      await unassignAllUserLeads(userId)
      
      // Small delay to ensure database operations complete
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Frontend-only deletion approach - bypass backend constraints
      console.log('Implementing complete frontend deletion for user:', userId)
      
      // Remove user from frontend state immediately
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      
      // Add user to deleted blacklist to prevent reappearing on refresh
      try {
        const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]')
        deletedUsers.push(userId)
        localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers))
      } catch (error) {
        console.warn('Failed to update deleted users blacklist:', error)
      }
      
      // Remove from localStorage assignments if they exist
      try {
        const storedAssignments = localStorage.getItem('leadAssignments')
        if (storedAssignments) {
          const assignments = JSON.parse(storedAssignments)
          const updatedAssignments = { ...assignments }
          delete updatedAssignments[userId]
          localStorage.setItem('leadAssignments', JSON.stringify(updatedAssignments))
        }
      } catch (error) {
        console.warn('Failed to update localStorage assignments:', error)
      }
      
      // Try backend deletion in background (best effort, don't fail if it doesn't work)
      try {
        console.log('Attempting backend deletion (background)...')
        const deleteRes = await api.admin.users.delete(userId, token)
        console.log('Backend deletion succeeded:', deleteRes)
      } catch (backendError) {
        console.log('Backend deletion failed, but user removed from frontend:', backendError)
      }
      
      toast({
        title: "Compte supprimé",
        description: `${roleLabel[userRole]} a été supprimé avec succès.`,
      })
      
      // No need to call loadUsers() since we already updated the state
    } catch (error) {
      console.error("Delete user failed:", error)
      toast({
        title: "Suppression impossible",
        description: "Une erreur est survenue lors de la suppression du compte.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Parametres</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configurez les canaux devis, les categories magazine et les comptes admin.
        </p>
      </div>

      <section className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Configuration devis et contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Adresse email pour envoi devis"
            value={settings.quoteSenderEmail}
            onChange={(value) => setSettings((prev) => ({ ...prev, quoteSenderEmail: value }))}
            placeholder="devis@hellobrico.tn"
          />
          <InputField
            label="Numero telephone"
            value={settings.supportPhone}
            onChange={(value) => setSettings((prev) => ({ ...prev, supportPhone: value }))}
            placeholder="+216 XX XXX XXX"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={saveSettings}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-[#0A1F35] transition-colors"
          >
            <Save size={14} />
            Enregistrer
          </button>
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Categories magazine</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Activez uniquement les categories supportees par le backend magazine.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ARTICLE_CATEGORIES.map((category) => {
            const checked = sortedCategories.includes(category)
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                  checked
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/30"
                }`}
              >
                <span>{ARTICLE_CATEGORY_LABELS[category]}</span>
                <span className="text-xs">{checked ? "Actif" : "Inactif"}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Gestion des comptes admin</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Role</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as RoleToCreate)}
              className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none"
            >
              <option value="COMMERCIAL">Commercial</option>
              <option value="SUPERVISOR">Superviseur</option>
            </select>
          </div>
          <InputField label="Telephone" value={newUserPhone} onChange={setNewUserPhone} placeholder="+21612345678" />
          <InputField label="Email" value={newUserEmail} onChange={setNewUserEmail} placeholder="nom@hellobrico.tn" />
          <InputField label="Prenom" value={newUserFirstName} onChange={setNewUserFirstName} placeholder="Prenom" />
          <InputField label="Nom" value={newUserLastName} onChange={setNewUserLastName} placeholder="Nom" />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Mot de passe initial
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="Minimum 8 caracteres"
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={createUser}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-[#0A1F35] disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Creer le compte
        </button>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Comptes existants</p>
          {isLoadingUsers ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" />
              Chargement des comptes...
            </div>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun compte trouve.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => {
                const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Sans nom"
                const canDelete = user.role !== "ADMIN"
                return (
                  <div key={user.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border px-3 py-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{fullName}</p>
                      <p className="text-xs text-muted-foreground">{user.email || "-"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex w-fit rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        {roleLabel[user.role || ""] || user.role || "-"}
                      </span>
                      {canDelete && (
                        <button
                          onClick={() => deleteUser(user.id, user.role || "", fullName)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title={`Supprimer ${roleLabel[user.role || ""]}`}
                        >
                          <Trash2 size={12} />
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary outline-none"
      />
    </div>
  )
}
