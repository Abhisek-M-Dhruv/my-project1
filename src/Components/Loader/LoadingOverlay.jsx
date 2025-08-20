// src/components/LoadingOverlay.jsx
import React from "react";
import { Hourglass } from "react-loader-spinner";

export default function LoadingOverlay({ loading }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(209, 204, 204, 0.4)",
        backdropFilter: "blur(1px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}
