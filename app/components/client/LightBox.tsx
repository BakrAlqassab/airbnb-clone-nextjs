"use client";
import React from "react";
import { ECOIcon } from "@/components/client/ECOIcon";
import Image from "next/image";

import { useState } from "react";
import { SwiperSlider } from "@/components/client/SwiperSlider";
import { useMessages } from "@/utils/utils";
import { PhotoEventPhoto, PhotoEventPhotos } from "@/types/photoevent";

const LightBox = ({
  photos,
  clickedPhoto,
  onClose,
}: {
  photos: PhotoEventPhotos;
  clickedPhoto: number;
  onClose: any;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(clickedPhoto);
  const t = useMessages();
  const thumbnailImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const chosenImageObject = photos[selectedImageIndex];

  function leftArrowClicked() {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else {
      setSelectedImageIndex(photos.length - 1);
    }
  }
  function rightArrowClicked() {
    if (selectedImageIndex < photos.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  }

  function categoryLinks() {
    return null;
    /**
     * HERE we return null to disable this feature until
     * It is properly suppoerted from the backend
     */

    return (
      <div className={"p-2"}>
        <h4 className={"text-white text-lg md:text-xl "}>
          {t("viewProducts")}:
        </h4>
        {["Kaikki tuotteet", "Valokuvat", "Valokuvatuotteet", "Kuvakortit"].map(
          (el, index) => {
            return (
              <a
                key={index}
                className={
                  "bg-white rounded-full px-3 py-1 font-bold text-black inline-block mr-1 mt-1"
                }
                href={"#"}
              >
                {el}
              </a>
            );
          },
        )}
      </div>
    );
  }

  return (
    <div className="fade-in fixed z-20 top-0 bg-black/90 w-full left-0 h-[100vh] pt-4">
      <button
        type="button"
        onClick={onClose}
        className="text-white z-20 absolute right-2 top-2 text-sm flex flex-row flex-wrap items-center"
      >
        <ECOIcon size={"xl"} label={"close"} icon={"close_white"} />
        {t("close")}
      </button>

      <div className="absolute h-full overflow-y-auto w-full ">
        <div className={" md:hidden "}>
          <div className={"p-2 h-1/2"}>
            <p
              className={
                "bg-brand-gray-700 rounded-full py-1 px-3 inline-block"
              }
            >
              {chosenImageObject.portrait_type}
            </p>
            <p className={"text-white text-sm mt-2"}>
              {chosenImageObject.pic_file_name}
            </p>
          </div>
        </div>
        <div className={"flex m-auto max-w-[80vw]"}>
          <div className={"w-1/4 hidden md:block"}></div>
          <div className={"md:w-2/4 w-full text-white overflow-hidden "}>
            <div className="square relative bg-brand-gray-800">
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                src={chosenImageObject.pic_medium_wtmk}
                alt={chosenImageObject.pic_file_name}
              />
            </div>
            <SwiperSlider arrowsShow={false} className={"mt-2"}>
              {photos.map((el: PhotoEventPhoto, index: number) => (
                <button
                  className={`flex-1 mr-2 h-24 bg-primary-blue-100 rounded-lg ${
                    index === selectedImageIndex
                      ? "border-solid border-white border-4"
                      : ""
                  } `}
                  style={{
                    position: "unset",
                  }}
                  key={index}
                  onClick={() => {
                    thumbnailImageClick(index);
                  }}
                >
                  <Image
                    src={el.thumbnail_wtmk}
                    alt="car model"
                    key={index}
                    fill
                    priority
                    className="min-w-fith relative"
                  />
                </button>
              ))}
            </SwiperSlider>
          </div>
          <div className={"hidden md:block w-1/4"}>
            <div className={"p-2 h-1/2"}>
              <p
                className={
                  "bg-brand-gray-700 rounded-full py-1 px-3 inline-block"
                }
              >
                {t(chosenImageObject.portrait_type)}
              </p>
              <p className={"text-white text-sm mt-2 break-all"}>
                {chosenImageObject.pic_file_name}
              </p>
            </div>
            {categoryLinks()}
          </div>
        </div>

        {/*nav buttons*/}

        <button
          className="rounded-full h-12 w-12 self-center absolute left-2 top-1/2 bg-white flex justify-center items-center z-20"
          onClick={leftArrowClicked}
        >
          <ECOIcon size={"xl"} label={"chevron_left"} icon={"chevron_left"} />
        </button>
        <button
          className="rounded-full h-12 w-12 self-center bg-white absolute right-2 top-1/2  flex justify-center items-center z-20"
          onClick={rightArrowClicked}
        >
          <ECOIcon size={"xl"} label={"chevron_right"} icon={"chevron_right"} />
        </button>

        {/*nav buttons end*/}

        <div className={" md:hidden"}>
          <div className={"p-2"}>{categoryLinks()}</div>
        </div>
      </div>
    </div>
  );
};

export default LightBox;
