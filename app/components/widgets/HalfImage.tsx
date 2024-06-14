"use client";
import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import LspdButton from "@/app/components/client/LspdButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WysiwygBlock({ content }: any) {
  const router = useRouter();

  const alignImage = content.fields.imageAlign;
  const title = content.fields.title;
  const description = content.fields.description;
  const buttons = content.fields?.buttons;
  const imageURL = content.fields?.image?.fields?.file.url;
  const imageAlt = content.fields?.imageAlt;

  return (
    <div>
      <div className="content">
        <div
          className={`my-6 flex justify-between gap-6 items-center w-full max-[768px]:block h-max-16 ${
            alignImage === "Left" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="md:px-4 lg:px-12 md:w-6/12 flex justify-center">
            <div className="text-left">
              <h2 className="my-2">{title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(description).replace(
                    /\n/g,
                    "<br>",
                  ),
                }}
              />
              <div className="flex">
                {buttons &&
                  buttons.map((button: any, index: number) => (
                    <div key={index} className={`my-4 mr-2 flex `}>
                      <LspdButton
                        disabled={false}
                        onClick={() => router.push(button.fields.slug)}
                        label={button.fields.entryName}
                        className="font-semibold max-[768px]:w-full"
                        theme={button.fields.buttonType || "primary"}
                        external={button.fields.urlPath ? true : false}
                        URL={button.fields.urlPath || "#"}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="md:w-6/12">
            <Image
              src={imageURL}
              alt={imageAlt || ""}
              className="m-auto rounded-3xl object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
