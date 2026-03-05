"use client"

import { useState } from "react"
import { Check, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

const typologies = ["Appartement", "Villa", "Bureau", "Local commercial"]
const renovationTypes = [
  "Salle de bain",
  "Cuisine",
  "Rénovation complète",
  "Bureau / Local",
]
const budgetOptions = [
  "Moins de 20 000 DT",
  "20 000 – 50 000 DT",
  "50 000 DT +",
  "À définir",
]

const stepsLabels = ["Le projet", "Les détails", "Vos coordonnées"]

export function EstimationWizard() {
  const [step, setStep] = useState(0)

  // Step 1
  const [address, setAddress] = useState("")
  const [typology, setTypology] = useState("")
  const [renovations, setRenovations] = useState<string[]>([])

  // Step 2
  const [surface, setSurface] = useState("")
  const [budget, setBudget] = useState("")
  const [description, setDescription] = useState("")

  // Step 3
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [abroad, setAbroad] = useState(false)

  const [submitted, setSubmitted] = useState(false)

  const toggleRenovation = (item: string) => {
    setRenovations((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    )
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-600" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Demande envoyée
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {"Merci pour votre confiance. Notre équipe vous contactera rapidement avec une estimation structurée et détaillée."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm tracking-wide px-6 py-3 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
          >
            {"Retour à l'accueil"}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="mx-auto max-w-[720px] px-6">
        {/* Hero text */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-[40px] md:leading-[1.15] font-bold text-foreground text-balance">
            Parlez-nous de votre projet.
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {"Plus nous comprenons votre besoin, plus notre estimation sera précise. Toutes les informations partagées restent confidentielles."}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-10 relative">
          {stepsLabels.map((label, i) => (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`mt-2 text-xs transition-colors ${
                  i <= step ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
          {/* Connecting line */}
          <div className="absolute top-4 left-[16%] right-[16%] h-px bg-border -z-0" />
          <div
            className="absolute top-4 left-[16%] h-px bg-primary transition-all duration-500 -z-0"
            style={{ width: `${(step / 2) * 68}%` }}
          />
        </div>

        {/* Step content */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
          {/* STEP 1 */}
          {step === 0 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                Informations générales
              </h2>

              {/* Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Adresse du logement ou local
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ville, quartier, résidence..."
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Typology */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Typologie
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {typologies.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypology(t)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        typology === t
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-input text-foreground hover:border-primary/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Renovation type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Type de rénovation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {renovationTypes.map((r) => (
                    <button
                      key={r}
                      onClick={() => toggleRenovation(r)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                        renovations.includes(r)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-input text-foreground hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          renovations.includes(r)
                            ? "border-primary bg-primary"
                            : "border-input"
                        }`}
                      >
                        {renovations.includes(r) && (
                          <Check size={10} className="text-primary-foreground" />
                        )}
                      </div>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
              >
                Continuer
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                Décrivez votre projet.
              </h2>

              {/* Surface */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {"Surface approximative (optionnel)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    placeholder="Ex: 80"
                    className="w-full px-4 py-3 pr-12 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {"m²"}
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Budget estimatif
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        budget === b
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-input text-foreground hover:border-primary/30"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Fichiers
                </label>
                <div className="border-2 border-dashed border-input rounded-xl p-8 text-center bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-200 cursor-pointer">
                  <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {"Ajoutez des plans, photos ou vidéos de l'espace actuel"}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {"Glissez-déposez ou cliquez pour parcourir"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Description libre
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez les travaux souhaités, contraintes, délais souhaités..."
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-2 px-5 py-3 rounded-[10px] border border-border text-foreground text-sm font-medium hover:bg-muted transition-all duration-200"
                >
                  <ArrowLeft size={14} />
                  Retour
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                Comment pouvons-nous vous contacter ?
              </h2>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Téléphone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+216 XX XXX XXX"
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Abroad checkbox */}
              <div>
                <button
                  onClick={() => setAbroad(!abroad)}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      abroad
                        ? "border-primary bg-primary"
                        : "border-input"
                    }`}
                  >
                    {abroad && (
                      <Check size={12} className="text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm text-foreground">
                    {"Je suis actuellement à l'étranger"}
                  </span>
                </button>
                {abroad && (
                  <p className="mt-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
                    {"Nous proposons un suivi live pour les clients à distance."}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-[10px] border border-border text-foreground text-sm font-medium hover:bg-muted transition-all duration-200"
                >
                  <ArrowLeft size={14} />
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
                >
                  Recevoir mon estimation
                </button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {"Réponse rapide • Sans engagement • Étude structurée"}
              </p>
            </div>
          )}
        </div>

        {/* Bottom reassurance */}
        <div className="mt-10 text-center">
          <h3 className="text-sm font-semibold text-foreground">
            {"Pourquoi cette demande est-elle structurée ?"}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            {"Parce qu'une estimation sérieuse repose sur des informations précises. Notre objectif est de vous fournir une réponse claire et adaptée à votre projet."}
          </p>
        </div>
      </div>
    </div>
  )
}
