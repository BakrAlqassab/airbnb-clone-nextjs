
import { getEntries, withAllLocales } from "@/app/utils/contentfulutils";
import { getLang } from "@/app/utils/serverUtils";
export default async function langChange(lang: string, pathName: string) {
    const simplePaths = ["account"];

    const pathParts = pathName.split("/");

    const firstSlug = pathParts[2];

    const langCode = pathName ? pathName.split("/") : [];

    const slugAfterLocale = pathName.substring(langCode[1].length + 1);
    // if homepage or a path we have whitelisted, make simple conversion
    if (!firstSlug || simplePaths.includes(firstSlug)) {
        return "/" + lang + slugAfterLocale;
    }
    // Next we check weather we are on a contentful page

    const page = await getEntries({
        content_type: "page",
        "fields.slug": firstSlug,
        include: 1,
        locale: await getLang()
    });

    if (page.items.length) {
        const ent = await withAllLocales(page.items[0].sys.id);
        if(lang!== "sv") {
            return "/" + lang + "/" + ent.fields.slug[lang];
        }
    }

    return "/" + lang + slugAfterLocale;
}
