import React from "react";
import TextEditor from "@/app/components/widgets/TextEditor";
import AccordionWrapper from "@/app/components/AccordionWrapper";
export default function Accordion({ content }: any) {
  const accordionTitle = content.fields.title;
  return (
    <AccordionWrapper accordionTitle={accordionTitle}>
      <TextEditor content={content} />
    </AccordionWrapper>
  );
}
