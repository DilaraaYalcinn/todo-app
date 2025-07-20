import React from "react";

const UndoIcon: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ width = 22, height = 22, color = "black", style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={color}
    width={width}
    height={height}
    style={style}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9m0 0h5"
    />
  </svg>
);

export default UndoIcon;
