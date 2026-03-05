"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"

export function ArticleCTA() {
  const ctaRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ctaRef} className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className={`bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 md:p-16 text-center text-primary-foreground shadow-2xl ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}>
          {/* Titre du CTA */}
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Prêt à rénover votre salle de bain ?
          </h2>
          
          {/* Texte descriptif */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
            Appliquez ces conseils avec l'aide de nos experts. Obtenez un devis détaillé 
            et un suivi de chantier professionnel pour une rénovation sereine.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/estimation"
              className="inline-flex items-center justify-center bg-background text-primary font-semibold text-base px-8 py-4 rounded-xl hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Estimer mes travaux
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-medium text-base px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300"
            >
              Consulter un expert
            </Link>
          </div>

          {/* Points de confiance */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">150+</div>
              <div className="text-sm opacity-80">Rénovations complétées</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-sm opacity-80">Note client moyenne</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm opacity-80">Devis personnalisés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
