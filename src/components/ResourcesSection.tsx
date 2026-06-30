import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Calculator,
  Download,
  Info,
  ArrowRight,
  ShieldAlert,
  Coins,
  X,
  Check,
  TrendingDown,
  TrendingUp,
  Ship,
  Plane,
} from 'lucide-react';

// ==========================================
// API CONFIG
// ==========================================
const API_BASE = "https://connect-ventures-backend.onrender.com";

// ==========================================
// FLAG IMAGES (real images — emoji flags don't render on Windows)
// ==========================================
const FLAG_CODES = {
  Canada: "ca",
  "United Kingdom": "gb",
  "United States": "us",
  Singapore: "sg",
  Indonesia: "id",
  "United Arab Emirates": "ae",
  Thailand: "th",
  Vietnam: "vn",
  Philippines: "ph",
  Italy: "it",
  Estonia: "ee",
  "Hong Kong": "hk",
  Germany: "de",
  Australia: "au",
  Switzerland: "ch",
  Netherlands: "nl",
  India: "in",
  Other: null,
};

const FlagImg = ({ country, className = "w-10 h-auto rounded" }) => {
  const code = FLAG_CODES[country];
  if (!code) return <span className={className}>🌐</span>;
  return (
    <img
      src={`https://flagcdn.com/w160/${code}.png`}
      alt={`${country} flag`}
      className={className}
      loading="lazy"
    />
  );
};

// ==========================================
// LOOKUP TABLES
// ==========================================

const indiaHS = {
  "30049099": { description: "Medicaments, other (formulations)",       rodtep: 0.007,  drawback: 0.015,  rosclt: 0.000 },
  "29419090": { description: "Antibiotics/APIs, other",                 rodtep: 0.010,  drawback: 0.017,  rosclt: 0.000 },
  "85171290": { description: "Telephones/smartphones, other",           rodtep: 0.014,  drawback: 0.020,  rosclt: 0.000 },
  "85423900": { description: "Electronic integrated circuits, other",   rodtep: 0.008,  drawback: 0.015,  rosclt: 0.000 },
  "71131910": { description: "Gold jewellery, studded",                 rodtep: 0.005,  drawback: 0.010,  rosclt: 0.000 },
  "71023910": { description: "Cut & polished diamonds",                 rodtep: 0.003,  drawback: 0.005,  rosclt: 0.000 },
  "84799090": { description: "Machinery parts, other",                  rodtep: 0.016,  drawback: 0.020,  rosclt: 0.000 },
  "84833000": { description: "Bearings/housings",                       rodtep: 0.017,  drawback: 0.022,  rosclt: 0.000 },
  "29051100": { description: "Methanol/alcohols",                       rodtep: 0.014,  drawback: 0.018,  rosclt: 0.000 },
  "29153990": { description: "Esters, other",                           rodtep: 0.016,  drawback: 0.020,  rosclt: 0.000 },
  "62034200": { description: "Men's cotton trousers",                   rodtep: 0.026,  drawback: 0.028,  rosclt: 0.043 },
  "61102000": { description: "Cotton sweaters/pullovers",               rodtep: 0.026,  drawback: 0.029,  rosclt: 0.046 },
  "09042110": { description: "Chilli, dried",                           rodtep: 0.014,  drawback: 0.016,  rosclt: 0.000 },
  "21039040": { description: "Mixed condiments/sauces",                 rodtep: 0.017,  drawback: 0.019,  rosclt: 0.000 },
  "03061700": { description: "Frozen shrimp/prawns",                    rodtep: 0.025,  drawback: 0.027,  rosclt: 0.000 },
  "16052900": { description: "Prepared shrimp",                         rodtep: 0.024,  drawback: 0.026,  rosclt: 0.000 },
  "72142090": { description: "Bars/rods of iron/steel",                 rodtep: 0.016,  drawback: 0.018,  rosclt: 0.000 },
  "73269099": { description: "Articles of iron/steel, other",           rodtep: 0.017,  drawback: 0.019,  rosclt: 0.000 },
  "87089900": { description: "Motor vehicle parts, other",              rodtep: 0.018,  drawback: 0.021,  rosclt: 0.000 },
  "87082900": { description: "Body parts/accessories",                  rodtep: 0.017,  drawback: 0.020,  rosclt: 0.000 },
  "64039990": { description: "Leather footwear, other",                 rodtep: 0.022,  drawback: 0.025,  rosclt: 0.000 },
  "42022210": { description: "Handbags w/ outer leather",               rodtep: 0.020,  drawback: 0.023,  rosclt: 0.000 },
  "39269099": { description: "Articles of plastics, other",             rodtep: 0.015,  drawback: 0.017,  rosclt: 0.000 },
  "39202020": { description: "Plates/sheets of polymers",               rodtep: 0.014,  drawback: 0.016,  rosclt: 0.000 },
};

const usHTS = {
  "3004909200": { description: "Medicaments, other, dosage form",         mfn: 0.000 },
  "2941909000": { description: "Antibiotics, other",                      mfn: 0.000 },
  "8517130000": { description: "Smartphones",                             mfn: 0.000 },
  "8542390001": { description: "Integrated circuits, processors",         mfn: 0.000 },
  "7113191000": { description: "Gold jewellery articles",                 mfn: 0.055 },
  "7102391000": { description: "Diamonds, worked, not mounted",           mfn: 0.000 },
  "8479909500": { description: "Machine parts, other",                    mfn: 0.000 },
  "8483300000": { description: "Bearing housings, plain shaft",           mfn: 0.045 },
  "2905110000": { description: "Methanol",                                mfn: 0.055 },
  "2915399000": { description: "Esters of acetic acid, other",            mfn: 0.037 },
  "6203424011": { description: "Men's cotton trousers",                   mfn: 0.166 },
  "6110201000": { description: "Cotton pullovers/sweaters",               mfn: 0.165 },
  "0904211000": { description: "Paprika/chilli, dried",                   mfn: 0.030 },
  "2103904000": { description: "Sauces/condiments, other",                mfn: 0.064 },
  "0306170040": { description: "Frozen shrimp",                           mfn: 0.000 },
  "1605290510": { description: "Shrimp, prepared",                        mfn: 0.050 },
  "7214209000": { description: "Iron/steel bars",                         mfn: 0.000 },
  "7326909860": { description: "Articles of iron/steel, other",           mfn: 0.029 },
  "8708992300": { description: "Motor vehicle parts, other",              mfn: 0.025 },
  "8708291500": { description: "Body stampings",                          mfn: 0.025 },
  "6403990000": { description: "Leather footwear, other",                 mfn: 0.100 },
  "4202221500": { description: "Handbags, outer leather",                 mfn: 0.080 },
  "3926909989": { description: "Articles of plastic, other",              mfn: 0.053 },
  "3920202000": { description: "Polymer plates/sheets",                   mfn: 0.042 },
};

