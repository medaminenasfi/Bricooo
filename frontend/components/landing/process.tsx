"use client"

import { useState, useRef, useEffect } from "react"
import { ClipboardList, FileText, Calendar, ShieldCheck, Search, Handshake } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Visite Technique",
    impact: "On part du réel, pas des suppositions.",
    chips: ["État existant", "Contraintes techniques", "Photos / mesures"],
    detail:
      "Ce que vous recevez : un diagnostic clair des travaux nécessaires et des priorités. Ce que nous verrouillons : les risques (humidité, plomberie, électricité, structure).",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Devis Détaillé",
    impact: "Un budget clair, ligne par ligne.",
    chips: ["Postes détaillés", "Quantités & matériaux", "Conditions claires"],
    detail:
      "Devis structuré et transparent, conçu pour éviter les \"surprises chantier\". Ce devis sert de référence pour piloter l'exécution.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Planification",
    impact: "Un planning réaliste, validé avant de commencer.",
    chips: ["Calendrier", "Séquence interventions", "Délais validés"],
    detail:
      "Nous organisons l'ordre des interventions pour éviter retards et improvisations. Vous connaissez la date de démarrage, les jalons, et la date cible.",
    icon: Calendar,
  },
  {
    number: "04",
    title: "Exécution Supervisée",
    impact: "Chaque jour, quelqu'un contrôle.",
    chips: ["Superviseur dédié", "Contrôle qualité", "Coordination équipes"],
    detail:
      "Le superviseur coordonne les intervenants et vérifie l'avancement + conformité. Objectif : une exécution propre, stable, et conforme au devis.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Finitions & Vérification",
    impact: "Les détails font le premium.",
    chips: ["Check-list", "Corrections", "Validation qualité"],
    detail:
      "Contrôle des finitions, corrections si nécessaire, validation des points sensibles. On ne livre pas \"à peu près\".",
    icon: Search,
  },
  {
    number: "06",
    title: "Livraison & Garantie",
    impact: "Vous recevez un projet terminé, validé.",
    chips: ["Réception finale", "Dossier chantier", "Garantie"],
    detail:
      "Remise officielle, récapitulatif des travaux réalisés, garanties selon périmètre. Vous avez une clôture claire.",
    icon: Handshake,
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
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
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-14 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-foreground text-balance">
            {"Une rénovation maîtrisée suit une méthode."}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {"Chaque étape est pensée pour réduire l'incertitude : budget, délais, qualité, et visibilité. Vous savez où vous en êtes, ce qui est validé, et ce qui arrive ensuite."}
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hidden md:block">
          {/* Step indicators with connecting line */}
          <div className="relative flex items-start justify-between mb-8">
            {/* Connecting line */}
            <div className="absolute top-5 left-[8%] right-[8%] h-px bg-border" />

            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  key={step.number}
                  onClick={() =>
                    setActiveStep(activeStep === index ? null : index)
                  }
                  className={`relative flex flex-col items-center gap-3 w-[16%] group cursor-pointer transition-all duration-200 ${
                    isVisible
                      ? "animate-fade-up"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                  aria-expanded={activeStep === index}
                >
                  {/* Dot */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card text-muted-foreground border border-border group-hover:border-primary/40 group-hover:shadow-sm"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <span className="block text-[11px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      {step.number}
                    </span>
                    <span
                      className={`block text-sm font-semibold transition-colors ${
                        activeStep === index
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1 leading-snug">
                      {step.impact}
                    </span>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Expanded panel */}
          {activeStep !== null && (
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 transition-all duration-250 animate-fade-up">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = steps[activeStep].icon
                    return <Icon size={20} className="text-primary" strokeWidth={1.5} />
                  })()}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {steps[activeStep].title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {steps[activeStep].detail}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isOpen = activeStep === index
            return (
              <div
                key={step.number}
                className={`border rounded-2xl transition-all duration-200 ${
                  isOpen
                    ? "border-primary shadow-sm"
                    : "border-border"
                } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() =>
                    setActiveStep(isOpen ? null : index)
                  }
                  className="w-full flex items-center gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                      {step.number}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.impact}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {step.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
