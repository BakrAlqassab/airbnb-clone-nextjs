"use client";

// import { getContentfulErrorPage } from "@/utils/contentfulUtils";
import React, { useEffect, useState } from "react";
import Widgets from "@/components/widgets/Widgets";
export default function ContentfulErrorPage() {
  const [widgets, setWidgets] = useState<object[]>([]);
  // async function getErrorPage() {
  //   try {
  //     const ErrorItems = await getContentfulErrorPage(
  //       "page",
  //       "-sys.createdAt",
  //       6,
  //     );
  //
  //     return ErrorItems[0];
  //   } catch (e) {
  //     console.log("error getting codes");
  //   }
  // }

  useEffect(() => {
    getErrorPage().then(function (result: any) {
      setWidgets(result.fields.widgets);
    });
  }, []);
  return (
    <div className="error-page overflow-hidden">
      {/*{widgets?.length ? <Widgets widgets={widgets} /> : "Page not found"}*/}
    </div>
  );
}
