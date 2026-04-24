// 20 premium clan emblems as inline SVG React components
// Each is 80×80px, black/white/orange palette (#1a1a1a, white, #f97316)
// All SVGs are decorative — aria-hidden="true" on every element

import type React from "react";

export interface ClanEmblem {
  id: number;
  name: string;
  /** Full-size 80x80 emblem */
  Svg: React.FC<{ size?: number }>;
}

// ─── Shared palette ───────────────────────────────────────────────────────────
const BG = "#1a1a1a";
const W = "white";
const O = "#f97316";

// ─── 1. Eagle ─────────────────────────────────────────────────────────────────
const Eagle: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M8 44 Q20 20 40 38 Q60 20 72 44 Q60 48 52 38 Q40 50 28 38 Q20 48 8 44Z"
      fill={W}
    />
    <ellipse cx="40" cy="48" rx="10" ry="13" fill={O} />
    <circle cx="40" cy="30" r="9" fill={O} />
    <path d="M40 35 L44 38 L40 40Z" fill={W} />
    <circle cx="43" cy="28" r="2.5" fill={BG} />
    <circle cx="44" cy="27.5" r="0.8" fill={W} />
    <path
      d="M33 60 L30 68 M36 62 L34 70 M44 62 L46 70 M47 60 L50 68"
      stroke={W}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M34 60 L28 72 M40 62 L40 74 M46 60 L52 72"
      stroke={O}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 2. Lion ──────────────────────────────────────────────────────────────────
const Lion: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
      <line
        key={a}
        x1="40"
        y1="40"
        x2={40 + 22 * Math.cos((a * Math.PI) / 180)}
        y2={40 + 22 * Math.sin((a * Math.PI) / 180)}
        stroke={O}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ))}
    <circle cx="40" cy="40" r="16" fill={W} />
    <ellipse cx="34" cy="37" rx="3" ry="3.5" fill={BG} />
    <ellipse cx="46" cy="37" rx="3" ry="3.5" fill={BG} />
    <circle cx="35" cy="36" r="1" fill={W} />
    <circle cx="47" cy="36" r="1" fill={W} />
    <path d="M37 44 L40 47 L43 44 Q40 42 37 44Z" fill={O} />
    <path
      d="M36 47 Q40 52 44 47"
      stroke={BG}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="43"
      x2="34"
      y2="45"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="46"
      x2="34"
      y2="47"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="56"
      y1="43"
      x2="46"
      y2="45"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="56"
      y1="46"
      x2="46"
      y2="47"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path d="M26 26 L22 18 L32 24Z" fill={O} />
    <path d="M54 26 L58 18 L48 24Z" fill={O} />
  </svg>
);

// ─── 3. Dragon ────────────────────────────────────────────────────────────────
const Dragon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path d="M10 35 Q14 20 26 28 Q18 35 22 45Z" fill={O} opacity="0.8" />
    <path d="M70 35 Q66 20 54 28 Q62 35 58 45Z" fill={O} opacity="0.8" />
    <ellipse cx="40" cy="52" rx="14" ry="18" fill={W} />
    <path d="M30 44 Q40 40 50 44" stroke={O} strokeWidth="1.2" fill="none" />
    <path d="M28 50 Q40 46 52 50" stroke={O} strokeWidth="1.2" fill="none" />
    <path d="M29 56 Q40 52 51 56" stroke={O} strokeWidth="1.2" fill="none" />
    <ellipse cx="40" cy="28" rx="12" ry="11" fill={W} />
    <path d="M32 20 L28 10 L34 18Z" fill={O} />
    <path d="M48 20 L52 10 L46 18Z" fill={O} />
    <ellipse cx="35" cy="27" rx="3.5" ry="4" fill={BG} />
    <ellipse cx="45" cy="27" rx="3.5" ry="4" fill={BG} />
    <ellipse cx="35" cy="27" rx="1.5" ry="2" fill={O} />
    <ellipse cx="45" cy="27" rx="1.5" ry="2" fill={O} />
    <circle cx="37" cy="33" r="1.5" fill={O} />
    <circle cx="43" cy="33" r="1.5" fill={O} />
    <path d="M46 68 Q55 74 62 68 Q58 76 50 70Z" fill={O} />
    <path
      d="M30 66 L26 72 M33 68 L30 74 M46 68 L50 74 M50 66 L54 72"
      stroke={W}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 4. Wolf ──────────────────────────────────────────────────────────────────
