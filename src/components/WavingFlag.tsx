import type { CSSProperties } from 'react';

// Decorative flag for the office cards. The flag image is split into vertical
// strips that ripple out of phase (see .flag-wave in index.css), so it reads as
// cloth waving, fading into the card from the top-right corner.
const STRIPS = 32;

export default function WavingFlag({ code }: { code: 'us' | 'gb' | 'ca' | 'in' }) {
  const style = { '--flag': `url(/assets/flags/${code}.svg)`, '--n': STRIPS } as CSSProperties;
  return (
    <div className="flag-wave" style={style} aria-hidden="true">
      {Array.from({ length: STRIPS }, (_, i) => (
        <i key={i} style={{ '--i': i } as CSSProperties} />
      ))}
    </div>
  );
}
