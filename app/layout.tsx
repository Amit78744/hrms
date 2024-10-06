import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head"
import { Provider } from  "./provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "HRM - Anviya Technologies",
  description: "",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <base href="" />
        <title>Metronic</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/assets/media/logos/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" />
        <link href="/assets/plugins/global/plugins.bundle.css"  rel="stylesheet" type="text/css" />
        <link href="/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/custom.css" rel="stylesheet" type="text/css" />
      </head>
      <Provider>
        <body suppressHydrationWarning={true}>    
          {/*<Toaster position="top-right" /> */}     
          {children}
        </body>
      </Provider>
    </html>
  );
}
