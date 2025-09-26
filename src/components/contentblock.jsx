import React, { memo, useMemo } from "react";
import "../styles/contentblock.css";

const ContentBlock = ({ id, title, children, background = "#fff", fadeTo }) => {
  // 🔹 Memoiza o estilo para não recriar objeto a cada render
  const sectionStyle = useMemo(
    () => ({
      "--bg-section": background,
      "--bg-next": fadeTo || background,
    }),
    [background, fadeTo]
  );

  return (
    <section
      id={id}
      className={`content-block ${fadeTo ? "has-gradient" : ""}`}
      style={sectionStyle}
    >
      <div className="content-inner">
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </section>
  );
};

// 🔹 Memo aplicado para evitar renders desnecessários
export default memo(ContentBlock);
