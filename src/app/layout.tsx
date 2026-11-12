import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/Providers";
import BackgroundVideo from "@/components/BackgroundVideo";

export const metadata: Metadata = {
  title: "JourneyReady – Smart Travel Planner for Sri Lanka",
  description: "Plan it. Prepare it. Explore it.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Background Video */}
        <BackgroundVideo />

        <ErrorBoundary>
          <Providers>
            <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
              <Header />
              <main>{children}</main>
              <footer className="mt-8 text-center text-xs leading-relaxed" style={{ color: "var(--mu)" }}>
                {/* Footer content removed */}
              </footer>
            </div>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
