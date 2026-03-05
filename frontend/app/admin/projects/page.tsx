"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  MapPin,
  Calendar,
  ArrowLeft,
  Camera,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
} from "lucide-react"

type Project = {
  id: number
  client: string
  type: string
  address: string
  status: string
  progress: number
  startDate: string
  estimatedEnd: string
  budget: string
  assignedTo: string
  phases: { name: string; status: string; date: string }[]
  updates: { text: string; date: string; type: string }[]
}

const allProjects: Project[] = [
  {
    id: 1,
    client: "Ahmed Ben Ali",
    type: "Rénovation complète",
    address: "La Marsa, Tunis",
    status: "En cours",
    progress: 65,
    startDate: "10 Jan 2026",
    estimatedEnd: "15 Mars 2026",
    budget: "62 000 DT",
    assignedTo: "Karim",
    phases: [
      { name: "Démolition", status: "Terminé", date: "10-17 Jan" },
      { name: "Plomberie", status: "Terminé", date: "18-25 Jan" },
      { name: "Électricité", status: "Terminé", date: "26 Jan - 3 Fév" },
      { name: "Revêtements", status: "En cours", date: "4-20 Fév" },
      { name: "Menuiserie", status: "À venir", date: "21 Fév - 5 Mars" },
      { name: "Finitions", status: "À venir", date: "6-15 Mars" },
    ],
    updates: [
      { text: "Pose carrelage salon terminée, début chambre demain", date: "27 Fév", type: "progress" },
      { text: "Retard livraison faïence salle de bain - 2 jours", date: "25 Fév", type: "alert" },
      { text: "Validation choix peinture avec le client", date: "23 Fév", type: "info" },
    ],
  },
  {
    id: 2,
    client: "Sonia Trabelsi",
    type: "Salle de bain",
    address: "Lac 2, Tunis",
    status: "En cours",
    progress: 40,
    startDate: "1 Fév 2026",
    estimatedEnd: "28 Fév 2026",
    budget: "28 000 DT",
    assignedTo: "Sonia",
    phases: [
      { name: "Démolition", status: "Terminé", date: "1-4 Fév" },
      { name: "Plomberie", status: "Terminé", date: "5-10 Fév" },
      { name: "Étanchéité", status: "En cours", date: "11-15 Fév" },
      { name: "Carrelage", status: "À venir", date: "16-22 Fév" },
      { name: "Finitions", status: "À venir", date: "23-28 Fév" },
    ],
    updates: [
      { text: "Étanchéité douche italienne en cours", date: "27 Fév", type: "progress" },
      { text: "Photos envoyées au client pour validation", date: "26 Fév", type: "info" },
    ],
  },
  {
    id: 3,
    client: "Yassine Ferchichi",
    type: "Rénovation complète",
    address: "Carthage, Tunis",
    status: "Planifié",
    progress: 0,
    startDate: "1 Mars 2026",
    estimatedEnd: "30 Avr 2026",
    budget: "85 000 DT",
    assignedTo: "Karim",
    phases: [
      { name: "Démolition", status: "À venir", date: "1-10 Mars" },
      { name: "Gros oeuvre", status: "À venir", date: "11-25 Mars" },
      { name: "Second oeuvre", status: "À venir", date: "26 Mars - 15 Avr" },
      { name: "Finitions", status: "À venir", date: "16-30 Avr" },
    ],
    updates: [],
  },
  {
    id: 4,
    client: "Omar Ben Salah",
    type: "Cuisine",
    address: "Menzah 9, Tunis",
    status: "Terminé",
    progress: 100,
    startDate: "5 Déc 2025",
    estimatedEnd: "15 Jan 2026",
    budget: "18 500 DT",
    assignedTo: "Sonia",
    phases: [
      { name: "Démolition", status: "Terminé", date: "5-8 Déc" },
      { name: "Plomberie", status: "Terminé", date: "9-13 Déc" },
      { name: "Électricité", status: "Terminé", date: "14-18 Déc" },
      { name: "Revêtements", status: "Terminé", date: "19-30 Déc" },
      { name: "Menuiserie cuisine", status: "Terminé", date: "2-10 Jan" },
      { name: "Finitions", status: "Terminé", date: "11-15 Jan" },
    ],
    updates: [
      { text: "Projet livré avec succès, client satisfait", date: "15 Jan", type: "success" },
    ],
  },
]

