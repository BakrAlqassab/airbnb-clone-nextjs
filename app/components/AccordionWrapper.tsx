import React from "react";
import { ECOIcon } from "@/app/components/client/ECOIcon";
import Image from "next/image";
export default function AccordionWrapper({
  children,
  accordionTitle,
  subTitle,
  className = "",
  open,
  summaryWrapperStyle = "",
  contentWrapperStyle = "",
  titleStyle = "",
}: {
  children: React.ReactNode;
  accordionTitle?: string;
  subTitle?: string;
  className?: string;
  summaryWrapperStyle?: string;
  contentWrapperStyle?: string;
  titleStyle?: string;
  open?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <details className={`accordion max-w-2xl ${className}`} open={open}>
        <summary
          className={`flex gap-2 items-center border-b border-brand-gray-400 py-2 px-4 hover:bg-brand-gray-200 ${summaryWrapperStyle}`}
        >
          {/*<ECOIcon*/}
          {/*  size="xl"*/}
          {/*  label="chevron_down"*/}
          {/*  icon="chevron_down"*/}
          {/*  className={*/}
          {/*    "summary-chevron select-none " + (subTitle ? "self-start" : "")*/}
          {/*  }*/}
          {/*/>*/}

          <Image src="/images/chevron.svg"
                 width={20}
                 height={20}
                 alt="chervon language dropdown icon"
                 className={
              "summary-chevron select-none " + (subTitle ? "self-start" : "")
          }/>
          <div className="flex flex-col gap-2 w-fit grow">
            <h2
              className={`font-semibold select-none text-[28px] pt-2 pb-2 ${titleStyle}`}
            >
              {accordionTitle}
            </h2>
            {subTitle && <span className="text-sm">{subTitle}</span>}
          </div>
        </summary>
        <div
          className={`summary-content text-brand-black ${contentWrapperStyle}`}
        >
          {children}
        </div>
      </details>
    </div>
  );
}
