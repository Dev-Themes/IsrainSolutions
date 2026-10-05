export default function ContourBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-overlay">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contours" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q 25 25, 50 50 T 100 50 M0 20 Q 25 -5, 50 20 T 100 20 M0 80 Q 25 55, 50 80 T 100 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contours)" />
      </svg>
    </div>
  );
}
