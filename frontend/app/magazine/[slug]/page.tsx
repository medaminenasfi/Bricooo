import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileCTA } from "@/components/mobile-cta"
import { ArticleHeader } from "@/components/magazine/article/article-header"
import { ArticleContent } from "@/components/magazine/article/article-content"
import { ExpertAdvice } from "@/components/magazine/article/expert-advice"
import { ArticleCTA } from "@/components/magazine/article/article-cta"
import { SimilarArticles } from "@/components/magazine/article/similar-articles"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export const metadata = {
  title: "5 erreurs à éviter lors d'une rénovation salle de bain - HelloBrico Magazine",
  description: "L'étanchéité, le choix des matériaux, la ventilation : découvrez les points critiques à éviter pour une rénovation de salle de bain réussie en Tunisie.",
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ArticleHeader />
        <ArticleContent />
        <ExpertAdvice />
        <ArticleCTA />
        <SimilarArticles />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}