const seaRoutes = {
  "Nhava Sheva (Mumbai) → Los Angeles":   { transit: 28, fcl40: 3850, lcl: 104 },
  "Nhava Sheva (Mumbai) → New York":      { transit: 33, fcl40: 4350, lcl: 115 },
  "Mundra → Los Angeles":                 { transit: 30, fcl40: 3950, lcl: 106 },
  "Mundra → New York/Savannah":           { transit: 34, fcl40: 4450, lcl: 117 },
  "Chennai → New York":                   { transit: 35, fcl40: 4550, lcl: 119 },
  "Nhava Sheva → Houston":                { transit: 36, fcl40: 4650, lcl: 121 },
};

const airRates = {
  "Air-Standard":    { transit: 6, ratePerKg: 3.50, minKg: 150 },
  "Air-Express":     { transit: 4, ratePerKg: 8.50, minKg: 1   },
  "Air-Pharma":      { transit: 5, ratePerKg: 6.50, minKg: 100 },
  "Air-Perishable":  { transit: 5, ratePerKg: 5.00, minKg: 100 },
};

const categoryRates = {
  "Pharmaceuticals":           { insurance: 0.0050, spoilage: 0.015, packaging: 0.012, docs: 0.008 },
  "Electronics":               { insurance: 0.0055, spoilage: 0.003, packaging: 0.015, docs: 0.006 },
  "Gems & Jewellery":          { insurance: 0.0105, spoilage: 0.000, packaging: 0.008, docs: 0.010 },
  "Machinery & Parts":         { insurance: 0.0030, spoilage: 0.002, packaging: 0.018, docs: 0.005 },
  "Organic Chemicals":         { insurance: 0.0060, spoilage: 0.004, packaging: 0.020, docs: 0.009 },
  "Apparel & Textiles":        { insurance: 0.0032, spoilage: 0.002, packaging: 0.010, docs: 0.005 },
  "Food & Spices":             { insurance: 0.0055, spoilage: 0.025, packaging: 0.015, docs: 0.010 },
  "Marine Products (Seafood)": { insurance: 0.0073, spoilage: 0.040, packaging: 0.020, docs: 0.010 },
  "Iron & Steel Articles":     { insurance: 0.0027, spoilage: 0.001, packaging: 0.012, docs: 0.004 },
  "Auto Components":           { insurance: 0.0034, spoilage: 0.002, packaging: 0.015, docs: 0.006 },
  "Leather & Footwear":        { insurance: 0.0037, spoilage: 0.003, packaging: 0.012, docs: 0.006 },
  "Plastics & Articles":       { insurance: 0.0030, spoilage: 0.002, packaging: 0.012, docs: 0.005 },
};

// India removed from this list — no india.docx file is served by the backend.
// This list must match the COUNTRY_FILE_MAP keys in your backend routes/guides.js exactly.
const downloadableGuides = [
  { country: "Canada", size: "4.1 MB" },
  { country: "United Kingdom", size: "3.9 MB" },
  { country: "United States", size: "4.5 MB" },
  { country: "Singapore", size: "3.8 MB" },
  { country: "Indonesia", size: "4.0 MB" },
  { country: "United Arab Emirates", size: "3.7 MB" },
  { country: "Thailand", size: "3.9 MB" },
  { country: "Vietnam", size: "4.2 MB" },
  { country: "Philippines",  size: "3.6 MB" },
  { country: "Italy", size: "4.3 MB" },
  { country: "Estonia",  size: "3.2 MB" },
  { country: "Hong Kong", size: "4.1 MB" },
  { country: "Germany", size: "4.5 MB" },
  { country: "Australia", size: "3.9 MB" },
  { country: "Switzerland",  size: "3.8 MB" },
  { country: "Netherlands", size: "4.2 MB" },
];

// Used to populate the gate-form country dropdown (the visitor's own country —
// India is kept here since visitors from India can still submit the form).
const gateFormCountries = [
  "India", "United States", "United Kingdom", "Canada", "Singapore",
  "United Arab Emirates", "Germany", "Australia", "Netherlands", "Switzerland",
  "Hong Kong", "Indonesia", "Vietnam", "Thailand", "Philippines", "Italy",
  "Estonia", "Other",
];

// ==========================================
// DESIGN TOKENS — consistent, spacious
// ==========================================

const inputCls =
  "w-full bg-white border border-[#d1d9e0] rounded-xl px-4 py-3 text-[14px] text-slate-800 " +
  "focus:outline-none focus:ring-2 focus:ring-[#00c9a7]/30 focus:border-[#00c9a7] font-mono " +
  "transition-all placeholder:text-slate-300 h-[46px]";

const selectCls =
  "w-full bg-white border border-[#d1d9e0] rounded-xl px-4 py-3 text-[14px] text-slate-800 " +
  "focus:outline-none focus:ring-2 focus:ring-[#00c9a7]/30 focus:border-[#00c9a7] transition-all " +
  "appearance-none cursor-pointer h-[46px]";

const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-2";

