import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/libs/styles/globals.css'
import Navbar from '@/components/layouts/Navbar'
import { ThemeProvider } from '@/libs/providers/ThemeProvider'
import Sidebar from '@/components/layouts/Sidebar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playpal',
  description: 'A community for gamers!',
}

const SidebarItems = [
  {
      title: "Home",
      href: "/",
  },
  {
      title: "Notifications",
      href: "/notifications",
  },
  {
      title: "Profile",
      href: "/profile",
  }
]

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
          {/* if hindi kasya palitan ng lg: lahat, pati yung nasa Sidebar.tsx */}
          <div className='px-10'>
            <div className='flex space-y-8 md:flex-row md:space-x-12 md:space-y-0 h-full'>

              <aside className="-mx-4 xl:w-1/5 hidden md:block max-lg:w-[30%] max-xl:w-[25%] border-r h-screen">
                <Sidebar items={SidebarItems} />
              </aside>

              <div className='flex-1 md:max-w-2xl md:p-11'>
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}