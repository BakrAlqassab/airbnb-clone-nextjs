"use client";

import React, { useState } from "react";
import Image from "next/image";
import { language } from "@/app/utils/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import langChange from "@/app/utils/langChange";
import { useMessages } from "@/app/utils/utils";

interface LanguageSelectorProps {
    className?: string;
    messages: Record<string, any>;
    currentLanguage: string;
}
export default function LanguageSelector({
                                             className,
                                             currentLanguage,

                                         }: LanguageSelectorProps) {


    const [isLangMenuOpen, setLangMenuState] = useState(false);
    const searchParams = useSearchParams()!;

    const pathName = usePathname();
    const router = useRouter();

    const t = useMessages();

    const onClickOutside = (e: any) => {
        const element = document.getElementById("language-menu");
        if (element && !(element === e.target || element.contains(e.target))) {
            window.removeEventListener("mousedown", onClickOutside);
            setLangMenuState(false);
        }
    };

    async function changeLang(lang: language) {
        setLangMenuState(false)
        const routeUrl = await langChange(lang, pathName, searchParams);
        router.push(routeUrl);
    }

    const onLanguageMenuToggle = () => {
        if (isLangMenuOpen) {
            window.removeEventListener("mousedown", onClickOutside);
        } else {
            window.addEventListener("mousedown", onClickOutside);
        }

        setLangMenuState(!isLangMenuOpen);
    };

    const labels = {
        en: "In English",
        sv: "På svenska",
        fi: "Suomeksi",
    };

    const activeClass = `!border-black`;

    return (
        <ul id="language-menu" className={`flex h-full items-center`}>
            <li className={`relative h-full`}>
                <button
                    onClick={() => onLanguageMenuToggle()}
                    className={`flex h-full pl-2 pr-2 items-center gap-1 cursor-pointer ${className}`}
                >
                    <Image src="/images/language.svg" alt="language icon" width={20} height={20} />
                    <span className={"font-bold uppercase"}>{currentLanguage}</span>
                    <Image src="/images/chevron.svg" width={20} height={20} alt="chervon language dropdown icon" />
                </button>
                {isLangMenuOpen && (
                    <ul className="absolute w-auto -mt-2 bg-white rounded-2xl shadow-lg overflow-hidden font-bold left-1/2 -translate-x-1/2">
                        {["fi", "en", "sv"].map((key: string, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className={`flex h-12 hover:bg-slate-100  ${
                                        key === currentLanguage && "bg-slate-100"
                                    }`}
                                >
                                    <button
                                        className={`flex h-full pl-4 pr-4 items-center gap-1 whitespace-nowrap link-secondary ${className}`}
                                        onClick={() => changeLang(key as language)}
                                    >
                                        <div
                                            className={`flex h-auto pl-3 border-l-[3px] border-transparent pr-6 items-center leading-none ${
                                                key === currentLanguage && activeClass
                                            }`}
                                        >
                                            <span className={`flex`}>{labels[key as language]}</span>
                                            <span className={`uppercase block ml-2`}>({key})</span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </li>
        </ul>
    );
}


