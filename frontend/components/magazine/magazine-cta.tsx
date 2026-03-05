"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export function MagazineCTA() {
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
    <section ref={sectionRef} className="bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h2
          className={`font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-primary-foreground text-balance ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {"Un projet en tête ?"}
        </h2>
        <p
          className={`mt-4 max-w-lg mx-auto text-base md:text-lg text-primary-foreground/75 leading-relaxed ${
            isVisible ? "animate-fade-up delay-100" : "opacity-0"
          }`}
        >
          {"Lire est utile. Structurer votre rénovation l'est encore plus. Décrivez votre projet et recevez une estimation claire et détaillée."}
        </p>
        <div className={`mt-8 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
          <Link
            href="/estimation"
            className="inline-flex items-center justify-center bg-card text-primary font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-[10px] hover:bg-secondary transition-all duration-300"
          >
            Estimer mes travaux
          </Link>
        </div>
      </div>
    </section>
  )
}
