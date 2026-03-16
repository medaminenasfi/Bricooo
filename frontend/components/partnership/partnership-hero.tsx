"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Handshake, Users, Building2 } from "lucide-react"
import Image from "next/image"

export function PartnershipHero() {
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
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <Image
          src="/images/service-office.jpg"
          alt="Partnership background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay - matching landing page style */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,42,71,0.92) 0%, rgba(14,42,71,0.85) 40%, rgba(14,42,71,0.60) 65%, rgba(14,42,71,0.25) 85%, rgba(14,42,71,0.00) 100%)",
        }}
      />

      {/* Mobile overlay */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "rgba(14,42,71,0.88)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div
            className={`text-center md:text-left ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Handshake className="w-4 h-4 text-primary-foreground" />
              <span className="text-xs font-semibold text-primary-foreground uppercase tracking-wider">
                Partenariats
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.1] font-bold text-primary-foreground mb-4 sm:mb-6 text-balance">
              Proposer un partenariat avec Hello Brico
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-3 sm:mb-4 leading-relaxed">
              Vous souhaitez collaborer avec Hello Brico ?
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 sm:mb-8 leading-relaxed">
              Présentez-nous votre entreprise et votre proposition de partenariat. Notre équipe reviendra vers vous rapidement.
            </p>

            {/* Trust points */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Réponse rapide",
                "Collaboration flexible",
                "Partenariats professionnels",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 md:justify-start justify-center">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground/90 text-xs sm:text-sm font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <a
                href="#formulaire"
                className="inline-flex w-full sm:w-auto items-center justify-center bg-white text-primary font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-[10px] hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
              >
                Proposer un partenariat
              </a>
              <span className="text-xs text-primary-foreground/50">
                Réponse rapide • Collaboration professionnelle
              </span>
            </div>
          </div>

          {/* Right: Stats Cards */}
          <div
            className={`block md:block ${
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-md mx-auto md:max-w-none">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-[12px] sm:rounded-[16px] p-4 sm:p-6 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-1">50+</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/70">Partenaires actifs</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-[12px] sm:rounded-[16px] p-4 sm:p-6 border border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 sm:mb-4">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-1">200+</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/70">Projets réalisés</p>
              </div>

              {/* Card 3 - Full width */}
              <div className="col-span-1 sm:col-span-2 bg-white/10 backdrop-blur-md rounded-[12px] sm:rounded-[16px] p-4 sm:p-6 border border-white/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mb-1">
                      Réseau professionnel
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-foreground/70">
                      Rejoignez notre écosystème de partenaires de confiance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
