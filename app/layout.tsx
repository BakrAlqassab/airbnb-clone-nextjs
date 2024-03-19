import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import Modal from "@/app/components/modals/Modal";

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb App',
  description: 'Airbnb App clone project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <Modal isOpen={true} title="Login Modal" actionLabel="Submit"/>
      <Navbar/>
      {children}</body>
    </html>
  )
}