const Wolf: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path d="M20 22 L14 8 L30 20Z" fill={W} />
    <path d="M22 22 L16 10 L28 20Z" fill={O} />
    <path d="M60 22 L66 8 L50 20Z" fill={W} />
    <path d="M58 22 L64 10 L52 20Z" fill={O} />
    <ellipse cx="40" cy="38" rx="20" ry="22" fill={W} />
    <ellipse cx="40" cy="52" rx="10" ry="8" fill="#e5e5e5" />
    <ellipse cx="32" cy="35" rx="4" ry="4.5" fill={BG} />
    <ellipse cx="48" cy="35" rx="4" ry="4.5" fill={BG} />
    <ellipse cx="32" cy="34" rx="1.8" ry="2" fill={O} />
    <ellipse cx="48" cy="34" rx="1.8" ry="2" fill={O} />
    <circle cx="33" cy="33" r="0.8" fill={W} />
    <circle cx="49" cy="33" r="0.8" fill={W} />
    <path d="M36 48 Q40 46 44 48 L43 52 Q40 54 37 52Z" fill={BG} />
    <path
      d="M36 52 Q40 57 44 52"
      stroke={BG}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="50"
      x2="34"
      y2="50"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="53"
      x2="34"
      y2="52"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="50"
      x2="46"
      y2="50"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="53"
      x2="46"
      y2="52"
      stroke={BG}
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 5. Phoenix ───────────────────────────────────────────────────────────────
const Phoenix: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M40 72 Q24 56 28 40 Q32 52 40 46 Q48 52 52 40 Q56 56 40 72Z"
      fill={O}
    />
    <path
      d="M40 42 Q18 30 10 12 Q22 18 28 32 Q16 24 20 36 Q28 30 40 42Z"
      fill={O}
    />
    <path
      d="M40 42 Q62 30 70 12 Q58 18 52 32 Q64 24 60 36 Q52 30 40 42Z"
      fill={O}
    />
    <ellipse cx="40" cy="42" rx="10" ry="14" fill={W} />
    <circle cx="40" cy="26" r="9" fill={W} />
    <path d="M36 18 L33 10 L37 16Z" fill={O} />
    <path d="M40 17 L40 8 L42 16Z" fill={O} />
    <path d="M44 18 L47 10 L43 16Z" fill={O} />
    <circle cx="43" cy="25" r="3" fill={BG} />
    <circle cx="44" cy="24" r="1" fill={W} />
    <path d="M40 29 L45 32 L40 33Z" fill={O} />
    <path
      d="M34 54 L26 70"
      stroke={O}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M38 56 L34 72" stroke={W} strokeWidth="2" strokeLinecap="round" />
    <path d="M42 56 L46 72" stroke={W} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M46 54 L54 70"
      stroke={O}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 6. Shield ────────────────────────────────────────────────────────────────
const ShieldEmblem: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path d="M40 10 L68 22 L68 44 Q68 62 40 72 Q12 62 12 44 L12 22Z" fill={W} />
    <path
      d="M40 16 L62 26 L62 44 Q62 58 40 66 Q18 58 18 44 L18 26Z"
      fill={BG}
    />
    <path d="M40 16 L40 66" stroke={O} strokeWidth="2" />
    <path d="M18 40 L62 40" stroke={O} strokeWidth="2" />
    <path
      d="M22 28 L36 28 M29 22 L29 36"
      stroke={W}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M51 22 L53 28 L59 28 L54 32 L56 38 L51 34 L46 38 L48 32 L43 28 L49 28Z"
      fill={O}
    />
    <path
      d="M22 44 L29 52 L36 44"
      stroke={O}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="51" cy="52" r="6" stroke={W} strokeWidth="2" fill="none" />
    <circle cx="51" cy="52" r="2.5" fill={O} />
  </svg>
);

// ─── 7. Crown ─────────────────────────────────────────────────────────────────
const Crown: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path d="M10 56 L10 36 L22 50 L40 24 L58 50 L70 36 L70 56Z" fill={O} />
    <rect x="10" y="56" width="60" height="10" rx="3" fill={O} />
    <circle cx="25" cy="61" r="4" fill={W} />
    <circle cx="40" cy="61" r="4" fill={W} />
    <circle cx="55" cy="61" r="4" fill={W} />
    <circle cx="25" cy="61" r="2" fill={BG} />
    <circle cx="40" cy="61" r="2" fill={O} />
    <circle cx="55" cy="61" r="2" fill={BG} />
    <circle cx="10" cy="36" r="5" fill={W} />
    <circle cx="10" cy="36" r="2.5" fill={O} />
    <circle cx="40" cy="24" r="6" fill={W} />
    <circle cx="40" cy="24" r="3" fill={O} />
    <circle cx="70" cy="36" r="5" fill={W} />
    <circle cx="70" cy="36" r="2.5" fill={O} />
  </svg>
);

