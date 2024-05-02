"use client";

import React, { MouseEventHandler } from "react";
import {
  LspdButtonIconPosition,
  LspdButtonSize,
  LspdButtonTheme,
} from "./utils/Button";

interface Props {
  label?: string;
  icon?: React.ReactNode;
  theme?: LspdButtonTheme;
  size?: LspdButtonSize;
  disabled?: boolean;
  iconPosition?: LspdButtonIconPosition;
  iconOnly?: boolean;
  children?: null;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  title?: string;
  external?: boolean;
  URL?: string;
}

const defaults = {
  onClick: () => undefined,
  size: LspdButtonSize.Normal,
  theme: LspdButtonTheme.Primary,
};

const LspdButton = (props: Props) => {
  const p = {
    ...defaults,
    ...props,
  };

  const hasLabel = typeof props.label !== "undefined";
  const hasVisibleLabel = hasLabel && !props.iconOnly;

  const applySize = (styles: string[]): string[] => {
    switch (p.size) {
      case LspdButtonSize.Normal:
        return [
          ...styles,
          ...["rounded-full"],
          ...(hasVisibleLabel ? ["py-5", "px-5"] : ["py-1", "px-1.5"]),
          ...(hasVisibleLabel ? ["md:py-3.5"] : []),
        ];
      case LspdButtonSize.Small:
        return [
          ...styles,
          ...["rounded-full", "text-sm"],
          ...(hasVisibleLabel ? ["py-3", "px-4"] : ["py-1", "px-1.5"]),
          ...["md:text-xs"],
          ...(hasVisibleLabel ? ["md:py-1.5"] : []),
        ];
    }
  };

  const applyTheme = (styles: string[]): string[] => {
    switch (p.theme) {
      case LspdButtonTheme.Primary:
        return [
          ...styles,
          ...["bg-black", "text-white", "hover:opacity-75"],
          ...["hover:enabled:bg-gray-700"],
          ...["active:enabled:bg-gray-800"],
        ];
      case LspdButtonTheme.Secondary:
        return [
          ...styles,
          ...["border-black", "text-gray-900", "outline-secondary-300"],
          ...["hover:enabled:bg-secondary-400"],
          ...["active:enabled:bg-secondary"],
        ];
      case LspdButtonTheme.Outline:
        return [
          ...styles,
          ...["border-secondary", "outline-secondary-300"],
          ...["hover:enabled:bg-secondary-400", "hover:enabled:text-white"],
          ...["active:enabled:bg-secondary"],
        ];
      case LspdButtonTheme.Flush:
        return [...styles, ...["border-transparent", "outline-secondary-300"]];
    }
  };

  const applyDefaults = (styles: string[]): string[] => {
    return [
      ...styles,
      ...[
        "inline-flex",
        "items-center",
        "justify-center",
        "leading-none",
        "font-bold",
        "border-2",
      ],

      ...["disabled:opacity-20"],
    ];
  };

  const applyPosition = (styles: string[]): string[] => {
    switch (props.iconPosition) {
      case LspdButtonIconPosition.Left:
        return [...styles, "ml-0"];
      case LspdButtonIconPosition.Right:
        return [...styles, ...["order-last", "mr-0"]];
    }
    return [];
  };

  const className =
    applyTheme(applySize(applyDefaults([]))).join(" ") + " " + props.className;
  const iconClassName = applyPosition(["m-2"]).join(" ");

  return (
    <div>
      {!props.external ? (
        <button
          disabled={props.disabled}
          onClick={p.onClick}
          className={className}
          title={p.title}
        >
          {p.icon && (
            <span className={iconClassName} id={p.title} title={p.title}>
              {p.icon}
            </span>
          )}
          {hasVisibleLabel && p.label}
        </button>
      ) : (
        <a
          href={props.URL}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          {hasVisibleLabel && p.label}
        </a>
      )}
    </div>
  );
};

export default LspdButton;
