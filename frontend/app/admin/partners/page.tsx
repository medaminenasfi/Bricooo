"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/admin/auth-context"
import { api } from "@/lib/api"
import { Search, Building2, Mail, Phone, Globe, MapPin, Trash2 } from "lucide-react"

interface Partner {
  id: string
  companyName: string
  fullName: string
  email: string
  phone: string
  website?: string
  partnershipType: string
  cityCountry?: string
  description?: string
  createdAt: string
}

export default function AdminPartnersPage() {
  const { token } = useAuth()
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      if (!token) return
      setIsLoading(true)
      try {
        const response = await api.admin.partners.getAll(token, 1, 100)
        console.log('Partners API Response:', response)
        
        if (response.data) {
          if (Array.isArray(response.data)) {
            setPartners(response.data)
          } else if (Array.isArray(response.data.data)) {
            setPartners(response.data.data)
          } else {
            setPartners([])
          }
        } else {
          setPartners([])
        }
      } catch (error) {
        console.error("Error fetching partners:", error)
        setPartners([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchPartners()
  }, [token])

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) return
    
    try {
      await api.admin.partners.delete(id, token)
      setPartners(partners.filter(p => p.id !== id))
      if (selectedPartner?.id === id) {
        setSelectedPartner(null)
      }
    } catch (error) {
      console.error("Error deleting partner:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const getPartnershipTypeLabel = (type: string) => {
    switch (type) {
      case "FOURNISSEUR":
        return "Fournisseur"
      case "ENTREPRISE_DE_SERVICES":
        return "Entreprise de services"
      case "PARTENAIRE_COMMERCIAL":
        return "Partenaire commercial"
      case "COLLABORATION_STRATEGIQUE":
        return "Collaboration stratégique"
      case "AUTRE":
        return "Autre"
      default:
        return type
    }
  }

  const filtered = partners.filter((partner) => {
    const searchLower = search.toLowerCase()
    return (
      partner.companyName.toLowerCase().includes(searchLower) ||
      partner.fullName.toLowerCase().includes(searchLower) ||
      partner.email.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Demandes de Partenariat</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les propositions de partenariat reçues
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Rechercher par entreprise, nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <Building2 className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-foreground font-medium">Aucune demande de partenariat</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les nouvelles demandes apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Partners List */}
          <div className="space-y-4">
            {filtered.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`bg-card border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedPartner?.id === partner.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{partner.companyName}</h3>
                    <p className="text-sm text-muted-foreground">{partner.fullName}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {getPartnershipTypeLabel(partner.partnershipType)}
                  </span>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} />
                    <span>{partner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} />
                    <span>{partner.phone}</span>
                  </div>
                  {partner.cityCountry && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span>{partner.cityCountry}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  Reçu le {new Date(partner.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
          </div>

          {/* Partner Details */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedPartner ? (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">
                      {selectedPartner.companyName}
                    </h2>
                    <p className="text-sm text-muted-foreground">{selectedPartner.fullName}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedPartner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type de partenariat
                    </label>
                    <p className="mt-1 text-sm text-foreground">
                      {getPartnershipTypeLabel(selectedPartner.partnershipType)}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Contact
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-muted-foreground" />
                        <a href={`mailto:${selectedPartner.email}`} className="text-primary hover:underline">
                          {selectedPartner.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-muted-foreground" />
                        <a href={`tel:${selectedPartner.phone}`} className="text-foreground">
                          {selectedPartner.phone}
                        </a>
                      </div>
                      {selectedPartner.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe size={16} className="text-muted-foreground" />
                          <a
                            href={selectedPartner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {selectedPartner.website}
                          </a>
                        </div>
                      )}
                      {selectedPartner.cityCountry && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-muted-foreground" />
                          <span className="text-foreground">{selectedPartner.cityCountry}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPartner.description && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Description
                      </label>
                      <p className="mt-2 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedPartner.description}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Demande reçue le {new Date(selectedPartner.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Building2 className="mx-auto text-muted-foreground mb-4" size={48} />
                <p className="text-foreground font-medium">Sélectionnez un partenaire</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cliquez sur une demande pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
