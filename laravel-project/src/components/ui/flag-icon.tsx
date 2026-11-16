import * as React from "react";

export function UkFlagIcon({ className = "w-4 h-3 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-flag-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="uk-flag-diag">
        <path d="M0 0l60 30m0-30L0 30" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0 0l60 30m0-30L0 30"
          clipPath="url(#uk-flag-diag)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function UsFlagIcon({ className = "w-4 h-3 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="30" fill="#B22234" />
      {/* 6 White stripes */}
      <rect y="2.3" width="60" height="2.3" fill="#fff" />
      <rect y="6.9" width="60" height="2.3" fill="#fff" />
      <rect y="11.5" width="60" height="2.3" fill="#fff" />
      <rect y="16.1" width="60" height="2.3" fill="#fff" />
      <rect y="20.7" width="60" height="2.3" fill="#fff" />
      <rect y="25.3" width="60" height="2.3" fill="#fff" />
      {/* Blue canton with stars */}
      <rect width="24" height="16.1" fill="#3C3B6E" />
      <g fill="#fff">
        <circle cx="4" cy="3" r="0.9" />
        <circle cx="10" cy="3" r="0.9" />
        <circle cx="16" cy="3" r="0.9" />
        <circle cx="22" cy="3" r="0.9" />
        <circle cx="7" cy="5.5" r="0.9" />
        <circle cx="13" cy="5.5" r="0.9" />
        <circle cx="19" cy="5.5" r="0.9" />
        <circle cx="4" cy="8" r="0.9" />
        <circle cx="10" cy="8" r="0.9" />
        <circle cx="16" cy="8" r="0.9" />
        <circle cx="22" cy="8" r="0.9" />
        <circle cx="7" cy="10.5" r="0.9" />
        <circle cx="13" cy="10.5" r="0.9" />
        <circle cx="19" cy="10.5" r="0.9" />
        <circle cx="4" cy="13" r="0.9" />
        <circle cx="10" cy="13" r="0.9" />
        <circle cx="16" cy="13" r="0.9" />
        <circle cx="22" cy="13" r="0.9" />
      </g>
    </svg>
  );
}
