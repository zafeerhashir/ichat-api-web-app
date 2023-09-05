import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SocketProvider } from './core/Providers/SocketContext'
import { AppProvider } from './core/Providers/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conversa',
  description: 'Conversa by ZH',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          <AppProvider>
              {children}  
          </AppProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
