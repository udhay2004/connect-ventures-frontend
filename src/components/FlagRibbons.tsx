import { useEffect, useState } from 'react';

// Decorative corner art for the office cards. Instead of reproducing a national
// flag (flags have rules on how they may be shown and cropped), each card gets
// flowing ribbons in that country's official flag colours. Matches .flag-ribbons
// in index.css and the static copy on contact.html.
type Code = 'us' | 'gb' | 'ca' | 'in';

// [colour, thickness, gap after]; the white card shows through the gaps as the flag's white
const RIBBONS: Record<Code, { bands: [string, number, number][]; accent: string }> = {
  us: { bands: [['#B22234', 9, 6], ['#3C3B6E', 20, 6], ['#B22234', 9, 0]], accent: '#3C3B6E' },
  gb: { bands: [['#012169', 14, 6], ['#C8102E', 12, 6], ['#012169', 14, 0]], accent: '#C8102E' },
  ca: { bands: [['#D52B1E', 16, 22], ['#D52B1E', 16, 0]], accent: '#D52B1E' },
  in: { bands: [['#FF9933', 16, 20], ['#138808', 16, 0]], accent: '#000080' },
};

// One ribbon band, tapering from thin at the left to full width at the top-right
// corner, in its resting shape (0) or its swayed shape (1)
function band(o: number, t: number, ph: 0 | 1) {
  const [a, b, e] = ph ? [80, 46, -2] : [92, 34, -12];
  const L = 58 + o * 0.35;
  return `M10 ${L} C110 ${a + o * 0.55} 200 ${b + o * 0.85} 340 ${e + o} L340 ${e + o + t} C200 ${b + o * 0.85 + t * 0.75} 110 ${a + o * 0.55 + t * 0.45} 10 ${L + t * 0.15}Z`;
}

// A hairline that follows the ribbons a little lower down
function hairline(o: number, ph: 0 | 1) {
  const [a, b, e] = ph ? [80, 46, -2] : [92, 34, -12];
  return `M40 ${70 + o * 0.35} C130 ${a + o * 0.55} 210 ${b + o * 0.85} 340 ${e + o}`;
}

export default function FlagRibbons({ code }: { code: Code }) {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  const { bands, accent } = RIBBONS[code];
  let o = 0;
  return (
    <svg className="flag-ribbons" viewBox="0 0 320 180" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`fr-glow-${code}`}>
          <stop offset="0" stopColor={bands[0][0]} stopOpacity="0.16" />
          <stop offset="1" stopColor={bands[0][0]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="290" cy="10" r="120" fill={`url(#fr-glow-${code})`} />
      {bands.map(([c, t, gap], k) => {
        const top = o;
        o += t + gap;
        const d0 = band(top, t, 0);
        return (
          <path key={k} d={d0} fill={c}>
            {!still && (
              <animate attributeName="d" dur="7s" begin={`${-k * 0.45}s`} repeatCount="indefinite"
                calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                values={`${d0};${band(top, t, 1)};${d0}`} />
            )}
          </path>
        );
      })}
      <path d={hairline(o + 8, 0)} fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.45">
        {!still && (
          <animate attributeName="d" dur="7s" begin={`${-bands.length * 0.45}s`} repeatCount="indefinite"
            calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            values={`${hairline(o + 8, 0)};${hairline(o + 8, 1)};${hairline(o + 8, 0)}`} />
        )}
      </path>
      <g fill={accent} className="fr-dots">
        <circle cx="282" cy="92" r="3.2" style={{ ['--k' as string]: 0 }} />
        <circle cx="262" cy="104" r="2.2" style={{ ['--k' as string]: 1 }} />
        <circle cx="292" cy="112" r="1.6" style={{ ['--k' as string]: 2 }} />
      </g>
    </svg>
  );
}
