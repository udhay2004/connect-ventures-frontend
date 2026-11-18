import { useEffect, useState } from 'react';
import { flagArt, type FlagCode } from '../lib/flagArt';

// Office-card corner art in the country's flag colours (see src/lib/flagArt.ts)
export default function FlagRibbons({ code }: { code: FlagCode }) {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  return <span className="flag-ribbons" aria-hidden="true" dangerouslySetInnerHTML={{ __html: flagArt(code, !still) }} />;
}
