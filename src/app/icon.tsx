import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          background: "linear-gradient(135deg, #4968d2, #8056ca)",
          color: "white",
          fontSize: 35,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        V
      </div>
    ),
    size,
  );
}
