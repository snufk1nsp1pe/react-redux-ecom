// The Bloom & Sole brandmark: a flower growing out of a sock, combining
// both halves of the catalog (Flowers + Socks) into one icon.
// The sock outline uses "currentColor" so it inherits whatever text color
// is set on it via CSS (and automatically adapts between light/dark mode).
export function BrandMark({ className = "brand-mark" }) {
  return (
    <svg
      viewBox="0 -220 256 476"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Stem */}
      <line x1="98" y1="-130" x2="98" y2="18" stroke="#7A9A4A" strokeWidth="8" strokeLinecap="round" />

      {/* Leaf */}
      <path d="M98 -60 Q130 -82 145 -60 Q122 -46 98 -60 Z" fill="#7A9A4A" />

      {/* Outer petals */}
      <ellipse cx="98" cy="-165" rx="20" ry="52" fill="#C9A96E" transform="rotate(0 98 -165)" />
      <ellipse cx="98" cy="-165" rx="20" ry="52" fill="#C9A96E" transform="rotate(45 98 -165)" />
      <ellipse cx="98" cy="-165" rx="20" ry="52" fill="#C9A96E" transform="rotate(90 98 -165)" />
      <ellipse cx="98" cy="-165" rx="20" ry="52" fill="#C9A96E" transform="rotate(135 98 -165)" />

      {/* Inner petals */}
      <ellipse cx="98" cy="-165" rx="15" ry="42" fill="#E8C27A" transform="rotate(22.5 98 -165)" />
      <ellipse cx="98" cy="-165" rx="15" ry="42" fill="#E8C27A" transform="rotate(67.5 98 -165)" />
      <ellipse cx="98" cy="-165" rx="15" ry="42" fill="#E8C27A" transform="rotate(112.5 98 -165)" />
      <ellipse cx="98" cy="-165" rx="15" ry="42" fill="#E8C27A" transform="rotate(157.5 98 -165)" />

      {/* Flower center */}
      <circle cx="98" cy="-165" r="26" fill="#5C3D11" />

      {/* Cuff */}
      <rect x="38" y="18" width="120" height="42" rx="18" stroke="currentColor" strokeWidth="12" />

      {/* Sock outline */}
      <path
        d="
          M52 60
          V140
          C52 181 70 202 112 216
          L158 231
          C191 241 220 218 220 184
          C220 159 207 142 177 128
          L160 120
          C150 115 145 105 145 92
          V60
        "
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Heel */}
      <path
        d="M52 137 C92 141 118 169 119 216"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Foot seam */}
      <path
        d="M177 128 L158 231"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BrandMark;
