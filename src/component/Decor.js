import React from "react";

export function Cloud({ className = "", style }) {
  return (
    <svg className={`s1-cloud ${className}`} style={style} viewBox="0 0 200 90" aria-hidden="true">
      <path
        d="M30 78 C10 78 6 56 24 50 C22 32 44 24 56 36 C62 14 96 10 106 32 C118 20 142 24 144 44 C164 40 182 56 172 72 C170 76 166 78 160 78 Z"
        fill="#fffaf2"
        stroke="#e6d5bf"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M40 64 C46 58 56 58 60 62 M110 50 C118 44 130 46 134 52"
        fill="none"
        stroke="#ecdfcc"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className = "", style }) {
  return (
    <svg className={`s1-star ${className}`} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" />
    </svg>
  );
}