// ── Shared card wrapper
const Card = ({ children, className = "", ...props }: { children: any; className?: string; [key: string]: any }) => (
  <div className={`bg-white border border-[#e2e8ef] rounded-2xl shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

// ── Card body with consistent padding — generous left gutter
const CardBody = ({ children, className = "" }) => (
  <div className={`px-8 py-8 sm:px-10 sm:py-10 ${className}`}>{children}</div>
);

const SectionHeading = ({ step, title, helper, tone = "teal" }) => (
  <div className="mb-8">
    {step && (
      <div className="flex items-center gap-3 mb-4">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-extrabold flex-shrink-0 ${
          tone === "teal" ? "bg-[#009e86] text-white" : "bg-[#0057c2] text-white"
        }`}>{step}</span>
        <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${
          tone === "teal" ? "text-[#009e86]" : "text-[#0057c2]"
        }`}>
          {tone === "teal" ? "India Configuration" : "US Configuration"}
        </span>
      </div>
    )}
    <h3 className="text-[20px] font-bold text-slate-900 leading-snug mb-2">{title}</h3>
    {helper && <p className="text-[13px] text-slate-500 leading-relaxed">{helper}</p>}
  </div>
);

const Divider = ({ className = "" }) => (
  <div className={`border-t border-slate-100 my-8 ${className}`} />
);

// ── Toggle — OFF=slate-400 (clearly visible), ON=teal
const ToggleRow = ({ checked, onChange, label, sub, disabled = false }) => (
  <div className={`flex items-start gap-4 py-5 border-b border-slate-50 last:border-0 ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{ minWidth: '2.75rem', minHeight: '1.5rem' }}
      className={`relative mt-0.5 w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#00c9a7] ${
        checked ? "bg-[#00c9a7]" : "bg-slate-400"
      }`}
    >
      <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
    <span>
      <span className="text-[14px] font-semibold text-slate-800 block">{label}</span>
      <span className="text-[12px] text-slate-500 mt-0.5 block">{sub}</span>
    </span>
  </div>
);

const TableRow = ({ label, val, sub = "", kind = "neutral" }) => (
  <tr className={kind === "offset" ? "bg-emerald-50/70" : ""}>
    <td className="py-4 px-8 sm:px-10 align-top">
      <div className="flex items-start gap-2.5">
        {kind === "offset" && <TrendingDown className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />}
        {kind === "cost"   && <TrendingUp   className="w-4 h-4 text-slate-300  mt-0.5 flex-shrink-0" />}
        <div>
          <span className="text-[14px] text-slate-700 font-medium">{label}</span>
          {sub && <span className="block text-[12px] text-slate-400 mt-0.5">{sub}</span>}
        </div>
      </div>
    </td>
    <td className={`py-4 px-8 sm:px-10 text-[14px] font-mono font-bold text-right whitespace-nowrap tabular-nums ${
      kind === "offset" ? "text-emerald-600" : "text-slate-800"
    }`}>
      {val}
    </td>
  </tr>
);

const RailStat = ({ label, val, tone = "slate" }) => (
  <div className="flex items-baseline justify-between gap-3 py-3.5 border-b border-slate-100 last:border-0">
    <span className="text-[13px] text-slate-600 font-medium">{label}</span>
    <span className={`text-[14px] font-mono font-bold tabular-nums whitespace-nowrap ${
      tone === "teal" ? "text-emerald-500" : tone === "blue" ? "text-blue-500" : "text-slate-800"
    }`}>{val}</span>
  </div>
);

// ==========================================
// RESOURCES DRAWER
// ==========================================

