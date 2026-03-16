"use client"

import Link from "next/link"
import { Check, Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Hero() {
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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-landing.jpg')" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,42,71,0.88) 0%, rgba(14,42,71,0.78) 35%, rgba(14,42,71,0.45) 60%, rgba(14,42,71,0.15) 80%, rgba(14,42,71,0.00) 100%)",
        }}
      />

      {/* Mobile overlay */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "rgba(14,42,71,0.85)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-0">
        <div className="max-w-xl lg:max-w-2xl text-center md:text-left mx-auto md:mx-0">
          {/* H1 */}
          <h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.1] font-bold text-primary-foreground text-balance ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {"Une rénovation maîtrisée commence par une méthode."}
          </h1>

          {/* Paragraph */}
          <p
            className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-primary-foreground/90 leading-relaxed ${
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            {"Rénover un espace engage du budget, du temps et de la confiance. Chez HelloBrico, chaque projet suit un système clair : étude technique, devis détaillé, planification précise et exécution supervisée."}
          </p>
          <p
            className={`mt-2 text-sm sm:text-base md:text-lg text-primary-foreground/90 leading-relaxed font-medium ${
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            {"Vous avancez avec visibilité. Pas avec incertitude."}
          </p>

          {/* Bullet reassurance */}
          <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 lg:gap-6 justify-center lg:justify-start ${
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            }`}
          >
            {["Devis contractuel détaillé", "Supervision quotidienne", "Suivi live du chantier"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/80"
                >
                  <Check size={14} className="text-primary-foreground/60 shrink-0" />
                  <span className="text-left">{item}</span>
                </div>
              )
            )}
          </div>

          {/* CTA */}
          <div
            className={`mt-6 sm:mt-8 flex flex-col items-center md:items-start gap-2 ${
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            }`}
          >
            <Link
              href="/estimation"
              className="inline-flex w-full sm:w-auto items-center justify-center bg-card text-primary font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-[10px] hover:bg-secondary hover:shadow-lg transition-all duration-300"
            >
              Estimer mes travaux
            </Link>
            <span className="text-xs text-primary-foreground/50">
              {"Réponse rapide • Sans engagement"}
            </span>
          </div>
        </div>
      </div>

      {/* Badge 5/5 */}
      <div
        className={`absolute bottom-8 right-4 sm:bottom-12 sm:right-6 md:bottom-20 md:right-[12%] lg:bottom-24 lg:right-[8%] z-10 ${
          isVisible ? "animate-fade-up delay-400" : "opacity-0"
        }`}
      >
        <div className="bg-card/85 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg px-4 py-3 sm:px-5 sm:py-4 max-w-[160px] sm:max-w-none">
          <div className="flex gap-0.5 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-base sm:text-lg font-bold text-foreground mt-1 text-center sm:text-left">5.0/5</p>
          <p className="text-xs text-muted-foreground text-center sm:text-left">Avis clients vérifiés</p>
        </div>
      </div>

          </section>
  )
}
