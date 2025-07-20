import React from "react";

const DoneIcon: React.FC<{
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
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default DoneIcon;
