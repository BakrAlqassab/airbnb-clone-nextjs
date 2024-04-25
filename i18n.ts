import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "sv", "fi"];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    console.log("sdss")
    console.log(locale)
    if (!locales.includes(locale as any)) console.log("weaewewe ");

    return {
        messages: (await import(`./app/i18n/messages_${locale}.json`)).default,
    };
});
