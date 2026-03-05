"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { DollarSign, Clock, Users, Paintbrush, Eye, Globe } from "lucide-react"

const problems = [
  {
    icon: DollarSign,
    title: "Budget flou",
    desc: "On commence... puis le budget change.",
  },
  {
    icon: Clock,
    title: "Délais qui glissent",
    desc: "Chaque semaine, une nouvelle excuse.",
  },
  {
    icon: Users,
    title: "Intervenants multiples",
    desc: "Trop de monde, personne responsable.",
  },
  {
    icon: Paintbrush,
    title: "Qualité variable",
    desc: "Finitions approximatives, reprise après reprise.",
  },
  {
    icon: Eye,
    title: "Manque de visibilité",
    desc: "Vous ne savez pas ce qui se passe.",
  },
  {
    icon: Globe,
    title: "Distance / diaspora",
    desc: "Vous êtes loin, donc vous subissez.",
  },
]

export function Problems() {
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
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: editorial text */}
          <div className="flex-1 max-w-lg">
            <h2
              className={`font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-foreground text-balance ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              {"Pourquoi tant de rénovations deviennent stressantes ?"}
            </h2>

            <p
              className={`mt-5 text-base md:text-lg text-muted-foreground leading-relaxed ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              {"Parce qu'un chantier n'échoue pas forcément à cause des travaux. Il dérape à cause du flou : budget incertain, responsabilités mal définies, décisions prises trop tard, et absence de visibilité sur l'exécution."}
            </p>

            <p
              className={`mt-4 text-base md:text-lg text-muted-foreground leading-relaxed ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              {"Une rénovation premium, ce n'est pas seulement un résultat esthétique. C'est un processus fiable : un cadre, une supervision, des preuves. HelloBrico a été conçu autour de cette idée."}
            </p>

            <div
              className={`mt-8 ${
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              }`}
            >
              <Link
                href="/estimation"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-7 py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
              >
                Demander une estimation
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">
                {"Décrivez votre projet • Recevez une estimation structurée"}
              </p>
            </div>
          </div>

          {/* Right: problem cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problems.map((p, index) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className={`bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-md transition-all duration-200 ${
                      isVisible ? "animate-fade-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${150 + index * 50}ms` }}
                  >
                    <Icon
                      size={18}
                      className="text-muted-foreground mb-3"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">
                      {`"${p.desc}"`}
                    </p>
                  </div>
                )
              })}
            </div>

            <Link
              href="/estimation"
              className={`mt-5 inline-flex text-sm font-medium text-primary hover:underline ${
                isVisible ? "animate-fade-up delay-500" : "opacity-0"
              }`}
            >
              {"Demander une estimation →"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
