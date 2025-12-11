import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us - Cloud Modular",
  description: "Get in touch with Cloud Modular to discuss your next modular construction project.",
};

export default function PartnerWithUsPage() {
  return (
    <div className="bg-[#080a0a] text-white">
      {/* Hero Section - 50vh */}
      <section className="min-h-[50vh] flex flex-col pt-16">
        <div className="flex-1 flex items-center justify-center">
          <div className="section-container w-full">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40 mb-6">
                Get In Touch
              </p>
              <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px] mb-4">
                Partner With Us
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Let&rsquo;s discuss how Cloud Modular can deliver your project with precision and confidence.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto border-b border-white/5"></div>
      </section>

      {/* Contact Form Section */}
      <section className="min-h-[60vh] grid grid-rows-[1fr_auto]">
        <div className="flex items-center">
          <div className="section-container py-20 w-full">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Contact Form */}
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-white text-[#080a0a] font-semibold rounded hover:bg-white/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40 mb-4">
                      Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-white/60 mb-2">
                          Perth, Australia
                        </p>
                        <p className="text-white/70">Loftus St, North Perth</p>
                        <p className="text-white/70">Western Australia, 6006</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/60 mb-2">
                          Foshan, China
                        </p>
                        <p className="text-white/70">3F, 48L, No.26 Lang Bao West Road</p>
                        <p className="text-white/70">Foshan City, Guangdong Province</p>
                        <p className="text-white/70">China</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40 mb-4">
                      Connect
                    </h3>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto border-b border-white/5"></div>
      </section>
    </div>
  );
}
