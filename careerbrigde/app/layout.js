import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CareerBridge | Connect Talent with Opportunity",
  description: "Explore verified careers, apply directly to forward-thinking companies, and hire exceptional candidates with CareerBridge.",
  icons: {
    icon: "/iconpeople.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white"
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
