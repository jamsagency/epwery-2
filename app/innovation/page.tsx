import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function InnovationPage() {
  const videos = Array(9).fill({
    title: "Lorem ipsum dolor sit amet consectetetus",
  })

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />

      <main>
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#FF4D00] via-transparent to-transparent opacity-30"
            style={{
              background: "radial-gradient(50% 50% at 50% 100%, #FF4D00 0%, rgba(255, 77, 0, 0) 100%)",
            }}
          />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="text-[#FF4D00] text-lg mb-6">
                <span className="text-white">PROVEN EXCELLENCE IN</span> ACTION
              </p>

              <h1 className="text-6xl lg:text-7xl text-white font-bold mb-6">
                See <span className="font-normal italic">Innovation</span> in Action
              </h1>

              <p className="text-2xl text-gray-300 leading-relaxed">
                Explore success stories and deep dives into our cutting-edge technology solutions
              </p>
            </div>

            {/* Hero image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] pointer-events-none select-none">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videos-hero-img-3kzdtHkw1XQgtiyHczxpx7VTpVICJW.png"
                alt=""
                width={300}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* Videos Grid Section */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div key={index} className="aspect-video rounded-xl overflow-hidden">
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
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

