// src/components/SectionLoader.jsx
import React from "react";
import "../styles/SectionLoader.css";

export default function SectionLoader({ height = "300px" }) {
  return (
    <div className="section-loader" style={{ height }}>
      <div className="shimmer" />
    </div>
  );
}
