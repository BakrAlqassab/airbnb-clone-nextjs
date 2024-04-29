import { getContentfulPages } from "@/app/utils/contentfulutils";
import {getLocale} from "next-intl/server";
import NotFound from "next/dist/client/components/not-found-error";
// import React from "react";
 import Widgets from "@/app/components/widgets/Widgets";
// import ContentfulErrorPage from "@/components/widgets/ContetnfulErrorPage";
// import BreadCrumb from "@/components/client/BreadCrumb";
// import { cookies } from "next/headers";
// import { getLang } from "@/utils/serverutils";
// import { BrandSelector } from "@/components/widgets/BrandContent";

async function getPathDataForSlugs(
  slugParts: Array<string>,
  lang: string,
) {
  // Initialize path data array
  const breadcrumbs: any[] = [];

  // Break out?
  if (!slugParts?.length) return breadcrumbs;

  async function searchSubPageData(subPages: any[], currentIndex: number) {
    // Break out if last slug part has been processed
    if (!subPages || currentIndex >= slugParts.length) return;

    // Current slug to process
    const slug = slugParts[currentIndex];

    // Search for slug in subPages array
    const subPage = subPages.find((page) => page.fields.slug === slug);

    // If found => add it to breadcrumbs
    if (subPage) {
      // slice => Take all parts beginning from 0 to current index
      const newPathSegment = `${lang}/${slugParts.slice(0, currentIndex + 1).join("/")}`;
      breadcrumbs.push({
        url_path: newPathSegment,
        name: subPage.fields.title,
      });

      // Get data for next index
      await searchSubPageData(subPage.fields.subPages, currentIndex + 1);
    }
  }

  // Initial fetch
  const entry = await getContentfulPages(
    "page",
    slugParts[0],
    "-sys.createdAt",
    10,
  );
  console.log("entry")
  console.log(entry)

  // Add root entry
  if (entry && entry?.items?.length > 0) {
    breadcrumbs.push({
      url_path: `${lang}/${slugParts[0]}`,
      name: entry.items[0].fields.title,
    });
    console.log("1")


    const subPages = entry.items[0].fields.subPages as Array<any>;
    console.log(subPages)
    const index = 1;

    // Recursion
    await searchSubPageData(subPages, index);
  }

  return breadcrumbs;
}

export default async function CmsPage({ slug }: { slug: string }) {
  const lang = await getLocale();
  const slugParts = slug ? slug.split("/") : [];
  // const breadCrumbValues = await getPathDataForSlugs(slugParts, lang);

  let widgets;
  try {
    const result = await getContentfulPages(
      "page",
      slugParts[slugParts.length - 1],
      "-sys.createdAt",
      10,
    );
    widgets = result ? result.items[0].fields.pageContent : null;
    // widgets = result ? result.items[0].fields.widgets : null;
  } catch (e) {
    console.log("Error getting codes.", e);
    return <NotFound />;
  }

  return (
    <div className="mb-16">
      <div>
        {/*{breadCrumbValues && <BreadCrumb breadCrumbs={breadCrumbValues} />}*/}
        <Widgets widgets={widgets} />
      </div>
    </div>
  );
}
