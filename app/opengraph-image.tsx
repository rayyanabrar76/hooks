import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social link-preview card: the real HOOKS logo centred on black.
export const alt = "HOOKS — Streetwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo-hd.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={780}
          height={367}
          style={{ objectFit: "contain" }}
          alt=""
        />
        <div
          style={{
            marginTop: 26,
            display: "flex",
            color: "#e6e6e6",
            fontSize: 30,
            letterSpacing: 18,
            textTransform: "uppercase",
          }}
        >
          Streetwear
        </div>
      </div>
    ),
    { ...size },
  );
}
