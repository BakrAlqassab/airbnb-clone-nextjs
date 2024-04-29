import { createClient } from "contentful";
import {useLocale} from "next-intl";



const client = createClient({
    space: process.env.CTF_SPACE_ID || "",
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN || "",
});


export function getEntries(obj: Record<string, any>) {
    return client.getEntries(obj);
}

export function withAllLocales(str: string) {
    return client.withAllLocales.getEntry(str);
}

export async function getContentfulPages(
    content_type: string,
    pagePath: any,
    order: any,
    include?: any,
) {
    const lang =  useLocale();
    if (pagePath) {
        const response = await client.getEntries({
            content_type: content_type,
            "fields.slug": pagePath,
            order: order || "-sys.createdAt",
            include: include || 10,
            locale: lang,
        });
        // // Filter items based on brand
        // const filteredItems = response.items.filter((item) =>
        //     item.fields.brandCode ? item.fields.brandCode === brand : true,
        // );
        //
        // // Replace original reponse items
        // const modifiedResponse = {
        //     ...response,
        //     items: filteredItems,
        // };

        return response;
    }

    return false;
}
