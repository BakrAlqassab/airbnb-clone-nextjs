import en from "@/app/i18n/messages_en.json";
import fi from "@/app/i18n/messages_fi.json";
import sv from "@/app/i18n/messages_sv.json";

import { useLocale } from "next-intl";
import {notFound} from "next/navigation";
export let LANG: language = "fi";

export async function setLang(lang: language) {
    LANG = lang;
}

type Val = boolean | string | number | object;
export function stringQueryFromObject(str: string, obj: Record<string, Val>) {
    function index(obj: any, i: any) {
        return obj[i];
    }

    let s: string | Record<string, Val> = str;
    try {
        s = str.split(".").reduce(index, obj);
    } catch (e) {
    }

    if (typeof s !== "string") return str;

    return s;

}
export function useMessagesObject() {
    const locale = useLocale;

    const _langObject: Record<language, Record<string, object | string>> = {
        en,
        sv,
        fi,
    };
    return _langObject[locale as language];
}



export function useMessagesServer() {
    const _langObject_lang = useMessagesObject();

    return function (str: string) {
        return stringQueryFromObject(str, _langObject_lang);
    };
}

function useMessageObject() {
    const _langObject: Record<language, Record<string, any>> = {
        en,
        sv,
        fi,
    };

    let lang = useLocale();
    const locales = ["en", "sv", "fi"];

    //default language will be english when there is typo in the language local code
    // if (!locales.includes(lang as any)) lang ="fi";

    const _langObject_lang = _langObject[lang as language];
    return _langObject_lang;
}

export type language = "en" | "fi" | "sv";
export function useMessages() {
    const _langObject_lang = useMessageObject();


    return function (str: string) {
        return stringQueryFromObject(str, _langObject_lang);
    };
}
