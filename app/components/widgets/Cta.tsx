import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import LspdButton from "@/app/components/client/LspdButton";
import { useRouter } from "next/navigation";
export default async function CtaBlock({ content }: any) {
  const router = useRouter();
  const title = content.fields.title;
  const description = content.fields.description;
  const buttons = content.fields.buttons;
  const imageURL = content.fields.image?.fields?.file.url;
  const { imageAlt } = content.fields;
  const { backgroundColorSet } = content?.fields;
  return (
    <div>
      <div
        className="leaflet-attribution-flag flex rounded-3xl my-4 h-[270px] max-[768px]:h-full"
      >
        <div
          className={`flex items-center p-3  w-full max-[768px]:block ${
            !imageURL ? "justify-center" : "justify-between"
          }`}
        >
          {imageURL && (
            <div className="w-6/12 text-center max-[768px]:w-full">
              <img
                src={imageURL}
                alt={imageAlt || ""}
                className={"m-auto rounded-3xl object-contain"}
              />
            </div>
          )}
          <div className="p-1 w-6/12 text-center max-[768px]:w-full">
            <div className="text-center">
              <h3 className="my-2">{title}</h3>
              <div
                className={`block offset3 span6`}
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(description).replace(
                    /\n/g,
                    "<br>",
                  ),
                }}
              />
              <div className={`flex  justify-center`}>
                {buttons &&
                  buttons.map((button: any, index: number) => (
                    <div key={index} className={`my-4 mr-2 flex `}>
                      <LspdButton
                        disabled={false}
                        onClick={() => router.push(button.fields.slug)}
                        label={button.fields.entryName}
                        className="font-semibold max-[768px]:w-full"
                        theme={button.fields.linkType || "primary"}
                        external={button.fields.urlPath ? true : false}
                        URL={button.fields.urlPath || "#"}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
