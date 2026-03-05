"use client"

import Link from "next/link"
import { FileText, ShieldCheck, Video } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const blocks = [
  {
    icon: FileText,
    title: "Devis détaillé et contractuel",
    desc: "Budget clair, validé avant démarrage.",
  },
  {
    icon: ShieldCheck,
    title: "Supervision quotidienne",
    desc: "Coordination et contrôle qualité.",
  },
  {
    icon: Video,
    title: "Suivi live du chantier",
    desc: "Transparence même à distance.",
  },
]

export function ServicesApproach() {
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
    <section ref={sectionRef} className="bg-card py-20 md:py-28 border-t border-border border-b border-b-border">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h2
          className={`font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-foreground text-balance ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {"Quel que soit le service, la méthode reste la même."}
        </h2>
        <p
          className={`mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed ${
            isVisible ? "animate-fade-up delay-100" : "opacity-0"
          }`}
        >
          {"Chaque rénovation, qu'elle soit partielle ou complète, suit le même cadre : étude, devis détaillé, planification, supervision et suivi live."}
        </p>

        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isVisible ? "animate-fade-up delay-200" : "opacity-0"
          }`}
        >
          {blocks.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.title}
                className="bg-background rounded-2xl p-6 border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto">
                  <Icon size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            )
          })}
        </div>

        <div
          className={`mt-10 ${isVisible ? "animate-fade-up delay-300" : "opacity-0"}`}
        >
          <Link
            href="/estimation"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-7 py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
          >
            Estimer mes travaux
          </Link>
        </div>
      </div>
    </section>
  )
}
