import type { Metadata } from 'next'
import './globals.css'
import WalletContextProvider from './_components/WalletContextProvider'
import { ButtonAppBar } from './_components/AppBar'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Soldash Crypto Dashboard',
  description: 'A dashboard for the Solana Blockchain ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletContextProvider>
      <html lang="en">
        <body>
          <ButtonAppBar />
          {children}
        </body>
      </html>
    </WalletContextProvider>
  )
}
