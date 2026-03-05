"use client"

import { useRef, useState, useEffect } from "react"

export function ArticleContent() {
  const contentRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (contentRef.current) observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={contentRef} className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <article className={`prose prose-lg max-w-none ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}>
          {/* Contenu structuré avec H2 et H3 */}
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
            1. Négliger l'étanchéité : l'erreur la plus coûteuse
          </h2>
          
          <p className="text-foreground leading-relaxed mb-6">
            L'étanchéité représente sans conteste le point le plus critique dans une rénovation de salle de bain. 
            Une infiltration d'eau peut causer des dégâts considérables, non seulement dans votre salle de bain 
            mais également dans les pièces adjacentes. En Tunisie, où l'humidité peut être élevée, ce risque est 
            encore plus accentué.
          </p>
          
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">
            Les zones à surveiller attentivement
          </h3>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>La douche et le receveur : points névralgiques où 80% des infiltrations se produisent</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Les jonctions mur-sol : souvent mal traitées lors des rénovations rapides</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>La baignoire : les raccordements nécessitent une expertise particulière</span>
            </li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
            2. Choisir les mauvais matériaux : l'économie qui coûte cher
          </h2>
          
          <p className="text-foreground leading-relaxed mb-6">
            Le choix des matériaux en salle de bain ne doit jamais se baser uniquement sur le prix. 
            L'environnement humide et les variations de température exigent des matériaux spécifiques. 
            Nous observons régulièrement des clients ayant opté pour des solutions économiques qui 
            se dégradent après seulement 2-3 ans.
          </p>
          
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">
            Les erreurs fréquentes sur les matériaux
          </h3>
          
          <div className="bg-muted/50 rounded-xl p-6 mb-6">
            <p className="text-foreground leading-relaxed">
              Le carrelage mural standard posé dans une douche, les placards en aggloméré non traité, 
              ou encore les peintures non adaptées aux pièces humides sont autant d'erreurs qui 
              compromettent la durabilité de votre rénovation. Prévoyez toujours une marge de 15-20% 
              dans votre budget pour des matériaux de qualité.
            </p>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
            3. Sous-estimer la ventilation : l'erreur invisible
          </h2>
          
          <p className="text-foreground leading-relaxed mb-6">
            Une ventilation inadéquate est l'erreur la plus insidieuse. Les conséquences apparaissent 
            progressivement : moisissures, dégradation des joints, mauvaises odeurs, et problèmes 
            de santé. En Tunisie, avec le climat méditerranéen, une VMC (Ventilation Mécanique Contrôlée) 
            performante n'est pas une option, mais une nécessité.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
            4. Ignorer l'accessibilité et l'ergonomie
          </h2>
          
          <p className="text-foreground leading-relaxed mb-6">
            Une salle de bain doit être pensée pour le long terme. Hauteur des équipements, espace de 
            circulation, éclairage : ces aspects ergonomiques sont souvent négligés au profit de 
            considérations purement esthétiques. Pensez à votre évolution future et à celle de votre 
            famille.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
            5. Le manque de planification : l'erreur fondamentale
          </h2>
          
          <p className="text-foreground leading-relaxed mb-6">
            La précipitation est l'ennemie d'une rénovation réussie. Sans planification détaillée, 
            vous risquez des dépassements budgétaires, des délais non respectés, et un résultat final 
            qui ne correspond pas à vos attentes. Un diagnostic technique préalable et un planning 
            réaliste sont indispensables.
          </p>

          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">
            Les étapes clés de la planification
          </h3>
          
          <ol className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-primary font-semibold mr-3">1.</span>
              <span>Diagnostic technique complet de l'existant</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-semibold mr-3">2.</span>
              <span>Définition précise du périmètre des travaux</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-semibold mr-3">3.</span>
              <span>Établissement d'un budget détaillé avec marges de sécurité</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-semibold mr-3">4.</span>
              <span>Sélection des artisans et entreprises qualifiées</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-semibold mr-3">5.</span>
              <span>Planning détaillé avec délais réalistes</span>
            </li>
          </ol>

          {/* Conclusion */}
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl my-12">
            <p className="text-foreground leading-relaxed font-medium">
              Une rénovation de salle de bain réussie repose sur 70% de préparation et 30% d'exécution. 
              En évitant ces 5 erreurs courantes, vous mettez toutes les chances de votre côté pour 
              un projet réussi, dans le respect de votre budget et de vos délais.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