// ─── 8. Sword ─────────────────────────────────────────────────────────────────
const Sword: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path d="M40 8 L44 56 L40 60 L36 56Z" fill={W} />
    <path d="M40 8 L43 54" stroke={O} strokeWidth="0.8" opacity="0.6" />
    <rect x="24" y="56" width="32" height="7" rx="3" fill={O} />
    <circle cx="30" cy="59.5" r="3" fill={W} />
    <circle cx="50" cy="59.5" r="3" fill={W} />
    <circle cx="30" cy="59.5" r="1.5" fill={BG} />
    <circle cx="50" cy="59.5" r="1.5" fill={BG} />
    <rect x="36" y="63" width="8" height="14" rx="3" fill={W} />
    <line x1="36" y1="66" x2="44" y2="66" stroke={O} strokeWidth="1" />
    <line x1="36" y1="69" x2="44" y2="69" stroke={O} strokeWidth="1" />
    <line x1="36" y1="72" x2="44" y2="72" stroke={O} strokeWidth="1" />
    <ellipse cx="40" cy="77" rx="6" ry="3.5" fill={O} />
    <path d="M38 12 L40 8 L40 16 Z" fill={O} opacity="0.7" />
  </svg>
);

// ─── 9. Anchor ────────────────────────────────────────────────────────────────
const Anchor: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <circle cx="40" cy="16" r="8" stroke={W} strokeWidth="3" fill="none" />
    <line
      x1="40"
      y1="24"
      x2="40"
      y2="64"
      stroke={W}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="32"
      x2="62"
      y2="32"
      stroke={O}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="18" cy="32" r="3.5" fill={O} />
    <circle cx="62" cy="32" r="3.5" fill={O} />
    <path
      d="M22 60 Q40 74 58 60"
      stroke={W}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="40" cy="64" r="4" fill={O} />
    <circle cx="22" cy="60" r="4" fill={W} />
    <circle cx="58" cy="60" r="4" fill={W} />
    <line x1="36" y1="38" x2="44" y2="38" stroke={O} strokeWidth="1.5" />
    <line x1="36" y1="44" x2="44" y2="44" stroke={O} strokeWidth="1.5" />
  </svg>
);

// ─── 10. Flame ────────────────────────────────────────────────────────────────
const Flame: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M40 8 Q52 18 54 32 Q60 24 58 36 Q66 30 62 46 Q60 62 40 72 Q20 62 18 46 Q14 30 22 36 Q20 24 26 32 Q28 18 40 8Z"
      fill={O}
    />
    <path
      d="M40 20 Q48 28 50 38 Q54 32 52 42 Q58 36 54 50 Q50 62 40 66 Q30 62 26 50 Q22 36 28 42 Q26 32 30 38 Q32 28 40 20Z"
      fill={W}
      opacity="0.9"
    />
    <path
      d="M40 32 Q44 38 44 46 Q46 42 44 50 Q42 58 40 60 Q38 58 36 50 Q34 42 36 46 Q36 38 40 32Z"
      fill={O}
    />
    <ellipse cx="40" cy="52" rx="5" ry="7" fill={W} />
  </svg>
);

// ─── 11. Star ─────────────────────────────────────────────────────────────────
const StarEmblem: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <circle
      cx="40"
      cy="40"
      r="32"
      stroke={O}
      strokeWidth="1"
      opacity="0.3"
      fill="none"
    />
    <circle
      cx="40"
      cy="40"
      r="28"
      stroke={O}
      strokeWidth="0.5"
      opacity="0.2"
      fill="none"
    />
    <path
      d="M40 8 L44 30 L64 24 L48 40 L64 56 L44 50 L40 72 L36 50 L16 56 L32 40 L16 24 L36 30Z"
      fill={O}
    />
    <path
      d="M40 18 L43 32 L56 28 L46 40 L56 52 L43 48 L40 62 L37 48 L24 52 L34 40 L24 28 L37 32Z"
      fill={W}
      opacity="0.6"
    />
    <circle cx="40" cy="40" r="8" fill={W} />
    <circle cx="40" cy="40" r="5" fill={O} />
    <circle cx="38" cy="38" r="2" fill={W} opacity="0.8" />
  </svg>
);

