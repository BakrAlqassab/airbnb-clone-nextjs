import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
// import {useLocale} from "next-intl";

const font = Nunito({ subsets: ['latin'] })




export const metadata: Metadata = {
  title: 'Airbnb App',
  description: 'Airbnb App clone project',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
    // const lang = useLocale();
  return (
      <html lang={"lang"}>
      <body className={font.className} >
      {/*<Modal isOpen={false} title="Login Modal" actionLabel="Submit"/>*/}
      <ToasterProvider/>
      <RegisterModal/>
      <LoginModal/>
      <RentModal/>
      <Navbar currentUser={currentUser}/>
      <div className="pb-20 pt-28">
        {children}
      </div>
      </body>
      </html>
  )
}