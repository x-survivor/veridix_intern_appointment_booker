import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import ReduxStoreProvider from "@/shared/lib/ReduxStoreProvider";
import { Header } from "@/shared/components/header";
import Logo from "@/shared/components/logoSVG";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react"

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Your Health",
  description: "Doctor's Appointment platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col lg:flex-row max-h-screen">
        <ReduxStoreProvider>
          <Header />
          <section className="w-full">
            <header className="w-full h-20 px-6 flex justify-between items-center">
              <Logo className="w-25" />
              <div className="w-1/4 flex justify-between items-center lg:border border-foreground rounded-full px-2 gap-2">
                <Input type="text" className="hidden lg:block lg:w-[90%] border-0 px-2" placeholder="Search"/>
                <div className="flex justify-end lg:justify-center items-center w-full lg:w-[10%]">
                  <Search />
                </div>
              </div>
            </header>
            {children}
          </section>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
