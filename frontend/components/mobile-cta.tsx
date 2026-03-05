"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setVisible(scrollPercent > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
      <Link
        href="/estimation"
        className="block w-full text-center bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase py-3.5 rounded-[10px] hover:bg-[#0A1F35] transition-all duration-300"
      >
        Demander une estimation
      </Link>
    </div>
  )
}
