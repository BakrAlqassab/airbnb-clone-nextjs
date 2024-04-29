import { IconProps } from "@/app/types";
import Image from "next/image";
export function ECOIcon({ size, label, icon, className }: IconProps) {
  const sizeClass = (size: string | undefined) => {
    switch (size) {
      case "xxxl":
        return "w-14 max-h-14";
      case "xxl":
        return "w-12 max-h-12";
      case "25xl":
        return "w-10 max-h-10";
      case "225xl":
        return "w-9 max-h-9";
      case "2xl":
        return "w-8 max-h-8";
      case "xl":
        return "w-6 max-h-6";
      case "l":
        return "w-4 max-h-4";
      case "m":
        return "w-3 max-h-3";
      case "s":
        return "w-2 max-h-2";
      default:
        return "w-3 max-h-3";
    }
  };

  return (
    <Image
      className={`flex ${className} ${sizeClass(size)}`}
      src={`/icons/${icon}.svg`}
      alt={label || ""}
      width={118}
      height={118}
    />
  );
}
