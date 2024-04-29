import React from "react";
export default function Line({ content }: any) {
  const title = content.fields.title;
  return (
    <div
      className={`hero mx-6 relative flex
    flex-col `}
    >
      <hr
        className={
          "my-6 max-2xl bg-gray-500 w-full h-[2px] border-gray-500 my-2 "
        }
      />

      <h1 className="my-4">{title}</h1>
    </div>
  );
}