export function ResourcesDrawer({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <div onClick={onClose} aria-hidden="true"
        className={`fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div role="dialog" aria-modal="true" aria-label="Resources panel"
        className={`fixed top-0 right-0 bottom-0 z-[9999] w-full sm:w-[94vw] lg:max-w-[1320px] bg-[#f4f6f8] shadow-2xl
          flex flex-col transition-transform duration-300 ease-in-out overflow-hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-[#030e1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(0,201,167,0.08),transparent)] pointer-events-none" />
          <div className="relative flex items-center justify-between gap-6 px-8 sm:px-12 py-8">
            <div className="flex items-center gap-6 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#00c9a7]/15 border border-[#00c9a7]/25 flex items-center justify-center flex-shrink-0">
                <Coins className="w-6 h-6 text-[#00c9a7]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#00c9a7] uppercase tracking-[0.22em] mb-1">Knowledge & Intelligence Suite</p>
                <h2 className="text-[26px] sm:text-[30px] font-extrabold text-white leading-tight">
                  Compliance & Fiscal <em className="not-italic text-[#00c9a7]">Resources</em>
                </h2>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <ResourcesSection />
        </div>
      </div>
    </>,
    document.body
  );
}

// ==========================================
// MAIN RESOURCES SECTION
// ==========================================

export default function ResourcesSection() {
  const [activeTab, setActiveTab]   = useState("tools");
  const [activeTool, setActiveTool] = useState("fiscal");
  const [showGateDialog, setShowGateDialog] = useState(false);
  const [selectedGuide, setSelectedGuide]   = useState(null);
  const [gateForm, setGateForm] = useState({ fullName: "", email: "", company: "", country: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState("");
  const [modalMounted, setModalMounted] = useState(false);
  useEffect(() => setModalMounted(true), []);

  const handleOpenGate = (guide) => {
    setSelectedGuide(guide);
    setSubmitError("");
    setShowGateDialog(true);
  };

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGuide || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(`${API_BASE}/api/guides/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: gateForm.fullName,
          email: gateForm.email,
          company: gateForm.company,
          country: gateForm.country,
          phone: gateForm.phone,
          guideCountry: selectedGuide.country,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something went wrong. Please try again.");
      }

      const { downloadUrl } = await res.json();

      const a = document.createElement("a");
      a.href = `${API_BASE}${downloadUrl}`;
      a.setAttribute("download", `${selectedGuide.country.replace(/\s+/g, "_")}_Trade_Guide_2026.docx`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setShowGateDialog(false);
      setGateForm({ fullName: "", email: "", company: "", country: "", phone: "" });
    } catch (err) {
      console.error("Guide download error:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Tool 1 state
  const [selectedIndCode,   setSelectedIndCode]   = useState("30049099");
  const [customIndCode,     setCustomIndCode]     = useState("");
  const [isCustomIndMode,   setIsCustomIndMode]   = useState(false);
  const [selectedUsCode,    setSelectedUsCode]    = useState("3004909200");
  const [customUsCode,      setCustomUsCode]      = useState("");
  const [isCustomUsMode,    setIsCustomUsMode]    = useState(false);
  const [shippingModeT1,    setShippingModeT1]    = useState("Sea");
  const [fobValue,          setFobValue]          = useState(50000);
  const [cifValue,          setCifValue]          = useState(55000);
  const [importedInputVal,  setImportedInputVal]  = useState(10000);
  const [inputGstPaid,      setInputGstPaid]      = useState(1800);
  const [exportCredit,      setExportCredit]      = useState(15000);
  const [reExported,        setReExported]        = useState("No");
  const [applyS122,               setApplyS122]               = useState(true);
  const [applyProposedForcedLabor,setApplyProposedForcedLabor]= useState(false);
  const [claimRoDTEP,        setClaimRoDTEP]        = useState(true);
  const [claimDutyDrawbackInd,setClaimDutyDrawbackInd]= useState(true);
  const [claimGstRefund,     setClaimGstRefund]     = useState(true);
  const [claimIntEqualisation,setClaimIntEqualisation]= useState(false);
  const [useUsDrawback,      setUseUsDrawback]      = useState(false);

  const finalIndCode     = isCustomIndMode ? customIndCode.trim() : selectedIndCode;
  const finalUsCode      = isCustomUsMode  ? customUsCode.trim()  : selectedUsCode;
  const resolvedIndData  = indiaHS[finalIndCode];
  const resolvedUsData   = usHTS[finalUsCode];

  const bcdOnImportedInputs = importedInputVal * 0.075;
  const swsAmt              = bcdOnImportedInputs * 0.10;
  const rodtepAmt           = claimRoDTEP          ? fobValue * (resolvedIndData?.rodtep ?? 0) : 0;
  const roscltAmt           = claimRoDTEP          ? fobValue * (resolvedIndData?.rosclt ?? 0) : 0;
  const indDrawbackAmt      = claimDutyDrawbackInd ? fobValue * (resolvedIndData?.drawback ?? 0) : 0;
  const gstRefundAmt        = claimGstRefund        ? inputGstPaid : 0;
  const intEqualisationAmt  = claimIntEqualisation  ? exportCredit * 0.03 : 0;
  const totalIndiaIncentives= rodtepAmt + roscltAmt + indDrawbackAmt + gstRefundAmt + intEqualisationAmt;
  const subtotalIndiaNet    = inputGstPaid + bcdOnImportedInputs + swsAmt - totalIndiaIncentives;
  const usMfnRate           = resolvedUsData?.mfn ?? 0;
  const usImportDuty        = cifValue * usMfnRate;
  const customS122Amt       = applyS122               ? cifValue * 0.10  : 0;
  const forcedLaborAmt      = applyProposedForcedLabor? cifValue * 0.125 : 0;
  const mpfAmt              = cifValue * 0.003464;
  const hmfAmt              = shippingModeT1 === "Sea" ? cifValue * 0.00125 : 0;
  const usDutyDrawback      = useUsDrawback && reExported === "Yes" ? usImportDuty * 0.99 : 0;
  const subtotalUsaNet      = usImportDuty + customS122Amt + forcedLaborAmt + mpfAmt + hmfAmt - usDutyDrawback;
  const netGovernmentCost   = subtotalIndiaNet + subtotalUsaNet;
  const netAsPctOfFob       = fobValue > 0 ? (netGovernmentCost / fobValue) * 100 : 0;

  // ── Tool 2 state
  const [selectedCategory,      setSelectedCategory]      = useState("Pharmaceuticals");
  const [shippingModeT2,        setShippingModeT2]        = useState("Sea-FCL-40ft");
  const [selectedRoute,         setSelectedRoute]         = useState("Nhava Sheva (Mumbai) → Los Angeles");
  const [shipmentWeight,        setShipmentWeight]        = useState(3500);
  const [shipmentVolume,        setShipmentVolume]        = useState(14);
  const [cargoValue,            setCargoValue]            = useState(120000);
  const [numContainers,         setNumContainers]         = useState(1);
  const [importDutyRatePercent, setImportDutyRatePercent] = useState(10);
  const [inlandFreightIndia,    setInlandFreightIndia]    = useState(450);
  const [inlandFreightUsa,      setInlandFreightUsa]      = useState(900);
  const [customsPortHandling,   setCustomsPortHandling]   = useState(550);
  const [delayBuffer,           setDelayBuffer]           = useState(5);

  const isAirMode        = shippingModeT2.startsWith("Air");
  const isSeaFcl         = shippingModeT2 === "Sea-FCL-40ft";
  const volumetricWeight = shipmentVolume * 167;
  const chargeableWeight = isAirMode ? Math.max(shipmentWeight, volumetricWeight) : 0;

  let t2FreightCost = 0, t2TransitDays = 0;
  if (isAirMode) {
    const r = airRates[shippingModeT2];
    if (r) { t2FreightCost = r.ratePerKg * Math.max(chargeableWeight, r.minKg); t2TransitDays = r.transit; }
  } else {
    const r = seaRoutes[selectedRoute];
    if (r) { t2FreightCost = isSeaFcl ? r.fcl40 * numContainers : r.lcl * shipmentVolume; t2TransitDays = r.transit; }
  }

  const finalTransitTime  = t2TransitDays + delayBuffer;
  const catData           = categoryRates[selectedCategory];
  const insurancePremiumAmt = cargoValue * 1.10 * (catData?.insurance ?? 0.005);
  const t2UsDuty          = cargoValue * (importDutyRatePercent / 100);
  const spoilageCost      = cargoValue * (catData?.spoilage ?? 0) * (finalTransitTime / 30);
  const packagingCost     = cargoValue * (catData?.packaging ?? 0);
  const docsCost          = cargoValue * (catData?.docs ?? 0);
  const t2OtherCostsTotal = spoilageCost + packagingCost + docsCost;
  const totalLandedCost   = t2FreightCost + insurancePremiumAmt + t2UsDuty + inlandFreightIndia + inlandFreightUsa + customsPortHandling + t2OtherCostsTotal;
  const landedPctOfCargo  = cargoValue > 0 ? (totalLandedCost / cargoValue) * 100 : 0;
  const effectiveCostPerKg= shipmentWeight > 0 ? totalLandedCost / shipmentWeight : 0;

  const usd  = (v) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits: 0 }).format(v);
  const usd2 = (v) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

  return (
    <div className="min-h-full bg-[#f4f6f8]">

      {/* ── TAB BAR — white bg, clear active/inactive states */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#e2e8ef] shadow-sm">
        {/* Extra left padding so tabs never touch the edge */}
        <div className="pl-8 pr-6 sm:pl-12 sm:pr-10 flex gap-0 overflow-x-auto">
          {["tools","downloads"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 px-2 mr-10 py-5 text-[15px] font-bold border-b-[3px] transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#00c9a7] text-[#009e86]"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200"
              }`}
            >
              {tab === "tools" ? <Calculator className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              {tab === "tools" ? "Interactive Calculators" : "Country Trade Guides"}
            </button>
          ))}
        </div>
      </div>

      {/* ── PAGE CONTENT — generous left padding, max-width container */}
      <div className="pl-8 pr-6 sm:pl-12 sm:pr-10 py-10 max-w-[1380px] mx-auto">

        {/* ═══ DOWNLOADS TAB ═══ */}
        {activeTab === "downloads" && (
          <div>
            <div className="mb-12">
              <p className="text-[11px] font-bold text-[#009e86] uppercase tracking-[0.2em] mb-3">📚 Free resource library</p>
              <h3 className="text-[28px] font-bold text-slate-900 mb-3">Global Trade Guides</h3>
              <p className="text-[14px] text-slate-600 max-w-xl leading-relaxed">
                Comprehensive country-specific compliance guides. Fill in your details for instant access — no account needed. Updated for 2026.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {downloadableGuides.map((guide, idx) => (
                <Card key={idx} className="flex flex-col">
                  <CardBody className="flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-6 gap-2">
                        <FlagImg country={guide.country} className="w-16 h-auto rounded-md shadow-sm border border-slate-100" />
                        <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full whitespace-nowrap">
                          {guide.size}
                        </span>
                      </div>
                      <h4 className="text-[16px] font-bold text-slate-900 mb-1">{guide.country}</h4>
                      <p className="text-[13px] text-slate-500 leading-relaxed mt-3">
                        Tariff structures, compliance frameworks and strategic market entry for {guide.country}.
                      </p>
                    </div>
                    <button onClick={() => handleOpenGate(guide)}
                      className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13px] border transition-all duration-200"
                      style={{ backgroundColor: "#e6f9f6", borderColor: "#00c9a7", color: "#007a66" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00c9a7"; e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#e6f9f6"; e.currentTarget.style.color = "#007a66"; }}
                    >
                      <Download className="w-4 h-4" /> Download Manual
                    </button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TOOLS TAB ═══ */}
        {activeTab === "tools" && (
          <div>
            {/*
              TOOL PILL FIX:
              - Inactive pill: dark text (slate-800) on a visible grey (slate-200) — never invisible
              - Active pill:   white text on slate-900 — high contrast
              - The pill container itself is slate-200 with a border so it's clearly a switcher
            */}
            <div className="mb-10 inline-flex gap-1.5 p-1.5 bg-slate-200 border border-slate-300 rounded-xl overflow-x-auto">
              {["fiscal","landed"].map((tool) => (
                <button key={tool} onClick={() => setActiveTool(tool)}
                  className={`px-5 py-2.5 rounded-lg text-[14px] font-bold transition-all whitespace-nowrap ${
                    activeTool === tool
                      ? "shadow"
                      : "hover:bg-slate-300"
                  }`}
                  style={{
                    backgroundColor: activeTool === tool ? "#0b2545" : "transparent",
                    color: activeTool === tool ? "#ffffff" : "#000000"
                  }}
                >
                  {tool === "fiscal" ? "🇮🇳 ⇄ 🇺🇸  India ⇄ USA Fiscal" : "📦  Export Landed Cost"}
                </button>
              ))}
            </div>

            {/* Two-col layout: cards left, sticky rail right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

              {/* ══ LEFT ══ */}
              <div className="space-y-6 min-w-0">

                {/* ─── TOOL 1: FISCAL ─── */}
                {activeTool === "fiscal" && (
                  <>
                    {/* Card 1 */}
                    <Card>
                      <CardBody>
                        <SectionHeading step="1" title="Cargo & Classification Codes"
                          helper="Select your Indian ITC-HS code and matching US HTS code. Incentive rates auto-populate."
                          tone="teal"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                          {/* India HS */}
                          <div>
                            <div className="flex items-center justify-between mb-2 gap-2">
                              <label className={labelCls} style={{marginBottom:0}}>🇮🇳 ITC-HS Code (India)</label>
                              <button onClick={() => setIsCustomIndMode(!isCustomIndMode)}
                                className="text-[11px] text-[#0057c2] font-bold hover:underline whitespace-nowrap">
                                {isCustomIndMode ? "← Use list" : "Enter custom"}
                              </button>
                            </div>
                            <div className="mt-2">
                              {isCustomIndMode
                                ? <input type="text" value={customIndCode} onChange={(e)=>setCustomIndCode(e.target.value)} placeholder="e.g. 62034200" className={inputCls} />
                                : <select value={selectedIndCode} onChange={(e)=>setSelectedIndCode(e.target.value)} className={selectCls}>
                                    {Object.keys(indiaHS).map(c=>(
                                      <option key={c} value={c}>{c} — {indiaHS[c].description.slice(0,26)}…</option>
                                    ))}
                                  </select>
                              }
                            </div>
                            <div className="mt-2 text-[12px] flex items-start gap-1.5">
                              {resolvedIndData
                                ? <span className="text-emerald-700 flex gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>{resolvedIndData.description}</span>
                                : <span className="text-rose-600 flex gap-1.5"><ShieldAlert className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>Code not found</span>
                              }
                            </div>
                          </div>
                          {/* US HTS */}
                          <div>
                            <div className="flex items-center justify-between mb-2 gap-2">
                              <label className={labelCls} style={{marginBottom:0}}>🇺🇸 US HTS Code</label>
                              <button onClick={() => setIsCustomUsMode(!isCustomUsMode)}
                                className="text-[11px] text-[#0057c2] font-bold hover:underline whitespace-nowrap">
                                {isCustomUsMode ? "← Use list" : "Enter custom"}
                              </button>
                            </div>
                            <div className="mt-2">
                              {isCustomUsMode
                                ? <input type="text" value={customUsCode} onChange={(e)=>setCustomUsCode(e.target.value)} placeholder="e.g. 6203424011" className={inputCls} />
                                : <select value={selectedUsCode} onChange={(e)=>setSelectedUsCode(e.target.value)} className={selectCls}>
                                    {Object.keys(usHTS).map(c=>(
                                      <option key={c} value={c}>{c} — {usHTS[c].description.slice(0,26)}…</option>
                                    ))}
                                  </select>
                              }
                            </div>
                            <div className="mt-2 text-[12px] flex items-start gap-1.5">
                              {resolvedUsData
                                ? <span className="text-emerald-700 flex gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>{resolvedUsData.description}</span>
                                : <span className="text-rose-600 flex gap-1.5"><ShieldAlert className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>Code not found</span>
                              }
                            </div>
                          </div>
                        </div>

                        <Divider />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                          <div>
                            <label className={labelCls}>Shipping Mode</label>
                            <select value={shippingModeT1} onChange={e=>setShippingModeT1(e.target.value)} className={selectCls}>
                              <option value="Sea">Sea</option>
                              <option value="Air">Air</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelCls}>FOB Value (USD)</label>
                            <input type="number" value={fobValue} onChange={e=>setFobValue(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>CIF / Customs Value (USD)</label>
                            <input type="number" value={cifValue} onChange={e=>setCifValue(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div>
                            <label className={labelCls}>Imported Inputs (USD)</label>
                            <input type="number" value={importedInputVal} onChange={e=>setImportedInputVal(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>Input GST Paid (USD)</label>
                            <input type="number" value={inputGstPaid} onChange={e=>setInputGstPaid(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>Export Credit (USD)</label>
                            <input type="number" value={exportCredit} onChange={e=>setExportCredit(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>Re-exported from US?</label>
                            <select value={reExported} onChange={e=>setReExported(e.target.value)} className={selectCls}>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Card 2: Toggles */}
                    <Card>
                      <CardBody>
                        <SectionHeading step="2" title="Compliance & Cost Offsets"
                          helper="Toggle US surcharges and select Indian incentives you intend to claim."
                          tone="blue"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                          <div className="sm:pr-10">
                            <p className="text-[10px] font-extrabold text-slate-700 uppercase tracking-[0.18em] mb-2">
                              🇺🇸 Applies on entry to the US
                            </p>
                            <ToggleRow checked={applyS122} onChange={setApplyS122}
                              label="Section 122 Surcharge (10%)" sub="US interim regulatory surcharge on CIF value"/>
                            <ToggleRow checked={applyProposedForcedLabor} onChange={setApplyProposedForcedLabor}
                              label="Forced-Labour Duty (12.5%)" sub="Proposed compliance duty — not yet enacted"/>
                            <ToggleRow checked={useUsDrawback} onChange={setUseUsDrawback}
                              label="US Duty Drawback (99%)" sub="Recovery available only when goods are re-exported"
                              disabled={reExported==="No"}/>
                          </div>
                          <div className="sm:border-l sm:border-slate-100 sm:pl-10 mt-8 sm:mt-0 pt-8 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <p className="text-[10px] font-extrabold text-slate-700 uppercase tracking-[0.18em] mb-2">
                              🇮🇳 Claimed on the India side
                            </p>
                            <ToggleRow checked={claimRoDTEP} onChange={setClaimRoDTEP}
                              label="RoDTEP & RoSCTL" sub="Rates auto-populated from your HS code"/>
                            <ToggleRow checked={claimDutyDrawbackInd} onChange={setClaimDutyDrawbackInd}
                              label="Duty Drawback (India)" sub="Applied on FOB value"/>
                            <ToggleRow checked={claimGstRefund} onChange={setClaimGstRefund}
                              label="GST / IGST Refund" sub="Full refund of input GST paid"/>
                            <ToggleRow checked={claimIntEqualisation} onChange={setClaimIntEqualisation}
                              label="Interest Equalisation (3%)" sub="Applied to export credit facility"/>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Card 3: India Flow */}
                    <Card>
                      <div className="flex items-center justify-between gap-4 px-8 sm:px-10 py-6 border-b border-slate-100">
                        <div>
                          <p className="text-[10px] font-extrabold text-[#009e86] uppercase tracking-[0.2em] mb-1">Step 3 — Side A</p>
                          <h3 className="text-[16px] font-bold text-slate-900">🇮🇳 India Sovereign Flow</h3>
                        </div>
                        <span className={`text-[15px] font-extrabold font-mono px-4 py-2 rounded-full whitespace-nowrap ${
                          subtotalIndiaNet <= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}>{usd(subtotalIndiaNet)}</span>
                      </div>
                      <table className="w-full border-collapse">
                        <tbody className="divide-y divide-[#f8f9fb]">
                          <TableRow label="Input GST paid"           val={usd(inputGstPaid)}          kind="cost"/>
                          <TableRow label="BCD on imported inputs"   sub="7.5% rate" val={usd(bcdOnImportedInputs)} kind="cost"/>
                          <TableRow label="SWS on BCD"               sub="10% rate"  val={usd(swsAmt)}           kind="cost"/>
                          <TableRow label="RoDTEP & RoSCTL"          val={`−${usd(rodtepAmt+roscltAmt)}`}        kind="offset"/>
                          <TableRow label="India Duty Drawback"      val={`−${usd(indDrawbackAmt)}`}             kind="offset"/>
                          <TableRow label="GST / IGST Refund"        val={`−${usd(gstRefundAmt)}`}               kind="offset"/>
                          <TableRow label="Interest Equalisation"    sub="3% on export credit" val={`−${usd(intEqualisationAmt)}`} kind="offset"/>
                        </tbody>
                      </table>
                    </Card>

                    {/* Card 4: US Flow */}
                    <Card>
                      <div className="flex items-center justify-between gap-4 px-8 sm:px-10 py-6 border-b border-slate-100">
                        <div>
                          <p className="text-[10px] font-extrabold text-[#0057c2] uppercase tracking-[0.2em] mb-1">Step 3 — Side B</p>
                          <h3 className="text-[16px] font-bold text-slate-900">🇺🇸 United States Customs Flow</h3>
                        </div>
                        <span className={`text-[15px] font-extrabold font-mono px-4 py-2 rounded-full whitespace-nowrap ${
                          subtotalUsaNet <= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}>{usd(subtotalUsaNet)}</span>
                      </div>
                      <table className="w-full border-collapse">
                        <tbody className="divide-y divide-[#f8f9fb]">
                          <TableRow label="US MFN Import Duty"       sub={`${(usMfnRate*100).toFixed(1)}% on CIF`} val={usd(usImportDuty)} kind="cost"/>
                          <TableRow label="Section 122 Surcharge"    val={usd(customS122Amt)}    kind="cost"/>
                          <TableRow label="Forced-Labour Duty"       val={usd(forcedLaborAmt)}   kind="cost"/>
                          <TableRow label="Merchandise Processing"   sub="0.3464% of CIF" val={usd(mpfAmt)} kind="cost"/>
                          {shippingModeT1 === "Sea" && (
                            <TableRow label="Harbor Maintenance Fee" sub="Sea shipments only" val={usd(hmfAmt)} kind="cost"/>
                          )}
                          <TableRow label="US Duty Drawback Refund" sub="99% recovery on re-export" val={`−${usd(usDutyDrawback)}`} kind="offset"/>
                        </tbody>
                      </table>
                    </Card>
                  </>
                )}

                {/* ─── TOOL 2: LANDED COST ─── */}
                {activeTool === "landed" && (
                  <>
                    <Card>
                      <CardBody>
                        <SectionHeading step="1" title="Shipment Dimensions & Corridor"
                          helper="Configure product category, shipping mode, weight, volume and cargo value." tone="teal"/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <div>
                            <label className={labelCls}>Product Category</label>
                            <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} className={selectCls}>
                              {Object.keys(categoryRates).map(c=><option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelCls}>Shipping Mode</label>
                            <select value={shippingModeT2} onChange={e=>setShippingModeT2(e.target.value)} className={selectCls}>
                              <option value="Sea-FCL-40ft">Sea — Full Container (FCL 40ft)</option>
                              <option value="Sea-LCL">Sea — Less than Container (LCL)</option>
                              <option value="Air-Standard">Air — Standard Cargo</option>
                              <option value="Air-Express">Air — Express Delivery</option>
                              <option value="Air-Pharma">Air — Cold-Chain Pharmaceutical</option>
                              <option value="Air-Perishable">Air — Perishable Cargo</option>
                            </select>
                          </div>
                        </div>
                        {!isAirMode && (
                          <div className="mb-8">
                            <label className={labelCls}>Trade Route Corridor</label>
                            <select value={selectedRoute} onChange={e=>setSelectedRoute(e.target.value)} className={selectCls}>
                              {Object.keys(seaRoutes).map(r=><option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>
                        )}
                        <Divider />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div>
                            <label className={labelCls}>Weight (kg)</label>
                            <input type="number" value={shipmentWeight} onChange={e=>setShipmentWeight(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>Volume (CBM)</label>
                            <input type="number" value={shipmentVolume} onChange={e=>setShipmentVolume(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div>
                            <label className={labelCls}>Cargo Value (USD)</label>
                            <input type="number" value={cargoValue} onChange={e=>setCargoValue(Math.max(0,+e.target.value||0))} className={inputCls}/>
                          </div>
                          <div className={!isSeaFcl?"opacity-40 pointer-events-none":""}>
                            <label className={labelCls}>Containers</label>
                            <input type="number" value={numContainers} disabled={!isSeaFcl} onChange={e=>setNumContainers(Math.max(1,+e.target.value||1))} className={inputCls}/>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <SectionHeading step="2" title="Financial & Inland Assumptions"
                          helper="Adjust duty rate, inland costs, broker fees and transit buffer." tone="blue"/>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                          {[
                            { label:"Import Duty Rate (%)", val:importDutyRatePercent, set:setImportDutyRatePercent, step:0.1 },
                            { label:"🇮🇳 Inland India (USD)",   val:inlandFreightIndia,    set:setInlandFreightIndia,    step:1 },
                            { label:"🇺🇸 US Last-Mile (USD)",   val:inlandFreightUsa,      set:setInlandFreightUsa,      step:1 },
                            { label:"Broker & Port (USD)",  val:customsPortHandling,   set:setCustomsPortHandling,   step:1 },
                            { label:"Delay Buffer (days)",  val:delayBuffer,           set:setDelayBuffer,           step:1 },
                          ].map(({label,val,set,step})=>(
                            <div key={label}>
                              <label className={labelCls}>{label}</label>
                              <input type="number" step={step} value={val}
                                onChange={e=>set(Math.max(0,parseFloat(e.target.value)||0))}
                                className={inputCls}/>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <div className="flex items-center justify-between gap-4 px-8 sm:px-10 py-6 border-b border-slate-100">
                        <div>
                          <p className="text-[10px] font-extrabold text-[#009e86] uppercase tracking-[0.2em] mb-1">Step 3</p>
                          <h3 className="text-[16px] font-bold text-slate-900">Logistics Cost Breakdown</h3>
                        </div>
                        <span className="text-[12px] font-bold px-4 py-2 rounded-full bg-blue-50 text-[#0057c2] whitespace-nowrap flex items-center gap-2">
                          {isAirMode ? <Plane className="w-3.5 h-3.5"/> : <Ship className="w-3.5 h-3.5"/>}
                          {finalTransitTime} days
                        </span>
                      </div>
                      <table className="w-full border-collapse">
                        <tbody className="divide-y divide-[#f8f9fb]">
                          {isAirMode && <TableRow label="Chargeable weight" val={`${Math.round(chargeableWeight).toLocaleString()} kg`}/>}
                          <TableRow label="Ocean / Air freight"          val={usd(t2FreightCost)}       kind="cost"/>
                          <TableRow label="Cargo insurance"              sub="110% value insured" val={usd(insurancePremiumAmt)} kind="cost"/>
                          <TableRow label="US import customs duty"       sub={`${importDutyRatePercent}% rate`} val={usd(t2UsDuty)} kind="cost"/>
                          <TableRow label="🇮🇳 Inland transport — India" val={usd(inlandFreightIndia)} kind="cost"/>
                          <TableRow label="🇺🇸 US last-mile freight"     val={usd(inlandFreightUsa)}   kind="cost"/>
                          <TableRow label="Customs broker & local fees"  val={usd(customsPortHandling)} kind="cost"/>
                          <TableRow label="Packaging, docs & spoilage"   val={usd(t2OtherCostsTotal)}  kind="cost"/>
                        </tbody>
                      </table>
                    </Card>
                  </>
                )}
              </div>

              {/* ══ RIGHT RAIL — sticky summary ══ */}
              <div className="lg:sticky lg:top-[76px] space-y-4">
                {activeTool === "fiscal" ? (
                  <div className="rounded-2xl overflow-hidden border border-[#dde2e8] shadow-md">
                    {/* dark header */}
                    <div className="px-7 py-7 bg-slate-900">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Net result</p>
                      <p className="text-[12px] text-slate-400 font-medium mb-4">Total Net Government Cost</p>
                      <div className="text-[36px] font-black text-white tabular-nums leading-none mb-3">
                        {usd(netGovernmentCost)}
                      </div>
                      <div className="inline-flex items-center text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#00c9a7]/20 text-[#00c9a7]">
                        {netAsPctOfFob.toFixed(1)}% of FOB value
                      </div>
                    </div>
                    {/* white body */}
                    <div className="bg-white px-7 py-7">
                      <RailStat label="🇮🇳 India net"          val={usd(subtotalIndiaNet)}      tone="teal"/>
                      <RailStat label="🇺🇸 USA net"            val={usd(subtotalUsaNet)}        tone="blue"/>
                      <RailStat label="Total incentives"       val={`−${usd(totalIndiaIncentives)}`} tone="teal"/>
                      <p className="text-[12px] text-slate-400 mt-6 leading-relaxed">
                        Updates live as you adjust inputs. Scroll the tables for the full breakdown.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden border border-[#dde2e8] shadow-md">
                    <div className="px-7 py-7 bg-slate-900">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Net result</p>
                      <p className="text-[12px] text-slate-400 font-medium mb-4">Total Landed Cost</p>
                      <div className="text-[36px] font-black text-white tabular-nums leading-none">
                        {usd(totalLandedCost)}
                      </div>
                    </div>
                    <div className="bg-white px-7 py-7">
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-wide">Landed factor</p>
                          <p className="text-[22px] font-black text-slate-900 tabular-nums">{landedPctOfCargo.toFixed(1)}%</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-wide">Cost / kg</p>
                          <p className="text-[22px] font-black text-slate-900 tabular-nums">{usd2(effectiveCostPerKg)}</p>
                        </div>
                      </div>
                      <div className="border-t border-slate-100 pt-1">
                        <RailStat label="Freight cost"     val={usd(t2FreightCost)}/>
                        <RailStat label="Insurance"        val={usd(insurancePremiumAmt)}/>
                        <RailStat label="Customs duty"     val={usd(t2UsDuty)}/>
                        <RailStat label="Transit time"     val={`${finalTransitTime} days`} tone="blue"/>
                      </div>
                      <p className="text-[12px] text-slate-400 mt-6 leading-relaxed">Updates live as you adjust inputs.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-10 p-7 bg-white border border-[#e2e8ef] rounded-2xl flex items-start gap-4">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"/>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                All figures are 2026 representative benchmarks — not legal or tax advice. Verify rates at{" "}
                <a href="https://dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#0057c2] hover:underline font-semibold">dgft.gov.in</a>{" "}and{" "}
                <a href="https://hts.usitc.gov" target="_blank" rel="noopener noreferrer" className="text-[#0057c2] hover:underline font-semibold">hts.usitc.gov</a>.{" "}
                Prepared by Connect Ventures | Comply Globally —{" "}
                <a href="https://complyglobally.com" target="_blank" rel="noopener noreferrer" className="text-[#0057c2] hover:underline font-semibold">complyglobally.com</a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── DOWNLOAD GATE MODAL — portaled to <body> so it isn't clipped by the
            drawer's overflow-hidden + transform ancestor (that was cutting off
            the bottom of the form, including the Submit button) ── */}
      {showGateDialog && selectedGuide && modalMounted && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
          style={{background:"rgba(15,23,42,0.55)"}}>
          <div className="bg-white rounded-2xl border border-[#e2e8ef] w-full max-w-[520px] overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
            <div className="flex items-start justify-between gap-3 px-8 py-7 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <FlagImg country={selectedGuide.country} className="w-9 h-auto rounded shadow-sm border border-slate-100" />
                <div>
                  <p className="text-[10px] font-bold text-[#00c9a7] uppercase tracking-[0.22em] mb-1">Connect Ventures Library</p>
                  <h3 className="text-[18px] font-bold text-slate-900">Download: {selectedGuide.country}</h3>
                </div>
              </div>
              <button onClick={()=>setShowGateDialog(false)}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex-shrink-0 mt-0.5">
                <X className="w-4 h-4"/>
              </button>
            </div>
            <div className="px-8 py-8 overflow-y-auto">
              <form onSubmit={handleGateSubmit} className="space-y-6">
                {[
                  { label:"Full Name *",      key:"fullName", type:"text",  placeholder:"e.g. Ramesh Kumar",    required:true },
                  { label:"Business Email *", key:"email",    type:"email", placeholder:"ramesh@company.com",   required:true },
                  { label:"Company Name *",   key:"company",  type:"text",  placeholder:"e.g. AgriCrop Inc.",   required:true },
                ].map(({label,key,type,placeholder,required})=>(
                  <div key={key}>
                    <label className={labelCls}>{label}</label>
                    <input type={type} required={required} placeholder={placeholder}
                      value={gateForm[key]} onChange={e=>setGateForm({...gateForm,[key]:e.target.value})}
                      className={inputCls}/>
                  </div>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Country *</label>
                    <select required value={gateForm.country} onChange={e=>setGateForm({...gateForm,country:e.target.value})} className={selectCls}>
                      <option value="">Select…</option>
                      {gateFormCountries.map((name)=>(
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Phone (optional)</label>
                    <input type="tel" placeholder="+91 99999 81613" value={gateForm.phone}
                      onChange={e=>setGateForm({...gateForm,phone:e.target.value})} className={inputCls}/>
                  </div>
                </div>

                {submitError && (
                  <div className="flex items-start gap-2.5 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl">
                    <ShieldAlert className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0"/>
                    <p className="text-[12px] text-rose-700 leading-relaxed">{submitError}</p>
                  </div>
                )}

                <div className="flex flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={()=>setShowGateDialog(false)}
                    className="px-6 py-3 text-[13px] font-semibold rounded-xl border transition-colors"
                    style={{ color: "#475569", borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="px-7 py-3 text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isSubmitting ? "#334155" : "#0b1220",
                      color: "#ffffff",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}>
                    {isSubmitting ? "Preparing…" : "Submit & Download"} <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }}/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
