"use client"

import { useState } from "react"
import { Save, User, Building2, Bell, Shield, Globe, Palette } from "lucide-react"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "Général", icon: Building2 },
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "appearance", label: "Apparence", icon: Palette },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          {"Paramètres"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {"Configurez les paramètres de votre site et de votre compte"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-8 bg-muted/50 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">{"Informations de l'entreprise"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nom de l'entreprise" defaultValue="HelloBrico" />
                <InputField label="Téléphone" defaultValue="+216 XX XXX XXX" />
              </div>
              <InputField label="Email" defaultValue="contact@hellobrico.tn" />
              <InputField label="Adresse" defaultValue="Tunis, Tunisie" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Registre de commerce" placeholder="RC-XXXXX" />
                <InputField label="Matricule fiscale" placeholder="XXXXXXX/X/X/X" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Réseaux sociaux</h2>
            <div className="space-y-4">
              <InputField label="Facebook" placeholder="https://facebook.com/hellobrico" />
              <InputField label="Instagram" placeholder="https://instagram.com/hellobrico" />
              <InputField label="LinkedIn" placeholder="https://linkedin.com/company/hellobrico" />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Sauvegarder
          </button>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Mon profil</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin HelloBrico</p>
                <p className="text-xs text-muted-foreground">admin@hellobrico.tn</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Prénom" defaultValue="Admin" />
                <InputField label="Nom" defaultValue="HelloBrico" />
              </div>
              <InputField label="Email" defaultValue="admin@hellobrico.tn" />
              <InputField label="Téléphone" defaultValue="+216 XX XXX XXX" />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Mettre à jour
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">{"Préférences de notification"}</h2>
            <div className="space-y-4">
              <ToggleSetting
                label="Nouveau lead"
                description={"Recevoir un email à chaque nouvelle demande d'estimation"}
                defaultChecked
              />
              <ToggleSetting
                label="Rappel suivi"
                description="Rappel quotidien des leads non contactés depuis 48h"
                defaultChecked
              />
              <ToggleSetting
                label="Mise à jour chantier"
                description="Notification lors de mise à jour de photos sur un projet"
                defaultChecked={false}
              />
              <ToggleSetting
                label="Rapport hebdomadaire"
                description="Résumé des KPIs chaque lundi matin"
                defaultChecked
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Canaux</h2>
            <div className="space-y-4">
              <ToggleSetting label="Email" description="Notifications par email" defaultChecked />
              <ToggleSetting label="WhatsApp" description="Notifications par WhatsApp" defaultChecked={false} />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Sauvegarder
          </button>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">SEO global</h2>
            <div className="space-y-4">
              <InputField label="Titre du site" defaultValue="HelloBrico — Rénovation maîtrisée en Tunisie" />
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Meta description
                </label>
                <textarea
                  defaultValue="Rénovation premium avec méthode : étude technique, devis détaillé, supervision quotidienne et suivi live du chantier."
                  rows={3}
                  className="w-full px-4 py-3 bg-card border border-input rounded-xl text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>
              <InputField label="Mots-clés" defaultValue="rénovation tunisie, salle de bain, cuisine, hellobrico" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Google Analytics</h2>
            <InputField label="ID de suivi" placeholder="G-XXXXXXXXXX" />
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Sauvegarder
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Changer le mot de passe</h2>
            <div className="space-y-4">
              <InputField label="Mot de passe actuel" type="password" placeholder="••••••••" />
              <InputField label="Nouveau mot de passe" type="password" placeholder="••••••••" />
              <InputField label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">{"Sessions actives"}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-foreground">{"Chrome — macOS"}</p>
                  <p className="text-xs text-muted-foreground">{"Tunis, Tunisie — Dernière activité: maintenant"}</p>
                </div>
                <span className="text-xs text-green-600 font-medium">Actif</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <p className="text-sm text-foreground">{"Safari — iPhone"}</p>
                  <p className="text-xs text-muted-foreground">{"Tunis, Tunisie — Il y a 2 heures"}</p>
                </div>
                <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                  Révoquer
                </button>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Mettre à jour
          </button>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Apparence du site</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-input rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <p className="text-sm text-muted-foreground">{"Déposez votre logo ici"}</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">SVG, PNG ou JPG (max 2MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Couleur principale
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary border border-border" />
                  <input
                    type="text"
                    defaultValue="#0E2A47"
                    className="px-3 py-2 bg-card border border-input rounded-lg text-sm text-foreground font-mono w-[120px] focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Couleur accent
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent border border-border" />
                  <input
                    type="text"
                    defaultValue="#6B3F2B"
                    className="px-3 py-2 bg-card border border-input rounded-lg text-sm text-foreground font-mono w-[120px] focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
            <Save size={14} />
            Sauvegarder
          </button>
        </div>
      )}
    </div>
  )
}

function InputField({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string
  defaultValue?: string
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-card border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
      />
    </div>
  )
}

function ToggleSetting({
  label,
  description,
  defaultChecked,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked ?? false)
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
          checked ? "bg-primary" : "bg-muted"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
