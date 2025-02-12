"use client"

import { useEffect } from "react"

export default function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/admin-epwery/30min?background_color=dc0808&text_color=26db13&primary_color=ff7d00"
      style={{ minWidth: "320px", height: "700px" }}
    />
  )
}

