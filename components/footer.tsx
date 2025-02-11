"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useCallback, useEffect } from "react"

export default function Footer() {
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
    <footer className="bg-[#1C1C1C] py-8">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-lBchPXXNk8O6nhDGbdCG0cd1WVjtbl.png"
            alt="EPWERY"
            width={136}
            height={33}
            className="h-[33px] w-[136px]"
          />
        </div>

        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/company/epwery/" target="_blank" className="text-white hover:text-orange-500 transition">
            <svg width="25" height="auto" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M29.9086 0.333984C31.1229 0.333984 32.1943 1.40541 32.1943 2.69113V30.0483C32.1943 31.334 31.1229 32.334 29.9086 32.334H2.40862C1.19434 32.334 0.194336 31.334 0.194336 30.0483V2.69113C0.194336 1.40541 1.19434 0.333984 2.40862 0.333984H29.9086ZM9.83719 27.7626V12.5483H5.12291V27.7626H9.83719ZM7.48005 10.4054C8.98005 10.4054 10.1943 9.19113 10.1943 7.69113C10.1943 6.19113 8.98005 4.90541 7.48005 4.90541C5.90862 4.90541 4.69434 6.19113 4.69434 7.69113C4.69434 9.19113 5.90862 10.4054 7.48005 10.4054ZM27.6229 27.7626V19.4054C27.6229 15.334 26.6943 12.1197 21.9086 12.1197C19.6229 12.1197 18.0515 13.4054 17.4086 14.6197H17.3372V12.5483H12.8372V27.7626H17.5515V20.2626C17.5515 18.2626 17.9086 16.334 20.4086 16.334C22.8372 16.334 22.8372 18.6197 22.8372 20.334V27.7626H27.6229Z"
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>
{/*          <a href="mailto:contact@epwery.com" className="text-white hover:text-orange-500 transition">
            <Mail size={24} />
            <span className="sr-only">Email</span>
          </a>*/}
        </div>

        <div className="flex items-center gap-8">
          <button onClick={() => navigateAndScroll("services")} className="text-white hover:text-orange-500 transition">
            Services
          </button>
          <button onClick={() => navigateAndScroll("about-us")} className="text-white hover:text-orange-500 transition">
            About us
          </button>
          <button onClick={() => navigateAndScroll("clients")} className="text-white hover:text-orange-500 transition">
            Clients
          </button>
          <Button onClick={() => navigateAndScroll("contact")} className="bg-white text-black hover:bg-orange-500 hover:text-white rounded-full">
            Unlock success
          </Button>
        </div>
      </div>
    </footer>
  )
}

