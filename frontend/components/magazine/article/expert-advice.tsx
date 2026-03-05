"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"

export function ExpertAdvice() {
  const adviceRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (adviceRef.current) observer.observe(adviceRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={adviceRef} className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className={`bg-amber-50 border-l-4 border-blue-900 rounded-r-2xl p-8 md:p-12 shadow-lg ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}>
          {/* Titre du bloc conseil */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-blue-900">
              Conseil HelloBrico
            </h3>
          </div>

          {/* Texte du conseil */}
          <div className="space-y-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              Toujours prévoir un diagnostic technique avant toute estimation budgétaire. 
              Nos experts identifient les points critiques invisibles qui peuvent transformer 
              un projet simple en complexe.
            </p>
            
            <div className="bg-white/70 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Points clés du diagnostic :</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>État des réseaux (plomberie, électricité)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Structure des murs et sols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Conformité aux normes tunisiennes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Identification des risques cachés</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Un diagnostic complet représente seulement 2-3% du budget total mais peut vous éviter 
              des surcoûts de 20-30% en cours de chantier. C'est un investissement rentable.
            </p>
          </div>

          {/* CTA intégré */}
          <div className="mt-8 text-center">
            <Link
              href="/estimation"
              className="inline-flex items-center justify-center bg-blue-900 text-white font-medium text-sm tracking-wide uppercase px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Demander une estimation personnalisée
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Diagnostic technique inclus dans toutes nos estimations
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
