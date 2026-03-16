"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { api } from "@/lib/api"

export function PartnershipForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    cityCountry: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getPartnershipTypeMap = (type: string) => {
    switch (type) {
      case "fournisseur":
        return "FOURNISSEUR"
      case "services":
        return "ENTREPRISE_DE_SERVICES"
      case "commercial":
        return "PARTENAIRE_COMMERCIAL"
      case "strategique":
        return "COLLABORATION_STRATEGIQUE"
      case "autre":
        return "AUTRE"
      default:
        return "AUTRE"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setSubmitStatus("idle")
    
    try {
      const payload = {
        companyName: formData.companyName,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || undefined,
        partnershipType: getPartnershipTypeMap(formData.partnershipType),
        cityCountry: formData.cityCountry || undefined,
        description: formData.description || undefined,
      }

      const response = await api.partners.create(payload)
      
      if (response.error) {
        setSubmitStatus("error")
        setErrorMessage(response.error)
      } else {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          companyName: "",
          fullName: "",
          email: "",
          phone: "",
          website: "",
          partnershipType: "",
          cityCountry: "",
          description: "",
        })
      }
    } catch (error) {
      console.error("Partnership submission error:", error)
      setSubmitStatus("error")
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="formulaire" className="py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Form */}
          <div className="bg-white rounded-[12px] shadow-sm border border-border p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Informations sur votre entreprise
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Contact Information */}
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Informations de contact
                </h3>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                    Nom de l'entreprise <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Nom et prénom <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Prénom Nom"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email professionnel <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="contact@entreprise.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                    Site web <span className="text-muted-foreground text-xs">(optionnel)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="https://www.exemple.com"
                  />
                </div>
              </div>

              {/* Section 2: Partnership Information */}
              <div className="space-y-5 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Informations sur le partenariat
                </h3>

                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-foreground mb-2">
                    Type de partenariat <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="services">Entreprise de services</option>
                    <option value="commercial">Partenaire commercial</option>
                    <option value="strategique">Collaboration stratégique</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cityCountry" className="block text-sm font-medium text-foreground mb-2">
                    Ville / Pays <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="cityCountry"
                    name="cityCountry"
                    value={formData.cityCountry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Tunis, Tunisie"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    Description de votre proposition <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-[10px] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Décrivez brièvement votre entreprise et le type de collaboration que vous souhaitez proposer."
                  />
                </div>
              </div>

              {/* Section 3: Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-[10px] font-semibold text-base hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer ma proposition
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <p className="mt-4 text-center text-sm text-green-600 font-medium">
                    ✓ Votre proposition a été envoyée avec succès !
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="mt-4 text-center text-sm text-red-600 font-medium">
                    ✗ {errorMessage || "Une erreur est survenue. Veuillez réessayer."}
                  </p>
                )}

                <p className="mt-4 text-center text-sm text-muted-foreground leading-relaxed">
                  Notre équipe analysera votre proposition et vous contactera si une collaboration est possible.
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar: Why become a partner */}
          <div className="lg:block hidden">
            <div className="sticky top-24 bg-gradient-to-br from-primary/5 to-primary/10 rounded-[12px] p-8 border border-primary/10">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Pourquoi devenir partenaire ?
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: "🤝",
                    title: "Développer des synergies",
                    description: "Collaborez avec une équipe professionnelle",
                  },
                  {
                    icon: "🌐",
                    title: "Accéder à un réseau d'entreprises",
                    description: "Rejoignez notre écosystème de partenaires",
                  },
                  {
                    icon: "🏗️",
                    title: "Collaborer sur des projets de rénovation",
                    description: "Participez à des projets d'envergure",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-primary/10">
                <p className="text-xs text-muted-foreground italic">
                  💡 Le formulaire reste court pour faciliter votre démarche. Plus de détails pourront être échangés lors de notre premier contact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
