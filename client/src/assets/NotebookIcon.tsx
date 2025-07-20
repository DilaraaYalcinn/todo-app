import React from "react";

const NotebookIcon: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ width = 28, height = 28, color = "black", style }) => (
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
      d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
    />
  </svg>
);

export default NotebookIcon;
