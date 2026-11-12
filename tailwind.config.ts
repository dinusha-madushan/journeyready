import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: { navy: "#12406e", orange: "#f58220" } } } },
  plugins: [],
};
export default config;
