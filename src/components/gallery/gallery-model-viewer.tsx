"use client";

import dynamic from "next/dynamic";

const ModelViewer3D = dynamic(
  () =>
    import("@/components/gallery/model-viewer-3d").then((m) => m.ModelViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] animate-pulse items-center justify-center bg-white/5 md:h-[320px]">
        <span className="text-sm text-white/40">3D…</span>
      </div>
    ),
  },
);

export function GalleryModelViewer({ url }: { url: string }) {
  return <ModelViewer3D url={url} />;
}
