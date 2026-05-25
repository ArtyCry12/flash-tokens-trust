"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasRenderer } from "./CanvasRenderer";
import {
  loadAllFrames,
  loadFirstFrame,
  type FrameLoadProgress,
} from "./FrameLoader";
import { OverlayContent } from "./OverlayContent";
import {
  getScrollProgress,
  progressToFrameIndex,
} from "./ScrollController";
import { FRAME_COUNT } from "@/lib/constants";

export function ScrollAnimationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loadProgress, setLoadProgress] = useState<FrameLoadProgress>({
    loaded: 0,
    total: FRAME_COUNT,
    ready: false,
  });
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loader = reducedMotion ? loadFirstFrame : loadAllFrames;
    loader((p) => {
      if (!cancelled) setLoadProgress(p);
    })
      .then((imgs) => {
        if (!cancelled) {
          setFrames(imgs);
          if (reducedMotion) {
            setFrameIndex(0);
            frameIndexRef.current = 0;
            setProgress(0);
          }
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !loadProgress.ready || reducedMotion) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const p = getScrollProgress(
        window.scrollY,
        sectionTop,
        section.offsetHeight,
        window.innerHeight
      );
      setProgress(p);
      const next = progressToFrameIndex(p);
      if (next !== frameIndexRef.current) {
        frameIndexRef.current = next;
        setFrameIndex(next);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [loadProgress.ready, reducedMotion]);

  const currentFrame = frames[frameIndex] ?? frames[0] ?? null;
  const loadPct = Math.round(
    (loadProgress.loaded / Math.max(1, loadProgress.total)) * 100
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={
        reducedMotion
          ? "relative min-h-[100dvh] bg-black"
          : "relative h-[400vh] bg-black"
      }
      aria-label="Hero"
    >
      <div
        className="sticky top-0 flex min-h-[100dvh] flex-col"
        style={{ height: "100dvh" }}
      >
        {!reducedMotion && (
          <div
            className="absolute left-0 right-0 top-0 z-30 h-0.5 bg-white/10"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#2997ff] transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        {!loadProgress.ready && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black">
            <LoadProgressBar
              loaded={loadProgress.loaded}
              total={loadProgress.total}
            />
            <p className="text-sm text-white/70">
              Loading experience… {loadPct}%
            </p>
          </div>
        )}

        <div className="relative flex-1">
          <CanvasRenderer frame={currentFrame} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          <OverlayContent progress={reducedMotion ? 0 : progress} />
        </div>
      </div>
    </section>
  );
}

function LoadProgressBar({ loaded, total }: { loaded: number; total: number }) {
  const pct = (loaded / Math.max(1, total)) * 100;
  return (
    <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
      <div
        className="h-full bg-[#2997ff] transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
