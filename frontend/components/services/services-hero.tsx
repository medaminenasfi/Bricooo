"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export function ServicesHero() {
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
      className="relative flex items-center justify-center min-h-[60vh] overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-services.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/65" />

      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 py-32 text-center">
        <h1
          className={`font-serif text-3xl md:text-5xl font-bold text-foreground text-balance ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {"Des services structurés pour des rénovations maîtrisées."}
        </h1>
        <p
          className={`mt-5 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed ${
            isVisible ? "animate-fade-up delay-100" : "opacity-0"
          }`}
        >
          {"Chaque projet est encadré par une étude technique, un devis détaillé et une supervision continue. Nous intervenons sur des rénovations ciblées ou des transformations complètes, toujours avec méthode et transparence."}
        </p>
        <div
          className={`mt-7 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}
        >
          <Link
            href="/estimation"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-7 py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
          >
            Estimer mes travaux
          </Link>
          <p className="mt-2 text-xs text-muted-foreground">
            {"Sans engagement • Réponse rapide"}
          </p>
        </div>
      </div>
    </section>
  )
}
