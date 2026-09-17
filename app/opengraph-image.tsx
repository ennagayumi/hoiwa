import { ImageResponse } from "next/og";

export const alt = "株式会社帆岩｜大地を育てる力を、必要な場所へ。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "90px 110px", color: "white", background: "#102840", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 35 }}>
        <div style={{ display: "flex", width: 88, height: 88, border: "13px solid white", borderTop: "0px", borderBottom: "0px", position: "relative" }}><div style={{ position: "absolute", left: 0, right: 0, top: 34, height: 13, background: "white" }} /></div>
        <div style={{ fontSize: 66, letterSpacing: 8 }}>HOIWA CO., LTD.</div>
      </div>
      <div style={{ marginTop: 70, fontSize: 38, letterSpacing: 4 }}>Supporting growth. Building progress.</div>
      <div style={{ marginTop: 24, color: "#c9ae7a", fontSize: 20, letterSpacing: 4 }}>FERTILIZER MATERIALS / MACHINERY / ASIA &amp; AFRICA</div>
    </div>, size
  );
}
