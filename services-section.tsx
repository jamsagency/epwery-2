export default function ServicesSection() {
  return (
    <section className="bg-zinc-900 py-24">
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
            At Epwery, we understand that every project has unique needs. That's why, beyond the range of services we
            provide, our philosophy is clear: always recommend the solution that truly benefits your business. We are
            committed to working with the highest quality standards, keeping your interests at the heart of everything
            we do. Because when you grow, so do we.
          </p>
        </div>

        <div className="relative">
          {/* Services diagram */}
          <div className="relative">
            <h3 className="text-3xl text-white italic bg-orange-500 rounded-full px-8 py-3 inline-block mb-12">
              Our services
            </h3>

            <div className="grid gap-8 relative">
              {/* Service boxes with connecting elements */}
              <div className="flex items-center gap-4">
                <div className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white inline-block">Custom software</div>
                <div className="flex-1 h-px bg-white relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center gap-4 justify-end">
                <div className="flex-1 h-px bg-white relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white inline-block">
                  Dedicated Engineering Teams
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white inline-block">IA & machine learning</div>
                <div className="flex-1 h-px bg-white relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Service detail box */}
              <div className="absolute right-0 bottom-0 w-full max-w-lg">
                <div className="bg-zinc-800/50 border border-orange-500 rounded-lg p-6 text-center">
                  <h4 className="text-white text-xl mb-4">
                    Salesforce & <br />
                    Cloud Architecture
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our expertise in Salesforce and Cloud Architecture empowers businesses to leverage cutting-edge
                    technologies with ease. Thanks to our field-proven software solutions, integrating Salesforce into
                    your existing infrastructure becomes seamless, enabling streamlined operations, enhanced
                    scalability, and reduced licensing costs. Our tailored cloud solutions simplify the process,
                    maximizing efficiency while driving sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Orange connecting shapes - placeholder */}
          <div className="absolute inset-0 pointer-events-none">
            {/* This would be better replaced with an SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}

