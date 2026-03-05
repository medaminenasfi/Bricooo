"use client"

import { Users, FileText, TrendingUp, FolderKanban } from "lucide-react"

const kpis = [
  { label: "Leads ce mois", value: "24", change: "+12%", icon: Users },
  { label: "Devis envoyés", value: "18", change: "+8%", icon: FileText },
  { label: "Taux conversion", value: "38%", change: "+5%", icon: TrendingUp },
  { label: "Projets en cours", value: "6", change: "stable", icon: FolderKanban },
]

const recentLeads = [
  { name: "Ahmed Ben Ali", type: "Rénovation complète", budget: "50 000 DT+", status: "Nouveau", date: "27 Fév" },
  { name: "Sonia Trabelsi", type: "Salle de bain", budget: "20-50k DT", status: "Contacté", date: "26 Fév" },
  { name: "Karim Mbarek", type: "Cuisine", budget: "< 20k DT", status: "Visite planifiée", date: "25 Fév" },
  { name: "Fatma Gharbi", type: "Bureau", budget: "À définir", status: "Nouveau", date: "25 Fév" },
  { name: "Yassine Ferchichi", type: "Rénovation complète", budget: "50 000 DT+", status: "Devis envoyé", date: "24 Fév" },
]

const statusColors: Record<string, string> = {
  Nouveau: "bg-blue-50 text-blue-700",
  "Contacté": "bg-amber-50 text-amber-700",
  "Visite planifiée": "bg-indigo-50 text-indigo-700",
  "Devis envoyé": "bg-emerald-50 text-emerald-700",
  "Négociation": "bg-orange-50 text-orange-700",
  "Converti": "bg-green-50 text-green-700",
  "Perdu": "bg-red-50 text-red-700",
}

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue globale de votre activité
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {kpi.label}
                </span>
                <Icon size={16} className="text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <span className="text-xs text-muted-foreground mt-1">{kpi.change}</span>
            </div>
          )
        })}
      </div>

      {/* Chart placeholder */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Leads par semaine
        </h2>
        <div className="h-48 flex items-end gap-2">
          {[40, 55, 35, 70, 50, 80, 65, 90, 75, 60, 85, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/15 hover:bg-primary/25 rounded-t-md transition-colors duration-200"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>S1</span>
          <span>S2</span>
          <span>S3</span>
          <span>S4</span>
          <span>S5</span>
          <span>S6</span>
          <span>S7</span>
          <span>S8</span>
          <span>S9</span>
          <span>S10</span>
          <span>S11</span>
          <span>S12</span>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Derniers leads reçus
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-foreground">
                    {lead.name}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.type}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.budget}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[lead.status] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
