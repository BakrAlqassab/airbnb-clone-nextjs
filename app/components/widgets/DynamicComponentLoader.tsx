import React, { Suspense, lazy } from "react";
import Accordion from "@/app/components/widgets/Accordion";
import Hero from "@/app/components/widgets/Hero";
import WysiwygBlock from "@/app/components/widgets/WysiwygBlock";
export default function DynamicComponentLoader({
  componentName,
  content,
}: {
  componentName: any;
  content: any;
}) {
  if (!componentName) return;

  if (componentName === "accordion") {
    return <Accordion content={content} />;
  }


  if (componentName === "wysiwygBlock") {
    return <WysiwygBlock content={content} />;
  }

  if (componentName === "hero") {
    return <Hero content={content} />;
  }

  const Component = lazy(
    () =>
      import(
        `./${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`
      ),
  );
  return (
    <Suspense>
      <Component content={content} key={componentName} />
    </Suspense>
  );
}
