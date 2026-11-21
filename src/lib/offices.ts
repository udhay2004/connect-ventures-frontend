// "Our global presence" section: intro, world map with arcs between the offices,
// office cards and a trust row. The home page renders this markup and
// contact.html carries a static copy generated from this file; the styles live
// in public/assets/css/offices.css, which both pages load.

type Office = {
  flag: 'us' | 'gb' | 'ca' | 'in';
  name: string;
  sub: string;
  badge: string;
  addr: string[];
  phones?: string[];
  person?: string;
  hq?: boolean;
};

const OFFICES: Office[] = [
  { flag: 'us', name: 'USA', sub: 'Headquarters', badge: 'Headquarters', hq: true,
    addr: ['1501 Decoto Rd, #154, Union City,', 'California 94587, USA'], phones: ['+1 302 214 1717', '+1 302 231 3031'] },
  { flag: 'gb', name: 'United Kingdom', sub: 'Bridgend', badge: 'UK Operations',
    addr: ['Voxman Roberts, Office 5,', 'Tondu Business Centre, Aberkenfig,', 'Bridgend, CF32 9BS, UK'] },
  { flag: 'ca', name: 'Canada', sub: 'Toronto', badge: 'Canadian Operations',
    addr: ['381 Front Street West,', 'Toronto, Ontario M5V 3R8, Canada'] },
  { flag: 'in', name: 'India', sub: 'Delhi NCR', badge: 'India Regional Office',
    addr: ['A1503, Apex Acacia Valley, Sector 3,', 'Vaishali, Ghaziabad, UP 201010'], phones: ['+91 999 998 1613', '+91 976 832 6850'] },
  { flag: 'in', name: 'India', sub: 'Hyderabad', badge: 'South India Office',
    addr: ['7-1-621/13, No.102, First Floor,', 'SR Nagar, Hyderabad, Telangana 500038'] },
  { flag: 'in', name: 'India', sub: 'Mumbai', badge: 'West India Office',
    addr: ['Dhananjay Kosh, Meghna Annex, H.S. Lane,', 'Andheri East, Mumbai, Maharashtra 400069'], phones: ['+91 72089 05490', '+91 97683 26850'], person: 'Ms. Hasti Shah' },
];

// Office cities on the map (Natural Earth projection of public/assets/img/world-map.svg, 1000 x 436)
const PTS = { us: [180.3, 132.4], ca: [297.6, 112.7], gb: [491.3, 87.8], del: [709.1, 161.6], mum: [701.4, 192.8], hyd: [717.4, 198.3] } as const;
const ARCS: [keyof typeof PTS, keyof typeof PTS][] = [['us', 'ca'], ['us', 'gb'], ['ca', 'gb'], ['gb', 'del'], ['gb', 'mum'], ['del', 'hyd']];

const ICON = {
  pin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  map: '<path d="M14.1 5.9 9.9 4.1a2 2 0 0 0-1.8.1L3.6 6.8A1 1 0 0 0 3 7.7v12.6a1 1 0 0 0 1.4.9l4.7-2.7a2 2 0 0 1 1.8-.1l4.2 1.8a2 2 0 0 0 1.8-.1l4.5-2.6a1 1 0 0 0 .6-.9V4a1 1 0 0 0-1.4-.9l-4.7 2.7a2 2 0 0 1-1.8.1z"/><path d="M15 5.8v15M9 3.2v15"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  hands: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
};
const icon = (k: keyof typeof ICON, cls = 'gp-ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, '')}`;
const directions = (o: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.addr.join(' ').replace(/,\s*$/, ''))}`;

function arcs() {
  let s = '';
  ARCS.forEach(([a, b], i) => {
    const [x1, y1] = PTS[a], [x2, y2] = PTS[b];
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - dist * 0.32;
    s += `<path class="gp-arc" d="M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}" pathLength="1" style="--i:${i}"/>`;
  });
  Object.values(PTS).forEach(([x, y], i) => {
    s += `<circle class="gp-ping" cx="${x}" cy="${y}" r="5" style="--i:${i}"/><circle class="gp-pt" cx="${x}" cy="${y}" r="4"/>`;
  });
  return s;
}

function card(o: Office, i: number) {
  const contact = o.phones
    ? `<div class="gp-phone">${icon('phone')}<div>${o.phones.map((p) => `<a href="${tel(p)}">${p}</a>`).join('')}${o.person ? `<span class="gp-person">${o.person}</span>` : ''}</div></div>`
    : `<div class="gp-phone">${icon('mail')}<div><a href="mailto:anil.gupta@theconnectventures.com">Email the team</a></div></div>`;
  return `<address class="gp-card${o.hq ? ' gp-hq' : ''}" style="--i:${i}">
  <div class="gp-card-top">
    <img class="gp-flag" src="/assets/flags/${o.flag}.svg" alt="" width="44" height="28" loading="lazy">
    <div class="gp-name"><h3>${o.name}</h3><span>${o.sub}</span></div>
    <span class="gp-badge">${o.badge}</span>
  </div>
  <div class="gp-addr">${icon('pin')}<p>${o.addr.join('<br>')}</p></div>
  <div class="gp-foot">
    ${contact}
    <a class="gp-dir" href="${directions(o)}" target="_blank" rel="noopener">${icon('map')}Get directions${icon('arrow', 'gp-ico gp-arrow')}</a>
  </div>
</address>`;
}

export function officesHtml() {
  return `<div class="gp-wrap">
<div class="gp-head">
  <div class="gp-intro">
    <div class="gp-eyebrow">Our global presence</div>
    <h2 id="gp-title"><span class="gp-line">Connecting businesses</span> <em>across borders.</em></h2>
    <p>With offices on three continents and partners in 50+ countries, we help businesses navigate opportunities across multiple jurisdictions.</p>
  </div>
  <div class="gp-map" aria-hidden="true">
    <img src="/assets/img/world-map.svg" alt="" width="1000" height="436" loading="lazy">
    <svg viewBox="0 0 1000 436">${arcs()}</svg>
  </div>
  <div class="gp-stat">
    <strong>50+</strong>
    <span class="gp-stat-label">Countries</span>
    <span class="gp-stat-rule"></span>
    <span class="gp-stat-note">One partner.<br>Every opportunity.</span>
  </div>
</div>
<div class="gp-grid">
${OFFICES.map(card).join('\n')}
</div>
<div class="gp-reg">
  <span class="gp-reg-mark" aria-hidden="true">DE</span>
  <p><strong>Connect Ventures Inc.</strong> is incorporated in the State of Delaware, USA.<span>Registered address: Northwest Registered Agent Service, Inc., 8 The Green, Suite B, Dover, DE 19901</span></p>
</div>
<div class="gp-trust">
  <span>${icon('globe')}Global reach</span>
  <span>${icon('shield')}Local expertise</span>
  <span>${icon('hands')}Trusted partner</span>
</div>
</div>`;
}

// Starts the map arcs and card reveal once the section scrolls into view
export function revealOffices(root: Element) {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('in');
    return () => {};
  }
  const io = new IntersectionObserver((es) => {
    if (es.some((e) => e.isIntersecting)) { root.classList.add('in'); io.disconnect(); }
  }, { threshold: 0.15 });
  io.observe(root);
  return () => io.disconnect();
}
