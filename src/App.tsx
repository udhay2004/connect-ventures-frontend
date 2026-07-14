import React, { useEffect, useState, useRef } from 'react';
import NetworkHero from './components/NetworkHero';
import RichFramework from './components/RichFramework';
import EcosystemMap from './components/EcosystemMap';
import TrustCredibility from './components/TrustCredibility';
import AwardsRecognition from './components/AwardsRecognition';
import BusinessLifecycle from './components/BusinessLifecycle';
import BrandPromise from './components/BrandPromise';
import WhyChooseUs from './components/WhyChooseUs';
import C5CoCreationModal from './components/C5CoCreationModal';
import ResourcesSection, { ResourcesDrawer } from './components/ResourcesSection';
import { 
  FileText, 
  Percent, 
  CreditCard, 
  Truck, 
  Users, 
  Shield, 
  ArrowRight, 
  Calendar, 
  Check, 
  Briefcase,
  Linkedin,
  Youtube,
  Globe,
  ChevronDown,
  Phone
} from 'lucide-react';

interface CountUpToProps {
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

function CountUpTo({ end, decimals = 0, suffix = '', prefix = '' }: CountUpToProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1600; // 1.6s counting speed
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeVal = progress * (2 - progress);
      const currentVal = easeVal * end;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

export default function App() {
  // Page state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [loaderMsgIdx, setLoaderMsgIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  
  // Custom cursor position
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // FAQ Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Lead Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [c5ModalOpen, setC5ModalOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Message list for the initial loader screen
  const loaderMsgs = [
    'Connecting to global network…',
    'Loading 47 country nodes…',
    'Initializing trade routes…',
    'Ready.'
  ];

  useEffect(() => {
    // 1. Loader simulation interval
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.floor(Math.random() * 18 + 6);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoader(false);
          }, 400);
          return 100;
        }
        
        // Map message index relative to progress
        const msgIdx = Math.floor((next / 100) * loaderMsgs.length);
        if (msgIdx < loaderMsgs.length) {
          setLoaderMsgIdx(msgIdx);
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 2. Custom Cursor listener
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Track standard mouse-hover targets for cursor ring scaling
    const updateHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, select, input, textarea, .c-card, .svc, .t-card, .office, .ctag');
      targets.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorHovered(true));
        el.addEventListener('mouseleave', () => setCursorHovered(false));
      });
    };

    // Timeout to wait for DOM nodes to load
    const listenersTimeout = setTimeout(updateHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(listenersTimeout);
    };
  }, [showLoader]);

  useEffect(() => {
    // 3. Scroll tracking (nav background, progress bar, back-to-top visibility)
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);

      // Scroll percent progress calculation
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Back to top visible threshold
      setScrollTopVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 4. Custom Intersection Observer implementation for staggered scroll reveals & active section tracking
    if (showLoader) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Track active section for navigation highlighter linkage
            if (e.target.id) {
              setActiveSection(e.target.id);
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    // Track reveal classes
    const revealElements = document.querySelectorAll('.sr, .reveal-h2');
    revealElements.forEach((el) => observer.observe(el));

    // Track active sections
    const sectionIds = ['hero', 'services', 'fivec', 'countries', 'about', 'resources', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [showLoader]);

  // 5. Scroll to hash after loader finishes loading
  useEffect(() => {
    if (!showLoader) {
      const hash = window.location.hash;
      if (hash) {
        if (hash === '#resources') {
          setIsResourcesOpen(true);
        } else {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    }
  }, [showLoader]);

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  const name = (document.getElementById('name-input') as HTMLInputElement).value;
  const email = (document.getElementById('email-input') as HTMLInputElement).value;
  const phone = (document.getElementById('tel-input') as HTMLInputElement).value;
  const targetMarket = (document.getElementById('target-market-select') as HTMLSelectElement).value;
  const service = (document.getElementById('service-select') as HTMLSelectElement).value;
  const description = (document.getElementById('desc-textarea') as HTMLTextAreaElement).value;

  try {
    const API_BASE = 'https://connect-ventures-backend.onrender.com/api/contact';
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, targetMarket, service, description }),
    });
    if (!res.ok) throw new Error('Submission failed');
    setFormSubmitted(true);
  } catch (err) {
    console.error(err);
    alert('Something went wrong submitting your enquiry. Please try calling us directly.');
  } finally {
    setSubmitting(false);
  }
};

  const openCalendly = () => {
    window.open('https://calendly.com/connectventures', '_blank');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="relative min-h-screen bg-white font-sans text-ink selection:bg-teal selection:text-white">
      
      {/* 💻 TOP PAGE PROGRESS BAR */}
      <div 
        id="progress" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* 🚀 SIMULATED NEON LOADER */}
      {showLoader && (
        <div id="loader" className="transition-all duration-700 ease-out">
          <div className="loader-logo opacity-100 transition-opacity duration-500 flex flex-col items-center">
            <div className="bg-white p-6 rounded-3xl shadow-[0_12px_40px_rgba(255,255,255,0.12)] flex items-center justify-center border border-slate-100/10 mb-4 scale-95 md:scale-100">
              <img src="/assets/logo.png" alt="Connect Ventures Logo" className="h-[120px] w-auto animate-[pulse_2.2s_infinite]" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="loader-bar-track">
            <div 
              className="loader-bar" 
              style={{ width: `${loadingProgress}%` }} 
            />
          </div>
          <div className="loader-label text-xs tracking-[0.15em] text-[#5a7a96] font-mono select-none">
            {loaderMsgs[loaderMsgIdx]}
          </div>
        </div>
      )}

      {/* 🎯 CUSTOM CURSOR LAYER */}
      <div 
        className="cursor-dot max-md:hidden pointer-events-none" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />
      <div 
        className={`cursor-ring max-md:hidden pointer-events-none ${cursorHovered ? 'hovered' : ''}`} 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />

      {/* 🧭 NAVIGATION NAVBAR */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="main-nav">
        <div className="nav-inner items-center justify-between w-full">
          <a href="#" className="nav-logo flex items-center">
            <div className="nav-logo-mark flex items-center justify-center font-bold text-white bg-slate-900 rounded-xl" style={{ width: '42px', height: '42px', fontSize: '15px' }}>
              CV
            </div>
            <div className="nav-brand">
              CONNECT VENTURES
              <span>Your Globalization Partner</span>
            </div>
          </a>
          
          <button 
            className="hamburger bg-transparent border-0 select-none cursor-pointer flex items-center justify-center" 
            id="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
          
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
            <a href="#" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</a>
            <a href="services.html" className="nav-link" onClick={() => setMenuOpen(false)}>All Services</a>
            <a href="5c-model.html" className="nav-link" onClick={() => setMenuOpen(false)}>5C Framework</a>
            <a href="projects.html" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="marketplace.html" className="nav-link" onClick={() => setMenuOpen(false)}>Marketplace</a>
            <a href="countries.html" className={`nav-link ${activeSection === 'countries' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Countries</a>
            <a href="about.html" className="nav-link" onClick={() => setMenuOpen(false)}>About Dr. Gupta</a>
            <a href="partners.html" className="nav-link" onClick={() => setMenuOpen(false)}>Partners</a>
            <a
              href="resources.html"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</a>
            <div className="nav-phone-container select-all">
              <a 
                href="tel:+13022141717" 
                className="nav-phone-link"
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="nav-phone-icon" /> +1 (302) 214-1717
              </a>
              <a 
                href="tel:+919999981613" 
                className="nav-phone-link"
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="nav-phone-icon" /> +91 99999 81613
              </a>
            </div>
            <a href="#contact" className="nav-link nav-links-cta" onClick={() => setMenuOpen(false)}>Free Consultation</a>
          </div>
          
          <a href="#contact" className="nav-cta btn-shimmer">
            Free consultation
          </a>
        </div>
      </nav>

      {/* 🌌 HERO SECTION — WITH REFINED LIVE GLOBAL MOUNT ON THE RIGHT */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          {/* Layered background glowing ambient spheres */}
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-orb orb3" />
        </div>
        <div className="hero-noise" />

        {/* Ambient SVG curved vector paths spanning outer background */}
        <svg id="hero-svg-paths" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="path-draw" d="M 1200 -100 Q 900 400 400 700" stroke="rgba(0,201,167,0.12)" strokeWidth="1.5" fill="none" />
          <path className="path-draw" d="M -100 600 Q 400 200 1100 350" stroke="rgba(0,112,243,0.10)" strokeWidth="1.5" fill="none" />
          <path className="path-draw" d="M 600 -50 Q 800 300 650 650" stroke="rgba(0,212,255,0.08)" strokeWidth="1" fill="none" />
          <ellipse cx="950" cy="200" rx="220" ry="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" fill="none" />
          <path d="M 100 100 Q 350 50 500 300" stroke="rgba(0,201,167,0.07)" strokeWidth="1" fill="none" />
          <circle r="3" fill="#00c9a7" opacity="0.9">
            <animateMotion dur="8s" repeatCount="indefinite">
              <mpath href="#path-anim-1" />
            </animateMotion>
          </circle>
          <circle r="2" fill="#00d4ff" opacity="0.7">
            <animateMotion dur="12s" repeatCount="indefinite" begin="3s">
              <mpath href="#path-anim-2" />
            </animateMotion>
          </circle>
          <defs>
            <path id="path-anim-1" d="M 1200 -100 Q 900 400 400 700" />
            <path id="path-anim-2" d="M -100 600 Q 400 200 1100 350" />
          </defs>
        </svg>

        <div className="hero-inner">
          
          {/* ✍️ LEFT COLUMN: High density headlines & text info */}
          <div className="hero-left">


            <h1 className="hero-h1 in" id="hero-h1">
              Where businesses<br />
              go global
            </h1>
            <span className="hero-h1-line2 in relative block pb-2 max-w-full" id="hero-h1-line2">
              We handle company setup and compliance across 47+ countries.
              <span className="absolute bottom-0 left-0 right-12 h-[3px] bg-gradient-to-r from-[var(--teal)] via-[var(--blue)] to-amber-400 rounded-full opacity-80" />
            </span>

            <p className="hero-subline in" id="hero-subline">
              Establish your international presence seamlessly with a trusted expansion partner. From entity setup and compliance audits to localised market entry, we handle your regional operations across six continents.
            </p>

            <div className="hero-btns in" id="hero-btns">
              <a href="#contact" className="btn-hero-primary btn-shimmer block text-center">
                Book Free Consultation &nbsp;→
              </a>
              <a href="#services" className="btn-hero-secondary btn-shimmer text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Briefcase className="w-4 h-4" />
                Explore Services
              </a>
            </div>

            <div className="hero-stats-row w-full in" id="hero-stats-row">
              <div className="hsr-stat">
                <div className="hsr-val"><CountUpTo end={1000} suffix="+" /></div>
                <div className="hsr-lbl">Clients served</div>
              </div>
              <div className="hsr-stat">
                <div className="hsr-val"><CountUpTo end={47} suffix="+" /></div>
                <div className="hsr-lbl">Countries</div>
              </div>
              <div className="hsr-stat">
                <div className="hsr-val"><CountUpTo end={4.7} decimals={1} suffix="★" /></div>
                <div className="hsr-lbl">Trustpilot</div>
              </div>
              <div className="hsr-stat">
                <div className="hsr-val"><CountUpTo end={6} /></div>
                <div className="hsr-lbl">Continents</div>
              </div>
            </div>
          </div>

          {/* 🦾 RIGHT COLUMN: REFINED PREMIUM Expansion Network Graphic */}
          <div className="hero-right w-full h-full in" id="hero-right">
            <NetworkHero />
          </div>

        </div>

        {/* Morning Daybreak Twilight Transition Layer */}
        <div className="hero-transition-gradient" />
      </section>

      {/* 🎪 HORIZONTAL SCOPE MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span className="mi"><span className="dot" />Company Formation</span>
          <span className="mi"><span className="dot" />International Banking</span>
          <span className="mi"><span className="dot" />Tax &amp; DTAA Planning</span>
          <span className="mi"><span className="dot" />Secretarial Compliance</span>
          <span className="mi"><span className="dot" />IOR / EOR Services</span>
          <span className="mi"><span className="dot" />Stakeholder Hunt</span>
          <span className="mi"><span className="dot" />Trade Finance</span>
          <span className="mi"><span className="dot" />Visa &amp; Immigration</span>
          <span className="mi"><span className="dot" />Patent &amp; Trademark</span>
          <span className="mi"><span className="dot" />Deal Facilitation</span>
          <span className="mi"><span className="dot" />Market Research</span>
          <span className="mi"><span className="dot" />Localization</span>
          {/* Repeated items for circular infinite scrolling layout */}
          <span className="mi"><span className="dot" />Company Formation</span>
          <span className="mi"><span className="dot" />International Banking</span>
          <span className="mi"><span className="dot" />Tax &amp; DTAA Planning</span>
          <span className="mi"><span className="dot" />Secretarial Compliance</span>
          <span className="mi"><span className="dot" />IOR / EOR Services</span>
          <span className="mi"><span className="dot" />Stakeholder Hunt</span>
          <span className="mi"><span className="dot" />Trade Finance</span>
          <span className="mi"><span className="dot" />Visa &amp; Immigration</span>
          <span className="mi"><span className="dot" />Patent &amp; Trademark</span>
          <span className="mi"><span className="dot" />Deal Facilitation</span>
          <span className="mi"><span className="dot" />Market Research</span>
          <span className="mi"><span className="dot" />Localization</span>
        </div>
      </div>

      {/* 🛡️ 5C EXPANSION FRAMEWORK SECTION */}
      <section className="fivec-section section" id="fivec">
        <div className="fivec-section-transition" />
        <div className="fivec-section-grid-bg" />
        <div className="wrap relative z-10">
          <div className="sh center">
            <div className="label">
              <span className="label-dot" />Proprietary framework
            </div>
            <h2 className="reveal-h2"><span className="reveal-h2-inner">The <em>5C model</em> — how we deliver global expansion</span></h2>
            <p className="sh-sub">
              The only firm delivering all five dimensions of international business simultaneously, under one roof, with one point of accountability.
            </p>
          </div>
          
          <div className="fivec-grid relative">
            {/* Scroll-triggered connecting journey line for desktop xl screens */}
            <svg className="absolute hidden xl:block inset-x-0 top-[28%] w-full h-[60px] pointer-events-none z-0">
              <path 
                d="M 110 30 C 260 -10, 340 70, 500 30 C 660 -10, 740 70, 900 30 C 1060 -10, 1140 70, 1260 30" 
                stroke="url(#grad-journey)" 
                strokeWidth="3.5" 
                className="animated-dash-path"
                fill="none" 
                opacity="0.35" 
              />
              <defs>
                <linearGradient id="grad-journey" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--teal)" />
                  <stop offset="50%" stopColor="var(--blue)" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* C1 */}
            <a 
              href="coaching.html"
              className="c-card c1 sr relative overflow-hidden group hover:border-[var(--teal)] transition-all duration-300 block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="c-card-top-border" />
              <div className="c-top">
                <div className="c-badge">C1 — Coaching</div>
                <div className="c-name">Strategic Leadership</div>
                <div className="c-sub">For global growth</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item">CEO &amp; founder coaching</div>
                  <div className="c-item">Global market entry strategy</div>
                  <div className="c-item">Succession planning</div>
                  <div className="c-item">Tech product planning</div>
                  <div className="c-item">Research reports &amp; cases</div>
                </div>
              </div>
              <span className="c-cta w-full text-left bg-transparent border-none p-0 font-semibold block">
                Explore Coaching →
              </span>
            </a>

            {/* C2 */}
            <a 
              href="consulting.html"
              className="c-card c2 sr sr-delay-1 relative overflow-hidden group hover:border-[var(--teal)] transition-all duration-300 block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="c-card-top-border" />
              <div className="c-top">
                <div className="c-badge">C2 — Consulting</div>
                <div className="c-name">Global Operations</div>
                <div className="c-sub">The backbone of expansion</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item">Foreign company incorporation</div>
                  <div className="c-item">International taxation &amp; DTAA</div>
                  <div className="c-item">Cross-border banking</div>
                  <div className="c-item">IPR — Patent, TM, Copyright</div>
                  <div className="c-item">Trade finance &amp; MSME credit</div>
                </div>
              </div>
              <span className="c-cta w-full text-left bg-transparent border-none p-0 font-semibold block">
                Explore Consulting →
              </span>
            </a>

            {/* C3 */}
            <a 
              href="connecting.html"
              className="c-card c3 sr sr-delay-2 relative overflow-hidden group hover:border-[var(--teal)] transition-all duration-300 block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="c-card-top-border" />
              <div className="c-top">
                <div className="c-badge">C3 — Connecting</div>
                <div className="c-name">Global Network</div>
                <div className="c-sub">Finding the right people</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item">Stakeholder hunt service</div>
                  <div className="c-item">Distributor &amp; agent search</div>
                  <div className="c-item">Investor &amp; PE/VC connect</div>
                  <div className="c-item">B2B &amp; JV matchmaking</div>
                  <div className="c-item">Govt. relations experts</div>
                </div>
              </div>
              <span className="c-cta w-full text-left bg-transparent border-none p-0 font-semibold block">
                Explore Connecting →
              </span>
            </a>

            {/* C4 */}
            <a 
              href="collaboration.html"
              className="c-card c4 sr sr-delay-3 relative overflow-hidden group hover:border-[var(--teal)] transition-all duration-300 block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="c-card-top-border" />
              <div className="c-top">
                <div className="c-badge">C4 — Collaboration</div>
                <div className="c-name">Cross-Border Deals</div>
                <div className="c-sub">Closing deals across borders</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item">IOR / EOR / AOR services</div>
                  <div className="c-item">Deal facilitation &amp; structuring</div>
                  <div className="c-item">SHA, term sheets, MOU drafting</div>
                  <div className="c-item">3PL warehouse &amp; logistics</div>
                  <div className="c-item">Customs &amp; EXIM services</div>
                </div>
              </div>
              <span className="c-cta w-full text-left bg-transparent border-none p-0 font-semibold block">
                Explore Collaboration →
              </span>
            </a>

            {/* C5 */}
            <a 
              href="co-creation.html"
              className="c-card c5 sr sr-delay-4 relative overflow-hidden group cursor-pointer hover:border-[var(--teal)] transition-all duration-300 block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="c-card-top-border" />
              <div className="c-top">
                <div className="c-badge">C5 — Co-creation</div>
                <div className="c-name">Growth Partnerships</div>
                <div className="c-sub">Strategic co-investment</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item">Strategic co-investment</div>
                  <div className="c-item">JV facilitation &amp; M&amp;A</div>
                  <div className="c-item">Syndicate leadership</div>
                  <div className="c-item">Commodity marketplace (HK)</div>
                  <div className="c-item">Estate planning &amp; succession</div>
                </div>
              </div>
              <span className="c-cta w-full text-left bg-transparent border-none p-0 font-semibold block">
                Explore Co-creation →
              </span>
            </a>

            {/* C6 - Custom Advisory / CTA */}
            <div className="c-card c6 sr sr-delay-5 relative overflow-hidden group hover:border-[var(--teal)] transition-all duration-300">
              <div className="c-card-top-border bg-gradient-to-r from-[#00c9a7] to-[#29b6f6]" />
              <div className="c-top">
                <div className="c-badge bg-[#f0fdfa] text-[#008770] border border-[#00c9a7]/20 font-bold">Custom</div>
                <div className="c-name">Your Tailored Roadmap</div>
                <div className="c-sub">Consult with our execution leaders</div>
              </div>
              <div className="c-body">
                <div className="c-items">
                  <div className="c-item !text-slate-700 before:!content-['✓'] before:!text-[#00c9a7] before:font-bold">Tailored corporate structures</div>
                  <div className="c-item !text-slate-700 before:!content-['✓'] before:!text-[#00c9a7] before:font-bold">Custom EXIM corridor maps</div>
                  <div className="c-item !text-slate-700 before:!content-['✓'] before:!text-[#00c9a7] before:font-bold">Specialized-broker hunts</div>
                  <div className="c-item !text-slate-700 before:!content-['✓'] before:!text-[#00c9a7] before:font-bold">Custom tax planning models</div>
                  <div className="c-item !text-slate-700 before:!content-['✓'] before:!text-[#00c9a7] before:font-bold">24/7 dedicated advisor support</div>
                </div>
              </div>
              <a href="#contact" className="c-cta hover:text-[#00c9a7] transition-all duration-200">Book Custom Audit →</a>
            </div>
          </div>

          <div className="text-center mt-[28px]">
            <a 
              href="5c-model.html" 
              className="color-ink hover:text-[#2dd4bf] transition-all duration-300 bg-transparent inline-flex items-center gap-[9px] py-[14px] px-[28px] text-sm font-semibold"
            >
              Explore the complete 5C framework →
            </a>
          </div>
        </div>
      </section>

      {/* 🗺️ A-Z SOLUTIONS ECOSYSTEM MAP SECTION */}
      <EcosystemMap />



      {/* 🧬 WHY CHOOSE US */}
      <div id="about">
        <WhyChooseUs />
      </div>

      {/* 🤝 BRAND PROMISE SECTION */}
      <BrandPromise />

      {/* 🛡️ TRUST & REGULATORY CREDIBILITY CORES */}
      <TrustCredibility />

      {/* 🏆 INDUSTRY HONORS & RANKINGS TIMELINE */}
      <AwardsRecognition />

      {/* 🔮 R.I.C.H METHODOLOGY SECTION */}
      <RichFramework />

      {/* 🧬 THE GLOBAL EXPANSION LIFECYCLE METHODOLOGY */}
      <BusinessLifecycle />

      {/* 🧭 INTEGRATIVE ACTIVE COUNTRIES */}
      <section className="countries-section section relative overflow-hidden border-t border-slate-900" id="countries">
        <div className="wrap bg-[#080c14] rounded-3xl p-8 md:p-12 border border-slate-800/40 relative z-10">
          <div className="c-intro flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="label text-[#2dd4bf]">
                <span className="label-dot bg-[#2dd4bf]" />Global reach
              </div>
              <h2 className="reveal-h2 text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                <span className="reveal-h2-inner" style={{ color: '#ffffff' }}>
                  We are already there,<br />
                  <em className="font-serif italic text-[#2dd4bf]">waiting for you.</em>
                </span>
              </h2>
              <p className="mt-4 text-slate-400">
                From the Americas to ASEAN, from the Gulf to Scandinavia — Connect Ventures has active client engagements across 6 continents.
              </p>
              
              <div className="c-meta flex gap-9 mt-6">
                <div>
                  <div className="val"><CountUpTo end={47} suffix="+" /></div>
                  <div className="lbl text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Countries active</div>
                </div>
                <div>
                  <div className="val"><CountUpTo end={6} /></div>
                  <div className="lbl text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Continents</div>
                </div>
                <div>
                  <div className="val"><CountUpTo end={3} /></div>
                  <div className="lbl text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">India offices</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 font-mono">
                Top destinations
              </p>
              <div className="ctags flex flex-wrap gap-2 mb-6">
                <span className="ctag feat">🇺🇸 USA</span>
                <span className="ctag feat">🇬🇧 UK</span>
                <span className="ctag feat">🇦🇪 UAE</span>
                <span className="ctag feat">🇸🇬 Singapore</span>
                <span className="ctag feat">🇨🇦 Canada</span>
                <span className="ctag feat">🇭🇰 Hong Kong</span>
                <span className="ctag ctag-india">🇮🇳 India</span>
              </div>
              
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 font-mono">
                More markets
              </p>
              <div className="ctags flex flex-wrap gap-2">
                <span className="ctag">🇦🇺 Australia</span>
                <span className="ctag">🇩🇪 Germany</span>
                <span className="ctag">🇫🇷 France</span>
                <span className="ctag">🇳🇱 Netherlands</span>
                <span className="ctag">🇸🇪 Sweden</span>
                <span className="ctag">🇸🇦 Saudi Arabia</span>
                <span className="ctag">🇯🇵 Japan</span>
                <span className="ctag">🇰🇷 South Korea</span>
                <span className="ctag">🇻🇳 Vietnam</span>
                <span className="ctag">🇧🇷 Brazil</span>
                <span className="ctag">🇿🇦 S. Africa</span>
                <span className="ctag">🇲🇺 Mauritius</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ TESTIMONIAL STAR STORIES */}
      <section className="section">
        <div className="wrap">
          <div className="sh center">
            <div className="label">
              <span className="label-dot" />Client success stories
            </div>
            <h2 className="reveal-h2"><span className="reveal-h2-inner">What our clients say — <em>in their own words</em></span></h2>
            <p className="sh-sub">
              Rated 4.7★ on Trustpilot from 1,000+ verified client reviews.
            </p>
          </div>
          
          <div className="t-grid">
            {/* T1 */}
            <div className="t-card sr">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                I could expand my business to 7 countries in 3 years just because of Connect Ventures / Comply Globally. This is what I call a true global expansion partner.
              </blockquote>
              <div className="t-name">Naveen Melant</div>
              <div className="t-role">CEO, Coretech Global</div>
              <span className="t-flag-prominent">🇺🇸 USA · 🇸🇬 Singapore · 🇨🇦 Canada</span>
            </div>

            {/* T2 */}
            <div className="t-card sr sr-delay-1">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                Initially I thought their brand promises were marketing jargon. After taking their services, I can say they are better than excellent in Speed, Cost Competitiveness, and Competence.
              </blockquote>
              <div className="t-name">Deepak Nirwan</div>
              <div className="t-role">Delaware Distributes</div>
              <span className="t-flag-prominent">🇺🇸 USA</span>
            </div>

            {/* T3 */}
            <div className="t-card sr sr-delay-2">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                A Sales Tax compliance issue I struggled with for 2 years was resolved in the first call itself. That kind of competence and speed is what sets them apart.
              </blockquote>
              <div className="t-name">Edwin</div>
              <div className="t-role">Director, SureTech Inc</div>
              <span className="t-flag-prominent">🇺🇸 USA</span>
            </div>

            {/* T4 */}
            <div className="t-card sr sr-delay-3">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                Setting up our US entity was seamless — they handled every detail. Export documentation for the US and Europe was flawless. I refer all my peers to them.
              </blockquote>
              <div className="t-name">Govinda Venkatesh</div>
              <div className="t-role">CEO, AgriCrop Inc.</div>
              <span className="t-flag-prominent">🇺🇸 USA · 🇪🇺 Europe</span>
            </div>

            {/* T5 */}
            <div className="t-card sr sr-delay-4">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                Expansion into Singapore was quick and stress-free. Tax and compliance across jurisdictions are no longer stressful — everything is timely and accurate.
              </blockquote>
              <div className="t-name">Dr Arpan Gupta</div>
              <div className="t-role">Director, HiTech Pte</div>
              <span className="t-flag-prominent">🇸🇬 Singapore</span>
            </div>

            {/* T6 */}
            <div className="t-card sr sr-delay-5">
              <div className="t-stars">
                <div className="t-stars-width">★★★★★</div>
              </div>
              <blockquote className="t-q">
                A clear roadmap for global growth covering the US, UK, and Canada. Visa and immigration support for our team was handled professionally from start to finish.
              </blockquote>
              <div className="t-name">Mamraj Chahar</div>
              <div className="t-role">Chief Investment Officer</div>
              <span className="t-flag-prominent">🇨🇦 Canada · 🇬🇧 UK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🧭 RESOURCES & ADVISORY INTELLIGENCE CENTER (opened via drawer) */}

      {/* ✉️ CONTACT SECTION & INTERACTIVE SUBMIT */}
      <section className="contact-section section" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="label">
                <span className="label-dot" />Start your global journey today
              </div>
              <h2 className="text-3xl font-semibold mb-4 leading-tight">
                Tell us where you want to go.<br />
                <em className="font-serif italic text-teal2">We'll handle everything from there.</em>
              </h2>
              <p className="text-slate-500 mb-6 font-medium">
                We have helped 1,000+ Indian businesses navigate global expansion — from single-country setups to 7-country operations over 3 years.
              </p>
              
              <div className="check-list">
                <div className="check-item">
                  <span className="check-dot">✓</span>Free 30-minute strategy call with a senior advisor
                </div>
                <div className="check-item">
                  <span className="check-dot">✓</span>Written proposal with timeline and fixed-fee quote within 48 hours
                </div>
                <div className="check-item">
                  <span className="check-dot">✓</span>No commitment required — honest guidance only
                </div>
                <div className="check-item">
                  <span className="check-dot">✓</span>Response within 4 business hours guaranteed
                </div>
              </div>
              
              <div className="directs">
                <div className="direct">📞 <a href="tel:+919999981613" className="font-bold">+91 999 998 1613</a> · <a href="tel:+919768326850" className="font-bold">+91 976 832 6850</a></div>
                <div className="direct">📞 <a href="tel:+13022141717" className="font-bold">+1 302 214 1717</a> (USA)</div>
                <div className="direct">✉ <a href="mailto:partners@theconnectventures.com" className="font-bold">partners@theconnectventures.com</a></div>
              </div>
              
              <div className="mt-6 flex">
                <button 
                  onClick={openCalendly} 
                  className="fsub w-auto py-3.5 px-6 block text-center rounded-xl font-bold cursor-pointer"
                >
                  📅 Schedule in Dr. Gupta's calendar
                </button>
              </div>
            </div>

            <div>
              <div className="form-box border border-slate-200">
                <div className="form-title">
                  Get your free global expansion assessment
                </div>
                <div className="form-sub select-none">
                  Our team responds within 4 hours.
                </div>
                
                <form className="lead-form mt-4" noValidate onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="fg-floating font-sans">
                      <input type="text" id="name-input" className="fc peer" placeholder=" " required />
                      <label htmlFor="name-input" className="fl-floating">Your name *</label>
                    </div>
                    <div className="fg-floating font-sans">
                      <input type="email" id="email-input" className="fc peer" placeholder=" " required />
                      <label htmlFor="email-input" className="fl-floating">Email *</label>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="fg-floating font-sans">
                      <input type="tel" id="tel-input" className="fc peer" placeholder=" " />
                      <label htmlFor="tel-input" className="fl-floating">WhatsApp / Phone</label>
                    </div>
                    <div className="fg-floating font-sans">
                      <select id="target-market-select" className="fc peer" defaultValue="" required>
                        <option value="" disabled hidden></option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="UAE">UAE / Dubai</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Other">Other (multiple)</option>
                      </select>
                      <label htmlFor="target-market-select" className="fl-floating">Target market *</label>
                    </div>
                  </div>
                  
                  <div className="fg-floating font-sans">
                    <select id="service-select" className="fc peer" defaultValue="" required>
                      <option value="" disabled hidden></option>
                      <option value="incorporation">Company incorporation abroad</option>
                      <option value="banking">International banking setup</option>
                      <option value="ior">IOR / EOR services</option>
                      <option value="tax">Tax &amp; DTAA compliance</option>
                      <option value="stakeholder">Stakeholder / distributor hunt</option>
                      <option value="visa">Visa &amp; immigration</option>
                      <option value="framework">Full 5C expansion package</option>
                      <option value="guidance">Not sure — need guidance</option>
                    </select>
                    <label htmlFor="service-select" className="fl-floating">Primary service *</label>
                  </div>
                  
                  <div className="fg-floating font-sans text-area-fg">
                    <textarea id="desc-textarea" className="fc peer h-[100px]" rows={3} placeholder=" "></textarea>
                    <label htmlFor="desc-textarea" className="fl-floating">Brief description</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="fsub w-full btn-shimmer cursor-pointer select-none py-3.5 block text-center text-white font-bold transition-all duration-300 relative"
                    style={{ background: formSubmitted ? '#10b981' : '' }}
                    disabled={formSubmitted || submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing assessment...
                      </span>
                    ) : formSubmitted ? (
                      '✓ Enquiry sent — we\'ll respond within 4 hours' 
                    ) : (
                      'Send my enquiry — get a free assessment →'
                    )}
                  </button>
                  <div className="fnote select-none mt-2.5">
                    🔒 Private and secure. We respond within 4 business hours.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="section">
        <div className="wrap-sm">
          <div className="sh center">
            <div className="label">
              <span className="label-dot" />Your questions answered
            </div>
            <h2>Frequently asked <em>questions</em></h2>
          </div>
          
          <div className="faq-box border border-slate-200">
            <div className="faq-gt">Global expansion fundamentals</div>
            
            {/* FAQ 1 */}
            <div className="faq-item">
              <button className={`faq-q ${openFaqIdx === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>
                How to expand a business internationally from India?
                <span className="faq-icon-wrapper">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIdx === 0 ? 'rotate-180 text-[var(--teal)]' : 'text-slate-400'}`} />
                </span>
              </button>
              <div className={`faq-a ${openFaqIdx === 0 ? 'open' : ''}`}>
                <p>
                  International expansion from India follows five core steps: (1) Market selection, (2) Legal structure — register a foreign entity, (3) Banking and finance, (4) Tax and compliance registration, (5) Market entry — find local distributors or agents. Connect Ventures handles all five steps through the 5C framework across 47+ countries.
                </p>
                <div className="faq-kw">
                  Also searched: how to go global from India · international expansion strategy India
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="faq-item">
              <button className={`faq-q ${openFaqIdx === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
                What is the Connect Ventures 5C framework?
                <span className="faq-icon-wrapper">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIdx === 1 ? 'rotate-180 text-[var(--teal)]' : 'text-slate-400'}`} />
                </span>
              </button>
              <div className={`faq-a ${openFaqIdx === 1 ? 'open' : ''}`}>
                <p>
                  The 5C model covers: C1 Coaching, C2 Consulting (incorporation, tax, banking), C3 Connecting (stakeholder hunt, investors), C4 Collaboration (IOR/EOR, deals), C5 Co-creation (JV, co-investment). Unlike firms that specialise in one area, Connect Ventures delivers all five — the only true single-stop partner for any Indian business going global.
                </p>
              </div>
            </div>

            <div className="faq-gt">Company incorporation abroad</div>

            {/* FAQ 3 */}
            <div className="faq-item">
              <button className={`faq-q ${openFaqIdx === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
                Can an Indian company incorporate in the USA without visiting?
                <span className="faq-icon-wrapper">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIdx === 2 ? 'rotate-180 text-[var(--teal)]' : 'text-slate-400'}`} />
                </span>
              </button>
              <div className={`faq-a ${openFaqIdx === 2 ? 'open' : ''}`}>
                <p>
                  Yes — entirely. Any Indian citizen can incorporate a US LLC or C-Corp without a US visa, SSN, or travelling. State filing (1–5 days), EIN via IRS International, FinCEN BOI report, and bank account opening via Mercury or Relay. Total timeline: 7–14 business days.
                </p>
                <div className="faq-kw">
                  Also searched: register company in USA from India · US LLC India
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="faq-item">
              <button className={`faq-q ${openFaqIdx === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
                What is Form 5472 and what happens if it isn't filed?
                <span className="faq-icon-wrapper">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIdx === 3 ? 'rotate-180 text-[var(--teal)]' : 'text-slate-400'}`} />
                </span>
              </button>
              <div className={`faq-a ${openFaqIdx === 3 ? 'open' : ''}`}>
                <p>
                  Form 5472 is an IRS requirement for foreign-owned US single-member LLCs. Must be filed annually by April 15. <strong>The penalty for non-filing is $25,000 per form per year</strong> — one of the harshest penalties in US tax law. Connect Ventures includes Form 5472 filing in all annual compliance packages.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="faq-item">
              <button className={`faq-q ${openFaqIdx === 4 ? 'open' : ''}`} onClick={() => toggleFaq(4)}>
                How do I start working with Connect Ventures?
                <span className="faq-icon-wrapper">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaqIdx === 4 ? 'rotate-180 text-[var(--teal)]' : 'text-slate-400'}`} />
                </span>
              </button>
              <div className={`faq-a ${openFaqIdx === 4 ? 'open' : ''}`}>
                <p>
                  Fill the form above, call <a href="tel:+919999981613" className="text-teal2 font-semibold">+91 999 998 1613</a>, or schedule a call. During the free 30-minute consultation we understand your business and timeline — and send a written proposal with fixed-fee pricing within 48 hours. No commitment required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📢 BOTTOM GLOBAL CTA BANNER */}
      <section className="cta-banner">
        <div className="wrap">
          <div className="label justify-center text-teal mb-4">
            <span className="label-dot" />Embark on your global journey today
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight">
            Ready to Scale Globally?
          </h2>
          <p className="text-slate-400 max-w-[620px] mx-auto mt-4 mb-9 font-medium text-base leading-relaxed">
            Whether you're launching, expanding, optimizing, or transforming your business, we provide the expertise, systems, and execution needed to achieve sustainable growth.
          </p>
          
          <div className="cta-btn-group flex gap-3 justify-center flex-wrap">
            <a href="#contact" className="btn-cta-p">Book Your Consultation Today →</a>
            <a href="https://wa.me/919999981613" className="btn-cta-s" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp us now
            </a>
          </div>
          
          <div className="cta-contacts flex justify-center gap-4 flex-wrap mt-[16px] text-xs font-semibold text-slate-500">
            <span className="cc">📞 <a href="tel:+919999981613" className="hover:text-teal">+91 999 998 1613</a></span>
            <span className="cc">📞 <a href="tel:+13022141717" className="hover:text-teal">+1 302 214 1717</a> (USA)</span>
            <span className="cc">✉ <a href="mailto:partners@theconnectventures.com" className="hover:text-teal">partners@theconnectventures.com</a></span>
          </div>
          <p className="cta-note font-mono text-[11.5px] mt-[14px]">
            // No commitment · Free consultation · Fixed-fee pricing · Same-day response
          </p>
        </div>
      </section>

      {/* 🏢 PHYSICAL OFFICE CONTACT CARDS */}
      <section className="offices-section section">
        <div className="wrap">
          <div className="sh center">
            <div className="label">
              <span className="label-dot" />Our offices
            </div>
            <h2>Present where you need us — <em>offices on 3 continents</em></h2>
          </div>
          
          <div className="offices-grid">
            {/* Office 1 */}
            <address className="office sr" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇺🇸</div>
              <div className="office-country">USA — Headquarters</div>
              <div className="office-badge">Connect Ventures</div>
              <div className="office-addr">
                1501 Decoto Rd, #154, Union City<br />California 94587, USA
              </div>
              <div>
                <a href="tel:+13022141717" className="office-phone text-xs font-bold">+1 302 214 1717</a>
              </div>
            </address>

            {/* Office 2 */}
            <address className="office sr sr-delay-1" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇬🇧</div>
              <div className="office-country">United Kingdom</div>
              <div className="office-badge">UK Operations</div>
              <div className="office-addr">
                Voxman Roberts, Office 5<br />Tondu Business Centre, Aberkenfig<br />Bridgend, CF32 9BS, UK
              </div>
            </address>

            {/* Office 3 */}
            <address className="office sr sr-delay-2" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇨🇦</div>
              <div className="office-country">Canada</div>
              <div className="office-badge">Canadian Operations</div>
              <div className="office-addr">
                381 Front Street West<br />Toronto, Ontario M5V3R8, Canada
              </div>
            </address>

            {/* Office 4 */}
            <address className="office sr sr-delay-3" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇮🇳</div>
              <div className="office-country">India — Delhi NCR</div>
              <div className="office-badge">India Regional Office</div>
              <div className="office-addr">
                A1503, Apex Acacia Valley, Sector 3<br />Vaishali, Ghaziabad, UP 201010
              </div>
              <div>
                <a href="tel:+919999981613" className="office-phone text-xs font-bold">+91 999 998 1613</a>
              </div>
            </address>

            {/* Office 5 */}
            <address className="office sr sr-delay-4" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇮🇳</div>
              <div className="office-country">India — Hyderabad</div>
              <div className="office-badge">South India Office</div>
              <div className="office-addr">
                7-1-621/13, No.102, First Floor<br />SR Nagar, Hyderabad 500038
              </div>
            </address>

            {/* Office 6 */}
            <address className="office sr sr-delay-5" style={{ fontStyle: 'normal' }}>
              <div className="office-flag">🇮🇳</div>
              <div className="office-country">India — Mumbai</div>
              <div className="office-badge">West India Office</div>
              <div className="office-addr">
                Trivedi Niwas, New Nagardas Road<br />Andheri East, Mumbai 400069
              </div>
            </address>
          </div>
        </div>
      </section>

      {/* 👣 COMPREHENSIVE FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand uppercase">CONNECT VENTURES</div>
              <p className="footer-desc">
                India's premier global expansion group. Connect Ventures is the parent company. Comply Globally is a group company. Together we serve 1,000+ businesses across 47+ countries through the proprietary 5C framework. Chairman: Dr. Anil Gupta.
              </p>
              <div className="mt-3.5 text-xs text-teal antialiased font-semibold">
                www.theconnectventures.com · www.complyglobally.com
              </div>
            </div>
            
            <div>
              <div className="footer-col-title">5C Services</div>
              <a href="coaching.html" className="footer-link">C1 — Coaching</a>
              <a href="consulting.html" className="footer-link">C2 — Consulting</a>
              <a href="connecting.html" className="footer-link">C3 — Connecting</a>
              <a href="collaboration.html" className="footer-link">C4 — Collaboration</a>
              <a href="co-creation.html" className="footer-link">C5 — Co-creation</a>
              <a href="services.html" className="footer-link text-teal mt-1 font-semibold">All 21+ services →</a>
            </div>
            
            <div>
              <div className="footer-col-title">Expand to</div>
              <a href="countries.html" className="footer-link">India to USA</a>
              <a href="countries.html" className="footer-link">India to UK</a>
              <a href="countries.html" className="footer-link">India to UAE</a>
              <a href="countries.html" className="footer-link">India to Singapore</a>
              <a href="countries.html" className="footer-link">India to Canada</a>
              <a href="countries.html" className="footer-link text-teal mt-1 font-semibold">All 47+ countries →</a>
            </div>
            
            <div>
              <div className="footer-col-title">Company</div>
              <a href="about.html" className="footer-link">About Dr. Anil Gupta</a>
              <a href="about.html" className="footer-link">Leadership team</a>
              <a
                href="resources.html#tools"
                className="footer-link font-medium"
              >
                Tools &amp; Calculators
              </a>
              <a
                href="resources.html#guides"
                className="footer-link font-medium"
              >
                Trade Guides Library
              </a>
              <a href="faq.html" className="footer-link">Knowledge &amp; FAQ</a>
              <a href="#contact" className="footer-link">Contact us</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 Connect Ventures. All rights reserved. | Chairman: Dr. Anil Gupta
            </div>
            <div className="footer-award">
              🏆 Most Promising 2025 · ⭐ Top 10 — SiliconIndia
            </div>
          </div>
        </div>
      </footer>

      {/* 💬 FLOATING CHAT OVERLAYS (WhatsApp & Scroll to top) */}
      <a 
        href="https://wa.me/919999981613" 
        className="wa" 
        style={{ transition: 'transform 0.2s' }}
        aria-label="Chat on WhatsApp" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`stbtn ${scrollTopVisible ? 'show' : ''}`} 
        id="stbtn"
        aria-label="Scroll back to top of page"
      >
        ↑
      </button>

      {/* C5 Co-creation Premium Deep Dive Modal Layout */}
      <C5CoCreationModal isOpen={c5ModalOpen} onClose={() => setC5ModalOpen(false)} />

      {/* Resources & Compliance Drawer */}
      <ResourcesDrawer isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />

    </div>
  );
}
