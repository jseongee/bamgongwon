import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import NextTopLoader from "nextjs-toploader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "밤공원",
    template: "%s | 밤공원",
  },
  description: "플레이리스트를 신청하고 제작 현황을 확인하세요.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "밤공원",
    title: { default: "밤공원", template: "%s | 밤공원" },
    description: "플레이리스트를 신청하고 제작 현황을 확인하세요.",
  },
  twitter: {
    card: "summary",
    title: { default: "밤공원", template: "%s | 밤공원" },
    description: "플레이리스트를 신청하고 제작 현황을 확인하세요.",
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <NextTopLoader
            color="var(--color-primary)"
            height={2}
            showSpinner={false}
            easing="ease"
            speed={300}
          />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
