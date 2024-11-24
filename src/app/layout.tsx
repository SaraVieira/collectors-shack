import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Salsa's Shack Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionProvider>
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <div className="container mx-auto my-12">
                  <div className="flex items-center justify-between">
                    <SidebarTrigger />
                    <Button>
                      <Link href={"/games/add"}>
                        <PlusIcon />
                      </Link>
                    </Button>
                  </div>
                  {children}
                </div>
              </SidebarProvider>
            </SessionProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
