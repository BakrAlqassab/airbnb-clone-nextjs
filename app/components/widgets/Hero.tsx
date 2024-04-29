"use client";

{/* prettier-ignore */}

import React from "react";
 import LspdButton from "@/app/components/client/LspdButton";
import { useRouter } from "next/navigation";
export default function Hero({ content }: any) {
  const router = useRouter();
  const iconUrl = content.fields?.icon?.fields?.file.url;
  const iconAlt = content.fields?.icon?.fields?.title;
  const title = content.fields.heroTitle;
  const description = content.fields.heroDescription;
  const buttons = content.fields.buttons;
  const textAlign = content.fields.textAreaAlign;
  const bgImageUrl = content.fields.backgroundImage.fields.file.url;

  let alignClass = "items-start md:left-0";

  if (textAlign === "right") {
    alignClass = "items-end md:right-0";
  }
  if (textAlign === "center") {
    alignClass = "items-center";
  }

  const alignClassMobile =
    textAlign === "right" || textAlign === "center" ? "text-center" : "";

  const logoClassMobile =
    textAlign === "right" || textAlign === "center" ? "w-full" : "";

  const buttonsClassMobile =
    textAlign === "right" || textAlign === "center" ? "flex-col" : "";

  return (
    <div
      className="hero h-[375px] max-[768px]:h-[550px] w-full relative flex
    flex-col items-center my-2"
    >
      <div
        className={`flex offset3 span6 h-full w-screen hero-image max-[768px]:h-[50%] `}
        style={{ backgroundImage: `url(${bgImageUrl}` }}
      ></div>
      <div
        className={`w-[660px] max-[768px]:w-11/12 h-[270px]  my-6 bg-white  rounded-2xl max-[768px]:mx-4 flex items-center p-8 max-[768px]:p-4 flex-col absolute top-6 max-[768px]:top-36 md:${alignClass}`}
      >
        {iconUrl && (
          <div className={`self-start max-[768px]:${logoClassMobile}`}>
            <img
              src={iconUrl}
              alt={iconAlt || ""}
              width="100"
              className={"my-4 m-auto  "}
            />
          </div>
        )}
        <div className={`self-start max-[768px]:${alignClassMobile}`}>
          <h3 className="text-3xl my-2">{title}</h3>
          <p>{description}</p>
          <div className={`flex max-[768px]:${buttonsClassMobile}`}>
            {buttons &&
              buttons.map((button: any, index: number) => (
                <div key={index} className={`my-4 mr-2 flex  `}>
                  <LspdButton
                    disabled={false}
                    onClick={() => router.push(button.fields.slug)}
                    label={button.fields.entryName}
                    className="font-semibold max-[768px]:w-full"
                    theme={button.fields.linkType || "primary"}
                    external={button.fields.urlPath ? true : false}
                    URL={button.fields.urlPath}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
