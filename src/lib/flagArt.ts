// Corner art for the office cards. National flags have rules on how they may be
// shown and cropped, so instead of the flag each card gets an abstract design in
// the country's official colours that keeps the flag's layout (stripes and a
// blue corner, a crossing, upright bands, a ring between two colours) so it
// can't be mistaken for another country's colours. contact.html carries a static
// copy generated from this file.
export type FlagCode = 'us' | 'gb' | 'ca' | 'in';

const C = {
  usRed: '#B22234', usBlue: '#3C3B6E',
  ukBlue: '#012169', ukRed: '#C8102E',
  caRed: '#D52B1E',
  inSaffron: '#FF9933', inGreen: '#138808', inNavy: '#000080',
};
const n = (v: number) => +v.toFixed(1);
const SPLINE = 'calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"';

// Rising ribbon from the left edge up to the top-right corner; tapers unless flat
function rise(o: number, t: number, ph: 0 | 1, flat = false) {
  const [a, b, e] = ph ? [80, 46, -2] : [92, 34, -12];
  const L = 58 + o * 0.35;
  const [t1, t2, t3] = flat ? [t, t, t] : [t * 0.75, t * 0.45, t * 0.15];
  return `M10 ${n(L)} C110 ${n(a + o * 0.55)} 200 ${n(b + o * 0.85)} 340 ${n(e + o)} L340 ${n(e + o + t)} C200 ${n(b + o * 0.85 + t1)} 110 ${n(a + o * 0.55 + t2)} 10 ${n(L + t3)}Z`;
}

// Ribbon falling from the top towards the right edge (crosses the rising one)
function fall(o: number, t: number, ph: 0 | 1) {
  const [a, b] = ph ? [2, 50] : [-8, 62];
  return `M96 ${n(-30 + o)} C190 ${n(a + o)} 250 ${n(b + o)} 340 ${n(86 + o)} L340 ${n(86 + o + t)} C250 ${n(b + o + t)} 190 ${n(a + o + t)} 96 ${n(-30 + o + t)}Z`;
}

// Upright ribbon swaying from the top edge down into the card
function upright(x: number, w: number, ph: 0 | 1) {
  const [p, q] = ph ? [14, -4] : [3, 10];
  return `M${x} -10 C${x + p} 24 ${x + q} 56 ${x + 10} 96 L${x + 10 + w} 96 C${x + q + w} 56 ${x + p + w} 24 ${x + w} -10Z`;
}

// y of a rising ribbon's top edge at a given x (to centre the ring in India's white gap)
function riseY(o: number, x: number, ph: 0 | 1) {
  const [a, b, e] = ph ? [80, 46, -2] : [92, 34, -12];
  const P = [[10, 58 + o * 0.35], [110, a + o * 0.55], [200, b + o * 0.85], [340, e + o]];
  const at = (s: number, i: 0 | 1) => (1 - s) ** 3 * P[0][i] + 3 * (1 - s) ** 2 * s * P[1][i] + 3 * (1 - s) * s * s * P[2][i] + s ** 3 * P[3][i];
  let lo = 0, hi = 1;
  for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (at(m, 0) < x) lo = m; else hi = m; }
  return n(at(lo, 1));
}

export function flagArt(code: FlagCode, animate = true) {
  let k = 0;
  const anim = (attr: string, a: string | number, b: string | number, dur = 7) =>
    animate ? `<animate attributeName="${attr}" dur="${dur}s" begin="${n(-(k++) * 0.45)}s" repeatCount="indefinite" ${SPLINE} values="${a};${b};${a}"/>` : '';
  const ribbon = (fill: string, d0: string, d1: string) => `<path d="${d0}" fill="${fill}">${anim('d', d0, d1)}</path>`;
  const glow = (c: string) =>
    `<defs><radialGradient id="fr-glow-${code}"><stop offset="0" stop-color="${c}" stop-opacity="0.15"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="290" cy="10" r="120" fill="url(#fr-glow-${code})"/>`;

  let body = '';
  if (code === 'us') {
    // Red and white stripes running out from under a blue corner with twinkling stars
    body += glow(C.usBlue);
    for (let i = 0; i < 5; i++) body += ribbon(C.usRed, rise(i * 12, 6, 0), rise(i * 12, 6, 1));
    body += `<g transform="rotate(-12 258 30)"><rect x="216" y="2" width="84" height="56" rx="12" fill="${C.usBlue}"/><g class="fr-stars" fill="#fff">`;
    const stars: [number, number][] = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < (r % 2 ? 4 : 5); c++) stars.push([228 + c * 15 + (r % 2 ? 7.5 : 0), 13 + r * 11.5]);
    stars.forEach(([x, y], i) => { body += `<circle cx="${x}" cy="${y}" r="2" style="--k:${i % 5}"/>`; });
    body += '</g></g>';
  } else if (code === 'gb') {
    // Two navy ribbons crossing, each with a white edge and a red centre line
    body += glow(C.ukBlue);
    body += ribbon(C.ukBlue, rise(14, 26, 0, true), rise(14, 26, 1, true));
    body += ribbon(C.ukBlue, fall(12, 26, 0), fall(12, 26, 1));
    body += ribbon('#fff', rise(22, 10, 0, true), rise(22, 10, 1, true));
    body += ribbon('#fff', fall(20, 10, 0), fall(20, 10, 1));
    body += ribbon(C.ukRed, rise(24, 6, 0, true), rise(24, 6, 1, true));
    body += ribbon(C.ukRed, fall(22, 6, 0), fall(22, 6, 1));
  } else if (code === 'ca') {
    // Two upright red bands with the white space between them and a red point at its centre
    body += glow(C.caRed);
    body += `<defs><linearGradient id="fr-ca-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="${C.caRed}"/><stop offset="1" stop-color="${C.caRed}" stop-opacity="0"/></linearGradient></defs>`;
    body += ribbon('url(#fr-ca-fade)', upright(150, 30, 0), upright(150, 30, 1));
    body += ribbon('url(#fr-ca-fade)', upright(264, 30, 0), upright(264, 30, 1));
    body += `<circle class="fr-pulse" cx="222" cy="40" r="7" fill="${C.caRed}"/>`;
  } else {
    // Saffron and green with a navy ring in the white between them
    body += glow(C.inSaffron);
    body += ribbon(C.inSaffron, rise(0, 16, 0), rise(0, 16, 1));
    body += ribbon(C.inGreen, rise(42, 16, 0), rise(42, 16, 1));
    k = 0; // ring sways with the saffron ribbon above it
    const mid = (ph: 0 | 1) => n((riseY(0, 250, ph) + 12 + riseY(42, 250, ph)) / 2);
    const y0 = mid(0), y1 = mid(1);
    body += `<circle cx="250" cy="${y0}" r="6" fill="none" stroke="${C.inNavy}" stroke-width="1.6">${anim('cy', y0, y1)}</circle>`;
  }
  return `<svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">${body}</svg>`;
}
