import React, { memo } from "react";
import PropTypes from "prop-types";

const Grid = ({ header, main, footer, children }) => {
  return (
    <div className="site-grid">
      {header && <header className="site-header">{header}</header>}
      {main && <main className="site-main">{main}</main>}
      {children}
      {footer && <footer className="site-footer">{footer}</footer>}
    </div>
  );
};

Grid.propTypes = {
  header: PropTypes.node,
  main: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Grid);
