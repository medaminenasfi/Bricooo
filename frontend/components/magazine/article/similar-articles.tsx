"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

const similarArticles = [
  {
    slug: "renovation-cuisine-complete-marsa",
    image: "/images/service-kitchen.jpg",
    category: "Nos réalisations",
    title: "Rénovation cuisine complète à La Marsa",
    excerpt: "Avant / après d'une cuisine transformée avec coordination cuisine équipée et finitions haut de gamme.",
    readTime: "8 min"
  },
  {
    slug: "budget-renovation-tunisie",
    image: "/images/service-full.jpg",
    category: "Budget & planification",
    title: "Comment estimer le budget d'une rénovation en Tunisie ?",
    excerpt: "Les postes de dépenses à prévoir, les marges de sécurité, et les erreurs budgétaires classiques.",
    readTime: "10 min"
  },
  {
    slug: "mise-normes-electrique-renovation",
    image: "/images/service-office.jpg",
    category: "Conseils techniques",
    title: "Mise aux normes électrique : ce que vous devez savoir",
    excerpt: "Obligations, risques et coûts d'une mise aux normes électrique lors d'une rénovation.",
    readTime: "6 min"
  }
]

export function SimilarArticles() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Titre de la section */}
        <div className={`text-center mb-12 ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Articles similaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuez votre lecture avec ces articles complémentaires pour enrichir 
            votre connaissance de la rénovation.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/magazine/${article.slug}`}
              className={`group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
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

              {/* Contenu */}
              <div className="p-6">
                {/* Catégorie et temps de lecture */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-widest text-accent font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:underline underline-offset-2 line-clamp-2 mb-3">
                  {article.title}
                </h3>

                {/* Extrait */}
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {/* Lien de lecture */}
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-200">
                  Lire l'article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA vers le magazine */}
        <div className={`text-center mt-12 ${
          isVisible ? "animate-fade-up delay-300" : "opacity-0"
        }`}>
          <Link
            href="/magazine"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  )
}
