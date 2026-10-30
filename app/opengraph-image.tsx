import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PulseFlow: Diagrams in. Terraform out. Drift handled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0d14",
          padding: "72px",
          color: "#e8ecf3",
          fontFamily:
            "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid rgba(232,236,243,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ∿
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>PulseFlow</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2, lineHeight: 1.15, display: "flex" }}>
            Draw your architecture.
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2, color: "#22d3ee" }}>
              Ship the infrastructure.
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#98a3b6", marginTop: 8 }}>
            Diagrams in. Terraform out. Drift handled.
          </div>
        </div>
      </div>
    ),
    size
  );
}
