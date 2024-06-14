import Image from "next/image";
export default function ContentImage({ content }: any) {
  const imageAlt = content.fields.imageAltText;
  const imageSize = content.fields?.imageSize;

  const imageURL = content.fields.image.fields.file.url;
  return (
    <div className="content-image my-2">
      {/* eslint-disable*/}
      <div
        className={`block offset3 span6 mx-auto max-h-[400px] overflow-hidden rounded-3xl ${
          imageSize === "Medium"
            ? "w-[1116px] max-[768px]:w-10/12"
            : imageSize === "Small"

            ? "w-[888px] max-[768px]:w-10/12"
            : "w-full mobile-w-screen-element"
        }`}
      >
        {/* eslint-enable*/}
        <Image
          src={imageURL}
          alt={imageAlt || ""}
          className="object-contain w-max m-auto pointer-events-auto  h-full"
        />
      </div>
    </div>
  );
}
