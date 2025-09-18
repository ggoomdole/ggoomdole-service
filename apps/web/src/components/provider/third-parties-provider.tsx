import { GoogleTagManager } from "@next/third-parties/google";

const isProduction = process.env.NODE_ENV === "production";

export default function ThirdPartiesProvider() {
  return isProduction ? <GoogleTagManager gtmId="G-1JZNH7L35G" /> : null;
}
