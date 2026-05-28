"use client";

import { useGLTF } from "@react-three/drei";
import { GALLERY_MODELS } from "@/lib/constants";

/** Start downloading all gallery GLBs as soon as this client module loads */
for (const { src } of GALLERY_MODELS) {
  useGLTF.preload(src);
}
