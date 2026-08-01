import re

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'<section className="section-teal py-24 bg-\[#F1EFE1\]">.*?</section>', re.DOTALL)

new_str = """<section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr text-center">
          <span className="badge" style={{ background: 'rgba(34,34,34,0.1)', color: '#222222', marginBottom: '24px' }}>Partner With Us</span>
          <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center" style={{ fontFamily: 'var(--font-figtree)' }}>
            <span className="text-[#222222]">Turn Your Location into a</span>
            <span className="text-[#888888] italic">Revenue Hub</span>
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto mb-16 font-medium">
            Bring EV charging and advertising to your location in 4 simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: "1", title: "Get Started with DYU", desc: "Contact our team to evaluate your location." },
              { step: "2", title: "Install & Activate", desc: "Set up charging with built-in digital screens." },
              { step: "3", title: "Earn Revenue", desc: "Generate revenue from every charging session & ad display." },
              { step: "4", title: "Grow Visibility", desc: "Attract more EV users and increase local footfall." }
            ].map((s, i) => (
              <div key={i} className="bg-[#222222] border border-white/10 rounded-3xl p-8 text-left shadow-sm relative overflow-hidden">
                <div className="text-5xl font-black text-white/5 absolute -top-4 -right-2">{s.step}</div>
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-extrabold mb-6">
                  {s.step}
                </div>
                <h4 className="text-xl font-extrabold text-white mb-2">{s.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/partner-with-us" className="btn-primary shadow-[0_0_20px_rgba(34,34,34,0.3)] transition-all hover:scale-105" style={{ background: '#222222', color: '#fff' }}>
            Become A Partner <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>"""

if pattern.search(text):
    new_text = pattern.sub(new_str, text, count=1)
    with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Success")
else:
    print("Not found")
