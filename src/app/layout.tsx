import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import Header from "@/widgets/header/ui/Header";
import localFont from "next/font/local";
import QueryProvider from "./providers/QueryProvider/QueryProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import "./global.css";
import Footer from "@/widgets/Footer/ui/Footer";

const publicFont = Nunito({ subsets: ["latin"] });
const oldEnglishFont = localFont({
  src: "../shared/assets/fonts/old-english.ttf",
});

export const metadata: Metadata = {
  title: "Аксессуар Про",
  description: "АксессуарПро",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <AuthProvider>
          <body>
            <Header />
            <main
              className={`${publicFont.style} ${oldEnglishFont.style} overflow-hidden`}
            >
              {children}
            </main>
            <Footer />
            <ToastContainer
              theme="dark"
              rtl={false}
              toastClassName="!bg-black"
              toastStyle={{ backgroundColor: "black" }}
            />
          </body>
        </AuthProvider>
      </QueryProvider>
    </html>
  );
}
