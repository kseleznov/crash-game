import type { Metadata } from "next";
import { Providers } from "./providers";
import { geistMono, geistSans } from "./fonts";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crash Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
