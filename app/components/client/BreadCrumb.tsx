import React from "react";
import {useMessages} from "@/app/utils/utils";
import Link from "next/link";

const BreadCrumb = ({ breadCrumbs }: { breadCrumbs: any[] }) => {
  const t = useMessages();

  return (
    <nav className="flex my-2 p-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center link text-sm text-brand-black"
          >
            {t("navigation.home")}
          </Link>
        </li>
        {breadCrumbs.map((bc, index) => {
          const isLast = index === breadCrumbs.length - 1;

          return (
            <li key={bc.uid}>
              <div className="flex items-center">
                <span className="text-sm text-brand-black">/</span>
                <Link
                  href={isLast ? "" : "/" + bc.url_path || "#"}
                  className={`link ml-1 text-sm ${isLast ? "font-normal" : "font-semibold"} text-brand-black ${isLast ? "no-underline" : "underline"} hover:no-underline md:ml-2 hyphens-auto`}
                >
                  {bc.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
