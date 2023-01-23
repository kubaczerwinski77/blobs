import React from "react";

const Hud = ({ children, justify = "center", align = "center" }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
};

export default Hud;
