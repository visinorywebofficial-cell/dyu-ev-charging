import re

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'<section className="py-24 bg-white border-y border-gray-100">.*?</div>\n      </section>', re.DOTALL)

new_str = """<section className="py-24 bg-[#F1EFE1]">
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

if pattern.search(text):
    new_text = pattern.sub(new_str, text, count=1)
    with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Success Why Businesses")
else:
    print("Not found Why Businesses")
