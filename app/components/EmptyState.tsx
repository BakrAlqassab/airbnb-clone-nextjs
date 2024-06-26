"use client";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "./Button";

interface EmptyState {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No exact matching!",
  subTitle = "try changing or remove some of your filters!",
  showReset,
}: EmptyState) {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title as string} subTitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters!"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}
