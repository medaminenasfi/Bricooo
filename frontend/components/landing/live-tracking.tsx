"use client"

import Link from "next/link"
import { Camera, FileBarChart, UserCheck, Clock } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const features = [
  {
    icon: Camera,
    title: "Caméra sur chantier",
    desc: "Un regard permanent pour réduire l'incertitude.",
  },
  {
    icon: FileBarChart,
    title: "Compte-rendu régulier",
    desc: "Avancement, décisions, prochaines étapes.",
  },
  {
    icon: UserCheck,
    title: "Un superviseur responsable",
    desc: "Un interlocuteur unique, clair et réactif.",
  },
]

export function LiveTracking() {
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
    <section ref={sectionRef} className="relative min-h-[600px] md:min-h-[650px] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/live-tracking-bg.jpg')" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(14,42,71,0.90) 0%, rgba(14,42,71,0.80) 40%, rgba(14,42,71,0.50) 65%, rgba(14,42,71,0.20) 85%, rgba(14,42,71,0.05) 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "rgba(14,42,71,0.88)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 py-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: text */}
          <div className="flex-1 max-w-lg text-center md:text-left">
            <h2
              className={`font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-primary-foreground text-balance ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              {"Suivez votre chantier en live. Gardez le contrôle, même à distance."}
            </h2>

            <p
              className={`mt-5 text-base md:text-lg text-primary-foreground/85 leading-relaxed ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              {"La confiance ne se demande pas — elle se prouve. C'est pourquoi nous avons mis en place un suivi en temps réel : caméra sur site, reporting régulier, et un superviseur qui vous répond clairement."}
            </p>
            <p
              className={`mt-2 text-base text-primary-foreground/70 italic ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              {"Pensé pour les résidents à l'étranger : vous suivez, vous validez, vous restez serein."}
            </p>

            {/* Feature cards */}
            <div
              className={`mt-8 flex flex-col gap-3 ${
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              }`}
            >
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 bg-primary-foreground/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary-foreground/70" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-foreground">{f.title}</p>
                      <p className="text-xs text-primary-foreground/60">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start ${
                isVisible ? "animate-fade-up delay-300" : "opacity-0"
              }`}
            >
              <Link
                href="/estimation"
                className="inline-flex items-center justify-center bg-card text-primary font-medium text-sm tracking-wide uppercase px-7 py-3 rounded-[10px] hover:bg-secondary transition-all duration-300"
              >
                Demander une estimation
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center text-primary-foreground/70 text-sm font-medium hover:text-primary-foreground transition-colors"
              >
                {"Voir un exemple de suivi →"}
              </Link>
            </div>
            <p className="mt-2 text-xs text-primary-foreground/40 text-center md:text-left">
              {"Réponse rapide • Sans engagement • Projets en Tunisie & à distance"}
            </p>
          </div>

          {/* Right: Live Panel Mock */}
          <div
            className={`w-full md:w-auto ${
              isVisible ? "animate-fade-up delay-400" : "opacity-0"
            }`}
          >
            <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-xl p-5 w-full md:w-[300px] border border-border/50">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-live" />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
                  En direct
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Clock size={12} />
                <span>{"Dernière mise à jour : il y a 12 min"}</span>
              </div>

              {/* Thumbnails placeholder */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-12 rounded-lg bg-muted"
                  />
                ))}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{"État"}</span>
                  <span className="text-xs font-medium text-foreground">
                    {"Pose carrelage (25%)"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-primary rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Prochain jalon</span>
                  <span className="text-xs font-medium text-foreground">
                    Installation sanitaire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
