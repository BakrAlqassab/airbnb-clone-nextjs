/* eslint-disable prettier/prettier */
"use client";
import TextEditor from "@/app/components/widgets/TextEditor";

export interface WysiwygProps {
  content: any;
  alignLeft?: boolean;
  fontSize?: string;
}
export default function BrandContent({
  content,
  alignLeft,
  fontSize = "m",
}: WysiwygProps) {

  return (
    <div className="textContent flex justify-center max-[768px]:text-sm">
      <div
        className={`block w-[660px] max-[768px]:w-full ${
          alignLeft ? "col-start-1" : ""
        } ${fontSize}`}
      >
        <TextEditor content={content} fontSize={fontSize} />
      </div>
    </div>
  );
}
