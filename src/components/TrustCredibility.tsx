import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Shield, Award, Calendar } from 'lucide-react';
import { dainikJagranClipping, nbtOriginalClipping, economicTimesOriginalClipping } from '../assets/clippingImages';
import {
  dainikJagranLogo, economicTimesLogo, nbtLogo,
  zeeTvLogo, jainTvLogo, sudarshanLogo, jantantraLogo
} from '../assets/channelLogos';

export default function TrustCredibility() {
  const mediaLogos = [
    { name: 'Dainik Jagran', hoverBg: 'hover:bg-emerald-50/50', activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/10', logoImg: dainikJagranLogo },
    { name: 'Economic Times', hoverBg: 'hover:bg-sky-50/50',     activeBorder: 'border-sky-500 ring-2 ring-sky-500/10',       logoImg: economicTimesLogo },
    { name: 'Zee TV',         hoverBg: 'hover:bg-purple-50/50',  activeBorder: 'border-purple-500 ring-2 ring-purple-500/10', logoImg: zeeTvLogo },
    { name: 'Jain TV',        hoverBg: 'hover:bg-blue-50/50',    activeBorder: 'border-blue-500 ring-2 ring-blue-500/10',     logoImg: jainTvLogo },
    { name: 'Sudarshan',      hoverBg: 'hover:bg-amber-50/50',   activeBorder: 'border-amber-500 ring-2 ring-amber-500/10',   logoImg: sudarshanLogo },
    { name: 'NBT',            hoverBg: 'hover:bg-rose-50/50',    activeBorder: 'border-rose-500 ring-2 ring-rose-500/10',     logoImg: nbtLogo },
    { name: 'Jantantra TV',   hoverBg: 'hover:bg-orange-50/50',  activeBorder: 'border-orange-500 ring-2 ring-orange-500/10', logoImg: jantantraLogo },
  ];

  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const mediaDetails: Record<string, {
    title: string;
    publication: string;
    headline: string;
    image?: string;
    date?: string;
    paragraphs: string[];
    isLogoOnly?: boolean;
    logoImg?: string;
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
        'WASME\'s Executive Secretary, Dr. Sanjeev Lake, welcomed his induction, stating it would meaningfully benefit the organization\'s startup and SME entrepreneurs. WASME is a global non-profit headquartered in Noida, founded in 1980, holding consultative status with UNCTAD, ITC, WIPO, UNIDO, UNESCO, UNCITRAL, UNESCAP, and the ILO.',
        'Being featured in The Economic Times is a significant milestone and a testament to the impact of his work in advancing entrepreneurship at both the national and international level.'
      ],
    },
    'Zee TV': {
      title: 'Featured on Zee TV',
      publication: 'Zee TV',
      headline: 'Recognized by one of India\'s largest entertainment & news networks',
      logoImg: zeeTvLogo,
      isLogoOnly: true,
      paragraphs: [
        'Zee TV is one of India\'s largest and most-watched television networks, reaching hundreds of millions of viewers across India and the Indian diaspora worldwide through its entertainment and news programming.',
        'Comply Globally was featured on a dedicated Zee TV segment that highlighted its work in simplifying cross-border business registration and compliance for entrepreneurs and SMEs looking to expand internationally.',
        'Being recognized by a network of Zee TV\'s scale and reach reflects the growing trust placed in our advisory and compliance services by India\'s business community.'
      ],
    },
    'Jain TV': {
      title: 'Featured on Jain TV',
      publication: 'Jain TV',
      headline: 'Featured on a respected national news & current affairs network',
      logoImg: jainTvLogo,
      isLogoOnly: true,
      paragraphs: [
        'Jain TV is a well-established national news network known for its current affairs and business programming, reaching audiences across India.',
        'Comply Globally was featured in a discussion on Jain TV centered on international quality and security standards, including why certifications like ISO 27001 and ISO 9001 matter for businesses operating in digital commerce.',
        'This feature reflects the credibility our certifications and compliance practices carry with established national media.'
      ],
    },
    'Sudarshan': {
      title: 'Featured on Sudarshan News',
      publication: 'Sudarshan News',
      headline: 'Featured on a widely-followed national news channel',
      logoImg: sudarshanLogo,
      isLogoOnly: true,
      paragraphs: [
        'Sudarshan News is a widely-followed national news channel known for its coverage of business and policy topics across India.',
        'Comply Globally was featured in a segment highlighting how its remote-enabled services allow entrepreneurs to expand internationally without the overhead of setting up local offices.',
        'Being featured on a channel with Sudarshan\'s national reach underscores the relevance of our work to entrepreneurs across the country.'
      ],
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
    },
    'Jantantra TV': {
      title: 'Featured on Jantantra TV',
      publication: 'Jantantra TV',
      headline: 'Featured in an expert panel on international tax & compliance',
      logoImg: jantantraLogo,
      isLogoOnly: true,
      paragraphs: [
        'Jantantra TV is a national broadcast network covering business, policy, and current affairs for audiences across India.',
        'Comply Globally was featured on an expert panel discussing global withholding tax optimization and compliant cross-border structuring for businesses engaged in international trade.',
        'This feature highlights our recognized expertise in helping businesses navigate complex international tax and compliance frameworks.'
      ],
    }
  };

  const selectedFeature = activeMedia ? (mediaDetails[activeMedia] || null) : null;

  return (
    <section className="section bg-slate-50 relative overflow-hidden" id="trust-credibility">
      <div className="wrap">

        {/* Header */}
        <div className="sh center">
          <div className="label">
            <span className="label-dot" /> Verified Credentials
          </div>
          <h2>Certified Excellence. <em>Trusted Globally.</em></h2>
          <p className="sh-sub text-slate-500">
            Our internationally recognized certifications reflect our absolute commitment to information security, quality management systems, and systematic client satisfaction metrics.
          </p>
        </div>

        {/* Cert Cards: compact horizontal cards */}
        <div className="sr-group grid grid-cols-1 md:grid-cols-2 gap-5 w-full mx-auto mb-12" style={{ maxWidth: '960px' }}>
          <div className="group bg-white border border-slate-200/80 rounded-2xl p-6 md:p-7 shadow-sm hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex items-start gap-5">
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-500 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-col gap-0.5 mb-2">
                <h3 className="text-xl font-bold text-slate-950">ISO 27001</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Information Security Management</p>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Reflecting our standard-compliant protocols for commercial client privacy protection, secure data transfer routing, and financial systems safety measures.
              </p>
            </div>
          </div>
          <div className="group bg-white border border-slate-200/80 rounded-2xl p-6 md:p-7 shadow-sm hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-start gap-5">
            <div className="p-3.5 rounded-xl bg-blue-50 text-blue-500 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-col gap-0.5 mb-2">
                <h3 className="text-xl font-bold text-slate-950">ISO 9001</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Quality Management Systems</p>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Reflecting highly precise task workflows, periodic compliance validation checks, advisory certifications, and ongoing workflow efficiency assessments.
              </p>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div id="media-press">
          <div className="bg-white border border-slate-200/70 rounded-3xl p-7 md:p-10 shadow-sm">

            <div className="sh center" style={{ marginBottom: '2rem' }}>
              <div className="label"><span className="label-dot" /> Media Presence</div>
              <h2>Featured by <em>leading media networks</em></h2>
              <p className="sh-sub text-slate-500" style={{ maxWidth: '640px', margin: '0 auto' }}>
                Recognized and featured by some of India's most respected media organizations for our industry expertise, innovation, and global business leadership. Click a channel below to view the full press release and coverage clippings.
              </p>
            </div>

            {/* Selector Tabs — all show logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 w-full" style={{ gap: '1rem' }}>
              {mediaLogos.map((ch) => {
                const isActive = activeMedia === ch.name;
                return (
                  <button
                    key={ch.name}
                    onClick={() => setActiveMedia(isActive ? null : ch.name)}
                    className={`bg-white/75 border rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all duration-300 flex flex-col justify-center items-center text-center outline-none ${
                      isActive
                        ? `${ch.activeBorder} bg-white shadow-lg`
                        : 'border-slate-200/80 opacity-60 hover:opacity-100 ' + ch.hoverBg
                    }`}
                    style={{ padding: '0.85rem 0.5rem', minHeight: '96px', gap: '0.4rem' }}
                  >
                    <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${
                      isActive ? 'text-teal-600' : 'text-slate-400'
                    }`}>
                      {isActive ? '● VIEWING' : 'FEATURED ON'}
                    </span>

                    {/* Logo image — rendered larger so it's crisp */}
                    <img
                      src={ch.logoImg}
                      alt={ch.name}
                      style={{
                        width: '100%',
                        maxWidth: '110px',
                        height: '48px',
                        objectFit: 'contain',
                        imageRendering: 'auto',
                      }}
                    />

                    <span className="text-[10px] text-slate-400 font-medium">{ch.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              {selectedFeature && (
                <motion.div
                  key={activeMedia || 'empty'}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white border border-slate-200/85 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden"
                  style={{ marginTop: '2.5rem' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-400 to-blue-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" style={{ paddingTop: '0.75rem' }}>

                    {/* Left: clipping or logo */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <div
                        className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-slate-50 w-full flex items-center justify-center"
                        style={{
                          minHeight: selectedFeature.isLogoOnly ? '200px' : '320px',
                          padding: selectedFeature.isLogoOnly ? '2.5rem' : '1rem',
                        }}
                      >
                        {selectedFeature.isLogoOnly ? (
                          <img
                            src={selectedFeature.logoImg}
                            alt={selectedFeature.publication}
                            style={{ maxWidth: '220px', width: '100%', height: 'auto', objectFit: 'contain' }}
                            className="transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <img
                            src={selectedFeature.image}
                            alt={selectedFeature.title}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '460px',
                              objectFit: 'contain',
                              borderRadius: '0.75rem',
                            }}
                            className="transition-transform duration-500 group-hover:scale-[1.01]"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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

                    {/* Right: article text */}
                    <div className="lg:col-span-7 flex flex-col justify-center h-full">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-950 leading-snug tracking-tight" style={{ marginBottom: '1.25rem' }}>
                        {selectedFeature.headline}
                      </h3>
                      <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-light">
                        {selectedFeature.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
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
