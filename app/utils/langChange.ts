
import { getEntries, withAllLocales } from "@/app/utils/contentfulutils";
import { getLang } from "@/app/utils/serverUtils";
import qs from "query-string";
import {formatISO} from "date-fns";
export default async function langChange(lang: string, pathName: string, searchParams: any) {
    const simplePaths = ["listings", "properties", "favorites", "reservations"];

    const roomCount = searchParams.get('roomCount')
    const guestCount = searchParams.get('guestCount')
    const bathroomCount = searchParams.get('bathroomCount')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const locationValue = searchParams.get('locationValue')
    const category = searchParams.get('category')

    let currentQuery = {}
    const updateQuery: any = {
        ...currentQuery,
        locationValue,
        guestCount,
        roomCount,
        bathroomCount,
        category
    }

    if (startDate) {
        updateQuery.startDate = formatISO(startDate)
    }

    if (endDate) {
        updateQuery.endDate = formatISO(endDate)
    }


    const url = qs.stringifyUrl({
        url: "/",
        query: updateQuery

    }, {skipNull: true})

    const pathParts = pathName.split("/");

    const firstSlug = pathParts.pop();

    const langCode = pathName ? pathName.split("/") : [];

    const slugAfterLocale = pathName.substring(langCode[1].length + 1);
    // if homepage or a path we have whitelisted, make simple conversion
    if (!firstSlug || simplePaths.includes(firstSlug)) {
        console.log("fff")
        console.log(slugAfterLocale)
        return "/" + lang + slugAfterLocale;
    }
    // Next we check weather we are on a contentful page
        const page = await getEntries({
            content_type: "page",
            "fields.slug": firstSlug,
            include: 1,
            locale:  await getLang() === "sv" ? "fi" : await getLang()
        });

    if (page.items.length && lang !== "sv") {
        const ent = await withAllLocales(page.items[0].sys.id);
            return "/" + lang + "/" + ent.fields.slug[lang];
    }
    return "/" + lang + slugAfterLocale+ url;
}
