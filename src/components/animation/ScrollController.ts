import { FRAME_COUNT } from "@/lib/constants";

export function progressToFrameIndex(progress: number, frameCount = FRAME_COUNT) {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(frameCount - 1, Math.floor(clamped * (frameCount - 1)));
}

export function getScrollProgress(
  scrollTop: number,
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
) {
  const scrollable = Math.max(1, sectionHeight - viewportHeight);
  const relative = scrollTop - sectionTop;
  return Math.min(1, Math.max(0, relative / scrollable));
}
