import type { Metadata } from "next";

import "@/styles/globals.css";
import { poppins } from "@/styles/fonts";
import AuthProvider from "@/components/auth-provider";

export const metadata: Metadata = {
	title: {
		default: "ET: Expense Tracker",
		template: "%s | Expense Tracker",
	},
	description: "Generated by create next app",
	applicationName: "ET: Expense Tracker",
	icons: {
		icon: "/favicon.ico",
		apple: "/assets/bg-logo.svg",
		shortcut: "/assets/bg-logo.svg",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.className} antialiased text-slate-700 dark:text-layout`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
