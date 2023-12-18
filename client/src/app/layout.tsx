import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "../../public/globals.css";
const libre = Libre_Franklin({ subsets: ['latin']});

export const metadata: Metadata = {
  title: "MagicPost",
  icons: "/favicon.ico",
};

/*
So if you have a app/parent/layout.tsx and app/parent/child/layout.tsx:

When you visit /parent, only parent/layout.tsx will be applied
When you visit /parent/child, both layouts will be applied, with parent/child/layout.tsx wrapped by parent/layout.tsx
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={libre.className}>
        {children}
      </body>
    </html>
  );
}
