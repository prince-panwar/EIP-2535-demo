import { Inter } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <Web3ModalProvider>
        {children}
       </Web3ModalProvider>
        </body>
    </html>
  );
}
