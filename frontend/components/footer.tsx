import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold">HelloBrico</span>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              {"Rénovation premium avec méthode, transparence et supervision quotidienne."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Magazine", href: "/magazine" },
                { label: "Estimation", href: "/estimation" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">
              Services
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                "Salle de bain",
                "Cuisine",
                "Rénovation complète",
                "Bureaux & locaux",
              ].map((item) => (
                <Link
                  key={item}
                  href="/services"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/70">
                <Phone size={14} />
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/70">
                <Mail size={14} />
                <span>contact@hellobrico.tn</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/70">
                <MapPin size={14} />
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            {"© 2026 HelloBrico. Tous droits réservés."}
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              {"Mentions légales"}
            </Link>
            <Link
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              {"Politique de confidentialité"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
