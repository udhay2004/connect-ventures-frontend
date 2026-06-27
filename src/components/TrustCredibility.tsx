import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Shield, Award, Calendar, ArrowRight } from 'lucide-react';
// @ts-ignore
import dainikJagranClipping from '../assets/images/dainik_jagran_original_clipping_1781949908756.jpg';
// @ts-ignore
import nbtOriginalClipping from '../assets/images/nbt_original_clipping_1781950382987.jpg';
// @ts-ignore
import economicTimesOriginalClipping from '../assets/images/economic_times_original_clipping_1781950636089.jpg';

export default function TrustCredibility() {
  const mediaLogos = [
    { name: 'Dainik Jagran', color: 'hover:text-emerald-600', hoverBg: 'hover:bg-emerald-50/50', activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/10', logo: 'Dainik Jagran' },
    { name: 'Economic Times', color: 'hover:text-sky-600', hoverBg: 'hover:bg-sky-50/50', activeBorder: 'border-sky-500 ring-2 ring-sky-500/10', logo: 'Economic Times' },
    { name: 'Zee TV', color: 'hover:text-purple-600', hoverBg: 'hover:bg-purple-50/50', activeBorder: 'border-purple-500 ring-2 ring-purple-500/10', logo: 'Zee TV' },
    { name: 'Jain TV', color: 'hover:text-blue-600', hoverBg: 'hover:bg-blue-50/50', activeBorder: 'border-blue-500 ring-2 ring-blue-500/10', logo: 'Jain TV' },
    { name: 'Sudarshan', color: 'hover:text-amber-600', hoverBg: 'hover:bg-amber-50/50', activeBorder: 'border-amber-500 ring-2 ring-amber-500/10', logo: 'Sudarshan' },
    { name: 'NBT', color: 'hover:text-rose-600', hoverBg: 'hover:bg-rose-50/50', activeBorder: 'border-rose-500 ring-2 ring-rose-500/10', logo: 'NBT' },
    { name: 'Jantantra TV', color: 'hover:text-orange-600', hoverBg: 'hover:bg-orange-50/50', activeBorder: 'border-orange-500 ring-2 ring-orange-500/10', logo: 'Jantantra TV' }
  ];

  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const mediaDetails: Record<string, {
    title: string;
    publication: string;
    headline: string;
    image?: string;
    date?: string;
    paragraphs: string[];
    highlights: string[];
    isLogoOnly?: boolean;
    logoText?: string;
    logoColor?: string;
  }> = {
    'Dainik Jagran': {
      title: 'Featured in Dainik Jagran',
      publication: 'Dainik Jagran (दैनिक जागरण)',
      headline: 'Reached Great Heights, Left His Job, Became a Business Guru',
      image: dainikJagranClipping,
      date: '2026',
      paragraphs: [
        'We are proud to share that Dr. Anil Kumar Gupta, Founder of Comply Globally, was featured in Dainik Jagran, one of India\'s leading Hindi newspapers, under the headline "बुलंदियों पर पहुंच, छोड़ी नौकरी, बन गए बिजनेस गुरु" (Reached great heights, left his job, became a business guru).',
        'The article traces his journey of leaving a conventional job to guide aspiring entrepreneurs, helping both youth and working professionals discover practical paths toward self-employment and business ownership.',
        'It highlights the free seminars and guidance sessions he conducts regularly, through which thousands of individuals have already benefited — with new participants continuing to join his sessions to learn the fundamentals of building a business.',
        'Being featured in Dainik Jagran is a proud milestone and a testament to our founder\'s continued dedication to mentoring the next generation of entrepreneurs.'
      ],
      highlights: [
        'Left a conventional job to mentor aspiring entrepreneurs',
        'Conducts free seminars on self-employment and business building',
        'Thousands of participants have benefited from his guidance',
        'Continues to attract new entrepreneurs and professionals to his sessions'
      ]
    },
    'Economic Times': {
      title: 'Featured in The Economic Times',
      publication: 'The Economic Times (ET)',
      headline: 'Dr. Anil Gupta Joins WASME\'s Advisory Board',
      image: economicTimesOriginalClipping,
      date: 'September 2019',
      paragraphs: [
        'We are proud to share that Dr. Anil Gupta was featured in The Economic Times under the headline "WASME के एडवाइजरी बोर्ड में शामिल हुए अनिल गुप्ता" (Anil Gupta joins WASME\'s Advisory Board), following his induction into the Advisory Board of the World Association for Small and Medium Enterprises (WASME).',
        'The article notes his background as a business coach and his prior roles as convener of the BJP\'s Foreign Affairs Wing and the PHD Chamber of Commerce\'s Diaspora Forum for West Asian countries, alongside his work helping startups and MSME ventures secure investment.',
        'WASME\'s Executive Secretary, Dr. Sanjeev Lake, welcomed his induction to the advisory board, stating that it would meaningfully benefit the organization\'s startup and SME entrepreneurs. WASME is a global non-profit headquartered in Noida, founded in 1980, holding consultative or observer status with UNCTAD, ITC, WIPO, UNIDO, UNESCO, UNCITRAL, UNESCAP, and the ILO.',
        'Being featured in The Economic Times is a significant milestone and a testament to the impact of his work in advancing entrepreneurship at both the national and international level.'
      ],
      highlights: [
        'Inducted to the WASME Advisory Board',
        'Former convener, BJP Foreign Affairs Wing (West Asia) & PHD Chamber Diaspora Forum',
        'Helps startups and MSME ventures secure investment',
        'WASME holds consultative/observer status with UNCTAD, WIPO, UNIDO, UNESCO & more'
      ]
    },
    'Zee TV': {
      title: 'Featured on Zee TV',
      publication: 'Zee TV',
      headline: 'Recognized by one of India\'s largest entertainment & news networks',
      logoText: 'Z',
      logoColor: '#a21caf',
      isLogoOnly: true,
      paragraphs: [
        'Zee TV is one of India\'s largest and most-watched television networks, reaching hundreds of millions of viewers across India and the Indian diaspora worldwide through its entertainment and news programming.',
        'Comply Globally was featured on a dedicated Zee TV segment that highlighted our work in simplifying cross-border business registration and compliance for entrepreneurs and SMEs looking to expand internationally.',
        'Being recognized by a network of Zee TV\'s scale and reach reflects the growing trust placed in our advisory and compliance services by India\'s business community.'
      ],
      highlights: []
    },
    'Jain TV': {
      title: 'Featured on Jain TV',
      publication: 'Jain TV',
      headline: 'Featured on a respected national news & current affairs network',
      logoText: 'JAIN',
      logoColor: '#0f1840',
      isLogoOnly: true,
      paragraphs: [
        'Jain TV is a well-established national news network known for its current affairs and business programming, reaching audiences across India.',
        'Comply Globally was featured in a discussion on Jain TV centered on international quality and security standards, including why certifications like ISO 27001 and ISO 9001 matter for businesses operating in digital commerce.',
        'This feature reflects the credibility our certifications and compliance practices carry with established national media.'
      ],
      highlights: []
    },
    'Sudarshan': {
      title: 'Featured on Sudarshan News',
      publication: 'Sudarshan News',
      headline: 'Featured on a widely-followed national news channel',
      logoText: 'सुदर्शन',
      logoColor: '#dc2626',
      isLogoOnly: true,
      paragraphs: [
        'Sudarshan News is a widely-followed national news channel known for its coverage of business and policy topics across India.',
        'Comply Globally was featured in a segment highlighting how our remote-enabled services allow entrepreneurs to expand internationally without the overhead of setting up local offices.',
        'Being featured on a channel with Sudarshan\'s national reach underscores the relevance of our work to entrepreneurs across the country.'
      ],
      highlights: []
    },
    'NBT': {
      title: 'Featured in Navbharat Times (NBT)',
      publication: 'Navbharat Times (NBT)',
      headline: 'Dr. Anil Gupta Included in the Advisory Committee',
      image: nbtOriginalClipping,
      date: '2026',
      paragraphs: [
        'We are honored to share that Dr. Anil Gupta was featured in Navbharat Times under the headline "सलाहकार समिति में अनिल शामिल" (Dr. Anil Gupta included in the Advisory Committee), reported by NBT News, Noida.',
        'The article covers his induction as a board member of the Advisory Board of the World Association for Small and Medium Enterprises (WASME), where he will work from the organization\'s Noida office.',
        'Dr. Anil Gupta noted that while the organization has so far focused on helping small and mid-sized groups grow their trade, he will now also extend that support to startups.',
        'Being featured in Navbharat Times is a proud milestone that underscores our continued commitment to supporting businesses, startups, and entrepreneurs on their journey to growth and success.'
      ],
      highlights: [
        'Inducted as a board member of the WASME Advisory Board',
        'Will work from WASME\'s Noida office',
        'Extending support from established SMEs to early-stage startups',
        'Recognized contribution to regional and international business development'
      ]
    },
    'Jantantra TV': {
      title: 'Featured on Jantantra TV',
      publication: 'Jantantra TV',
      headline: 'Featured in an expert panel on international tax & compliance',
      logoText: 'जन-तंत्र',
      logoColor: '#dc2626',
      isLogoOnly: true,
      paragraphs: [
        'Jantantra TV is a national broadcast network covering business, policy, and current affairs for audiences across India.',
        'Comply Globally was featured on an expert panel discussing global withholding tax optimization and compliant cross-border structuring for businesses engaged in international trade.',
        'This feature highlights our recognized expertise in helping businesses navigate complex international tax and compliance frameworks.'
      ],
      highlights: []
    }
  };

  const selectedFeature = activeMedia ? (mediaDetails[activeMedia] || null) : null;

  return (
    <section className="section bg-slate-50 relative overflow-hidden" id="trust-credibility">
      <div className="wrap">
        
        {/* Centered Header */}
        <div className="sh center">
          <div className="label">
            <span className="label-dot" /> Verified Credentials
          </div>
          <h2>
            Certified Excellence. <em>Trusted Globally.</em>
          </h2>
          <p className="sh-sub text-slate-500">
            Our internationally recognized certifications reflect our absolute commitment to information security, quality management systems, and systematic client satisfaction metrics.
          </p>
        </div>

        {/* Centered Cards Grid */}
        <div className="flex justify-center w-full mb-20">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
            id="certifications-grid"
            style={{ maxWidth: '912px' }}
          >
            {/* Cert 1 */}
            <div
              className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-sm hover:translate-y-[-4px] hover:border-teal-500 hover:shadow-teal-500/10 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center w-full"
              id="cert-card-27001"
            >
              <div className="p-4 rounded-2xl inline-flex items-center justify-center mb-6 bg-emerald-50 text-emerald-500">
                <Shield className="w-8 h-8" />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="text-xl font-bold text-slate-950 mb-2">ISO 27001</h3>
                <p className="text-sm font-semibold text-emerald-600 mb-3">
                  Information Security Management
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[300px] mx-auto">
                  Reflecting our standard-compliant protocols for commercial client privacy protection, secure data transfer routing, and financial systems safety measures.
                </p>
              </div>
            </div>

            {/* Cert 2 */}
            <div
              className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-sm hover:translate-y-[-4px] hover:border-blue-500 hover:shadow-blue-500/10 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center w-full"
              id="cert-card-9001"
            >
              <div className="p-4 rounded-2xl inline-flex items-center justify-center mb-6 bg-blue-50 text-blue-500">
                <Award className="w-8 h-8" />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="text-xl font-bold text-slate-950 mb-2">ISO 9001</h3>
                <p className="text-sm font-semibold text-blue-600 mb-3">
                  Quality Management Systems
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[300px] mx-auto">
                  Reflecting highly precise task workflows, periodic compliance validation checks, advisory certifications, and ongoing workflow efficiency assessments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Explicit Visual Gap Divider */}
        <div className="w-full h-16 md:h-24" id="cert-media-gap-divider"></div>

        {/* Featured By leading media networks horizontal section */}
        <div className="border-t border-slate-200/80 pt-16 md:pt-24 mt-2" id="media-press">
          <div className="bg-slate-100/60 rounded-3xl p-8 md:p-14">

            <div className="sh center" style={{ marginBottom: '3rem' }}>
              <div className="label">
                <span className="label-dot" /> Media Presence
              </div>
              <h2>Featured by <em>leading media networks</em></h2>
              <p className="sh-sub text-slate-500" style={{ maxWidth: '640px', margin: '0 auto' }}>
                Recognized and featured by some of India's most respected media organizations for our industry expertise, innovation, and global business leadership. Click a channel below to view the full press release and coverage clippings.
              </p>
            </div>

            {/* Interactive Selector Tabs/Logos */}
            <div className="w-full" style={{ marginBottom: selectedFeature ? '0' : '0' }}>
              <div
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 w-full"
                style={{ gap: '1rem' }}
              >
                {mediaLogos.map((ch, idx) => {
                  const isActive = activeMedia === ch.name;
                  return (
                    <button 
                      key={idx}
                      onClick={() => {
                        if (activeMedia === ch.name) {
                          setActiveMedia(null);
                        } else {
                          setActiveMedia(ch.name);
                        }
                      }}
                      className={`bg-white/75 border rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all duration-300 flex flex-col justify-center items-center text-center outline-none ${
                        isActive 
                          ? `${ch.activeBorder} bg-white shadow-lg` 
                          : 'border-slate-200/80 opacity-60 hover:opacity-100 ' + ch.hoverBg
                      }`}
                      style={{
                        padding: '1.25rem 0.75rem',
                        minHeight: '108px'
                      }}
                    >
                      <span className={`text-[9px] font-bold tracking-widest uppercase block mb-1.5 transition-colors ${
                        isActive ? 'text-teal-600' : 'text-slate-400'
                      }`}>
                        {isActive ? '● VIEWING PRESS' : 'FEATURED ON'}
                      </span>
                      <span className={`text-sm font-black tracking-tighter transition-colors ${
                        isActive ? 'text-slate-950' : 'text-slate-600'
                      }`}>
                        {ch.logo}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {ch.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coverage Article Details Card Panel */}
            <AnimatePresence mode="wait">
              {selectedFeature && (
                <motion.div
                  key={activeMedia || 'empty'}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white border border-slate-200/85 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden"
                  style={{ marginTop: '2.5rem', minHeight: selectedFeature.isLogoOnly ? '280px' : '360px' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-400 to-blue-500"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" style={{ paddingTop: '0.75rem' }}>
                    
                    {/* Article Image/Newspaper Clipping Column */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <div
                        className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-slate-50 max-w-sm lg:max-w-full w-full"
                        style={{
                          minHeight: '320px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: selectedFeature.isLogoOnly ? '2.5rem' : '0'
                        }}
                      >
                        {selectedFeature.isLogoOnly ? (
                          <div
                            className="flex items-center justify-center w-full transition-transform duration-500 group-hover:scale-[1.03]"
                            style={{ minHeight: '180px' }}
                          >
                            <span
                              className="font-black tracking-tight text-center px-4"
                              style={{
                                color: selectedFeature.logoColor || '#0f172a',
                                fontSize: selectedFeature.logoText && selectedFeature.logoText.length > 6 ? '1.75rem' : '3.5rem',
                                lineHeight: 1.1,
                                wordBreak: 'break-word'
                              }}
                            >
                              {selectedFeature.logoText}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={selectedFeature.image}
                            alt={selectedFeature.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover max-h-[460px] rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-4">
                          <span className="text-[11px] font-mono text-white/90 bg-teal-500/90 py-1 px-3 rounded-full font-bold">
                            {selectedFeature.isLogoOnly ? 'Network' : 'Original Clipping'}
                          </span>
                        </div>
                      </div>
                      {selectedFeature.date && (
                        <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-400 font-medium bg-slate-50 border border-slate-100 rounded-full py-1.5 px-4 shadow-sm">
                          <Calendar className="w-3.5 h-3.5 text-teal-500" />
                          <span>Published: {selectedFeature.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Article Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center h-full">
                      <h3
                        className="text-xl md:text-2xl font-bold text-slate-950 leading-snug tracking-tight"
                        style={{ marginBottom: '1.25rem' }}
                      >
                        {selectedFeature.headline}
                      </h3>

                      {/* Styled rendering for multiple paragraphs */}
                      <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-light">
                        {selectedFeature.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}