import { FRAME_COUNT, FRAME_PATH } from "@/lib/constants";

const BATCH_SIZE = 14;

export type FrameLoadProgress = {
  loaded: number;
  total: number;
  ready: boolean;
};

export async function loadAllFrames(
  onProgress?: (progress: FrameLoadProgress) => void
): Promise<HTMLImageElement[]> {
  const total = FRAME_COUNT;
  const images: HTMLImageElement[] = new Array(total);

  const loadOne = (index: number) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        images[index - 1] = img;
        resolve();
      };
      img.onerror = () => reject(new Error(`Failed to load frame ${index}`));
      img.src = FRAME_PATH(index);
    });

  let loaded = 0;
  const report = () => {
    onProgress?.({ loaded, total, ready: loaded >= total });
  };

  for (let start = 1; start <= total; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE - 1, total);
    const batch = [];
    for (let i = start; i <= end; i++) {
      batch.push(
        loadOne(i).then(() => {
          loaded += 1;
          report();
        })
      );
    }
    await Promise.all(batch);
  }

  return images;
}

export async function loadFirstFrame(
  onProgress?: (progress: FrameLoadProgress) => void
): Promise<HTMLImageElement[]> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load frame 1"));
    image.src = FRAME_PATH(1);
  });
  onProgress?.({ loaded: 1, total: 1, ready: true });
  return [img];
}
