import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ander Akier Ayucar Chasco — Portfolio";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FAFAF8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#1E3A5F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAFAF8",
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            AA
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#666",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Portfolio · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#1A1A1A",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            Ander Akier Ayucar
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#1E3A5F",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Ingeniero Informático Junior
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#444",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            Data · Software · ML &amp; IA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "2px solid #1E3A5F",
          }}
        >
          <div style={{ fontSize: "20px", color: "#666", display: "flex" }}>
            Industria real (Michelin) · TFG con ML · 4 idiomas · Movilidad total
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#1E3A5F",
              fontWeight: 600,
              display: "flex",
            }}
          >
            Disponibilidad inmediata
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
