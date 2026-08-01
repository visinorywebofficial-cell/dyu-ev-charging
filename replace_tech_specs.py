import sys
import re

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'<section id="tech-specs" className="py-24 bg-gray-50">.*?</section>', re.DOTALL)

new_str = """<section id="tech-specs" className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Technical</span>
              <span className="text-[#888888] italic">Specifications</span>
            </h2>
          </div>

          <div className="bg-[#222222] rounded-3xl shadow-sm border border-white/10 overflow-hidden">
            {[
              { label: "Charging Type", detail: "AC Charging" },
              { label: "Connector Type", detail: "Type 2 AC (2 outputs) and 3-pin socket (2 outputs)" },
              { label: "Power Rating", detail: "22 kW (7.4 kW × 2 + 3.3 kW × 2)" },
              { label: "User Authentication", detail: "Mobile App, RFID, QR Code" },
              { label: "Connectivity Options", detail: "3G, 4G, Ethernet, Wi-Fi" },
              { label: "Advertising Display", detail: "55-inch LED digital display" },
            ].map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center p-6 ${i !== 5 ? 'border-b border-white/10' : ''} ${i % 2 === 0 ? 'bg-[#222222]' : 'bg-white/5'}`}>
                <div className="w-full sm:w-1/3 font-semibold text-[#F1EFE1] mb-2 sm:mb-0">{row.label}</div>
                <div className="w-full sm:w-2/3 flex items-start text-[#888888]">
                  <CheckCircle2 size={18} className="text-[#00F0FF] mr-3 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{row.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>"""

if pattern.search(text):
    # Fix the `kW A- 2` weird artifact by properly substituting cross multiplier
    new_text = pattern.sub(new_str, text, count=1)
    with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Success Tech Specs")
else:
    print("Not found Tech Specs")
