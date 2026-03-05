"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export function MagazineFeatured() {
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
    <section ref={sectionRef} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div
          className={`flex flex-col md:flex-row gap-8 items-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-7/12 relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image
              src="/images/article-featured.jpg"
              alt="Article vedette"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-5/12">
            <span className="text-xs uppercase tracking-widest text-accent font-medium">
              {"Étude de cas"}
            </span>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance">
              {"Comment structurer une rénovation complète sans dépassement budgétaire ?"}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {"Une rénovation complète ne dépend pas uniquement des travaux réalisés. Elle repose sur un devis structuré, une planification maîtrisée et une supervision continue."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="#"
                className="inline-flex items-center justify-center border border-border text-foreground font-medium text-sm px-5 py-2.5 rounded-[10px] hover:bg-muted transition-all duration-300"
              >
                {"Lire l'article"}
              </Link>
              <Link
                href="/estimation"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase px-5 py-2.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
              >
                Estimer mes travaux
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
