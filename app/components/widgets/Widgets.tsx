import React from "react";
import DynamicComponentLoader from "./DynamicComponentLoader";
import { useMessages } from "@/app/utils/utils";
import EmptyState from "@/app/components/EmptyState";
const existWidgets = [
  "wysiwygBlock",
  "brandContent",
  "contentImage",
  "hero",
  "cta",
  "halfImage",
  "line",
  "accordion",
];
export default function Widgets({ widgets }: { widgets: any }) {
  const t = useMessages();
  return (
    <div>
      {widgets ? (
        widgets.map(
          (widget: any, index: number) =>
            widget.sys.contentType.sys.id &&
            existWidgets.includes(widget.sys.contentType.sys.id) && (
              <div key={index}>
                <DynamicComponentLoader
                  componentName={widget.sys.contentType.sys.id}
                  content={widget}
                />
              </div>
            ),
        )
      ) : (
        <div>
          <EmptyState
            title={t("noContent")}
            subTitle="please check your URL :) "
          />
        </div>
      )}
    </div>
  );
}
