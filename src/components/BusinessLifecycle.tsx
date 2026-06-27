import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  Handshake, 
  ArrowRight, 
  Clock, 
  Users2, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface LifecycleStep {
  phaseNum: string;
  title: string;
  subTitle: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  keyAction: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
}

export default function BusinessLifecycle() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: LifecycleStep[] = [
    {
      phaseNum: '01',
      title: 'Structural Architecture',
      subTitle: 'Legal Inception & Safeguarding',
      description: 'Establish optimized company formation blueprints remotely across 47 countries. We manage all state filings, director coordinates, registered agent allocations, and local physical offices without your travel.',
      icon: <Building2 className="w-6 h-6 text-[#00c9a7]" />,
      duration: '3 - 7 Business Days',
      keyAction: 'Incorporate LLC, C-Corp, or Ltd structures with ironclad liability insulation.',
      metrics: [
        { label: 'Setup Speed', value: '7 Days' },
        { label: 'Approved Entities', value: '1,000+' }
      ],
      deliverables: [
        'Articles of Organization & local registrations',
        'Physical office address & registered agent links',
        'State tax registration & legal bylaws drafting'
      ]
    },
    {
      phaseNum: '02',
      title: 'Fiscal & Banking Bonding',
      subTitle: 'Regulatory Multi-Currency Activation',
      description: 'Streamline the complex process of getting international banking status. We secure official tax IDs (EIN, VAT, GST) and establish top-tier multi-currency bank connections directly with pre-vetted banking groups.',
      icon: <Landmark className="w-6 h-6 text-[#00c9a7]" />,
      duration: '5 - 10 Business Days',
      keyAction: 'Secure EIN and set up robust international transaction portals (Mercury, Relay, Tier 1 banks).',
      metrics: [
        { label: 'Approval Rate', value: '100%' },
        { label: 'DTAA Saved Taxes', value: 'Max 30%' }
      ],
      deliverables: [
        'Federal Employer Identification Number (EIN)',
        'Merchant account & corporate debit/credit lines',
        'Filing global DTAA treaty benefits setup'
      ]
    },
    {
      phaseNum: '03',
      title: 'IPR & Sovereignty Safeguards',
      subTitle: 'Intellectual Asset Shielding',
      description: 'Protect your brand, proprietary technology, and original creations before scaling. We initiate Madrid Protocol international bookings, patent protections, and secure intellectual property rights.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00c9a7]" />,
      duration: 'Ongoing Priority',
      keyAction: 'Secure international patents, copyrights, and trademarks under Madrid networks.',
      metrics: [
        { label: 'Active Trademark nodes', value: '47+ Juris.' },
        { label: 'IP Security Record', value: 'First-Pass' }
      ],
      deliverables: [
        'International TM filings & Madrid submissions',
        'Jurisdiction patent searches & strategic mapping',
        'Clearance of copyright & license covenants'
      ]
    },
    {
      phaseNum: '04',
      title: 'Market Penetration Escalation',
      subTitle: 'B2B Matchmaking & Distribution',
      description: 'Connect with warm enterprise B2B buyers and licensed regional representatives. Our global network handles high-fidelity distributor hunts, warm government liaisons, and strategic agent mapping.',
      icon: <TrendingUp className="w-6 h-6 text-[#00c9a7]" />,
      duration: '4 - 12 Weeks Scoped',
      keyAction: 'Introduce your brand to verified buyers, distribution partners, and institutional targets.',
      metrics: [
        { label: 'Leads Matched', value: 'Warm Introductions' },
        { label: 'Agency Partner Net', value: '50+ Groups' }
      ],
      deliverables: [
        'B2B prospective distributor scorecard mapping',
        'Dedicated agent stakeholder identification hunt',
        'Drafting clear localized value propositions'
      ]
    },
    {
      phaseNum: '05',
      title: 'Co-Investment & Global Stature',
      subTitle: 'Harmonic Co-Creation & Scaling',
      description: 'Enter sustainable joint-ventures, institutional PE/VC syndications, or scale co-investment partnerships. We facilitate cross-border structure governance, Mergers & Acquisitions, and estate succession planning.',
      icon: <Handshake className="w-6 h-6 text-[#00c9a7]" />,
      duration: 'Sustained Lifecycle Engagement',
      keyAction: 'Optimize shareholder structures, seed joint funding, and secure legacy continuity.',
      metrics: [
        { label: 'Strategic Reach', value: '6 Continents' },
        { label: 'Advisory Retention', value: '98%' }
      ],
      deliverables: [
        'Premium joint-venture co-investment pathways',
        'M&A buy/sell legal counsel & financial audits',
        'Generational family-office estate legacy continuity'
      ]
    }
  ];

  return (
    <section className="section bg-slate-50 relative overflow-hidden py-14 md:py-24 border-t border-slate-100" id="lifecycle">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(0,112,243,0.03),transparent)] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-gradient-to-tr from-teal-500/1 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="sh center">
          <div className="label border border-teal-500/20 text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full text-sm font-bold select-none">
            <span className="label-dot bg-teal-500" /> Operational Blueprint
          </div>
          <h2 className="text-slate-900">
            The Global Expansion <br />
            <em className="text-[var(--teal)] font-serif italic font-normal">Business Enablement Journey</em>
          </h2>
          <p className="sh-sub text-slate-500 max-w-[620px] mx-auto text-center mt-4">
            A cohesive framework structured to escort early companies to global-tier enterprise stature safely, minimizing overhead and sovereign transaction risk.
          </p>
        </div>

        {/* Interactive Steps Pipeline Timeline */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column - Steps Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.phaseNum}
                    onClick={() => setActiveStep(idx)}
                    className="w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden group cursor-pointer"
                    style={{
                      backgroundColor: isActive ? '#ffffff' : 'rgba(241, 245, 249, 0.5)',
                      borderColor: isActive ? 'rgba(0,201,167,0.3)' : 'rgba(226, 232, 240, 0.6)',
                      boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)' : 'none'
                    }}
                  >
                    {/* Visual left active accent lines */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00c9a7] to-[#0070f3]" />
                    )}

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-200/60 text-slate-500 group-hover:bg-slate-250'}`}>
                      <span className="font-mono text-sm font-black">{step.phaseNum}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-[14.5px] font-black tracking-tight transition-colors ${isActive ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'}`}>
                        {step.title}
                      </h3>
                      <span className="block text-[11px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">
                        {step.subTitle}
                      </span>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-[var(--teal)] translate-x-1' : 'text-slate-300 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Overall summary caption card */}
            <div className="bg-slate-950 text-white p-6 rounded-3xl mt-6 relative overflow-hidden">
              <span className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl" />
              <div className="flex gap-3 items-start relative z-10">
                <Layers className="w-5 h-5 text-[var(--teal)] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-[var(--teal)] font-bold uppercase tracking-wider">Connect Unified Gateways</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                    "Unlike traditional legal consultants who deliver segmented outputs, CV syncs your state corporate registration directly to trade logistics and DTAA tax protections."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Deep Detail Pane */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col justify-start">
            {/* Visual spotlight highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div>
              {/* Top Meta info */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[var(--teal)] uppercase font-extrabold tracking-widest">
                      LIFECYCLE PHASE {steps[activeStep].phaseNum}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 leading-none">
                      {steps[activeStep].title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 border border-slate-150 rounded-full px-4 py-1.5 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{steps[activeStep].duration}</span>
                </div>
              </div>

              {/* Core description text */}
              <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                {steps[activeStep].description}
              </p>

              {/* Strategy Action Point Highlight */}
              <div className="my-6 p-4 bg-teal-50/50 border border-teal-500/15 rounded-2xl flex gap-3 items-start">
                <span className="text-[11px] font-bold font-mono text-teal-600 bg-teal-100 py-0.5 px-2 rounded uppercase mt-0.5 shrink-0 select-none">
                  OBJECTIVE
                </span>
                <p className="text-xs text-teal-800 leading-relaxed font-semibold">
                  {steps[activeStep].keyAction}
                </p>
              </div>

              {/* Key Deliverables Bullet Group */}
              <div className="mt-6">
                <span className="block text-[10.5px] uppercase font-bold tracking-widest text-slate-400 font-mono mb-3">
                  Key Deliverables
                </span>
                <div className="space-y-2.5">
                  {steps[activeStep].deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-mono shrink-0 mt-0.5">
                        {dIdx + 1}
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row - Step Stats */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              {steps[activeStep].metrics.map((metric, mIdx) => (
                <div key={mIdx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-lg font-mono font-black text-slate-900 leading-none">
                    {metric.value}
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-extrabold uppercase mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
