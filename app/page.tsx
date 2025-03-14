"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { useEffect as useEffect2, useState as useState2, useRef as useRef2 } from "react"
import AutoplayPlugin from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Download } from "lucide-react"

const CalendlyWidget = dynamic(() => import("@/components/CalendlyWidget"), { ssr: false })

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState2(0)
  const countRef = useRef2(null)

  useEffect2(() => {
    const startTime = performance.now()
    const endValue = Number.parseFloat(end.replace(/[^0-9.-]+/g, ""))

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const currentCount = Math.floor(progress * endValue)

      setCount(currentCount)

      if (progress < 1) {
        countRef.current = requestAnimationFrame(updateCount)
      } else {
        setCount(endValue)
      }
    }

    countRef.current = requestAnimationFrame(updateCount)

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current)
      }
    }
  }, [end, duration])

  const formatNumber = (num) => {
    if (end.includes("k")) return `${num}k`
    if (end.includes("K")) return `${num}K`
    if (end.includes("+")) return `${num}+`
    if (end.includes("%")) return `${num}%`
    return num.toString()
  }

  return formatNumber(count)
}

export default function Home() {
  const [activeService, setActiveService] = useState("salesforce")
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [expandedService, setExpandedService] = useState<string | undefined>(undefined)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes moveSun {
        0% {
          background-size: 100% 150%;
        }
        50% {
          background-size: 100% 120%;
        }
        100% {
          background-size: 100% 100%;
        }
      }
    `
    document.head.append(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

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
    console.log("Home page mounted")
    const sections = ["services", "about-us", "clients"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        console.log(`Section ${id} found`)
      } else {
        console.log(`Section ${id} not found`)
      }
    })
  }, [])

  useEffect(() => {
    const showMessage = (index: number) => {
      setVisibleMessages((prev) => [...prev, index])
    }

    const resetMessages = () => {
      setVisibleMessages([])
    }

    const animationSequence = async () => {
      // Show messages one by one
      for (let i = 1; i <= 4; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        showMessage(i)
      }

      // Wait before resetting
      await new Promise((resolve) => setTimeout(resolve, 2000))
      resetMessages()
    }

    const interval = setInterval(() => {
      animationSequence()
    }, 6000) // Total animation cycle duration

    // Start the animation immediately
    animationSequence()

    return () => clearInterval(interval)
  }, [])

  const services = [
    {
      id: "custom",
      title: "AI & Machine Learning",
      content:
        "We specialize in AI and Machine Learning, leveraging the latest technologies to build intelligent solutions that drive innovation and operational excellence. From predictive analytics to natural language processing, our AI-driven strategies empower businesses to make smarter decisions, automate processes, and unlock new opportunities for growth.",
      link: "ia-machine.pdf"
    },
    {
      id: "dedicated",
      title: "Team Building",
      content:
        "Our Team Building services provide flexible solutions to suit your project needs, offering both full-team integration and staff augmentation. For end-to-end project execution, we assemble dedicated, cross-functional teams that include experienced Project Managers (PMs), skilled Developers, innovative UI/UX Designers, and meticulous Quality Assurance (QA) specialists, ensuring seamless collaboration and high-quality results. Alternatively, through our staff augmentation model, we supply individual team members to enhance your existing workforce, allowing you to fill specific skill gaps and scale resources dynamically while maintaining your team’s workflow and culture.",
      link: "team-building.pdf"
    },
    {
      id: "ia",
      title: "Full Stack Web & Mobile Development",
      content:
        "We deliver innovative Full Stack Web and Mobile Development services, creating user-friendly, high-performance applications that drive business success. From intuitive websites to feature-rich mobile apps, our solutions are designed to meet modern market demands, ensuring seamless functionality and a superior user experience across all devices.",
      link: "fullstack.pdf"
    },
    {
      id: "salesforce",
      title: "Salesforce & Cloud Architecture",
      content:
        "Our expertise in Salesforce and Cloud Architecture ensures businesses can harness the power of cutting-edge technologies to streamline operations, improve scalability, and enhance customer engagement. We design and implement tailored cloud solutions, seamlessly integrating Salesforce into your existing infrastructure to maximize efficiency and foster growth.",
      link: "salesforce.pdf"
    },
  ]

 const handleServiceToggle = (value: string) => {
   if (value === expandedService) {
     setExpandedService(undefined)
   } else {
     setExpandedService(value)
   }
 }

 const videoRef = useRef(null);

 useEffect(() => {
   if (videoRef.current) {
     // Define handleClick in the proper scope
     const handleClick = () => {
       if (videoRef.current) {
         videoRef.current.play();
       }
       document.removeEventListener('click', handleClick);
     };
     
     // Try to play immediately
     const playPromise = videoRef.current.play();
     
     // Handle potential play() rejection
     if (playPromise !== undefined) {
       playPromise.catch(error => {
         console.log('Autoplay was prevented:', error);
         
         // Add a click event listener to play on first user interaction
         document.addEventListener('click', handleClick, { once: true });
       });
     }
     
     // Create intersection observer to play when visible
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting && videoRef.current) {
           videoRef.current.play();
         }
       });
     }, { threshold: 0.1 });
     
     if (videoRef.current) {
       observer.observe(videoRef.current);
     }
     
     return () => {
       if (videoRef.current) {
         observer.unobserve(videoRef.current);
       }
       document.removeEventListener('click', handleClick);
     };
   }
 }, []);

 const [isPaused, setIsPaused] = useState(false);
 const carouselApi = useRef(null);

 // Create autoplay options
 const autoplayOptions = {
   delay: 1000,
   stopOnInteraction: false,
   stopOnMouseEnter: true, // This is key for your hover functionality
   rootNode: (emblaRoot) => emblaRoot.parentElement,
 };

 const handleMouseEnter = useCallback(() => {
   setIsPaused(true);
   // The autoplay will stop automatically due to stopOnMouseEnter: true
 }, []);

 const handleMouseLeave = useCallback(() => {
   setIsPaused(false);
   if (carouselApi.current && carouselApi.current.plugins().autoplay) {
     carouselApi.current.plugins().autoplay.play();
   }
 }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-24 overflow-hidden"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundImage: "radial-gradient(circle at 50% 100%, #ffb900, #f15c05 24%, #1d1d1d 80%)",
            backgroundSize: "100% 150%",
            animation: "moveSun 5s ease infinite alternate",
          }}
        >
          <div className="container relative z-10 text-center">
            <p
              className="text-orange-500 font-medium mb-6"
              style={{
                backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <span className="font-semibold">PROVEN EXCELLENCE IN</span> <span className="italic">ACTION</span>
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Digital <span className="italic font-normal">Transformation</span> Specialists
            </h1>

            <p className="text-2xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Creating lasting value through expert guidance and execution
            </p>

            <Button
              onClick={() => navigateAndScroll("contact")}
              size="lg"
              className="bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white"
            >
              Unlock success
            </Button>

            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our numbers don't lie</h2>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-orange-500/30 to-orange-600/30 blur-3xl" />
                <div className="relative gap-2 md:gap-0 grid grid-cols-2 md:grid-cols-5 py-8 rounded-2xl backdrop-blur-sm bg-white/5">
                  <div className="text-center border-r border-gray-100/30 px-4">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end="160k" />
                    </div>
                    <p className="text-sm text-gray-300">hours delivered on the last year</p>
                  </div>
                  <div className="hidden md:block text-center md:border-r border-gray-100/30 px-4">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end="21,5K" />
                    </div>
                    <p className="text-sm text-gray-300">active users with access to our apps</p>
                  </div>
                  <div className="text-center md:border-r border-gray-100/30 px-4">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end="100+" />
                    </div>
                    <p className="text-sm text-gray-300">team members dedicated to client projects worldwide</p>
                  </div>
                  <div className="text-center md:border-r border-gray-100/30 px-4">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end="98%" />
                    </div>
                    <p className="text-sm text-gray-300">client retention rate</p>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end="10%" />
                    </div>
                    <p className="text-sm text-gray-300">Employee turnover below</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

 {/* Services Section */}
     <section ref={servicesRef} id="services" className="pt-24 pb-56">
       <div className="container">
         <div className="max-w-4xl mb-4">
           <p
             className="text-orange-500 text-xl mb-6 font-semibold"
             style={{
               backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
               WebkitBackgroundClip: "text",
               backgroundClip: "text",
               color: "transparent",
             }}
           >
             We don't just offer services; we deliver honest, high-quality solutions.
           </p>
           <h2 className="font-bold text-4xl md:text-5xl text-white mb-8">
             Your success <span className="font-normal italic">is our priority</span>, backed by an{" "}
             <span className="font-normal italic">honest and professional approach.</span>
           </h2>
           <p className="text-gray-300 text-lg leading-relaxed">
             At Epwery, we understand that every project has unique needs. That's why, beyond the range of services
             we provide, our philosophy is clear: always recommend the solution that truly benefits your business. We
             are committed to working with the highest quality standards, keeping your interests at the heart of
             everything we do. Because when you grow, so do we.
           </p>
         </div>

         {/* Desktop Layout (>992px) */}
         <div className="hidden lg:block relative h-[600px]">
           {/* Orange ISO shape */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
             <Image
               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-services-iso-eu8ThStbSnrE6RdJmVG5cAyMZh5aAj.svg"
               alt=""
               width={650}
               height={650}
               className="orange-iso-shape"
             />
           </div>

           {/* AI & Machine Learning */}
           <div className="absolute left-4 top-28 [&[data-state=open]]:z-30 accordion-ai">
             <Accordion
               type="single"
               collapsible
               value={expandedService}
               onValueChange={handleServiceToggle}
               className="w-[300px]"
             >
               <AccordionItem value="custom" className="border-none">
                 <AccordionTrigger
                   className={`px-4 py-3 text-white text-center hover:no-underline font-bold justify-center transition-all duration-300 ${
                     expandedService && expandedService !== "custom" ? "blur-[2px]" : ""
                   }`}
                   style={{
                     backgroundImage:
                       "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                     borderRadius: "8px",
                   }}
                 >
                   AI & Machine Learning
                 </AccordionTrigger>
                 <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20 text-center accordion-content-box">
                   {services.find((s) => s.id === "custom")?.content}
                   <div className="mt-4">
                     <a
                       href="/ia-machine.pdf"
                       className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                       target="_blank"
                     >
                       Learn more <Download className="h-4 w-4" />
                     </a>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
             <Image
               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-top-Je3anW1VK3l0AzDLXMxjkNzrG0uP17.svg"
               alt=""
               width={203}
               height={42}
               className="absolute left-[125px] top-[60px]"
             />
           </div>

           {/* Team Building */}
           <div className="absolute right-[15em] top-[230px] [&[data-state=open]]:z-30 accordion-team">
             <Image
               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-right-top-ouzT5fArd7D500Tlt2kVkyoJpFTFIZ.svg"
               alt=""
               width={161}
               height={45}
               className="absolute right-[310px] top-[20px]"
             />
             <Accordion
               type="single"
               collapsible
               value={expandedService}
               onValueChange={handleServiceToggle}
               className="w-[300px]"
             >
               <AccordionItem value="dedicated" className="border-none">
                 <AccordionTrigger
                   className={`font-bold rounded-lg px-6 py-3 text-white hover:no-underline justify-center transition-all duration-300 ${
                     expandedService && expandedService !== "dedicated" ? "blur-[2px]" : ""
                   }`}
                   style={{
                     backgroundImage:
                       "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                     borderRadius: "8px",
                   }}
                 >
                   Team Building
                 </AccordionTrigger>
                 <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20 text-center accordion-content-box">
                   {services.find((s) => s.id === "dedicated")?.content}
                   <div className="mt-4">
                     <a
                       href="/team-building.pdf"
                       target="_blank"
                       className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                     >
                       Learn more <Download className="h-4 w-4" />
                     </a>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
           </div>

           {/* Full Stack Web & Mobile Development */}
           <div className="absolute left-[2em] top-[27em] [&[data-state=open]]:z-30 accordion-dev">
             <Accordion
               type="single"
               collapsible
               value={expandedService}
               onValueChange={handleServiceToggle}
               className="w-[300px]"
             >
               <AccordionItem value="ia" className="border-none">
                 <AccordionTrigger
                   className={`font-bold rounded-lg px-6 py-3 text-white hover:no-underline justify-center transition-all duration-300 ${
                     expandedService && expandedService !== "ia" ? "blur-[2px]" : ""
                   }`}
                   style={{
                     backgroundImage:
                       "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                     borderRadius: "8px",
                   }}
                 >
                   Full Stack Web & Mobile Development
                 </AccordionTrigger>
                 <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20 text-center accordion-content-box">
                   {services.find((s) => s.id === "ia")?.content}
                   <div className="mt-4">
                     <a
                       href="/fullstack.pdf"
                       target="_blank"
                       className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                     >
                       Learn more <Download className="h-4 w-4" />
                     </a>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
             <Image
               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-bottom-x2yIUFOLljpCxSX3TjHlXdhBA0ImlB.svg"
               alt=""
               width={203}
               height={42}
               className="absolute left-[110px] top-[-55px]"
             />
           </div>

           {/* Salesforce & Cloud Architecture */}
           <div className="absolute right-[9em] top-[31em] [&[data-state=open]]:z-30 accordion-salesforce">
             <Image
               src="/home-arrow-right-bottom.svg"
               alt=""
               width={236}
               height={58}
               className="absolute right-[325px] top-[-26px]"
             />
             <Accordion
               type="single"
               collapsible
               value={expandedService}
               onValueChange={handleServiceToggle}
               className="w-[320px]"
             >
               <AccordionItem value="salesforce" className="border-none">
                 <AccordionTrigger
                   className={`font-bold rounded-lg px-6 py-3 text-white hover:no-underline justify-center transition-all duration-300 ${
                     expandedService && expandedService !== "salesforce" ? "blur-[2px]" : ""
                   }`}
                   style={{
                     backgroundImage:
                       "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 119%)",
                     borderRadius: "8px",
                   }}
                 >
                   Salesforce & Cloud Architecture
                 </AccordionTrigger>
                 <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20 text-center accordion-content-box">
                   {services.find((s) => s.id === "salesforce")?.content}
                   <div className="mt-4">
                     <a
                       href="/salesforce.pdf"
                       className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                       target="_blank"
                     >
                       Learn more <Download className="h-4 w-4" />
                     </a>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
           </div>
         </div>

         {/* Mobile Layout (≤992px) */}
         <div className="lg:hidden">
           <Accordion
             type="single"
             collapsible
             value={expandedService}
             onValueChange={handleServiceToggle}
             className="w-full space-y-4"
           >
             {services.map((service) => (
               <AccordionItem key={service.id} value={service.id} className="border-none">
                 <AccordionTrigger
                   className={`bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800 transition-all duration-300 ${
                     expandedService && expandedService !== service.id ? "blur-[2px]" : ""
                   }`}
                 >
                   {service.title}
                 </AccordionTrigger>
                 <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                   {service.content}
                   <div className="mt-4">
                     <a
                       href={service.link}
                       target="_blank"
                       className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                     >
                       Learn more <Download className="h-4 w-4" />
                     </a>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             ))}
           </Accordion>
         </div>
       </div>
     </section>

        {/* Engineers Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <p
                  className="text-lg mb-6 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  A Partner Who Truly Understands Technology
                </p>
                <h2 className="text-4xl md:text-5xl text-zinc-900 mb-8 font-bold">
                  Engineers, <span className="font-normal italic">Not</span>
                  <br />
                  <span className="font-normal italic">Salespeople.</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    At EPWERY, what sets us apart is that we're led by engineers, not salespeople. From your very first
                    contact, you'll engage in an honest and knowledgeable conversation with our founders—seasoned
                    technology experts who understand your challenges and can provide tailored recommendations.
                  </p>
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    You won't need to navigate through layers of sales representatives to get clear answers about
                    technical or commercial aspects. We're committed to building trust from day one, encouraging you to
                    test us out and experience the value we bring firsthand.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8"
                    >
                      Explore now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative pt-8">
                <video 
                      ref={videoRef}
                      className="h-full object-contain"
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/chat-fix.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
{/*                <div className="relative h-[600px]">
                  <Image
                    src="/message-1.svg"
                    alt="Message 1"
                    width={350}
                    height={85}
                    className={`absolute top-0 transition-opacity duration-500 ${
                      visibleMessages.includes(1) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-2.svg"
                    alt="Message 2"
                    width={350}
                    height={85}
                    className={`absolute top-[90px] right-0 transition-opacity duration-500 ${
                      visibleMessages.includes(2) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-3.svg"
                    alt="Message 3"
                    width={350}
                    height={85}
                    className={`absolute top-[260px] transition-opacity duration-500 ${
                      visibleMessages.includes(3) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-4.svg"
                    alt="Message 4"
                    width={350}
                    height={85}
                    className={`absolute top-[370px] right-0 transition-opacity duration-500 ${
                      visibleMessages.includes(4) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>*/}
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section ref={aboutUsRef} id="about-us" className="py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <p
                  className="text-xl mb-6 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  The Perfect Nearshore Partner
                </p>
                <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold">
                  Seamless Collaboration, <span className="font-normal italic">Exceptional Value</span>
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Located in Uruguay, with most of our developers based in Argentina, EPWERY offers a{" "}
                    <span className="text-white font-semibold">nearshore advantage</span> that makes us the ideal
                    partner for U.S.-based companies. Our similar time zone ensures real-time collaboration, enabling
                    seamless integration with your teams.
                  </p>
                  <p className="text-lg">
                    With development costs approximately{" "}
                    <span className="text-white font-semibold">50% lower than in the U.S.</span>, we deliver
                    high-quality solutions that optimize your budget. Additionally, our{" "}
                    <span className="text-white font-semibold">
                      shared cultural values and work ethic foster clear communication
                    </span>{" "}
                    and alignment, providing a smooth and productive working relationship.
                  </p>
                  <p className="text-lg">
                    This <span className="text-white font-semibold">unique combination of proximity</span>,
                    affordability, and cultural compatibility sets us apart as a trusted partner for your technology
                    needs.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-map-6eRnSKWcYtB7ymagINVFpLzY21UdhV.svg"
                  alt="World map showing EPWERY's global presence"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-12 overflow-hidden bg-zinc-900">
          <h2 className="text-4xl md:text-5xl text-white text-center mb-12">Technology</h2>

          {/* Technology Logos */}
          <div className="relative mb-4">
            <div>
              <div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center bg-zinc-800/50 rounded-lg w-[140px] h-[80px] px-4">
                    <Image
                      src={"/salesforce.png"}
                      alt={"Salesforce"}
                      width={120}
                      height={60}
                      className="w-auto h-8 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center bg-zinc-800/50 rounded-lg w-[140px] h-[80px] px-4">
                    <Image
                      src={"/azure.png"}
                      alt={"Azure"}
                      width={120}
                      height={60}
                      className="w-auto h-8 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center bg-zinc-800/50 rounded-lg w-[140px] h-[80px] px-4">
                    <Image
                      src={"/openai.png"}
                      alt={"Open AI"}
                      width={120}
                      height={60}
                      className="w-auto h-8 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center bg-zinc-800/50 rounded-lg w-[140px] h-[80px] px-4">
                    <Image
                      src={"/aws.png"}
                      alt={"AWS"}
                      width={120}
                      height={60}
                      className="w-auto h-8 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Technology Logos Marquee (Reverse) */}
          <div className="relative">
            <div className="marquee-container">
              <div className="marquee marquee-reverse">
                {[...Array(1)].map((_, setIndex) => (
                  <div key={`set-${setIndex}`} className="rounded-lg flex gap-4">
                    {[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/js-P11bfwIQEJwhpT29R2YPlH9rg2l1k4.png",
                        alt: "JavaScript",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stripe-2wNVOi3Kh7QDNJpu8cqdqJKlUIZhiG.png",
                        alt: "Stripe",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neo4j-s7ttZpMpY3UICHuN3sHh284pOmdBIw.png",
                        alt: "Neo4j",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-JkgWiLA77Cxk3IfxUW6bTXC8VJgkbg.png",
                        alt: "Python",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/react.png",
                        alt: "React",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/docker.png",
                        alt: "Docker",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/twilio.png",
                        alt: "Twilio",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/paypal.png",
                        alt: "PayPal",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/docusign.png",
                        alt: "Docusign",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/datadog.png",
                        alt: "Datadog",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/pytorch.png",
                        alt: "Pytorch",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/selenium.png",
                        alt: "Selenium",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/sendgrid.png",
                        alt: "Sendgrid",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/flutter.png",
                        alt: "Flutter",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/slack.png",
                        alt: "Slack",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/swift.png",
                        alt: "Swift",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/tensorflow.png",
                        alt: "Tensorflow",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/github.png",
                        alt: "GitHub",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/go.png",
                        alt: "Go",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "/hf.png",
                        alt: "HF",
                        bg: "bg-zinc-800/50",
                      },
                    ].map((logo, i) => (
                      <div
                        key={`logo-${setIndex}-${i}`}
                        className={`flex-shrink-0 flex items-center justify-center ${logo.bg} rounded-lg w-[120px] h-[60px] px-4`}
                      >
                        <Image
                          src={logo.src || "/placeholder.svg"}
                          alt={logo.alt}
                          width={100}
                          height={40}
                          className="w-auto h-8 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
                <section className="bg-[#FF4D00] py-24">
                  <div className="container">
                    <div className="flex flex-wrap-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
                      <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">See Innovation in Action</h2>
                        <div className="space-y-6">
                          <p className="text-black text-lg leading-relaxed">
                            Explore how we continuously test and evaluate emerging technologies to uncover their true potential
                            and deliver meaningful value. In this section, you'll find examples of cutting-edge experiments and
                            integrations that go beyond fleeting trends.
                          </p>
                          <p className="text-black text-lg leading-relaxed">
                            For years, our commitment to identifying impactful solutions has set us apart, ensuring we stay
                            ahead without compromising on what truly matters: innovation that makes a difference.
                          </p>
                          <div className="pt-6">
                            <Button 
                              onClick={() => router.push('/innovation')}
                              size="lg" 
                              className="bg-black text-white hover:bg-zinc-800 rounded-full px-8"
                            >
                              Explore our innovations
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="relative rounded-xl overflow-hidden shadow-2xl">
                        <img src="/innovation-see-how-it-works.png" className="block w-full" />
{/*                        <div className="aspect-video bg-black">
                          <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
                            title="Epwery Innovation Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>*/}
                      </div>
                    </div>
                  </div>
                </section>

        {/* Clients Section */}
        <section ref={clientsRef} id="clients" className="relative py-24 bg-zinc-900 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/testimonials-bg.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold">What our clients are saying</h2>
              <p className="text-lg text-gray-300">
                Our commitment to excellence and client satisfaction speaks through the success stories of those who've
                partnered with us. Here's what some of our valued clients have to share about their experience working
                with EPWERY.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
                autoplay: true,
                delay: 1000,
                plugins: [
                      AutoplayPlugin({ delay: 1000, stopOnInteraction: false, stopOnMouseEnter: true })
                    ]
              }}
              className="w-full testimonial-carousel"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              setApi={(api) => {
                  carouselApi.current = api;
                }}
            >
              <CarouselContent className="items-center md:items-stretch -ml-2 md:-ml-4">
                {[
                  {
                    name: "Vinay Gidwaney",
                    role: "Entrepreneur and advisor",
                    image: "https://media.licdn.com/dms/image/v2/C4E03AQG004hqX_ADrg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1638284298104?e=1744848000&v=beta&t=ymuiQ2xTCkYmASHYtZdTQw9EXM1nVNINO6noztFEEVg",
                    quote: "Epwery helped us get a world class software team up and running in record time. The team is highly skilled and versatile and has become a great extension to our onsite full time employees.",
                    logo: "/onedigital.webp",
                    logoWidth: 150,
                    logoPhrase: "Advocates of Health, Success and Financial Security",
                    companyLink: "https://www.onedigital.com/"
                  },
                  {
                    name: "Poonam Kalinani",
                    role: "Chief Product Officer",
                    image: "https://media.licdn.com/dms/image/v2/D5603AQGgiKfMv5e28Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729624869853?e=1744848000&v=beta&t=BY5U4ehSDOU5StL-Tzt1JY_1QExBBSP-IP0RFFxRBaE",
                    quote: "With strong engineering and a business-first mindset, they excel at crafting MVPs and scaling products. Their leadership and practical architecture make them invaluable for product businesses.",
                    logo: "/2u-logo.svg",
                    logoWidth: 54,
                    logoPhrase: "Creating a Better Future for All with edX | 2U",
                    companyLink: "https://2u.com/"
                  },
                  {
                    name: "Veer Gidwaney",
                    role: "CEO",
                    image: "https://media.licdn.com/dms/image/v2/C5603AQF-13tyiwjybQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1657300368033?e=1744848000&v=beta&t=jIovGveIgqDOC5nXUK1LXrSzcNoDnFr4FLAv02Zj7Ng",
                    quote: "Our exceptional EPWERY team is fully dedicated to Ansel's success, embracing our mission and values while driving rapid innovation from ideation to market—a true competitive edge.",
                    logo: "/ansel-logo.svg",
                    logoWidth: 100,
                    logoPhrase: "Better Suplemental Health Insurance",
                    companyLink: "https://www.joinansel.com/"
                  },
                  {
                    name: "Greg Kegeles",
                    role: "Operating Partner at Newlight Partners",
                    image: "/greg-kegeles.jpeg",
                    quote: "Epwery has been an excellent partner for years, especially in handling complex Salesforce projects across industries ranging from education to financial services. Their expertise, reliability, and commitment to delivering high-quality solutions make them a trusted partner in every engagement.",
                    logo: "/newlight-partners.png",
                    logoWidth: 150,
                    logoPhrase: "Building Businesses",
                    companyLink: "https://www.newlightpartners.com/"
                  },
                  {
                    name: "Jay Chakrapani",
                    role: "Chief Product Officer",
                    image: "/jay-c.jpg",
                    quote: "This company has been pivotal in my projects for 7+ years, offering adaptable teams, exceptional service, and consistently achieving outstanding, cost-effective results.",
                    logo: "/brainpop.jpg",
                    logoWidth: 75,
                    logoPhrase: "The power of joyful learning",
                    companyLink: "https://www.brainpop.com/"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
                    <div className="bg-white rounded-3xl p-6 pt-14 relative testimonial-box h-full">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <blockquote className="text-center mb-2">
                          <p className="text-zinc-600 leading-relaxed">
                            {testimonial.quote}
                          </p>
                        </blockquote>
                        <div className="text-center">
                          <p className="font-semibold text-zinc-900">{testimonial.name}</p>
                          <p className="text-zinc-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center self-end">
                        <a href={testimonial.companyLink} target="_blank">
                          <Image
                            src={testimonial.logo || "/placeholder.svg"}
                            width={testimonial.logoWidth}
                            height={64}
                            alt={`${testimonial.name}'s company logo`}
                            className="inline-block mb-4"
                          />
                        </a>
                        <p className="text-center block text-sm text-gray-800">{testimonial.logoPhrase}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8 text-white">
                <CarouselPrevious className="relative static" />
                <CarouselNext className="relative static" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Schedule Section */}
        <section ref={contactRef} id="contact" className="relative py-24 bg-zinc-900 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/schedule-bg-OnzJmcvjdRmUDqneGrjZgbCmB1CPg4.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10">
            <h2 className="text-4xl md:text-5xl text-white text-center mb-16 font-bold">
              Schedule a free 30-minute consultation
            </h2>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
              <CalendlyWidget />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

