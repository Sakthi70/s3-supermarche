
import { Open_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
// import { GoogleAnalytics } from '@next/third-parties/google';
import 'overlayscrollbars/overlayscrollbars.css';
export const openSans = Open_Sans({
  subsets: ["latin"]
});
// THEME PROVIDER

import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER

import CartProvider from "contexts/CartContext";
// SITE SETTINGS PROVIDER

import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS

import RTL from "components/rtl";
import ProgressBar from "components/progress";
// IMPORT i18n SUPPORT FILE
import "i18n";
import { auth } from "auth";
import Loading from "./loading";
import AppProvider from "contexts/AppContext";
import './style.css';
import CookieConsent from "components/consent/CookieConsent";
export default async function RootLayout({
  children
}) {
  const session = await auth();
  return <html lang="en" suppressHydrationWarning>
    <body className={openSans.className}>
      <SettingsProvider>
        <AppProvider>
          <ThemeProvider>
            <Loading />
            <SessionProvider session={session}>
              <CartProvider>
                <ProgressBar />
                <RTL>{children}</RTL>
              </CartProvider>
              {/* <GoogleAnalytics gaId="G-XKPD36JXY0" /> */}
            </SessionProvider>
       <CookieConsent/>
          </ThemeProvider>
        </AppProvider>
      </SettingsProvider>
    </body>
  </html>;
}