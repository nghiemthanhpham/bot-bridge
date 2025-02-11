import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bot Bridge",
  description:
    "BotBridge is a powerful chatbot embedding solution that allows you to integrate AI assistants into your website in minutes.",
  openGraph: {
    title: "Bot Bridge",
    description:
      "BotBridge is a powerful chatbot embedding solution that allows you to integrate AI assistants into your website in minutes.",
    url: "https://imutably.com",
    images: [
      {
        url: "https://blog.dktcdn.net/files/chat-bot-la-gi.png",
        width: 1200,
        height: 630,
        alt: "Bot Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bot Bridge",
    description:
      "BotBridge is a powerful chatbot embedding solution that allows you to integrate AI assistants into your website in minutes.",
    images: [
      "https://blog.dktcdn.net/files/chat-bot-la-gi.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
