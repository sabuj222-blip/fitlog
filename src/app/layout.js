import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PlanProvider } from "./context/PlanContext";
import { Toaster } from "react-hot-toast";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${oswald.variable}`}>
      <body className="bg-[#0a0a0c] text-white flex flex-col min-h-screen">
        <PlanProvider>
          <Toaster position="bottom-right" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}