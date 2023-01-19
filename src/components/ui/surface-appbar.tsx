"use client";
import Image from "next/image";

export function SurfaceAppbar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
      {/* Rounded cutout */}
      <Image
        src="/corner.svg"
        alt="curve"
        className="h-4 w-4 rotate-90"
        width={24}
        height={24}
        priority
      />
      {/* The main area */}
      <div className="rounded-b-2xl bg-black p-4 text-white">Appbar</div>
      {/* Rounded cutout */}
      <Image
        src="/corner.svg"
        alt="curve"
        className="h-4 w-4"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