const projectStatuses = ["Tous", "En cours", "Planifié", "Terminé"]
const statusColors: Record<string, string> = {
  "En cours": "bg-blue-50 text-blue-700",
  "Planifié": "bg-amber-50 text-amber-700",
  "Terminé": "bg-green-50 text-green-700",
}
const phaseStatusColors: Record<string, string> = {
  "Terminé": "bg-green-100 text-green-700",
  "En cours": "bg-blue-100 text-blue-700",
  "À venir": "bg-muted text-muted-foreground",
}
const updateIcons: Record<string, typeof CheckCircle2> = {
  progress: Clock,
  alert: AlertCircle,
  info: CheckCircle2,
  success: CheckCircle2,
}

export default function AdminProjects() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tous")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = allProjects.filter((p) => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "Tous" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  if (selectedProject) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px]">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux projets
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1">
            {/* Project header */}
            <div className="bg-card border border-border rounded-xl p-6 mb-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    {selectedProject.client}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.type}</p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[selectedProject.status] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Avancement global</span>
                  <span className="text-sm font-semibold text-foreground">{selectedProject.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Phases */}
            <div className="bg-card border border-border rounded-xl p-6 mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">Phases du projet</h3>
              <div className="space-y-3">
                {selectedProject.phases.map((phase, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        phase.status === "Terminé"
                          ? "bg-green-500"
                          : phase.status === "En cours"
                          ? "bg-blue-500"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    <div className="flex-1">
                      <span className="text-sm text-foreground">{phase.name}</span>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        phaseStatusColors[phase.status]
                      }`}
                    >
                      {phase.status}
                    </span>
                    <span className="text-xs text-muted-foreground w-[120px] text-right">{phase.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div className="bg-card border border-border rounded-xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Mises à jour chantier</h3>
                <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                  <Camera size={12} />
                  Ajouter
                </button>
              </div>
              {selectedProject.updates.length === 0 ? (
                <p className="text-sm text-muted-foreground">{"Aucune mise à jour pour le moment."}</p>
              ) : (
                <div className="space-y-3">
                  {selectedProject.updates.map((update, i) => {
                    const Icon = updateIcons[update.type] || CheckCircle2
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <Icon
                          size={14}
                          className={`shrink-0 mt-0.5 ${
                            update.type === "alert"
                              ? "text-amber-500"
                              : update.type === "success"
                              ? "text-green-500"
                              : "text-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{update.text}</p>
                          <span className="text-xs text-muted-foreground">{update.date}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Side info */}
          <div className="w-full lg:w-[320px]">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Informations projet</h3>
              <div className="space-y-3">
                <SideInfo icon={MapPin} label="Adresse" value={selectedProject.address} />
                <SideInfo icon={Calendar} label="Début" value={selectedProject.startDate} />
                <SideInfo icon={Calendar} label="Fin estimée" value={selectedProject.estimatedEnd} />
                <SideInfo icon={User} label="Assigné à" value={selectedProject.assignedTo} />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Budget</p>
                  <p className="text-lg font-bold text-foreground">{selectedProject.budget}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
                <Camera size={14} /> Envoyer photos au client
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium py-2.5 rounded-lg hover:bg-muted transition-colors">
                Marquer comme terminé
              </button>
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
          Projets actifs
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {"Suivez l'avancement de tous vos chantiers"}
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
            placeholder="Rechercher un projet..."
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
            {projectStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-sm cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{project.client}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{project.type}</p>
              </div>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[project.status] || "bg-muted text-muted-foreground"
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {project.address}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {project.estimatedEnd}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Avancement</span>
                <span className="text-xs font-semibold text-foreground">{project.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SideInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-muted-foreground shrink-0" />
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
