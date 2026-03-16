import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PartnershipHero } from "@/components/partnership/partnership-hero"
import { PartnershipForm } from "@/components/partnership/partnership-form"
import { PartnerLogos } from "@/components/partnership/partner-logos"

export const metadata = {
  title: "Devenir partenaire — HelloBrico",
  description:
    "Proposer un partenariat avec Hello Brico. Collaborez avec nous pour développer des synergies et accéder à un réseau d'entreprises.",
}

export default function PartenairePage() {
  return (
    <>
      <Header forceSolid={true} />
      <main className="pt-[72px] bg-gray-50">
        <PartnershipHero />
        <PartnershipForm />
        <PartnerLogos />
      </main>
      <Footer />
    </>
  )
}
