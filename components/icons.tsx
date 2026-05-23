import type { CSSProperties } from 'react';

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

const svgAttrs = ({ size = 28, className, style }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  className,
  style,
});

export function IconCustomHome(props: IconProps) {
  return (
    <svg {...svgAttrs(props)} aria-hidden="true">
      <path d="M6 22 L24 8 L42 22" />
      <path d="M10 22 L10 40 L38 40 L38 22" />
      <path d="M20 40 L20 28 L28 28 L28 40" />
      <line x1="10" y1="32" x2="20" y2="32" />
      <line x1="28" y1="32" x2="38" y2="32" />
      <line x1="4" y1="44" x2="44" y2="44" />
    </svg>
  );
}

export function IconRemodel(props: IconProps) {
  return (
    <svg {...svgAttrs(props)} aria-hidden="true">
      <rect x="6" y="10" width="28" height="28" />
      <line x1="6" y1="24" x2="34" y2="24" />
      <line x1="20" y1="10" x2="20" y2="38" />
      <rect x="14" y="18" width="28" height="20" strokeOpacity="1" />
      <line x1="28" y1="18" x2="28" y2="38" strokeDasharray="2 2" />
      <line x1="14" y1="28" x2="42" y2="28" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconConsultation(props: IconProps) {
  return (
    <svg {...svgAttrs(props)} aria-hidden="true">
      <polygon points="6,10 42,10 6,46" />
      <line x1="6" y1="18" x2="14" y2="18" />
      <line x1="6" y1="26" x2="18" y2="26" />
      <line x1="6" y1="34" x2="14" y2="34" />
      <line x1="6" y1="42" x2="10" y2="42" />
      <line x1="22" y1="14" x2="26" y2="18" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <line x1="3" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

export function IconInstagram({ size = 22, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedin({ size = 22, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <line x1="7" y1="7" x2="7" y2="7.5" />
      <path d="M11 17 L11 10 M11 13 C11 11 12.5 10 14 10 C15.5 10 17 11 17 13 L17 17" />
    </svg>
  );
}
