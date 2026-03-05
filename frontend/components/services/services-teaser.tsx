"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export function ServicesTeaser() {
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
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h2
          className={`font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-foreground text-balance ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {"Voir la transformation."}
        </h2>
        <p
          className={`mt-4 max-w-xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed ${
            isVisible ? "animate-fade-up delay-100" : "opacity-0"
          }`}
        >
          {"Chaque projet est documenté avec précision, du diagnostic initial aux finitions."}
        </p>
        <div
          className={`mt-8 flex flex-col sm:flex-row gap-3 justify-center ${
            isVisible ? "animate-fade-up delay-200" : "opacity-0"
          }`}
        >
          <Link
            href="/magazine"
            className="inline-flex items-center justify-center border border-border text-foreground font-medium text-sm tracking-wide px-6 py-3 rounded-[10px] hover:bg-muted transition-all duration-300"
          >
            Voir nos réalisations
          </Link>
          <Link
            href="/estimation"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-6 py-3 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
          >
            Estimer mes travaux
          </Link>
        </div>
      </div>
    </section>
  )
}
