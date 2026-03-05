"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Phone, Mail, MapPin, Calendar, MessageSquare, FileText, ArrowLeft } from "lucide-react"

const allLeads = [
  { id: 1, name: "Ahmed Ben Ali", phone: "+216 98 123 456", email: "ahmed@email.com", type: "Rénovation complète", budget: "50 000 DT+", status: "Nouveau", assigned: "—", abroad: false, address: "La Marsa, Tunis", typology: "Villa", description: "Rénovation complète villa 3 étages, incluant cuisine, 2 salles de bain et peinture.", date: "27 Fév 2026" },
  { id: 2, name: "Sonia Trabelsi", phone: "+216 55 987 654", email: "sonia@email.com", type: "Salle de bain", budget: "20-50k DT", status: "Contacté", assigned: "Karim", abroad: false, address: "Lac 2, Tunis", typology: "Appartement", description: "Rénovation salle de bain principale avec douche italienne.", date: "26 Fév 2026" },
  { id: 3, name: "Karim Mbarek", phone: "+33 6 12 34 56 78", email: "karim@email.com", type: "Cuisine", budget: "< 20k DT", status: "Visite planifiée", assigned: "Sonia", abroad: true, address: "Ennasr, Ariana", typology: "Appartement", description: "Rénovation cuisine avec nouveau plan de travail.", date: "25 Fév 2026" },
  { id: 4, name: "Fatma Gharbi", phone: "+216 22 456 789", email: "fatma@email.com", type: "Bureau", budget: "À définir", status: "Nouveau", assigned: "—", abroad: false, address: "Centre Urbain Nord", typology: "Bureau", description: "Aménagement local commercial 120m².", date: "25 Fév 2026" },
  { id: 5, name: "Yassine Ferchichi", phone: "+216 98 555 111", email: "yassine@email.com", type: "Rénovation complète", budget: "50 000 DT+", status: "Devis envoyé", assigned: "Karim", abroad: false, address: "Carthage, Tunis", typology: "Villa", description: "Rénovation clé en main villa avec jardin.", date: "24 Fév 2026" },
  { id: 6, name: "Nadia Jemli", phone: "+1 514 222 333", email: "nadia@email.com", type: "Salle de bain", budget: "20-50k DT", status: "Négociation", assigned: "Sonia", abroad: true, address: "Soukra, Ariana", typology: "Villa", description: "Rénovation 2 salles de bain, client résidant au Canada.", date: "23 Fév 2026" },
  { id: 7, name: "Omar Ben Salah", phone: "+216 50 111 222", email: "omar@email.com", type: "Cuisine", budget: "< 20k DT", status: "Converti", assigned: "Karim", abroad: false, address: "Menzah 9, Tunis", typology: "Appartement", description: "Rénovation cuisine équipée petit budget.", date: "22 Fév 2026" },
]

const statuses = ["Tous", "Nouveau", "Contacté", "Visite planifiée", "Devis envoyé", "Négociation", "Converti", "Perdu"]
const statusColors: Record<string, string> = {
  Nouveau: "bg-blue-50 text-blue-700",
  "Contacté": "bg-amber-50 text-amber-700",
  "Visite planifiée": "bg-indigo-50 text-indigo-700",
  "Devis envoyé": "bg-emerald-50 text-emerald-700",
  "Négociation": "bg-orange-50 text-orange-700",
  "Converti": "bg-green-50 text-green-700",
  "Perdu": "bg-red-50 text-red-700",
}

export default function AdminLeads() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tous")
  const [selectedLead, setSelectedLead] = useState<typeof allLeads[0] | null>(null)

  const filtered = allLeads.filter((lead) => {
    const matchSearch = lead.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "Tous" || lead.status === statusFilter
    return matchSearch && matchStatus
  })

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
                <InfoRow label="Adresse" value={selectedLead.address} icon={MapPin} />
                <InfoRow label="Typologie" value={selectedLead.typology} />
                <InfoRow label="Type rénovation" value={selectedLead.type} />
                <InfoRow label="Budget" value={selectedLead.budget} />
                <InfoRow label="Date" value={selectedLead.date} icon={Calendar} />
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Description</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedLead.description}</p>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Notes internes</h3>
              <textarea
                placeholder="Ajouter une note interne..."
                rows={3}
                className="w-full px-3 py-2.5 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
              />
            </div>

            {/* History */}
            <div className="bg-card border border-border rounded-xl p-6 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Historique</h3>
              <div className="space-y-3">
                {[
                  { action: "Lead reçu", date: selectedLead.date },
                  { action: `Statut changé: ${selectedLead.status}`, date: selectedLead.date },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    <span className="text-foreground">{h.action}</span>
                    <span className="text-muted-foreground ml-auto text-xs">{h.date}</span>
                  </div>
                ))}
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
                <InfoRow label="Nom" value={selectedLead.name} />
                <InfoRow label="Téléphone" value={selectedLead.phone} icon={Phone} />
                <InfoRow label="Email" value={selectedLead.email} icon={Mail} />
                <InfoRow label="Résident étranger" value={selectedLead.abroad ? "Oui" : "Non"} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
                <Calendar size={14} /> Planifier visite
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-muted transition-colors">
                <FileText size={14} /> Générer devis
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-muted transition-colors">
                <MessageSquare size={14} /> Envoyer email
              </button>
            </div>

            {/* Status change */}
            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Changer statut</p>
              <select className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none">
                {statuses.filter(s => s !== "Tous").map(s => (
                  <option key={s} value={s} selected={s === selectedLead.status}>{s}</option>
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
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un lead..."
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
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
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
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-foreground">{lead.name}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.phone}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.type}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.budget}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status] || "bg-muted text-muted-foreground"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
