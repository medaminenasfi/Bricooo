"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Globe,
  FileText,
  Calendar,
  Tag,
  Image as ImageIcon,
} from "lucide-react"

type Article = {
  id: number
  title: string
  category: string
  status: string
  author: string
  publishedAt: string
  views: number
  image: string
}

const allArticles: Article[] = [
  {
    id: 1,
    title: "Avant / Après : Rénovation complète d'un appartement à La Marsa",
    category: "Réalisations",
    status: "Publié",
    author: "HelloBrico",
    publishedAt: "15 Fév 2026",
    views: 1240,
    image: "/images/article-featured.jpg",
  },
  {
    id: 2,
    title: "Guide complet : Comment planifier une rénovation de salle de bain en Tunisie",
    category: "Guides",
    status: "Publié",
    author: "HelloBrico",
    publishedAt: "10 Fév 2026",
    views: 890,
    image: "/images/service-bathroom.jpg",
  },
  {
    id: 3,
    title: "Les erreurs les plus courantes lors d'une rénovation de cuisine",
    category: "Conseils",
    status: "Publié",
    author: "HelloBrico",
    publishedAt: "5 Fév 2026",
    views: 650,
    image: "/images/service-kitchen.jpg",
  },
  {
    id: 4,
    title: "Tendances déco 2026 : les matériaux naturels à privilégier",
    category: "Tendances",
    status: "Brouillon",
    author: "HelloBrico",
    publishedAt: "—",
    views: 0,
    image: "/images/hero-services.jpg",
  },
  {
    id: 5,
    title: "Comment choisir le bon carrelage pour votre espace ?",
    category: "Guides",
    status: "Brouillon",
    author: "HelloBrico",
    publishedAt: "—",
    views: 0,
    image: "/images/service-full.jpg",
  },
]

const categories = ["Tous", "Réalisations", "Guides", "Conseils", "Tendances"]
const articleStatuses = ["Tous", "Publié", "Brouillon"]

const articleStatusColors: Record<string, string> = {
  "Publié": "bg-green-50 text-green-700",
  Brouillon: "bg-amber-50 text-amber-700",
}

export default function AdminMagazine() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Tous")
  const [statusFilter, setStatusFilter] = useState("Tous")
  const [showEditor, setShowEditor] = useState(false)

  const filtered = allArticles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "Tous" || a.category === categoryFilter
    const matchStatus = statusFilter === "Tous" || a.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  if (showEditor) {
    return (
      <div className="p-6 lg:p-8 max-w-[1000px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Nouvel article
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditor(false)}
              className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-card border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
              Sauvegarder brouillon
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-[#0A1F35] transition-colors">
              Publier
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Image upload */}
          <div className="border-2 border-dashed border-input rounded-xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer bg-card">
            <ImageIcon size={32} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">{"Image de couverture"}</p>
            <p className="text-xs text-muted-foreground/50 mt-1">{"Glissez-déposez ou cliquez (1200x630 recommandé)"}</p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Titre
            </label>
            <input
              type="text"
              placeholder="Titre de l'article..."
              className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-lg font-serif font-semibold placeholder:text-muted-foreground/40 placeholder:font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          {/* Category & tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                <Tag size={10} className="inline mr-1" />
                Catégorie
              </label>
              <select className="w-full px-4 py-3 bg-card border border-input rounded-xl text-sm text-foreground focus:border-primary outline-none">
                {categories.filter(c => c !== "Tous").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                <Calendar size={10} className="inline mr-1" />
                Date de publication
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-card border border-input rounded-xl text-sm text-foreground focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Contenu
            </label>
            <textarea
              placeholder="Écrivez votre article ici..."
              rows={16}
              className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base leading-relaxed placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>

          {/* SEO */}
          <div className="bg-muted/30 border border-border rounded-xl p-5">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">SEO</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Meta titre..."
                className="w-full px-3 py-2.5 bg-card border border-input rounded-lg text-sm placeholder:text-muted-foreground/40 focus:border-primary outline-none"
              />
              <textarea
                placeholder="Meta description..."
                rows={2}
                className="w-full px-3 py-2.5 bg-card border border-input rounded-lg text-sm placeholder:text-muted-foreground/40 focus:border-primary outline-none resize-none"
              />
              <input
                type="text"
                placeholder="Slug (ex: renovation-appartement-marsa)"
                className="w-full px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Magazine
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {"Gérez vos articles et contenus éditoriaux"}
          </p>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors"
        >
          <Plus size={14} />
          Nouvel article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Articles publiés</span>
          <p className="text-2xl font-bold text-foreground mt-1">
            {allArticles.filter(a => a.status === "Publié").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Brouillons</span>
          <p className="text-2xl font-bold text-foreground mt-1">
            {allArticles.filter(a => a.status === "Brouillon").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Vues totales</span>
          <p className="text-2xl font-bold text-foreground mt-1">
            {allArticles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-input rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
        >
          {categories.map(c => <option key={c} value={c}>{c === "Tous" ? "Toutes catégories" : c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
        >
          {articleStatuses.map(s => <option key={s} value={s}>{s === "Tous" ? "Tous statuts" : s}</option>)}
        </select>
      </div>

      {/* Articles list */}
      <div className="space-y-3">
        {filtered.map((article) => (
          <div
            key={article.id}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-all duration-200"
          >
            {/* Thumbnail */}
            <div
              className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 hidden sm:block"
              style={{ backgroundImage: `url('${article.image}')` }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">{article.title}</h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Tag size={10} />
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} />
                  {article.publishedAt}
                </span>
                {article.views > 0 && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Eye size={10} />
                    {article.views.toLocaleString()} vues
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                articleStatusColors[article.status] || "bg-muted text-muted-foreground"
              }`}
            >
              {article.status}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Voir">
                <Globe size={14} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Modifier">
                <Edit3 size={14} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors" aria-label="Supprimer">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
