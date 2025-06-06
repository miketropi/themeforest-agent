import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-sans",
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: "Themeforest Agent",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ spaceMono.variable } ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
