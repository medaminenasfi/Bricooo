"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  Send,
  Eye,
  ArrowLeft,
  FileText,
  Plus,
} from "lucide-react"

type Quote = {
  id: number
  reference: string
  client: string
  type: string
  amount: string
  status: string
  createdAt: string
  validUntil: string
  items: { description: string; qty: number; unit: string; unitPrice: number; total: number }[]
}

const allQuotes: Quote[] = [
  {
    id: 1,
    reference: "DEV-2026-001",
    client: "Ahmed Ben Ali",
    type: "Rénovation complète",
    amount: "62 000 DT",
    status: "Accepté",
    createdAt: "15 Jan 2026",
    validUntil: "15 Fév 2026",
    items: [
      { description: "Démolition et évacuation", qty: 1, unit: "forfait", unitPrice: 4500, total: 4500 },
      { description: "Plomberie complète", qty: 1, unit: "forfait", unitPrice: 8200, total: 8200 },
      { description: "Électricité mise aux normes", qty: 1, unit: "forfait", unitPrice: 6800, total: 6800 },
      { description: "Carrelage sol (m²)", qty: 120, unit: "m²", unitPrice: 85, total: 10200 },
      { description: "Faïence salle de bain", qty: 45, unit: "m²", unitPrice: 95, total: 4275 },
      { description: "Menuiserie et portes", qty: 8, unit: "unité", unitPrice: 1200, total: 9600 },
      { description: "Peinture intérieure", qty: 280, unit: "m²", unitPrice: 25, total: 7000 },
      { description: "Cuisine équipée", qty: 1, unit: "forfait", unitPrice: 11425, total: 11425 },
    ],
  },
  {
    id: 2,
    reference: "DEV-2026-002",
    client: "Sonia Trabelsi",
    type: "Salle de bain",
    amount: "28 000 DT",
    status: "Envoyé",
    createdAt: "20 Jan 2026",
    validUntil: "20 Fév 2026",
    items: [
      { description: "Démolition salle de bain", qty: 1, unit: "forfait", unitPrice: 1800, total: 1800 },
      { description: "Plomberie", qty: 1, unit: "forfait", unitPrice: 4500, total: 4500 },
      { description: "Étanchéité douche italienne", qty: 1, unit: "forfait", unitPrice: 3200, total: 3200 },
      { description: "Carrelage sol et murs", qty: 35, unit: "m²", unitPrice: 110, total: 3850 },
      { description: "Sanitaires et robinetterie", qty: 1, unit: "forfait", unitPrice: 8650, total: 8650 },
      { description: "Éclairage et finitions", qty: 1, unit: "forfait", unitPrice: 6000, total: 6000 },
    ],
  },
  {
    id: 3,
    reference: "DEV-2026-003",
    client: "Nadia Jemli",
    type: "Salle de bain x2",
    amount: "42 000 DT",
    status: "Brouillon",
    createdAt: "25 Fév 2026",
    validUntil: "—",
    items: [
      { description: "Démolition 2 salles de bain", qty: 2, unit: "forfait", unitPrice: 1800, total: 3600 },
      { description: "Plomberie x2", qty: 2, unit: "forfait", unitPrice: 4500, total: 9000 },
      { description: "Carrelage et faïence", qty: 70, unit: "m²", unitPrice: 105, total: 7350 },
      { description: "Sanitaires premium", qty: 2, unit: "lot", unitPrice: 6500, total: 13000 },
      { description: "Finitions et accessoires", qty: 1, unit: "forfait", unitPrice: 9050, total: 9050 },
    ],
  },
  {
    id: 4,
    reference: "DEV-2026-004",
    client: "Yassine Ferchichi",
    type: "Rénovation complète",
    amount: "85 000 DT",
    status: "Envoyé",
    createdAt: "22 Fév 2026",
    validUntil: "22 Mars 2026",
    items: [
      { description: "Démolition complète villa", qty: 1, unit: "forfait", unitPrice: 7500, total: 7500 },
      { description: "Gros oeuvre et structure", qty: 1, unit: "forfait", unitPrice: 15000, total: 15000 },
      { description: "Plomberie et assainissement", qty: 1, unit: "forfait", unitPrice: 12000, total: 12000 },
      { description: "Électricité complète", qty: 1, unit: "forfait", unitPrice: 9500, total: 9500 },
      { description: "Revêtements sols et murs", qty: 200, unit: "m²", unitPrice: 90, total: 18000 },
      { description: "Menuiserie intérieure", qty: 12, unit: "unité", unitPrice: 1100, total: 13200 },
      { description: "Peinture et finitions", qty: 1, unit: "forfait", unitPrice: 9800, total: 9800 },
    ],
  },
]

