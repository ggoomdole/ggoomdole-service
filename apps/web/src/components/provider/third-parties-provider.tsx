import { Analytics } from "@vercel/analytics/next";

const isProduction = process.env.NODE_ENV === "production";

export default function ThirdPartiesProvider() {
  return isProduction ? <Analytics /> : null;
}
