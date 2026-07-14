import React from 'react';
import { 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Briefcase,
  Check,
  ArrowRight
} from 'lucide-react';

interface Category {
  title: string;
  descriptor: string;
  icon: React.ReactNode;
  services: string[];
}

export default function EcosystemMap() {
  const categories: Category[] = [
    {
      title: "Corporate Setup",
      descriptor: "Sovereign-grade legal structures and foundational entity operations.",
      icon: <Building2 className="w-6 h-6 text-teal-400" />,
      services: [
        "Company Formation",
        "Compliance",
        "Certifications",
        "Consulting"
      ]
    },
    {
      title: "Market Expansion",
      descriptor: "Sovereign alignment pathways to capitalize on high-yield international trade corridors.",
      icon: <Globe2 className="w-6 h-6 text-teal-400" />,
      services: [
        "International Expansion",
        "Market Entry",
        "Market Research",
        "Localized Marketing"
      ]
    },
    {
      title: "Legal & Protection",
      descriptor: "Rigorous regulatory shielding, commercial covenants, and active trademark locks.",
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      services: [
        "Legal Support",
        "IPR Protection",
        "Debt Recovery",
        "Documentation"
      ]
    },
    {
      title: "Growth & Operations",
      descriptor: "Integrated overseas talent delegation, local payroll tools, and credit audits.",
      icon: <Briefcase className="w-6 h-6 text-teal-400" />,
      services: [
        "Technology Solutions",
        "Employer of Record (EOR)",
        "Training",
        "Business Information Reports"
      ]
    }
  ];

  return (
    <section className="bg-[#030712] relative section overflow-hidden select-none" id="services">
      <style>{`
        @media (max-width: 768px) {
          .trust-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .trust-metric-divider {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid #1e293b;
            padding-top: 32px !important;
          }
        }
      `}</style>
      {/* Soft Premium Custom Ambient Backplates */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(20,184,166,0.03),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />

      <div className="wrap relative z-10">
        
        {/* Header */}
        <div className="sh center">
          <div className="label">
            <span className="label-dot" /> Global Services
          </div>
          <h2 className="reveal-h2 !text-white">
            <span className="reveal-h2-inner">Global <em>Business Services</em></span>
          </h2>
          <p className="sh-sub !text-slate-400">
            Everything required to establish, protect and scale your business internationally.
          </p>
        </div>

        {/* 2x2 Bento Style Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mb-24">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              className="group bg-[#0d1527] border border-slate-700/40 rounded-2xl p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-teal-500/35 hover:bg-[#111c34] hover:shadow-[0_4px_30px_rgba(20,184,166,0.07)] shadow-2xl shadow-black/40"
            >
              <div className="flex-1 flex flex-col">
                {/* Header Row */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-slate-950/85 border border-slate-700/50 rounded-xl shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-400 font-normal leading-relaxed mb-8">
                  {category.descriptor}
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 pt-7 border-t border-slate-800 mt-auto">
                  {category.services.map((service, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-teal-950/60 border border-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-teal-400 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-200 leading-snug">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics */}
        <div
          style={{
            marginTop: '64px',
            backgroundColor: '#0a1020',
            border: '1px solid rgba(30,41,59,0.6)',
            borderRadius: '16px',
            padding: '48px 40px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '48px',
              marginBottom: '48px'
            }}
            className="trust-metrics-grid"
          >

            <div>
              <span style={{ display: 'block', fontSize: '40px', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: '12px' }}>
                150+
              </span>
              <h4 style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2dd4bf', fontWeight: 700, marginBottom: '10px' }}>
                Global Jurisdictions
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '280px', margin: 0 }}>
                Direct statutory representation across major international trade and corporate hubs.
              </p>
            </div>

            <div style={{ paddingLeft: '40px', borderLeft: '1px solid #1e293b' }} className="trust-metric-divider">
              <span style={{ display: 'block', fontSize: '40px', fontWeight: 900, color: '#2dd4bf', lineHeight: 1, marginBottom: '12px' }}>
                21
              </span>
              <h4 style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2dd4bf', fontWeight: 700, marginBottom: '10px' }}>
                Integrated Services
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '280px', margin: 0 }}>
                A single partner to execute corporate setup, compliance, legal protection, and talent growth.
              </p>
            </div>

            <div style={{ paddingLeft: '40px', borderLeft: '1px solid #1e293b' }} className="trust-metric-divider">
              <span style={{ display: 'block', fontSize: '26px', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, marginBottom: '12px', whiteSpace: 'nowrap' }}>
                One Global Partner
              </span>
              <h4 style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2dd4bf', fontWeight: 700, marginBottom: '10px' }}>
                Dedicated Accountability
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '280px', margin: 0 }}>
                Unified institutional SLA guarantees and high-touch senior corporate relationships.
              </p>
            </div>

          </div>

          <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #1e293b' }}>
            <a
              href="services.html"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                fontWeight: 700,
                backgroundColor: '#14b8a6',
                color: '#04342c',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              View all 21 services
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
