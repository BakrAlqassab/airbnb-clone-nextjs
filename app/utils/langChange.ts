// import { getEntries, withAllLocales } from "@/utils/contentfulUtils";
import { language } from "./utils";
// import { getLang } from "../utils/serverUtils";

export default async function langChange(lang: string, pathName: string) {
    const simplePaths = ["account"];

    const pathParts = pathName.split("/");

    // This is the on after the locale, so 'account' in ...fi/en/(account)/login
    // this will be undefined on homepage
    const firstSlug = pathParts[2];

    const langCode = pathName ? pathName.split("/") : [];

    const slugAfterLocale = pathName.substring(langCode[1].length + 1);

    // if homepage or a path we have whitelisted, make simple conversion
    if (!firstSlug || simplePaths.includes(firstSlug)) {
        return "/" + lang + slugAfterLocale;
    }

    // Next we check weather we are on a contentful page
    // const page = await getEntries({
    //     content_type: "page",
    //     "fields.slug": firstSlug,
    //     include: 1,
    //     locale: await getLang(),
    // });
    //
    // if (page.items.length) {
    //     // We found a contentful page for the slug
    //     // redirect to translated slug /en/about-us -> /fi/meista
    //     const ent = await withAllLocales(page.items[0].sys.id);
    //     return "/" + lang + "/" + ent.fields.slug[lang];
    // }

    // finally, do a simple lang redirect /fi/pictureframe-12 -> /sv/pictureframe-12
    return "/" + lang + slugAfterLocale;
}
