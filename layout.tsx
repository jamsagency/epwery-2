import { Barlow } from "next/font/google"
import "./globals.css"
import type React from "react"
import Script from "next/script"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </head>
      <body className={`${barlow.variable} font-sans`}>{children}</body>
    </html>
  )
}