const quoteStatuses = ["Tous", "Brouillon", "Envoyé", "Accepté", "Refusé"]
const quoteStatusColors: Record<string, string> = {
  Brouillon: "bg-muted text-muted-foreground",
  "Envoyé": "bg-blue-50 text-blue-700",
  "Accepté": "bg-green-50 text-green-700",
  "Refusé": "bg-red-50 text-red-700",
}

export default function AdminQuotes() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tous")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const filtered = allQuotes.filter((q) => {
    const matchSearch =
      q.client.toLowerCase().includes(search.toLowerCase()) ||
      q.reference.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "Tous" || q.status === statusFilter
    return matchSearch && matchStatus
  })

  if (selectedQuote) {
    const subtotal = selectedQuote.items.reduce((sum, item) => sum + item.total, 0)
    const tva = subtotal * 0.19
    const total = subtotal + tva

    return (
      <div className="p-6 lg:p-8 max-w-[1200px]">
        <button
          onClick={() => setSelectedQuote(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux devis
        </button>

        {/* Quote header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  {selectedQuote.reference}
                </h2>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    quoteStatusColors[selectedQuote.status] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedQuote.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedQuote.client} &mdash; {selectedQuote.type}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <Download size={12} />
                PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-[#0A1F35] transition-colors">
                <Send size={12} />
                Envoyer
              </button>
            </div>
          </div>
          <div className="flex gap-6 mt-4 text-xs text-muted-foreground">
            <span>{"Créé le"} {selectedQuote.createdAt}</span>
            <span>{"Valide jusqu'au"} {selectedQuote.validUntil}</span>
          </div>
        </div>

        {/* Quote items table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Description</th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">Qté</th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">Unité</th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">P.U.</th>
                  <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedQuote.items.map((item, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-3 text-foreground">{item.description}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{item.qty}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{item.unitPrice.toLocaleString()} DT</td>
                    <td className="px-6 py-3 text-right font-medium text-foreground">{item.total.toLocaleString()} DT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-border px-6 py-4 bg-muted/20">
            <div className="flex justify-end">
              <div className="w-[280px] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total HT</span>
                  <span className="text-foreground font-medium">{subtotal.toLocaleString()} DT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (19%)</span>
                  <span className="text-foreground">{Math.round(tva).toLocaleString()} DT</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-border pt-2">
                  <span className="text-foreground">Total TTC</span>
                  <span className="text-foreground">{Math.round(total).toLocaleString()} DT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Devis
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {"Créez, envoyez et suivez vos devis clients"}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#0A1F35] transition-colors">
          <Plus size={14} />
          Nouveau devis
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par client ou référence..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-input rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-card border border-input rounded-lg text-sm text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
          >
            {quoteStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Référence</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Client</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Type</th>
                <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">Montant</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Statut</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium">Date</th>
                <th className="px-6 py-3 text-center text-xs uppercase tracking-wider text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote) => (
                <tr key={quote.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground flex items-center gap-2">
                    <FileText size={14} className="text-muted-foreground" />
                    {quote.reference}
                  </td>
                  <td className="px-6 py-3 text-foreground">{quote.client}</td>
                  <td className="px-6 py-3 text-muted-foreground">{quote.type}</td>
                  <td className="px-6 py-3 text-right font-semibold text-foreground">{quote.amount}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${quoteStatusColors[quote.status] || "bg-muted text-muted-foreground"}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{quote.createdAt}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Voir le devis"
                      >
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Télécharger">
                        <Download size={14} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Envoyer">
                        <Send size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
