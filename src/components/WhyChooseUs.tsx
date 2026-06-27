import React from 'react';
import { Check, ShieldCheck, Zap, Globe, Coins, Briefcase } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    'Establish compliant corporate entities in USA, UK, UAE, or Singapore.',
    'Secure corporate physical bank accounts and official Employer Identification Numbers.',
    'Optimise cross-border commercial ventures through comprehensive tax and DTAA planning.',
    'Ensure absolute regulatory compliance under FEMA, RBI, and secretarial guidelines.',
    'Deploy foreign operations instantly using pre-vetted local Employer of Record services.',
    'Accelerate overseas business growth with localised market entry and regional distributors.'
  ];

  return (
    <section className="section bg-gradient-to-b from-[#060b14] via-[#09111e] to-[#060b14] relative overflow-hidden" id="why-choose-us">
      {/* Background radial overlays */}
      <div className="absolute top-[30%] left-[-10%] w-[45%] h-[45%] bg-radial-gradient from-[rgba(0,201,167,0.04)] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] bg-radial-gradient from-[rgba(0,112,243,0.04)] to-transparent blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="sh center !mb-8">
          <div className="label">
            <span className="label-dot animate-pulse" /> Core Advantages
          </div>
          <h2 className="!text-white" style={{ color: '#ffffff' }}>
            Why Businesses Choose Us <em className="text-[#2dd4bf] font-serif italic font-normal">Worldwide</em>
          </h2>
          <p className="sh-sub text-slate-400">
            Where businesses go global. Discover why leading enterprises trust Connect Ventures to execute regulatory setups across boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-0 items-start">
          
          {/* Key Advantages Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/80 transition-all duration-300 flex items-start gap-3.5 group"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[var(--teal)] group-hover:bg-[var(--teal)] group-hover:text-slate-950 transition-all duration-300 flex-shrink-0">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {point.split(' - ')[0]}
                  </p>
                  <span className="block text-xs text-slate-400 mt-1">
                    {point.includes(' - ') ? point.split(' - ')[1] : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Statistics Grid Card Column */}
          <div className="lg:col-span-5 w-full bg-gradient-to-tr from-[#111c2f] to-[#080d17] border border-slate-800/85 rounded-xl p-5 sm:p-6 md:p-8 relative overflow-visible flex flex-col gap-6">
            {/* Ambient indicator lights */}
            <span className="absolute -top-[20px] -left-[20px] w-14 h-14 bg-[var(--teal)]/10 blur-xl rounded-full" />
            
            <div>
              <span className="text-[11px] font-mono text-[var(--teal)] uppercase tracking-wider font-bold">
                PROVEN BENCHMARKS &amp; COMPLIANCE
              </span>
              <h3 className="text-2xl font-black text-slate-100 mt-3 tracking-tight leading-snug">
                Consistent Execution. <br />Accurate Standard Outcomes.
              </h3>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Connect Ventures maintains a high corporate customer satisfaction score. We take pride in delivering robust, worry-free setups to business owners across continents.
              </p>
            </div>

            {/* Achievement counts row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              <div className="p-4 sm:p-5 md:p-6 bg-slate-950/40 border border-slate-800/50 rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">1K+</span>
                <span className="block text-[10px] sm:text-[10.5px] text-slate-500 font-bold uppercase mt-1 leading-tight break-words">Corporate Entities</span>
              </div>
              <div className="p-4 sm:p-5 md:p-6 bg-slate-950/40 border border-slate-800/50 rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">47+</span>
                <span className="block text-[10px] sm:text-[10.5px] text-slate-500 font-bold uppercase mt-1 leading-tight break-words">Nations Covered</span>
              </div>
              <div className="p-4 sm:p-5 md:p-6 bg-slate-950/40 border border-slate-800/50 rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">99%</span>
                <span className="block text-[10px] sm:text-[10.5px] text-slate-500 font-bold uppercase mt-1 leading-tight break-words">First-pass Success</span>
              </div>
              <div className="p-4 sm:p-5 md:p-6 bg-slate-950/40 border border-slate-800/50 rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">24/7</span>
                <span className="block text-[10px] sm:text-[10.5px] text-slate-500 font-bold uppercase mt-1 leading-tight break-words">Advisor Backing</span>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-6 mt-2 flex flex-col gap-3">
              <a 
                href="#contact" 
                className="btn-hero-primary w-full flex justify-center items-center text-center py-4 px-4 text-xs font-bold tracking-wide uppercase whitespace-normal break-words"
              >
                Launch Your Global Journey →
              </a>
              <a 
                href="about.html"
                className="text-center text-xs text-slate-400 hover:text-[#2dd4bf] transition-colors py-1.5 font-medium flex items-center justify-center gap-1"
              >
                <span>Read Dr. Anil Gupta's Founder Story &amp; Philosophy</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
