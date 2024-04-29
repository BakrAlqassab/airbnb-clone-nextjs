
import CmsPage from "@/app/components/page/CmsPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: any;
}) {
  // slug is the url parameter used to detect the type of routable entity
  const { slug } = params;
  if (!(Array.isArray(slug) && slug.length)) {
    return null;
  }

  // currentPage parameter of category products
  const { page } = searchParams;
  const urlPath = slug.join("/");


  return (
        <div className="slug-wrapper">
          <CmsPage slug={urlPath} />
        </div>
  )
}
