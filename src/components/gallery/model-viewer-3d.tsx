"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import type { Group } from "three";

function RotatingModel({ url }: { url: string }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function ModelScene({ url }: { url: string }) {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} />
      <RotatingModel url={url} />
    </>
  );
}

export function ModelViewer3D({ url, className = "" }: { url: string; className?: string }) {
  return (
    <div className={`relative h-[280px] w-full md:h-[320px] ${className}`}>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            Loading…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.2, 3.2], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0, 0);
          }}
          dpr={[1, 1.5]}
        >
          <ModelScene url={url} />
        </Canvas>
      </Suspense>
    </div>
  );
}
