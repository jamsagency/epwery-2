import type React from "react"

interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}

export default function Button({ variant = "primary", size = "md", className, children }: ButtonProps) {
  const sizeClass = size === "sm" ? "text-sm py-2 px-4" : size === "lg" ? "text-lg py-3 px-6" : "text-base py-2.5 px-5"
  const variantClass =
    variant === "primary" ? "bg-[#FF4D00] text-white hover:bg-[#CC4000]" : "text-zinc-900 hover:bg-zinc-100"

  return <button className={`${sizeClass} ${variantClass} rounded-full font-medium ${className}`}>{children}</button>
}

