import React, { useEffect } from 'react';
import { 
  X, 
  Coins, 
  Handshake, 
  Network, 
  Globe, 
  Users, 
  ShieldCheck, 
  Star, 
  Phone, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react';

interface C5CoCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function C5CoCreationModal({ isOpen, onClose }: C5CoCreationModalProps) {
  
  // Close on Escape press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Lock scroll behind modal
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cards = [
    {
      title: "Strategic co-investment",
      desc: "Connect Ventures evaluates co-investment opportunities in high-potential Indian businesses expanding internationally. Direct equity participation, or facilitation of investment from the wider Connect Ventures network.",
      icon: <Coins className="w-6 h-6 text-emerald-400 font-bold" />,
      color: "border-emerald-500/20 bg-emerald-950/20 text-emerald-400"
    },
    {
      title: "JV facilitation and M&A",
      desc: "Facilitate joint ventures between Indian companies and foreign partners — structuring the legal framework, economic participation, governance, and exit provisions. Also advise on cross-border M&A transactions.",
      icon: <Handshake className="w-6 h-6 text-teal-400" />,
      color: "border-teal-500/20 bg-teal-950/20 text-teal-400"
    },
    {
      title: "Syndicate leadership",
      desc: "Lead or co-lead investment syndicates bringing together multiple Indian and global investors around a specific opportunity — technology, real estate, commodities, or growth equity.",
      icon: <Network className="w-6 h-6 text-[#2dd4bf]" />,
      color: "border-cyan-500/20 bg-cyan-950/20 text-[#2dd4bf]"
    },
    {
      title: "Commodity marketplace (Hong Kong)",
      desc: "Access to Connect Ventures' commodity trading platform in Hong Kong — connecting Indian commodity producers and traders with global buyers through a structured, compliant marketplace.",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      color: "border-blue-500/20 bg-blue-950/20 text-blue-400"
    },
    {
      title: "BNI and COC network access",
      desc: "Leverage Dr. Anil Gupta's extensive BNI (Business Network International) and Chamber of Commerce (COC) networks across USA, UK, UAE, Singapore, and India for business development and partnership opportunities.",
      icon: <Users className="w-6 h-6 text-[#2ca799]" />,
      color: "border-sky-500/20 bg-sky-950/20 text-[#2ca799]"
    },
    {
      title: "Estate planning and succession",
      desc: "For Indian HNIs and family businesses with significant cross-border wealth: estate planning across jurisdictions, family office structuring, wealth governance, and succession planning.",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-950/20 text-indigo-400"
    }
  ];

  const handleConsultationClick = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      {/* Backplate Click Handler */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#080d16] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Accent Gradient Border */}
        <div className="h-2 bg-gradient-to-r from-[var(--teal)] via-teal-500 to-indigo-600 w-full" />
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--teal)] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#2ca799] uppercase">
              C5 MODULE DEEP DIVE
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll-body */}
        <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto space-y-10">
          
          {/* Main Title Block */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-block border border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/10 px-4 py-1.5 rounded-full text-xs font-semibold select-none">
              <span className="inline-block w-2 H-2 rounded-full bg-[#2dd4bf] mr-2 animate-ping" />
              Strategic Growth Partnerships & Co-Investment
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase font-sans">
              C5 — Co-creation Framework
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              The C5 Co-creation module represents the deepest level of engagement — where Connect Ventures acts not just as an advisor but as an active co-investor, strategic partner, or co-creator in your international business ventures.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="bg-[#0b1424]/90 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-[var(--teal)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className={`p-3 rounded-xl w-fit ${card.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <h3 className="text-slate-100 font-extrabold text-base tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-800/40 flex items-center gap-1 text-slate-500 font-mono text-[10px] group-hover:text-[var(--teal)] transition-colors">
                  SECURE COMPLIANT OUTCOME
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA Banner matching user specifications */}
          <div className="bg-gradient-to-br from-[#111c30] to-[#060a10] border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
            <span className="absolute -top-[50px] -left-[50px] w-48 h-48 bg-[var(--teal)]/15 blur-3xl rounded-full pointer-events-none" />
            <span className="absolute -bottom-[50px] -right-[50px] w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <span className="inline-block text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                ⭐ SPECIALIZED PARTNERSHIP INITIATOR
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Ready to explore C5 — Co-creation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect Ventures delivers C5 — Co-creation as part of the complete 5C global expansion framework. Talk to Dr. Anil Gupta's team for a free assessment of how C5 — Co-creation can accelerate your international growth.
              </p>
              
              {/* Button Groups */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleConsultationClick}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[var(--teal)] to-teal-500 hover:from-teal-400 hover:to-teal-500 text-slate-950 text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  Free consultation →
                </button>
                <a
                  href="tel:+919999981613"
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-black tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 duration-300"
                >
                  <Phone className="w-4 h-4 text-[#2ca799]" />
                  +91 999 998 1613
                </a>
                <a
                  href="https://wa.me/919999981613"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </div>
              
              <p className="text-[11px] text-slate-400 font-medium font-mono pt-4 select-none">
                No commitment · Fixed-fee · Response within 4 hours
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
