"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const [activeService, setActiveService] = useState("salesforce")

  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

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

  const services = [
    {
      id: "custom",
      title: "Custom software",
      content: "Custom software development content goes here...",
    },
    {
      id: "dedicated",
      title: "Dedicated Engineering Teams",
      content: "Dedicated Engineering Teams content goes here...",
    },
    {
      id: "ia",
      title: "IA & machine learning",
      content: "IA & machine learning content goes here...",
    },
    {
      id: "salesforce",
      title: "Salesforce & Cloud Architecture",
      content:
        "Our expertise in Salesforce and Cloud Architecture empowers businesses to leverage cutting-edge technologies with ease. Thanks to our field-proven software solutions, integrating Salesforce into your existing infrastructure becomes seamless, enabling streamlined operations, enhanced scalability, and reduced licensing costs. Our tailored cloud solutions simplify the process, maximizing efficiency while driving sustainable growth.",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 via-transparent to-transparent opacity-40" />

          <div className="container relative z-10 text-center">
            <p className="text-orange-500 font-medium mb-6">
              <span className="text-white">PROVEN EXCELLENCE IN</span> ACTION
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Digital <span className="italic font-normal">Transformation</span> Specialists
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Creating lasting value through expert guidance and execution
            </p>

            <Button size="lg" className="bg-white text-black hover:bg-orange-500 hover:text-white">
              Unlock success
            </Button>

            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl text-white mb-12">Our numbers don't lie</h2>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-orange-500/30 to-orange-600/30 blur-3xl" />
                <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8 p-8 rounded-2xl backdrop-blur-sm bg-white/5">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">160k</div>
                    <p className="text-sm text-gray-300">hours delivered on the last year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">21,5K</div>
                    <p className="text-sm text-gray-300">active users with access to our apps</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">+80</div>
                    <p className="text-sm text-gray-300">team members dedicated to client projects worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                    <p className="text-sm text-gray-300">client retention rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">10%</div>
                    <p className="text-sm text-gray-300">Employee turnover below</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} id="services" className="py-24">
          <div className="container">
            <div className="max-w-4xl mb-24">
              <p className="text-orange-500 text-lg mb-6">
                We don't just offer services; we deliver honest, high-quality solutions.
              </p>
              <h2 className="text-4xl md:text-5xl text-white mb-8">
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
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-services-iso-eu8ThStbSnrE6RdJmVG5cAyMZh5aAj.svg"
                  alt=""
                  width={400}
                  height={400}
                  className="w-auto h-auto"
                />
              </div>

              {/* Custom software */}
              <div className="absolute left-0 top-0">
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[200px]">
                  <AccordionItem value="custom" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      Custom software
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/50 mt-2 p-4 rounded-lg text-gray-300">
                      {services.find((s) => s.id === "custom")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-top-Je3anW1VK3l0AzDLXMxjkNzrG0uP17.svg"
                  alt=""
                  width={203}
                  height={42}
                  className="absolute left-[180px] top-[20px]"
                />
              </div>

              {/* Dedicated Engineering Teams */}
              <div className="absolute right-0 top-[100px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-right-top-ouzT5fArd7D500Tlt2kVkyoJpFTFIZ.svg"
                  alt=""
                  width={161}
                  height={45}
                  className="absolute right-[280px] top-[20px]"
                />
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[280px]">
                  <AccordionItem value="dedicated" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      Dedicated Engineering Teams
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/50 mt-2 p-4 rounded-lg text-gray-300">
                      {services.find((s) => s.id === "dedicated")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* IA & machine learning */}
              <div className="absolute left-0 bottom-0">
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[200px]">
                  <AccordionItem value="ia" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      IA & machine learning
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/50 mt-2 p-4 rounded-lg text-gray-300">
                      {services.find((s) => s.id === "ia")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-bottom-x2yIUFOLljpCxSX3TjHlXdhBA0ImlB.svg"
                  alt=""
                  width={203}
                  height={42}
                  className="absolute left-[180px] bottom-[20px]"
                />
              </div>

              {/* Salesforce & Cloud Architecture */}
              <div className="absolute right-0 bottom-[100px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-right-top-long-RI97s5sBlCpI2tEslro0ABnLeS6Ea5.svg"
                  alt=""
                  width={236}
                  height={58}
                  className="absolute right-[280px] bottom-[20px]"
                />
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[280px]">
                  <AccordionItem value="salesforce" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      Salesforce & Cloud Architecture
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/50 mt-2 p-4 rounded-lg text-gray-300">
                      {services.find((s) => s.id === "salesforce")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Mobile Layout (≤992px) */}
            <div className="lg:hidden">
              <Accordion
                type="single"
                value={activeService}
                onValueChange={setActiveService}
                className="w-full space-y-4"
              >
                {services.map((service) => (
                  <AccordionItem key={service.id} value={service.id} className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      {service.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/50 mt-2 p-4 rounded-lg text-gray-300">
                      {service.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="bg-[#FF4D00] py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  <div className="pt-4">
                    <Link href="/innovation">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 hover:text-white"
                      >
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full bg-white rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Innovation at Epwery"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section ref={aboutUsRef} id="about-us" className="py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <p className="text-orange-500 text-lg mb-6">The Perfect Nearshore Partner</p>
                <h2 className="text-4xl md:text-5xl text-white mb-8">
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

          {/* JS Logo Marquee */}
          <div className="relative mb-8">
            <div className="marquee-container">
              <div className="marquee">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={`js-${i}`}
                    className="flex-shrink-0 flex items-center justify-center bg-white rounded-lg w-[81px] h-[81px] mx-2"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-js-uWVJ9FnIpHnwSETLNjWlVRxtKa1PLv.png"
                      alt="JavaScript"
                      width={65}
                      height={65}
                      className="w-[65px] h-[65px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Python Logo Marquee (Reverse) */}
          <div className="relative">
            <div className="marquee-container marquee-container-reverse">
              <div className="marquee marquee-reverse">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={`python-${i}`}
                    className="flex-shrink-0 flex items-center justify-center bg-zinc-800 rounded-lg w-[152px] h-[56px] mx-2"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-python-UMQHK6bdQdOJajr7Dzvcq5OTuwNMeS.svg"
                      alt="Python"
                      width={136}
                      height={40}
                      className="w-[136px] h-[40px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Engineers Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="max-w-xl">
                <p className="text-[#FF4D00] text-lg mb-6">A Partner Who Truly Understands Technology</p>
                <h2 className="text-4xl md:text-5xl text-zinc-900 mb-8">
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
                <div className="max-w-[529px] ml-auto space-y-4">
                  {/* Orange message to the right */}
                  <div className="flex justify-end">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/message-1-wNe8DDtm477f0vC6xH19lBfRocRUI3.svg"
                      alt="Message bubble 1"
                      width={330}
                      height={88}
                      className="h-auto"
                    />
                  </div>
                  {/* Black messages to the left */}
                  <div className="flex justify-start">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/message-2-rRvQMO7PiRXwWrCcHgUMPf6o4LUEkX.svg"
                      alt="Message bubble 2"
                      width={340}
                      height={56}
                      className="h-auto"
                    />
                  </div>
                  <div className="flex justify-start">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/message-3-YUaJeWrdhdmKKnF0UyeWaaZ7izME2O.svg"
                      alt="Message bubble 3"
                      width={340}
                      height={88}
                      className="h-auto"
                    />
                  </div>
                </div>
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
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clients-bg-7xNLxDolC0ps8b2jttAZtOem9i5fLr.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-white mb-8">What our clients are saying</h2>
              <p className="text-lg text-gray-300">
                Our commitment to excellence and client satisfaction speaks through the success stories of those who've
                partnered with us. Here's what some of our valued clients have to share about their experience working
                with EPWERY.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                      alt="John Smith"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "I've been consistently impressed with the quality of service provided by EPWERY. They have exceeded
                    my expectations and delivered exceptional results. Highly recommended!"
                  </p>
                </blockquote>
                <div className="text-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
                    alt="LinkedIn"
                    width={100}
                    height={24}
                    className="h-6 w-auto mx-auto mb-3"
                  />
                  <p className="font-semibold text-zinc-900">John Smith</p>
                  <p className="text-zinc-500">VP of Engineering</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                      alt="Sarah Chen"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "Working with EPWERY has transformed our development process. Their technical expertise and
                    dedication to quality have made them an invaluable partner in our success."
                  </p>
                </blockquote>
                <div className="text-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                    alt="Google"
                    width={100}
                    height={24}
                    className="h-6 w-auto mx-auto mb-3"
                  />
                  <p className="font-semibold text-zinc-900">Sarah Chen</p>
                  <p className="text-zinc-500">Director of Technology</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                      alt="Michael Rodriguez"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "EPWERY's innovative solutions and professional approach have consistently delivered outstanding
                    results. Their team's expertise and commitment to excellence are truly remarkable."
                  </p>
                </blockquote>
                <div className="text-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                    alt="Amazon"
                    width={100}
                    height={24}
                    className="h-6 w-auto mx-auto mb-3"
                  />
                  <p className="font-semibold text-zinc-900">Michael Rodriguez</p>
                  <p className="text-zinc-500">CTO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="relative py-24 bg-zinc-900 overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl text-white text-center mb-16">
              Schedule a free 30-minute consultation
            </h2>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/calendar-j95zM736cacuVR4EjzDC0IHUsWrlNY.png"
                alt="Calendar"
                width={1000}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

