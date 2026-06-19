"use client";

import VimPlayground from "@/components/vim-playground";

export default function Home() {
  return (
    <main className="h-full bg-[#181a28] text-[#d9e3d6]">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#f3f8f0] sm:text-3xl">
          Neovim | Vim Playground
        </h1>
        <VimPlayground />
      </div>
    </main>
  );
}
