"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ChevronDown, Phone, Mail, MapPin, Calendar, MessageSquare, FileText, ArrowLeft, Loader2, Download, Trash2, Send } from "lucide-react"
import { api, type AdminUserDto, type LeadDto, type LeadHistoryDto, type UploadedFileDto } from "@/lib/api"
import { useAuth } from "@/components/admin/auth-context"
import { useRouter } from "next/navigation"

const statuses = ["Tous", "NOUVEAU", "CONTACTE", "VISITE_PLANIFIEE", "DEVIS_ENVOYE", "NEGOCIATION", "CONVERTI", "PERDU"]

// Mapping backend enums to displayable French labels
const statusLabels: Record<string, string> = {
  "NOUVEAU": "Nouveau",
  "CONTACTE": "Contacté",
  "VISITE_PLANIFIEE": "Visite planifiée",
  "DEVIS_ENVOYE": "Devis envoyé",
  "NEGOCIATION": "Négociation",
  "CONVERTI": "Converti",
  "PERDU": "Perdu"
}

const statusColors: Record<string, string> = {
  "NOUVEAU": "bg-blue-50 text-blue-700",
  "CONTACTE": "bg-amber-50 text-amber-700",
  "VISITE_PLANIFIEE": "bg-indigo-50 text-indigo-700",
  "DEVIS_ENVOYE": "bg-emerald-50 text-emerald-700",
  "NEGOCIATION": "bg-orange-50 text-orange-700",
  "CONVERTI": "bg-green-50 text-green-700",
  "PERDU": "bg-red-50 text-red-700",
}

