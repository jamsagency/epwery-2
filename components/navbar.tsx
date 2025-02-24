"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect } from "react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateAndScroll = useCallback(
    (elementId: string) => {
      const isHomePage = pathname === "/"

      if (!isHomePage) {
        router.push(`/#${elementId}`)
      } else {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [pathname, router],
  )

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl topbar">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-lBchPXXNk8O6nhDGbdCG0cd1WVjtbl.png"
            alt="EPWERY"
            width={136}
            height={33}
            className="h-[33px] w-[136px]"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => navigateAndScroll("services")} className="text-white hover:text-orange-500 transition">
            Services
          </button>
          <button onClick={() => navigateAndScroll("about-us")} className="text-white hover:text-orange-500 transition">
            About us
          </button>
          <button onClick={() => navigateAndScroll("clients")} className="text-white hover:text-orange-500 transition">
            Clients
          </button>
          <Button onClick={() => navigateAndScroll("contact")} variant="outline" className="border-none bg-white rounded-full font-semibold text-black hover:bg-orange-500 hover:text-white">
            Get started
          </Button>
        </nav>
      </div>
    </header>
  )
}