// ─── 12. Skull ────────────────────────────────────────────────────────────────
const Skull: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M16 42 Q16 16 40 14 Q64 16 64 42 Q64 54 56 58 L56 66 Q56 68 54 68 L26 68 Q24 68 24 66 L24 58 Q16 54 16 42Z"
      fill={W}
    />
    <ellipse cx="30" cy="38" rx="8" ry="9" fill={BG} />
    <ellipse cx="50" cy="38" rx="8" ry="9" fill={BG} />
    <circle cx="32" cy="35" r="2.5" fill={O} opacity="0.6" />
    <circle cx="52" cy="35" r="2.5" fill={O} opacity="0.6" />
    <path d="M37 50 L40 54 L43 50 Q40 48 37 50Z" fill={BG} />
    <rect x="24" y="60" width="7" height="9" rx="1" fill={BG} />
    <rect x="33" y="60" width="7" height="9" rx="1" fill={BG} />
    <rect x="42" y="60" width="7" height="9" rx="1" fill={BG} />
    <rect x="51" y="60" width="7" height="9" rx="1" fill={BG} />
    <path
      d="M40 14 L38 28 L42 34 L38 42"
      stroke={O}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── 13. Bear ─────────────────────────────────────────────────────────────────
const Bear: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <circle cx="24" cy="22" r="10" fill={W} />
    <circle cx="56" cy="22" r="10" fill={W} />
    <circle cx="24" cy="22" r="6" fill={O} />
    <circle cx="56" cy="22" r="6" fill={O} />
    <ellipse cx="40" cy="46" rx="22" ry="24" fill={W} />
    <ellipse cx="40" cy="58" rx="12" ry="9" fill="#e8e8e8" />
    <circle cx="32" cy="42" r="5" fill={BG} />
    <circle cx="48" cy="42" r="5" fill={BG} />
    <circle cx="33" cy="41" r="2" fill={W} />
    <circle cx="49" cy="41" r="2" fill={W} />
    <ellipse cx="40" cy="54" rx="6" ry="4" fill={BG} />
    <ellipse cx="40" cy="53" rx="3" ry="2" fill={W} opacity="0.3" />
    <path
      d="M36 57 Q40 62 44 57"
      stroke={BG}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="20" cy="68" r="3" fill={O} />
    <circle cx="27" cy="72" r="2.5" fill={O} />
    <circle cx="34" cy="74" r="2" fill={O} />
    <circle cx="60" cy="68" r="3" fill={O} />
    <circle cx="53" cy="72" r="2.5" fill={O} />
    <circle cx="46" cy="74" r="2" fill={O} />
  </svg>
);

// ─── 14. Serpent ──────────────────────────────────────────────────────────────
const Serpent: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M40 70 Q16 64 18 44 Q20 24 40 28 Q60 32 58 50 Q56 66 40 64 Q26 62 28 50 Q30 38 40 40 Q50 42 48 50 Q46 58 40 56"
      stroke={O}
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M40 70 Q16 64 18 44 Q20 24 40 28 Q60 32 58 50 Q56 66 40 64 Q26 62 28 50 Q30 38 40 40 Q50 42 48 50 Q46 58 40 56"
      stroke={W}
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse
      cx="40"
      cy="14"
      rx="11"
      ry="9"
      fill={O}
      transform="rotate(-10,40,14)"
    />
    <ellipse
      cx="40"
      cy="14"
      rx="8"
      ry="6.5"
      fill={W}
      transform="rotate(-10,40,14)"
    />
    <ellipse cx="44" cy="11" rx="2.5" ry="3" fill={BG} />
    <ellipse cx="44" cy="11" rx="1" ry="1.5" fill={O} />
    <path
      d="M40 20 L40 26 L37 30 M40 26 L43 30"
      stroke={O}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 15. Axe ──────────────────────────────────────────────────────────────────
const Axe: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <rect x="37" y="38" width="6" height="36" rx="3" fill={W} />
    <rect x="37" y="44" width="6" height="3" rx="1" fill={O} />
    <rect x="37" y="50" width="6" height="3" rx="1" fill={O} />
    <rect x="37" y="56" width="6" height="3" rx="1" fill={O} />
    <rect x="37" y="62" width="6" height="3" rx="1" fill={O} />
    <ellipse cx="40" cy="74" rx="6" ry="4" fill={O} />
    <path
      d="M20 10 Q16 22 20 34 L40 38 L56 32 Q62 20 56 10 Q46 6 40 10 Q36 6 20 10Z"
      fill={O}
    />
    <path d="M20 10 Q14 22 20 34 L26 30 Q22 22 24 12Z" fill={W} opacity="0.5" />
    <path d="M22 12 Q18 22 22 32 L24 30 Q20 22 23 13Z" fill={W} opacity="0.3" />
    <ellipse cx="44" cy="24" rx="6" ry="5" fill={BG} />
    <ellipse cx="44" cy="24" rx="4" ry="3" fill={O} opacity="0.4" />
    <circle cx="44" cy="24" r="2" fill={W} opacity="0.3" />
  </svg>
);

