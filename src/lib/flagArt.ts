// Corner art for the office cards. National flags have rules on how they may be
// shown and cropped, so instead of the flag each card gets a stage-style sunburst
// fanning out of the top-right corner in the country's official colours: an
// outer ring of rays, an inner ring, a hub and a dotted arc. The rays pulse in
// sequence like stage lights and the rings sway in opposite directions (see
// .flag-ribbons in the stylesheets). contact.html carries a static copy
// generated from this file.
export type FlagCode = 'us' | 'gb' | 'ca' | 'in';

type Palette = { outer: string[]; inner: string[]; hub: string; ring: string; dots: string; stars?: boolean };

const PALETTES: Record<FlagCode, Palette> = {
  // red rays, navy inner ring, navy hub with white stars
  us: { outer: ['#B22234'], inner: ['#3C3B6E'], hub: '#3C3B6E', ring: '#B22234', dots: '#3C3B6E', stars: true },
  // navy and red rays around a navy hub
  gb: { outer: ['#012169', '#C8102E'], inner: ['#C8102E', '#012169'], hub: '#012169', ring: '#C8102E', dots: '#012169' },
  // red rays on white around a red hub
  ca: { outer: ['#D52B1E'], inner: ['#E8695F'], hub: '#D52B1E', ring: '#D52B1E', dots: '#D52B1E' },
  // saffron rays, green inner ring, navy ring at the hub
  in: { outer: ['#FF9933'], inner: ['#138808'], hub: 'none', ring: '#000080', dots: '#000080' },
};

const OX = 200, OY = 0; // the fan opens from the top-right corner of a 200 x 200 box
const n = (v: number) => +v.toFixed(2);

// Point at radius r, angle a degrees (0 = pointing left, 90 = pointing down)
function pt(r: number, a: number) {
  const t = (a * Math.PI) / 180;
  return `${n(OX - r * Math.cos(t))} ${n(OY + r * Math.sin(t))}`;
}

// Ring segment between radii r1 and r2, from angle a0 to a1
function wedge(r1: number, r2: number, a0: number, a1: number) {
  return `M${pt(r1, a0)} L${pt(r2, a0)} A${r2} ${r2} 0 0 0 ${pt(r2, a1)} L${pt(r1, a1)} A${r1} ${r1} 0 0 1 ${pt(r1, a0)}Z`;
}

function arc(r: number) {
  return `M${pt(r, -2)} A${r} ${r} 0 0 0 ${pt(r, 92)}`;
}

function ring(count: number, r1: number, r2: number, colours: string[], gap: number, offset = 0) {
  const step = 90 / count;
  let out = '';
  for (let i = 0; i < count; i++) {
    const a0 = i * step + gap / 2 + offset, a1 = (i + 1) * step - gap / 2 + offset;
    out += `<path d="${wedge(r1, r2, a0, a1)}" fill="${colours[i % colours.length]}" style="--k:${i}"/>`;
  }
  return out;
}

export function flagArt(code: FlagCode) {
  const p = PALETTES[code];
  const glowColour = p.outer[0];
  let s = `<defs><radialGradient id="fr-glow-${code}" cx="1" cy="0" r="1"><stop offset="0" stop-color="${glowColour}" stop-opacity="0.22"/><stop offset="0.7" stop-color="${glowColour}" stop-opacity="0.05"/><stop offset="1" stop-color="${glowColour}" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect width="200" height="200" fill="url(#fr-glow-${code})"/>`;
  // outer rays, a fine arc just inside them, inner rays offset by half a ray
  s += `<g class="fr-outer">${ring(7, 74, 138, p.outer, 5)}</g>`;
  s += `<path d="${arc(72)}" fill="none" stroke="${p.ring}" stroke-width="1" stroke-opacity="0.5"/>`;
  s += `<g class="fr-inner">${ring(5, 44, 64, p.inner, 5)}</g>`;
  // hub
  if (p.hub !== 'none') s += `<path d="M${OX} ${OY} L${pt(32, -2)} A32 32 0 0 0 ${pt(32, 92)}Z" fill="${p.hub}"/>`;
  s += `<path d="${arc(36)}" fill="none" stroke="${p.ring}" stroke-width="2"/>`;
  if (p.stars) {
    s += '<g class="fr-stars" fill="#fff">';
    [[12, 22], [45, 18], [78, 22], [30, 9], [62, 9]].forEach(([a, r], i) => { s += `<circle cx="${pt(r, a).split(' ')[0]}" cy="${pt(r, a).split(' ')[1]}" r="1.8" style="--k:${i}"/>`; });
    s += '</g>';
  }
  // dotted arc beyond the rays
  s += `<g class="fr-dots" fill="${p.dots}">`;
  for (let i = 0; i <= 9; i++) {
    const [x, y] = pt(152, i * 10).split(' ');
    s += `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 2.2 : 1.4}" style="--k:${i}"/>`;
  }
  s += '</g>';
  return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${s}</svg>`;
}
