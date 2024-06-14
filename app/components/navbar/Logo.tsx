"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
      />
    </div>
  );
}
