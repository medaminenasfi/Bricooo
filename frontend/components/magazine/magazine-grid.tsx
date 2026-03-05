"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

const categories = [
  "Tous",
  "Conseils techniques",
  "Nos réalisations",
  "Budget & planification",
  "Architecture & finitions",
  "Suivi de chantier",
]

const articles = [
  {
    slug: "5-erreurs-a-eviter-renovation-salle-de-bain",
    image: "/images/service-bathroom.jpg",
    category: "Conseils techniques",
    title: "5 erreurs à éviter lors d'une rénovation salle de bain",
    excerpt:
      "L'étanchéité, le choix des matériaux, la ventilation : retour sur les points critiques les plus fréquents.",
  },
  {
    slug: "renovation-cuisine-complete-marsa",
    image: "/images/service-kitchen.jpg",
    category: "Nos réalisations",
    title: "Rénovation cuisine complète à La Marsa",
    excerpt:
      "Avant / après d'une cuisine transformée avec coordination cuisine équipée et finitions haut de gamme.",
  },
  {
    slug: "budget-renovation-tunisie",
    image: "/images/service-full.jpg",
    category: "Budget & planification",
    title: "Comment estimer le budget d'une rénovation en Tunisie ?",
    excerpt:
      "Les postes de dépenses à prévoir, les marges de sécurité, et les erreurs budgétaires classiques.",
  },
  {
    slug: "tendances-finitions-2026",
    image: "/images/service-office.jpg",
    category: "Architecture & finitions",
    title: "Tendances finitions 2026 : bois, pierre et minimalisme",
    excerpt:
      "Quels matériaux et quelles finitions dominent les projets de rénovation premium cette année.",
  },
  {
    slug: "suivi-chantier-distance",
    image: "/images/hero-landing.jpg",
    category: "Suivi de chantier",
    title: "Comment suivre son chantier à distance ?",
    excerpt:
      "Caméra live, reporting structuré, superviseur dédié : les outils du suivi à distance.",
  },
  {
    slug: "mise-normes-electrique-renovation",
    image: "/images/live-tracking-bg.jpg",
    category: "Conseils techniques",
    title: "Mise aux normes électrique : ce que vous devez savoir",
    excerpt:
      "Obligations, risques et coûts d'une mise aux normes électrique lors d'une rénovation.",
  },
]

export function MagazineGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Tous")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered =
    activeCategory === "Tous"
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  return (
    <section ref={sectionRef} className="bg-card py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => (
            <Link
              key={article.slug}
              href={`/magazine/${article.slug}`}
              className={`group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-[11px] uppercase tracking-widest text-accent font-medium">
                  {article.category}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-foreground leading-snug group-hover:underline underline-offset-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  Lire →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
