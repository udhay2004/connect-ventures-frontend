import React, { useState } from 'react';
import { Globe, Shield, Sparkles, TrendingUp } from 'lucide-react';

interface GrowthCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  glowColor: string;
  icon: React.ReactNode;
  bullets: string[];
}

export default function RichFramework() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards: GrowthCard[] = [
    {
      number: '01',
      title: 'Reach',
      subtitle: 'Global Expansion & Penetration',
      description: 'We guide you through seamless international company registration support across 47+ strategic jurisdictions including USA, UAE, UK, Singapore, and Canada. From establishing multi-region digital presence setups to localized go-to-market strategies, we eliminate cross-border friction.',
      glowColor: 'from-[#2dd4bf]/20 to-[#00d4ff]/10',
      icon: <Globe className="w-8 h-8 text-[#2dd4bf]" />,
      bullets: [
        'Registration Support across 47+ jurisdictions (USA, UAE, UK, SG, CA)',
        'Multi-region digital presence setup & compliance mapping',
        'Localized go-to-market strategies & operational logistics scaling'
      ]
    },
    {
      number: '02',
      title: 'Influence',
      subtitle: 'Market Authority & Trust-Building',
      description: 'Protect your reputation with high-precision regulatory compliance positioning and international certifications. We help you command industry-wide respect using prestigious award recognition pathways, PR media placements, and vetted thought leadership campaigns.',
      glowColor: 'from-[#3b82f6]/20 to-[#0070f3]/10',
      icon: <Shield className="w-8 h-8 text-[#3b82f6]" />,
      bullets: [
        'Regulatory compliance positioning & risk insulation audits',
        'High-authority award & certification credibility pathways',
        'Vetted thought leadership campaigns & strategic PR placements'
      ]
    },
    {
      number: '03',
      title: 'Convert',
      subtitle: 'Accelerated Pipeline Velocity',
      description: 'Fast-track client acquisitions using our streamlined, high-speed onboarding protocols including 7-day company incorporation. With absolute transparent pricing models and customized consultative sales support, we optimize every international digital touchpoint.',
      glowColor: 'from-[#fbbf24]/20 to-[#f59e0b]/10',
      icon: <TrendingUp className="w-8 h-8 text-[#fbbf24]" />,
      bullets: [
        'Streamlined onboarding (e.g., 7-day company incorporation)',
        'Absolute transparent pricing models with zero hidden retainers',
        'Conversion-optimized digital touchpoints & consultative sales support'
      ]
    },
    {
      number: '04',
      title: 'Client Retention & Trust',
      subtitle: 'Lifetime Post-Incorporation Support',
      description: 'Sustain compound corporate value through our dedicated enterprise account management and proactive compliance monitoring. We maintain absolute open communication lines, annual tax filing audits, and persistent operational consulting backed by positive verified client outcomes.',
      glowColor: 'from-[#ec4899]/20 to-[#d946ef]/10',
      icon: <Sparkles className="w-8 h-8 text-[#ec4899]" />,
      bullets: [
        'Dedicated 1-on-1 account management and priority response desk',
        'Proactive regulatory compliance monitoring and periodic health audits',
        'Transparent communication cadences and verified client testimonials'
      ]
    }
  ];

  return (
    <section className="section bg-gradient-to-b from-[#060b14] via-[#0a1628] to-[#060b14] relative overflow-hidden py-24 border-t border-slate-900" id="rich">
      {/* Visual background accents */}
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] bg-radial-gradient from-[rgba(45,212,191,0.06)] to-transparent blur-[80px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-radial-gradient from-[rgba(0,112,243,0.06)] to-transparent blur-[80px]" />

      <div className="wrap relative z-10">
        <div className="sh center">
          <div className="label border border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/10 px-4 py-1.5 rounded-full text-sm font-bold select-none">
            <span className="label-dot bg-[#2dd4bf] animate-pulse" /> Proprietary Strategy
          </div>
          {/* High-contrast Headline to fix the contrast/color bug */}
          <h2 className="!text-white mt-4 font-bold leading-tight" style={{ color: '#ffffff' }}>
            Our 4-Pillar <span className="text-[#2dd4bf] font-serif italic font-normal">Expansion Engine</span>
          </h2>
          <p className="sh-sub text-slate-400 max-w-[640px] mx-auto text-center mt-4">
            A comprehensive, modular methodology designed to scale corporate operations worldwide smoothly and securely, generating sustainable compound value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {cards.map((card, idx) => {
            const isHovered = activeCard === idx;
            return (
              <div
                key={card.number}
                className="relative bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 transition-all duration-500 ease-out flex flex-col justify-between group overflow-hidden cursor-pointer"
                style={{
                  boxShadow: isHovered 
                    ? '0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(45,212,191,0.05)' 
                    : 'none',
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
                  borderColor: isHovered ? 'rgba(45,212,191,0.4)' : 'rgba(30,41,59,0.8)'
                }}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Glowing Backplate */}
                <span 
                  className={`absolute -inset-px bg-gradient-to-br ${card.glowColor} rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-[2px]`}
                  style={{ zIndex: 0 }}
                />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Top Header Card row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-mono font-black text-slate-700/40 select-none transition-all duration-500 group-hover:text-[#2dd4bf]/40 group-hover:scale-105">
                        {card.number}
                      </span>
                      <div className="p-3 bg-slate-950/50 rounded-2xl group-hover:bg-slate-950/80 transition-colors duration-300">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-[#2dd4bf] font-mono uppercase tracking-wider font-semibold mt-1">
                      {card.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 mt-4 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {card.description}
                    </p>
                  </div>

                  {/* Bullets shown on dynamic activation */}
                  <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-col gap-2">
                    {card.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-[10px] text-[#2dd4bf] font-mono mt-1">→</span>
                        <span className="text-[11px] leading-snug text-slate-400 group-hover:text-slate-300 transition-colors">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
