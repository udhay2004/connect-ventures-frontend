import { memo, useEffect, useRef } from 'react';
import { officesHtml, revealOffices } from '../lib/offices';

const html = officesHtml();

// "Our global presence": world map, office cards and trust row (see src/lib/offices.ts)
function OfficesSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? revealOffices(ref.current) : undefined), []);
  return <section ref={ref} className="gp" aria-labelledby="gp-title" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default memo(OfficesSection);