// ─── 16. Bow ──────────────────────────────────────────────────────────────────
const Bow: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <line
      x1="12"
      y1="66"
      x2="68"
      y2="14"
      stroke={W}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M68 14 L60 18 L64 22Z" fill={O} />
    <path d="M12 66 L8 60 L14 62Z" fill={O} />
    <path d="M12 66 L14 72 L18 68Z" fill={W} />
    <path
      d="M16 72 Q4 40 16 8"
      stroke={O}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="72"
      x2="16"
      y2="8"
      stroke={W}
      strokeWidth="1.5"
      strokeDasharray="2,2"
    />
    <circle cx="16" cy="40" r="4" fill={BG} stroke={O} strokeWidth="2" />
    <circle cx="16" cy="40" r="1.5" fill={O} />
    <line x1="12" y1="36" x2="20" y2="36" stroke={W} strokeWidth="1.5" />
    <line x1="12" y1="40" x2="20" y2="40" stroke={W} strokeWidth="1.5" />
    <line x1="12" y1="44" x2="20" y2="44" stroke={W} strokeWidth="1.5" />
    <circle cx="40" cy="40" r="3" fill={O} />
  </svg>
);

// ─── 17. Castle ───────────────────────────────────────────────────────────────
const Castle: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <rect x="12" y="36" width="56" height="36" rx="2" fill={W} />
    <path d="M30 72 L30 56 Q40 48 50 56 L50 72Z" fill={BG} />
    <rect x="20" y="46" width="8" height="10" rx="1" fill={BG} />
    <rect x="52" y="46" width="8" height="10" rx="1" fill={BG} />
    <rect x="12" y="28" width="8" height="10" rx="1" fill={O} />
    <rect x="24" y="28" width="8" height="10" rx="1" fill={O} />
    <rect x="36" y="28" width="8" height="10" rx="1" fill={O} />
    <rect x="48" y="28" width="8" height="10" rx="1" fill={O} />
    <rect x="60" y="28" width="8" height="10" rx="1" fill={O} />
    <rect x="26" y="10" width="28" height="28" rx="2" fill={W} />
    <rect x="26" y="8" width="6" height="6" rx="1" fill={O} />
    <rect x="35" y="8" width="6" height="6" rx="1" fill={O} />
    <rect x="44" y="8" width="6" height="6" rx="1" fill={O} />
    <path d="M34 18 L34 30 Q40 24 46 30 L46 18 Q40 14 34 18Z" fill={BG} />
    <line x1="40" y1="8" x2="40" y2="2" stroke={O} strokeWidth="1.5" />
    <path d="M40 2 L52 5 L40 8Z" fill={O} />
  </svg>
);

// ─── 18. Moon ─────────────────────────────────────────────────────────────────
const Moon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    {(
      [
        [18, 14],
        [62, 18],
        [70, 46],
        [58, 68],
        [22, 66],
        [10, 36],
        [50, 10],
        [30, 8],
      ] as [number, number][]
    ).map(([x, y]) => (
      <circle
        key={`${x}-${y}`}
        cx={x}
        cy={y}
        r={y < 20 || y > 60 ? 1.5 : 1}
        fill={W}
        opacity="0.7"
      />
    ))}
    <path
      d="M46 10 Q70 24 68 48 Q66 68 44 72 Q62 60 62 40 Q62 20 46 10Z"
      fill={O}
    />
    <path
      d="M44 12 Q66 26 64 50 Q62 68 44 72 Q60 60 60 40 Q60 20 44 12Z"
      fill={W}
      opacity="0.15"
    />
    <circle
      cx="56"
      cy="26"
      r="4"
      stroke={W}
      strokeWidth="1"
      fill="none"
      opacity="0.4"
    />
    <circle
      cx="62"
      cy="44"
      r="3"
      stroke={W}
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
    <circle
      cx="52"
      cy="58"
      r="5"
      stroke={W}
      strokeWidth="1"
      fill="none"
      opacity="0.35"
    />
    <path
      d="M22 40 L24 34 L26 40 L32 40 L27 44 L29 50 L24 46 L19 50 L21 44 L16 40Z"
      fill={W}
      opacity="0.8"
    />
  </svg>
);

