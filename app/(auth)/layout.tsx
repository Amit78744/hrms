import type { Metadata } from "next";
import Script from 'next/script';
import './style.css'
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "HRM - Anviya Technologies",
  description: "",
};

export default function AuthLayout({
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
      </head>

      <body id="kt_body" className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat" suppressHydrationWarning={true}>
          <Toaster position="top-right" /> 
         {children}
          
          <script src="/assets/plugins/global/plugins.bundle.js"></script>
          <script src="/assets/js/scripts.bundle.js"></script>
      </body>
    </html>
  );
}
