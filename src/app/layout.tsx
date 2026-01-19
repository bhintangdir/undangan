import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
  title: "Undangan Pernikahan Deky dan Nia",
  description: "Undangan Pernikahan Deky dan Nia",
  keywords: "undangan, wedding, undangan digital, undangan online, wedding invitation",
  authors: [{ name: "bhintangdir" }],
  openGraph: {
    title: "Undangan Pernikahan Deky dan Nia",
    description: "Undangan Pernikahan Deky dan Nia",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/assets/images/bg.JPG",
        width: 980,
        height: 980,
        alt: "Website Undangan Pernikahan Deky dan Nia Secara Online",
      },
    ],
  },
  icons: {
    icon: '/assets/images/icon-192x192.png',
    apple: '/assets/images/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-bs-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Noto+Naskh+Arabic&family=Sacramento&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Undangan Deky & Nia" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
