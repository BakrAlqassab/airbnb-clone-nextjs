"use client"
import Container from "../Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";
import {safeUser} from "@/app/types";
import Categories from "@/app/components/navbar/Categories";
import LanguageSelector from "@/app/components/navbar/LanguageSelector";
import { useLocale } from "next-intl";
import { language, useMessagesObject, useMessagesServer } from "@/app/utils/utils";
import Image from "next/image";
const messages = useMessagesObject();
const lang = useLocale as language;
export default function Navbar({currentUser}:{currentUser?:safeUser | null}) {






    const lang = useLocale();

    const messages = useMessagesObject();
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo/>
                        <Search/>
                        <LanguageSelector messages={messages} currentLanguage={lang}
                                          className={`${currentUser ? "hidden" : ""} lg:flex`}/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>

            <Categories/>
        </div>
    )
}
