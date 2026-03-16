"use client"

const partners = [
  { name: "RE/MAX VIP", logo: "REMAX" },
  { name: "Club Rendement+", logo: "Club Rendement+" },
  { name: "Magasin Général", logo: "Magasin Général" },
  { name: "ACTIA", logo: "ACTIA" },
  { name: "Westerwelle", logo: "Westerwelle" },
]

export function PartnerLogos() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-center font-serif text-2xl md:text-3xl font-bold text-foreground mb-12">
          Ils collaborent déjà avec nous
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-6 rounded-[12px] bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
            >
              <span className="text-sm md:text-base font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors text-center uppercase tracking-wide">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  )
}
