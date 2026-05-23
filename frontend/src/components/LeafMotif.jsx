// Small inline SVG leaf motif matching the Trio Collectives logo branch
export default function LeafMotif({ className = "", stroke = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 10 C 60 70, 60 140, 60 210"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Pairs of leaves alternating sides */}
      {[30, 60, 90, 120, 150, 180].map((y, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <g key={y}>
            <path
              d={`M60 ${y} C ${60 + side * 8} ${y - 14}, ${60 + side * 28} ${y - 18}, ${60 + side * 36} ${y - 4} C ${60 + side * 28} ${y + 6}, ${60 + side * 10} ${y + 6}, 60 ${y}`}
              fill={stroke}
              fillOpacity="0.18"
              stroke={stroke}
              strokeWidth="0.9"
            />
          </g>
        );
      })}
    </svg>
  );
}