export default function AdminLeads() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tous")
  const [serviceFilter, setServiceFilter] = useState("Tous")
  const [budgetFilter, setBudgetFilter] = useState("Tous")
  const [isAbroadFilter, setIsAbroadFilter] = useState(false)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [allLeads, setAllLeads] = useState<LeadDto[]>([])
  const [leadAssignments, setLeadAssignments] = useState<Record<string, AdminUserDto | null>>({})
  const [assignableUsers, setAssignableUsers] = useState<AdminUserDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<LeadDto | null>(null)
  const [selectedLeadFiles, setSelectedLeadFiles] = useState<UploadedFileDto[]>([])
  const [isLoadingLeadDetails, setIsLoadingLeadDetails] = useState(false)
  
  // History and Notes states
  const [leadHistory, setLeadHistory] = useState<LeadHistoryDto[]>([])
  const [newNote, setNewNote] = useState("")
  const [isSubmittingNote, setIsSubmittingNote] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const [selectedAssigneeId, setSelectedAssigneeId] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const { token, user } = useAuth()

  useEffect(() => {
    const fetchLeads = async () => {
      if (!token) return
      setIsLoading(true)
      try {
        const [leadsRes, usersRes] = await Promise.all([
          api.admin.leads.getAll(token, 1, 1000),
          api.admin.users.getAll(token, 1, 1000),
        ])

        const leads = leadsRes.data?.data || leadsRes.data || []
        const users = usersRes.data?.data || usersRes.data || []

        setAllLeads(leads)
        
        // Filter assignable users based on current user's role
        let filteredUsers = users
        if (user?.role === "COMMERCIAL") {
          // Commercial users can assign to themselves and other commercial users
          filteredUsers = users.filter((u: AdminUserDto) => 
            u.role === "COMMERCIAL" || u.role === "SUPERVISOR"
          )
        } else if (user?.role === "SUPERVISOR") {
          // Supervisors can assign to commercial users and other supervisors
          filteredUsers = users.filter((u: AdminUserDto) => 
            u.role === "COMMERCIAL" || u.role === "SUPERVISOR"
          )
        } else {
          // Admins can assign to anyone except other admins
          filteredUsers = users.filter((u: AdminUserDto) => u.role !== "ADMIN")
        }
        
        setAssignableUsers(filteredUsers)
        
        // Load existing assignments from backend and localStorage
        const assignments: Record<string, AdminUserDto | null> = {}
        
        // First, try to load from localStorage as backup
        let localStorageAssignments: Record<string, string | null> = {}
        try {
          const stored = localStorage.getItem('leadAssignments')
          console.log('DEBUG: Raw localStorage data:', stored)
          if (stored) {
            localStorageAssignments = JSON.parse(stored)
            console.log('DEBUG: Parsed localStorage assignments:', localStorageAssignments)
          } else {
            console.log('DEBUG: No localStorage data found')
          }
        } catch (error) {
          console.warn('Failed to load assignments from localStorage:', error)
        }
        
        console.log('DEBUG: Available users:', users.map((u: AdminUserDto) => ({ id: u.id, name: `${u.firstName} ${u.lastName}`, role: u.role })))
        
        // For each lead, check if it has an assignment
        for (const lead of leads) {
          let assignedUser: AdminUserDto | null = null
          
          console.log(`DEBUG: Processing lead ${lead.id} (${lead.fullName})`)
          
          // Try backend first
          if (lead.assignedTo) {
            assignedUser = lead.assignedTo as AdminUserDto
            console.log(`DEBUG: Lead ${lead.id} has backend assignment:`, assignedUser)
          } else {
            console.log(`DEBUG: Lead ${lead.id} has no backend assignment, trying details API...`)
            // Try to get lead details to check assignment
            try {
              const leadDetailRes = await api.admin.leads.getById(lead.id, token)
              console.log(`DEBUG: Lead details API response for ${lead.id}:`, leadDetailRes.data)
              if (leadDetailRes.data?.assignedTo) {
                assignedUser = leadDetailRes.data.assignedTo as AdminUserDto
                console.log(`DEBUG: Found assignment in details API:`, assignedUser)
              }
            } catch (error) {
              console.log(`DEBUG: Details API failed for lead ${lead.id}:`, error)
              // Backend failed, try localStorage
            }
          }
          
          // If backend didn't provide assignment, try localStorage
          if (!assignedUser && localStorageAssignments[lead.id]) {
            const userId = localStorageAssignments[lead.id]
            console.log(`DEBUG: Trying localStorage for lead ${lead.id}, found userId:`, userId)
            if (userId) {
              assignedUser = users.find((u: AdminUserDto) => u.id === userId) || null
              console.log(`DEBUG: Found user in users list:`, assignedUser)
            } else {
              assignedUser = null
              console.log(`DEBUG: localStorage has null assignment for lead ${lead.id}`)
            }
          }
          
          if (!assignedUser) {
            console.log(`DEBUG: No assignment found for lead ${lead.id}`)
          }
          
          assignments[lead.id] = assignedUser
        }
        
        console.log('DEBUG: Final assignments object:', assignments)
        setLeadAssignments(assignments)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLeads()
  }, [token, user])

  useEffect(() => {
    const fetchLeadDetail = async () => {
      if (!selectedLead || !token) return

      setIsLoadingLeadDetails(true)
      try {
        const [leadRes, historyRes] = await Promise.all([
          api.admin.leads.getById(selectedLead.id, token),
          api.admin.leads.getHistory(selectedLead.id, token),
        ])

        const resolvedLead = leadRes.data || selectedLead
        setSelectedLead(resolvedLead)
        const assignedUser = leadAssignments[resolvedLead.id]
        setSelectedAssigneeId(assignedUser?.id || "")
        setEmailSubject(`Suivi de votre demande - ${resolvedLead.fullName}`)
        setEmailBody(
          `Bonjour ${resolvedLead.fullName},\n\nNous revenons vers vous concernant votre demande de renovation.\n\nCordialement,\nEquipe HelloBrico`,
        )

        if (historyRes.data) {
          setLeadHistory(Array.isArray(historyRes.data) ? historyRes.data : [])
        }

        if (Array.isArray((resolvedLead as any).files) && (resolvedLead as any).files.length > 0) {
          setSelectedLeadFiles((resolvedLead as any).files)
          return
        }

        if (Array.isArray(resolvedLead.fileIds) && resolvedLead.fileIds.length > 0) {
          const filesRes = await api.upload.findByIds(resolvedLead.fileIds, token)
          if (!filesRes.error && Array.isArray(filesRes.data)) {
            setSelectedLeadFiles(filesRes.data)
            return
          }
        }

        setSelectedLeadFiles([])
      } catch (error) {
        console.error("Error fetching lead details:", error)
      } finally {
        setIsLoadingLeadDetails(false)
      }
    }

    fetchLeadDetail()
  }, [selectedLead?.id, token])

  const handleOpenLead = async (lead: LeadDto) => {
    setSelectedLead(lead)
  }

  const handleDeleteLeadFile = async (fileId: string) => {
    if (!token || !selectedLead) return
    const confirmed = window.confirm("Supprimer ce fichier ?")
    if (!confirmed) return

    try {
      const response = await api.upload.deleteFile(fileId, token)
      if (response.error) throw new Error(response.error)
      setSelectedLeadFiles((prev) => prev.filter((file) => file.id !== fileId))
    } catch (error) {
      console.error("Failed to delete file", error)
      alert("Erreur lors de la suppression du fichier.")
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedLead || !token) return;
    
    // Optimistic update
    const previousStatus = selectedLead.status;
    setSelectedLead({ ...selectedLead, status: newStatus });
    setAllLeads(allLeads.map(l => l.id === selectedLead.id ? { ...l, status: newStatus } : l));
    
    try {
      const response = await api.admin.leads.updateStatus(selectedLead.id, newStatus, token);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      // Revert on error
      setSelectedLead({ ...selectedLead, status: previousStatus });
      setAllLeads(allLeads.map(l => l.id === selectedLead.id ? { ...l, status: previousStatus } : l));
      alert("Erreur lors de la mise à jour du statut.");
    }
  }

  const handleAssignLead = async (assignedToId: string) => {
    if (!selectedLead || !token) return

    setIsAssigning(true)
    try {
      const response = await api.admin.leads.assign(
        selectedLead.id,
        assignedToId || null,
        token,
      )
      if (response.error) throw new Error(response.error)

      // Update local assignment state
      const assignedUser = assignedToId ? assignableUsers.find(u => u.id === assignedToId) || null : null
      const newAssignments = {
        ...leadAssignments,
        [selectedLead.id]: assignedUser
      }
      
      setLeadAssignments(newAssignments)
      setSelectedAssigneeId(assignedToId || "")
      
      // Save to localStorage as backup (since backend doesn't return assignedTo)
      try {
        const assignmentsToSave = JSON.stringify(newAssignments, (key, value) => {
          if (key && value && typeof value === 'object' && value.id) {
            return value.id // Save only the user ID, not the full object
          }
          return value
        })
        console.log('DEBUG: Saving assignments to localStorage:', assignmentsToSave)
        localStorage.setItem('leadAssignments', assignmentsToSave)
        console.log('DEBUG: Successfully saved to localStorage')
      } catch (error) {
        console.warn('Failed to save assignments to localStorage:', error)
      }
    } catch (error) {
      console.error("Failed to assign lead", error)
      alert("Erreur lors de l'assignation du lead.")
    } finally {
      setIsAssigning(false)
    }
  }

  const handleScheduleVisit = async () => {
    await handleStatusChange("VISITE_PLANIFIEE")
  }

  const handleSendEmail = async () => {
    if (!selectedLead) return
    if (!emailSubject.trim() || !emailBody.trim()) {
      alert("Sujet et contenu email requis.")
      return
    }

    setIsSendingEmail(true)
    try {
      const response = await api.email.send(
        selectedLead.email,
        emailSubject.trim(),
        emailBody.trim(),
        token || undefined,
      )
      if (response.error) throw new Error(response.error)
      alert("Email envoye avec succes.")
    } catch (error) {
      console.error("Failed to send email", error)
      alert("Erreur lors de l'envoi de l'email.")
    } finally {
      setIsSendingEmail(false)
    }
  }

  const getAssignedToText = (lead: LeadDto) => {
    const assignedUser = leadAssignments[lead.id]
    if (!assignedUser) return "—"
    const fullName = `${assignedUser.firstName || ""} ${assignedUser.lastName || ""}`.trim()
    return fullName || assignedUser.email || assignedUser.id
  }

  const handleAddNote = async () => {
    if (!selectedLead || !token || !newNote.trim()) return;
    setIsSubmittingNote(true);
    try {
      const response = await api.admin.leads.addNote(selectedLead.id, newNote.trim(), token);
      if (response.error) throw new Error(response.error);
      setNewNote("");
      // Refresh history
      const historyRes = await api.admin.leads.getHistory(selectedLead.id, token);
      if (historyRes.data) {
          setLeadHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
      }
    } catch (error) {
      console.error("Failed to add note", error);
      alert("Erreur lors de l'ajout de la note.");
    } finally {
      setIsSubmittingNote(false);
    }
  }

  const filtered = allLeads.filter((lead) => {
    const leadName = lead.fullName || ""
    const query = search.toLowerCase()
    const projectType = getTypologyText(lead.propertyType).toLowerCase()
    const renovationTypes = getRenovationTypesText(lead.renovationTypes || []).toLowerCase()
    const matchSearch =
      leadName.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      projectType.includes(query) ||
      renovationTypes.includes(query)

    const matchStatus = statusFilter === "Tous" || lead.status === statusFilter

    const matchService =
      serviceFilter === "Tous" ||
      lead.propertyType === serviceFilter ||
      (lead.renovationTypes || []).includes(serviceFilter)

    const matchBudget = budgetFilter === "Tous" || (lead.budgetBracket || "") === budgetFilter

    const matchAbroad = !isAbroadFilter || Boolean(lead.isAbroad)

    const createdAt = new Date(lead.createdAt)
    const fromDate = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null
    const toDate = dateTo ? new Date(`${dateTo}T23:59:59`) : null
    const matchDate = (!fromDate || createdAt >= fromDate) && (!toDate || createdAt <= toDate)

    return matchSearch && matchStatus && matchService && matchBudget && matchAbroad && matchDate
  })

  function getBudgetText(budget: string) {
    switch (budget) {
      case "MOINS_20000": return "< 20 000 DT"
      case "BETWEEN_20000_50000": return "20 000 - 50 000 DT"
      case "PLUS_50000": return "50 000 DT +"
      case "A_DEFINIR": return "À définir"
      default: return budget || "Non spécifié"
    }
  }

  function getTypologyText(type: string) {
    switch(type) {
      case "APPARTEMENT": return "Appartement"
      case "VILLA": return "Villa"
      case "BUREAU": return "Bureau"
      case "LOCAL_COMMERCIAL": return "Local commercial"
      default: return type
    }
  }

  function getRenovationTypesText(types: string[]) {
    if (!types || !types.length) return "Non spécifié"
    const map: Record<string, string> = {
      SALLE_DE_BAIN: "Salle de bain",
      CUISINE: "Cuisine",
      RENOVATION_COMPLETE: "Rénovation complète",
      BUREAU_LOCAL: "Bureau / Local"
    }
    return types.map(t => map[t] || t).join(", ")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(dateString))
  }

  if (selectedLead) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px]">
        <button
          onClick={() => setSelectedLead(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux leads
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: project info */}
          <div className="flex-1">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Informations projet
              </h2>
              <div className="space-y-3">
                <InfoRow label="Adresse" value={selectedLead.projectAddress || "Non spécifié"} icon={MapPin} />
                <InfoRow label="Typologie" value={getTypologyText(selectedLead.propertyType)} />
                <InfoRow label="Type rénovation" value={getRenovationTypesText(selectedLead.renovationTypes)} />
                <InfoRow label="Budget" value={getBudgetText(selectedLead.budgetBracket || "")} />
                <InfoRow label="Surface" value={selectedLead.surfaceM2 ? `${selectedLead.surfaceM2} m²` : "Non spécifié"} />
                <InfoRow label="Date" value={formatDate(selectedLead.createdAt)} icon={Calendar} />
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Description</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedLead.description || "Aucune description fournie."}</p>
              </div>

              {isLoadingLeadDetails ? (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" />
                  Chargement des fichiers...
                </div>
              ) : selectedLeadFiles.length > 0 ? (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Fichiers joints</p>
                  <div className="gap-2 flex flex-col">
                    {selectedLeadFiles.map((file) => (
                      <a
                        key={file.id}
                        href={file.publicUrl || file.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                      >
                        <FileText size={16} className="text-muted-foreground mr-3 shrink-0" />
                        <span className="text-sm text-foreground flex-1 truncate">{file.filename || "Fichier joint"}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            void handleDeleteLeadFile(file.id)
                          }}
                          className="mr-2 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Supprimer le fichier"
                        >
                          <Trash2 size={14} />
                        </button>
                        <Download size={14} className="text-muted-foreground ml-2 shrink-0 hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Notes */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Notes internes</h3>
              <div className="flex flex-col gap-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Ajouter une note interne..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                />
                <button 
                  onClick={handleAddNote}
                  disabled={isSubmittingNote || !newNote.trim()}
                  className="self-end px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-[#0A1F35] transition-colors disabled:opacity-50"
                >
                  {isSubmittingNote ? <Loader2 size={14} className="animate-spin inline mr-2" /> : null}
                  Ajouter la note
                </button>
              </div>
            </div>

            {/* History */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Historique</h3>
              <div className="space-y-4">
                {leadHistory.map((h, i) => (
                  <div key={h.id || i} className="flex gap-3 text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    <div className="flex-1 flex flex-col gap-1">
                       <span className="text-foreground font-medium">
                         {h.type === "STATUS_CHANGE" && `Statut changé: ${statusLabels[h.oldStatus || ""] || h.oldStatus} ➔ ${statusLabels[h.newStatus || ""] || h.newStatus}`}
                         {h.type === "NOTE" && "Note ajoutée"}
                         {h.type === "ASSIGN" && "Assignation modifiée"}
                         {h.type === "CREATION" && "Lead créé"}
                       </span>
                       {h.note && <span className="text-muted-foreground bg-muted p-2 rounded-lg mt-1">{h.note}</span>}
                       <span className="text-muted-foreground text-xs mt-1">
                         {formatDate(h.createdAt)} {h.user && `par ${h.user.firstName || ""} ${h.user.lastName || ""}`}
                       </span>
                    </div>
                  </div>
                ))}
                {leadHistory.length === 0 && (
                   <div className="text-sm text-muted-foreground">Aucun historique disponible.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right: contact info */}
          <div className="w-full lg:w-[340px]">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-3">
                <InfoRow label="Nom" value={selectedLead.fullName} />
                <InfoRow label="Téléphone" value={selectedLead.phone} icon={Phone} />
                <InfoRow label="Email" value={selectedLead.email} icon={Mail} />
                <InfoRow label="Résident étranger" value={selectedLead.isAbroad ? "Oui" : "Non"} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={handleScheduleVisit}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors"
              >
                <Calendar size={14} /> Planifier visite
              </button>
              <button
                onClick={() => router.push(`/admin/quotes?leadId=${selectedLead.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-muted transition-colors"
              >
                <FileText size={14} /> Générer devis
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-60"
              >
                <MessageSquare size={14} /> Envoyer email
              </button>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Assigner le lead</p>
              <select
                value={selectedAssigneeId}
                onChange={(e) => {
                  setSelectedAssigneeId(e.target.value)
                  void handleAssignLead(e.target.value)
                }}
                disabled={isAssigning}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none disabled:opacity-60"
              >
                <option value="">Non assigne</option>
                {assignableUsers.map((user) => {
                  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim()
                  const label = fullName || user.email || user.id
                  return (
                    <option key={user.id} value={user.id}>{label}</option>
                  )
                })}
              </select>
            </div>
<div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Email client</p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Sujet de l'email"
                    className="w-full px-3 py-2 pr-24 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <button
                      onClick={handleSendEmail}
                      disabled={isSendingEmail || !emailSubject.trim() || !emailBody.trim()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-[#0A1F35] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          Envoyer
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={4}
                    placeholder="Contenu du message..."
                    className="w-full px-3 py-2 pr-24 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none resize-none"
                  />
                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={handleSendEmail}
                      disabled={isSendingEmail || !emailSubject.trim() || !emailBody.trim()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-[#0A1F35] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          Envoyer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status change */}
            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Changer statut</p>
              <select 
                value={selectedLead.status || ""} 
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none"
              >
                {statuses.filter(s => s !== "Tous").map(s => (
                  <option key={s} value={s}>{statusLabels[s] || s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          Leads (CRM)
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez et suivez vos demandes d{"'"}estimation
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          <div className="relative lg:col-span-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher nom, tel, email..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-input rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          </div>

          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{statusLabels[s] || s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
          >
            <option value="Tous">Type service</option>
            <option value="APPARTEMENT">Appartement</option>
            <option value="VILLA">Villa</option>
            <option value="BUREAU">Bureau</option>
            <option value="LOCAL_COMMERCIAL">Local commercial</option>
            <option value="SALLE_DE_BAIN">Salle de bain</option>
            <option value="CUISINE">Cuisine</option>
            <option value="RENOVATION_COMPLETE">Renovation complete</option>
            <option value="BUREAU_LOCAL">Bureau / Local</option>
          </select>

          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
          >
            <option value="Tous">Budget</option>
            <option value="MOINS_20000">&lt; 20 000 DT</option>
            <option value="BETWEEN_20000_50000">20 000 - 50 000 DT</option>
            <option value="PLUS_50000">50 000+ DT</option>
            <option value="A_DEFINIR">A definir</option>
          </select>

          <div className="flex items-center gap-2 px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground">
            <input
              id="abroad-only"
              type="checkbox"
              checked={isAbroadFilter}
              onChange={(e) => setIsAbroadFilter(e.target.checked)}
              className="rounded border-input"
            />
            <label htmlFor="abroad-only" className="cursor-pointer">A l'etranger</label>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:col-span-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-primary mb-4" size={32} />
            <p className="text-muted-foreground">Chargement des leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Aucun lead trouvé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Nom</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Tel</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Budget</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Statut</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Assigné</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => void handleOpenLead(lead)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-foreground">{lead.fullName}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.phone}</td>
                  <td className="px-6 py-3 text-muted-foreground truncate max-w-[150px]" title={lead.renovationTypes ? getRenovationTypesText(lead.renovationTypes) : lead.propertyType}>
                    {lead.renovationTypes ? getRenovationTypesText(lead.renovationTypes) : lead.propertyType}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{getBudgetText(lead.budgetBracket || "")}</td>
                  <td className="px-6 py-3">
                    <select
                      value={lead.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={async (e) => {
                        const newStatus = e.target.value
                        const previous = lead.status

                        setAllLeads((prev) =>
                          prev.map((item) =>
                            item.id === lead.id ? { ...item, status: newStatus } : item,
                          ),
                        )

                        try {
                          const response = await api.admin.leads.updateStatus(lead.id, newStatus, token || "")
                          if (response.error) throw new Error(response.error)
                        } catch (error) {
                          console.error("Inline status update failed", error)
                          setAllLeads((prev) =>
                            prev.map((item) =>
                              item.id === lead.id ? { ...item, status: previous } : item,
                            ),
                          )
                          alert("Erreur lors de la mise a jour du statut.")
                        }
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${statusColors[lead.status] || "bg-muted text-muted-foreground"}`}
                    >
                      {statuses.filter((s) => s !== "Tous").map((status) => (
                        <option key={status} value={status}>{statusLabels[status] || status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{getAssignedToText(lead)}</td>
                  <td className="px-6 py-3 text-muted-foreground">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="flex items-center gap-3">
      {Icon && <Icon size={14} className="text-muted-foreground shrink-0" />}
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
