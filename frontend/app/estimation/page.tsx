import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EstimationWizard } from "@/components/estimation/estimation-wizard"

export const metadata = {
  title: "Demande d'estimation — HelloBrico",
  description:
    "Décrivez votre projet de rénovation et recevez une estimation structurée. Sans engagement.",
}

export default function EstimationPage() {
  return (
    <>
      <Header forceSolid={true} />
      <main className="pt-[72px]">
        <EstimationWizard />
      </main>
      <Footer />
    </>
  )
}
