"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

const services = [
  {
    image: "/images/service-bathroom.jpg",
    title: "Rénovation Salle de Bain",
    intro:
      "Une salle de bain réussie repose sur la précision technique et la qualité des finitions. Nous intégrons l'étanchéité, la plomberie et les revêtements dans une approche globale.",
    items: [
      "Étanchéité & traitement humidité",
      "Plomberie complète",
      "Pose faïence & carrelage",
      "Installation sanitaire",
      "Douche à l'italienne",
    ],
  },
  {
    image: "/images/service-kitchen.jpg",
    title: "Rénovation Cuisine",
    intro:
      "La cuisine est un espace fonctionnel et central. Nous optimisons l'organisation, la technique et la coordination avec les fournisseurs.",
    items: [
      "Réorganisation de l'espace",
      "Électricité & plomberie cuisine",
      "Coordination cuisine équipée",
      "Revêtements sol & mur",
    ],
  },
  {
    image: "/images/service-full.jpg",
    title: "Rénovation complète clé en main",
    intro:
      "Pour une transformation globale, nous pilotons l'ensemble du chantier avec une planification structurée et une supervision constante.",
    items: [
      "Travaux de maçonnerie",
      "Mise aux normes électrique",
      "Peinture & finitions",
      "Coordination multi-corps d'état",
    ],
  },
  {
    image: "/images/service-office.jpg",
    title: "Rénovation Bureau & Local Commercial",
    intro:
      "Un espace professionnel exige conformité, sécurité et optimisation. Nous adaptons l'environnement aux exigences techniques et fonctionnelles.",
    items: [
      "Aménagement professionnel",
      "Cloisons & faux plafonds",
      "Mise aux normes sécurité",
      "Optimisation espace",
    ],
  },
]

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, index) => (
            <div
              key={s.title}
              className={`group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.intro}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/estimation"
                  className="mt-5 inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-xs tracking-wide uppercase px-5 py-2.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
                >
                  Estimer mes travaux
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
