import React, { useState } from 'react';
import { Zap, CheckCircle2, HeartHandshake, DollarSign } from 'lucide-react';

interface PromiseCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  metric: string;
  metricLabel: string;
  accentColor: string;
}

export default function BrandPromise() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const promises: PromiseCard[] = [
    {
      title: 'Speed of Action',
      subtitle: 'Accelerated Outcomes Only',
      description: 'Rapid response times, faster business entity setups, same-day consultation bookings, and immediate problem resolution.',
      icon: <Zap className="w-6 h-6" />,
      metric: '4hr',
      metricLabel: 'Guaranteed Response',
      accentColor: 'from-[#00c9a7] to-[#00d4ff]'
    },
    {
      title: 'Accuracy & Compliance',
      subtitle: 'Absolute Precision Control',
      description: 'Zero-fault international compliance structures, robust transfer-pricing checks, and strict auditing alignments.',
      icon: <CheckCircle2 className="w-6 h-6" />,
      metric: '100%',
      metricLabel: 'Approval Records',
      accentColor: 'from-[#3b82f6] to-[#0070f3]'
    },
    {
      title: 'Ease of Engagement',
      subtitle: 'Zero Friction Customer Path',
      description: 'Simple, unified, and fully transparent business milestones. A proactive, dedicated strategist assigned at every step.',
      icon: <HeartHandshake className="w-6 h-6" />,
      metric: '1',
      metricLabel: 'Point of Accountabilitys',
      accentColor: 'from-[#fbbf24] to-[#f59e0b]'
    },
    {
      title: 'Cost Competitiveness',
      subtitle: 'Optimized Investment Models',
      description: 'World-class advisory quality designed for mid-market businesses. Absolute cost transparency without hidden transaction fees.',
      icon: <DollarSign className="w-6 h-6" />,
      metric: '3.5x',
      metricLabel: 'Average Advisory Value',
      accentColor: 'from-[#ec4899] to-[#d946ef]'
    }
  ];

  return (
    <section className="section bg-white" id="brand-promise">
      <div className="wrap">
        <div className="sh center">
          <div className="label">
            <span className="label-dot" /> Operational Assurances
          </div>
          <h2>Our <em>brand promise</em> to you</h2>
          <p className="sh-sub text-slate-500">
            Backed by strict accountability standards and jurisdiction benchmarks. Discover how we protect your corporate investments globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {promises.map((pr, idx) => {
            const isHovered = activeCard === idx;
            return (
              <div
                key={pr.title}
                className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  borderColor: isHovered ? 'rgba(0,201,167,0.3)' : 'rgba(226,232,240,0.8)'
                }}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Horizontal slider progress line on top */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-250">
                  <span 
                    className={`h-full bg-gradient-to-r ${pr.accentColor} block transition-all duration-700 ease-out`}
                    style={{ width: isHovered ? '100%' : '15%' }}
                  />
                </div>

                <div>
                  {/* Icon indicator row */}
                  <div className={`p-3 bg-white border border-slate-150 rounded-2xl w-fit mb-6 transition-all duration-300 ${isHovered ? 'shadow-md scale-105' : ''}`}>
                    <div className="text-slate-700 group-hover:text-[var(--teal)] transition-colors duration-300">
                      {pr.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {pr.title}
                  </h3>
                  <span className="block text-[11px] font-mono text-[var(--teal)] uppercase tracking-wider font-semibold mt-1">
                    {pr.subtitle}
                  </span>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {pr.description}
                  </p>
                </div>

                {/* Animated counter indicator row */}
                <div className="mt-8 pt-5 border-t border-slate-200/60 flex items-baseline justify-between">
                  <div>
                    <span className={`block text-3xl font-black bg-gradient-to-r ${pr.accentColor} bg-clip-text text-transparent font-mono tracking-tight`}>
                      {pr.metric}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {pr.metricLabel}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono select-none">
                    P{idx + 1}
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
