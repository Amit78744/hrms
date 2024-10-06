import type { Metadata } from "next";
import "../globals.css";
import Head from "next/head"
import Script from 'next/script';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Provider } from  "../provider";
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
      <body id="kt_app_body" data-kt-app-header-fixed-mobile="true" data-kt-app-toolbar-enabled="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" className="app-default" suppressHydrationWarning={true}>
          <Toaster position="top-right" /> 
          <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
            <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
              <Header />
              
              <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                
                <div id="kt_app_toolbar" className="app-toolbar">                  
                  <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                  </div>
                </div>

                <Sidebar />

                {/*begin::Main*/}
                <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                  <div className="d-flex flex-column flex-column-fluid">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                      <div id="kt_app_content_container" className="app-container container-fluid">
                          {children}
                      </div>
                    </div>
                  </div>

                  <Footer />
                </div>

              </div>
            </div>   
          </div> 

          {/*begin::Scrolltop*/}
          <div id="kt_scrolltop" className="scrolltop" data-kt-scrolltop="true">
            <i className="ki-outline ki-arrow-up" />
          </div>
          {/*end::Scrolltop*/} 

          <script src="/assets/plugins/global/plugins.bundle.js"></script>
          <script src="/assets/js/scripts.bundle.js"></script>
      </body>
      </Provider>
    </html>
  );
}