// ─── 19. Lightning ────────────────────────────────────────────────────────────
const Lightning: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <path
      d="M50 8 L28 42 L42 42 L30 72 L58 34 L44 34Z"
      fill={O}
      opacity="0.2"
      transform="scale(1.08) translate(-3,-3)"
    />
    <path d="M50 8 L28 42 L42 42 L30 72 L58 34 L44 34Z" fill={O} />
    <path
      d="M48 14 L32 42 L44 42 L34 64 L52 36 L40 36Z"
      fill={W}
      opacity="0.4"
    />
    <path
      d="M46 18 L36 40 L46 40 L38 56"
      stroke={W}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      strokeLinecap="round"
    />
    <line
      x1="56"
      y1="20"
      x2="64"
      y2="16"
      stroke={O}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="28"
      x2="68"
      y2="26"
      stroke={O}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="56"
      x2="14"
      y2="58"
      stroke={O}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="64"
      x2="16"
      y2="68"
      stroke={O}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 20. Tree ─────────────────────────────────────────────────────────────────
const Tree: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect width="80" height="80" rx="14" fill={BG} />
    <rect x="33" y="58" width="14" height="16" rx="3" fill={O} />
    <line
      x1="37"
      y1="58"
      x2="37"
      y2="74"
      stroke={BG}
      strokeWidth="0.8"
      opacity="0.4"
    />
    <line
      x1="43"
      y1="58"
      x2="43"
      y2="74"
      stroke={BG}
      strokeWidth="0.8"
      opacity="0.4"
    />
    <ellipse cx="40" cy="74" rx="16" ry="4" fill={O} opacity="0.4" />
    <path d="M16 58 L40 30 L64 58Z" fill={W} />
    <path d="M20 46 L40 18 L60 46Z" fill={W} />
    <path d="M26 34 L40 10 L54 34Z" fill={W} />
    <circle cx="40" cy="10" r="4" fill={O} />
    <circle cx="28" cy="34" r="3" fill={O} opacity="0.7" />
    <circle cx="52" cy="34" r="3" fill={O} opacity="0.7" />
    <circle cx="22" cy="48" r="2.5" fill={O} opacity="0.6" />
    <circle cx="40" cy="44" r="2.5" fill={O} opacity="0.6" />
    <circle cx="58" cy="48" r="2.5" fill={O} opacity="0.6" />
    <path
      d="M40 6 L41.5 9 L45 9 L42.5 11 L43.5 14 L40 12 L36.5 14 L37.5 11 L35 9 L38.5 9Z"
      fill={W}
    />
  </svg>
);

// ─── Export ────────────────────────────────────────────────────────────────────

export const CLAN_EMBLEMS: ClanEmblem[] = [
  { id: 1, name: "Eagle", Svg: Eagle },
  { id: 2, name: "Lion", Svg: Lion },
  { id: 3, name: "Dragon", Svg: Dragon },
  { id: 4, name: "Wolf", Svg: Wolf },
  { id: 5, name: "Phoenix", Svg: Phoenix },
  { id: 6, name: "Shield", Svg: ShieldEmblem },
  { id: 7, name: "Crown", Svg: Crown },
  { id: 8, name: "Sword", Svg: Sword },
  { id: 9, name: "Anchor", Svg: Anchor },
  { id: 10, name: "Flame", Svg: Flame },
  { id: 11, name: "Star", Svg: StarEmblem },
  { id: 12, name: "Skull", Svg: Skull },
  { id: 13, name: "Bear", Svg: Bear },
  { id: 14, name: "Serpent", Svg: Serpent },
  { id: 15, name: "Axe", Svg: Axe },
  { id: 16, name: "Bow", Svg: Bow },
  { id: 17, name: "Castle", Svg: Castle },
  { id: 18, name: "Moon", Svg: Moon },
  { id: 19, name: "Lightning", Svg: Lightning },
  { id: 20, name: "Tree", Svg: Tree },
];

/** Returns the emblem for a given id (1-based). Falls back to emblem 1. */
export function getEmblem(emblemId: bigint | number | undefined): ClanEmblem {
  const id = Number(emblemId ?? 1);
  return CLAN_EMBLEMS.find((e) => e.id === id) ?? CLAN_EMBLEMS[0];
}
