import sys

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# SECTION 1: Turn Your Location into a Revenue Hub
old_sec_1 = """      <section className="py-24 bg-[#222222]">
        <div className="container-wispr text-center">
          <span className="badge" style={{ background: 'rgba(241,239,225,0.1)', color: '#F1EFE1', marginBottom: '24px' }}>Partner With Us</span>
          <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center" style={{ fontFamily: 'var(--font-figtree)' }}>
            <span className="text-[#F1EFE1]">Turn Your Location into a</span>
            <span className="text-[#888888] italic">Revenue Hub</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-16 font-medium">
            Bring EV charging and advertising to your location in 4 simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: "1", title: "Get Started with DYU", desc: "Contact our team to evaluate your location." },
              { step: "2", title: "Install & Activate", desc: "Set up charging with built-in digital screens." },
              { step: "3", title: "Earn Revenue", desc: "Generate revenue from every charging session & ad display." },
              { step: "4", title: "Grow Visibility", desc: "Attract more EV users and increase local footfall." }
            ].map((s, i) => (
              <div key={i} className="bg-[#F1EFE1] border border-black/5 rounded-3xl p-8 text-left shadow-sm relative overflow-hidden">
                <div className="text-5xl font-black text-[#222222]/5 absolute -top-4 -right-2">{s.step}</div>
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-extrabold mb-6">
                  {s.step}
                </div>
                <h4 className="text-xl font-extrabold text-[#222222] mb-2">{s.title}</h4>
                <p className="text-[#666666] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/partner-with-us" className="btn-primary shadow-[0_0_20px_rgba(241,239,225,0.3)] transition-all hover:scale-105" style={{ background: '#F1EFE1', color: '#222222' }}>
            Become A Partner <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>"""

new_sec_1 = """      <section className="py-24 bg-[#F1EFE1]">
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
                <div className="text-5xl font-black text-[#F1EFE1]/5 absolute -top-4 -right-2">{s.step}</div>
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-extrabold mb-6">
                  {s.step}
                </div>
                <h4 className="text-xl font-extrabold text-[#F1EFE1] mb-2">{s.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/partner-with-us" className="btn-primary shadow-[0_0_20px_rgba(34,34,34,0.3)] transition-all hover:scale-105" style={{ background: '#222222', color: '#F1EFE1' }}>
            Become A Partner <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>"""

# SECTION 2: Why Businesses Choose AdWall
old_sec_2 = """      <section className="py-24 bg-[#222222]">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#F1EFE1]">Why Businesses</span>
              <span className="text-[#888888] italic">Choose AdWall</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MonitorPlay, title: "Capture Attention", desc: "Turn waiting time into meaningful engagement." },
              { icon: TrendingUp, title: "Earn More", desc: "Generate revenue from both charging and on-screen ads." },
              { icon: Users, title: "Attract EV Users", desc: "Increase footfall with a connected charging experience." },
              { icon: Building, title: "Commercial Grade", desc: "Ideal for malls, offices, and high-traffic locations." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-[#F1EFE1] rounded-3xl shadow-sm border border-black/5"
              >
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#222222] mb-3">{item.title}</h4>
                <p className="text-[#666666] text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>"""

new_sec_2 = """      <section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Why Businesses</span>
              <span className="text-[#888888] italic">Choose AdWall</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MonitorPlay, title: "Capture Attention", desc: "Turn waiting time into meaningful engagement." },
              { icon: TrendingUp, title: "Earn More", desc: "Generate revenue from both charging and on-screen ads." },
              { icon: Users, title: "Attract EV Users", desc: "Increase footfall with a connected charging experience." },
              { icon: Building, title: "Commercial Grade", desc: "Ideal for malls, offices, and high-traffic locations." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-[#222222] rounded-3xl shadow-sm border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#F1EFE1] mb-3">{item.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>"""

old_1 = old_sec_1.replace('\r\n', '\n')
new_1 = new_sec_1.replace('\r\n', '\n')
old_2 = old_sec_2.replace('\r\n', '\n')
new_2 = new_sec_2.replace('\r\n', '\n')
text_norm = text.replace('\r\n', '\n')

c = 0
if old_1 in text_norm:
    text_norm = text_norm.replace(old_1, new_1)
    c += 1
else:
    print("Sec 1 not found")

if old_2 in text_norm:
    text_norm = text_norm.replace(old_2, new_2)
    c += 1
else:
    print("Sec 2 not found")

if c > 0:
    with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text_norm)
    print("Replaced both sections successfully.")
