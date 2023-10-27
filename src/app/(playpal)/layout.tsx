import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/libs/styles/globals.css'
import Navbar from '@/components/layouts/Navbar'
import { ThemeProvider } from '@/libs/providers/ThemeProvider'
import Sidebar from '@/components/layouts/Sidebar'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playpal',
  description: 'A community for gamers!',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoginModal />
            <RegisterModal />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }