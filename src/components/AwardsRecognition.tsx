import React from 'react';
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Landmark, 
  Sparkles
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: 'Compliance' | 'Startup elite' | 'Innovation' | 'Globalisation' | 'Recognition';
  citation: string;
  documentId: string;
  sealColor: string;
  frameAccent: string;
  details: string[];
  badgeColor: string;
  badgeGlyph: React.ReactNode;
}

export default function AwardsRecognition() {
  const certificates: Certificate[] = [
    {
      id: 'cert-1',
      title: 'The Most Promising Compliance Service Provider to Watch Globally',
      organization: 'Fanzine India Group',
      year: '2023',
      category: 'Compliance',
      citation: 'Awarded for industry-leading methodologies in cross-border secretarial reporting, entity registration risk mitigating, and high-precision compliance governance.',
      documentId: 'CRED-FANZ-2023-9082',
      sealColor: 'from-[#00c9a7] to-teal-400',
      frameAccent: 'border-[#00c9a7]/30 group-hover:border-[#00c9a7]',
      badgeColor: 'text-[#00c9a7] bg-[#00c9a7]/10 border-[#00c9a7]/30',
      badgeGlyph: <ShieldCheck className="w-8 h-8 text-[#00c9a7]" />,
      details: [
        'Recognized for streamlining 1,000+ foreign subsidiary corporate reports.',
        'Audited and certified by independent global analysts.',
        'High compliance resolution metric across all active nodes.'
      ]
    },
    {
      id: 'cert-2',
      title: '10 Most Promising Startups for Corporate Service Providers',
      organization: 'Silicon India Startup City',
      year: '2023',
      category: 'Startup elite',
      citation: 'Named to the authoritative elite cohort of corporate enablers disrupting traditional legal-friction models for cross-border expansion.',
      documentId: 'REG-SISC-2023-0118',
      sealColor: 'from-amber-500 to-yellow-400',
      frameAccent: 'border-amber-500/30 group-hover:border-amber-400',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      badgeGlyph: <Award className="w-8 h-8 text-amber-500" />,
      details: [
        'Elite ranking on operational speed metrics.',
        'Acknowledged for bridging India-GCC & India-USA corridor friction.',
        'Highlighted in national printed corporate review editions.'
      ]
    },
    {
      id: 'cert-3',
      title: 'Business Excellence Award for Innovative Services in Globalization & Corporate Compliance',
      organization: 'Business Connect',
      year: '2024-25',
      category: 'Globalisation',
      citation: 'Honoring outstanding service architecture in facilitating robust, frictionless international growth frameworks for Indian mid-sized companies.',
      documentId: 'EXC-BCCN-2024-2503',
      sealColor: 'from-indigo-500 to-sky-400',
      frameAccent: 'border-indigo-500/30 group-hover:border-indigo-400',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      badgeGlyph: <Trophy className="w-8 h-8 text-indigo-400" />,
      details: [
        'Strategic citation on integration of FEMA, IPR, and trade finance.',
        'Acknowledged for end-to-end multi-currency setup capabilities.',
        'High trust scoring from mid-market enterprise CEOs.'
      ]
    },
    {
      id: 'cert-4',
      title: 'Innovation & Startup Summit: Technology for Societal Development',
      organization: 'National Tech Summit Committee',
      year: '2019',
      category: 'Innovation',
      citation: 'Recognized for forward-thinking engineering of digital compliance interfaces and system processes designed to boost socio-economic business mobility.',
      documentId: 'SUM-TBSD-2019-4820',
      sealColor: 'from-blue-500 to-indigo-400',
      frameAccent: 'border-blue-500/30 group-hover:border-blue-400',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      badgeGlyph: <Sparkles className="w-8 h-8 text-blue-400" />,
      details: [
        'Awarded at the annual Societal Tech Excellence Summit.',
        'Praised for reducing company formation cycles from 45 days to 7 days.',
        'Pioneering paperless digital registered agent management.'
      ]
    },
    {
      id: 'cert-5',
      title: 'TEDx PariChowk - Certificate of Recognition',
      organization: 'TEDx Board of Directors / Organizers',
      year: '2022',
      category: 'Recognition',
      citation: 'Official certification honoring outstanding contributions to public thought leadership and delivering strategic paradigms on corporate co-existence.',
      documentId: 'TEDX-PC-RECG-2022-771',
      sealColor: 'from-rose-600 to-red-400',
      frameAccent: 'border-rose-500/30 group-hover:border-rose-400',
      badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/25',
      badgeGlyph: <Star className="w-8 h-8 text-rose-500 fill-rose-500/20" />,
      details: [
        'Official curation on international cooperative structures.',
        'Delivered on stage to top-tier institutional policymakers.',
        'Recognized for exceptional clarity of strategic execution.'
      ]
    },
    {
      id: 'cert-6',
      title: '10 Startups for Corporate Services Providers',
      organization: 'Silicon India',
      year: '2023',
      category: 'Startup elite',
      citation: 'Ranked in the absolute national top tier of regulatory compliance consulting networks, trusted by founders and institutional investors.',
      documentId: 'REG-SIND-2023-4522',
      sealColor: 'from-violet-500 to-fuchsia-400',
      frameAccent: 'border-violet-500/30 group-hover:border-violet-400',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
      badgeGlyph: <Star className="w-8 h-8 text-violet-400" />,
      details: [
        'Highest compliance fidelity score among active consulting networks.',
        'Vetted panel of double-certified legal and chartered tax experts.',
        'Direct relationship status with physical banks on 3 continents.'
      ]
    }
  ];

  return (
    <section className="section bg-[#060b13] relative overflow-hidden py-24 border-t border-slate-900" id="awards">
      {/* Editorial Background Gradients & Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(45,212,191,0.04),transparent)] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/3 to-transparent rounded-full blur-[120px] pointer-events-none" />
      
      {/* Accent Grid Line Overlay (Stripe Style) */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-[0.015] bg-grid-white" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="wrap relative z-10">
        <div className="sh center">
          <div className="label border border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/10 px-4 py-1.5 rounded-full text-sm font-bold select-none">
            <span className="label-dot bg-[#2dd4bf] animate-pulse" /> Certified Global Honors
          </div>
          {/* Fix the contrast/color bug by setting explicit high-contrast white text */}
          <h2 className="!text-white font-bold leading-tight mt-4" style={{ color: '#ffffff' }}>
            Recognition <span className="text-[#2dd4bf] font-serif italic font-normal">Across Industries</span>
          </h2>
          <p className="sh-sub text-slate-400 max-w-[620px] mx-auto text-center mt-4">
            Connect Ventures has been repeatedly vetted, ranked, and awarded for our corporate enablement framework. Explore our certified credentials below.
          </p>
        </div>

        {/* Responsive CSS Grid containing all 6 specified corporate credentials in perfect equal height rows */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch"
        >
          {certificates.map((cert) => {
            return (
              <div
                key={cert.id}
                className={`w-full relative group bg-[#0a1628]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border transition-all duration-300 overflow-visible flex flex-col justify-between border-slate-800/80`}
              >
                {/* Micro Ambient Glow behind card */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${cert.sealColor} opacity-0 group-hover:opacity-[0.04] blur-xl transition-opacity duration-500`} />
                
                {/* Frame styling */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#2ca799] uppercase bg-slate-950/80 py-1.5 px-3.5 rounded-full border border-slate-800 shrink-0 whitespace-nowrap">
                        {cert.year}
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-400 shrink-0 whitespace-nowrap">
                        <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                        <span className="text-[10px] font-bold tracking-wider font-mono text-amber-400 shrink-0 whitespace-nowrap">OFFICIAL TRUST</span>
                      </div>
                    </div>

                    {/* Highly premium digital badge/medallion visual representation */}
                    <div className="flex justify-center my-6">
                      <div className={`w-20 h-20 rounded-full border border-dashed flex items-center justify-center relative p-1.5 ${cert.badgeColor} transition-transform duration-500 group-hover:scale-105`}>
                        <div className="w-full h-full rounded-full border flex items-center justify-center bg-slate-900 shadow-md">
                          {cert.badgeGlyph}
                        </div>
                        {/* Interactive mini-stamp indicator */}
                        <div className="absolute -bottom-1 -right-1 bg-[#060b13] border border-slate-800 p-1 rounded-full text-amber-400 shadow-sm">
                          <CheckCircle2 className="w-3 h-3 fill-amber-400 text-[#060b13]" />
                        </div>
                      </div>
                    </div>

                    {/* Cert Title */}
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-white leading-snug tracking-tight mb-3 text-center min-h-[48px] flex items-center justify-center line-clamp-2">
                      {cert.title}
                    </h3>

                    {/* Awarding Authority */}
                    <div className="flex items-center justify-center gap-2 mb-4 bg-slate-950/40 p-2 rounded-xl border border-slate-850">
                      <Landmark className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                      <span className="text-xs font-bold text-slate-300 font-sans tracking-wide truncate">
                        {cert.organization}
                      </span>
                    </div>

                    {/* Description Citation */}
                    <p className="text-xs text-slate-400 leading-relaxed text-center group-hover:text-slate-300 transition-colors line-clamp-3 mb-2">
                      "{cert.citation}"
                    </p>
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
