"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

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

export function LazyModelViewer({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[280px] md:min-h-[320px]">
      {visible ? <ModelViewer3D url={url} /> : (
        <div className="flex h-[280px] items-center justify-center bg-white/5 md:h-[320px]">
          <span className="text-sm text-white/40">Scroll to load 3D</span>
        </div>
      )}
    </div>
  );
}
