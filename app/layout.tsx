import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb App',
  description: 'Airbnb App clone project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
      {/*<Modal isOpen={false} title="Login Modal" actionLabel="Submit"/>*/}
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Navbar currentUser={currentUser}/>
      {children}</body>
    </html>
  )
}
