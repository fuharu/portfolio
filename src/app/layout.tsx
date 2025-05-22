"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Header({ onToggleTheme, theme }: { onToggleTheme: () => void; theme: string }) {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow flex items-center px-6 py-3 justify-between">
      <div className="flex items-center gap-8">
        <Link href="/chatbot" className="text-xl font-bold text-blue-700 hover:underline">
          haruto&apos;s Home
        </Link>
        <nav className="flex gap-6">
          <Link href="/chatbot" className="hover:text-blue-600 font-medium">チャットボット</Link>
          <Link href="/portfolio" className="hover:text-blue-600 font-medium">ポートフォリオ</Link>
          <Link href="/blog" className="hover:text-blue-600 font-medium">Blog</Link>
          <Link href="/service" className="hover:text-blue-600 font-medium">My Service</Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          aria-label="テーマ切替"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? (
            // 太陽アイコン
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            // 月アイコン
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // テーマ状態管理
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <html lang="ja" className={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Header onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
