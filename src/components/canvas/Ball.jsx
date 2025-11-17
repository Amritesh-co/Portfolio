import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  // Debug log
  console.log("🟡 Loading Ball texture:", imgUrl);

  // Prevent crash if image is missing
  const decal = useTexture(imgUrl, undefined, (err) => {
    console.error("❌ FAILED TO LOAD ICON:", imgUrl, err);
  });

  return (
    <Float speed={1.6} rotationIntensity={1} floatIntensity={1.8}>
      {/* Smooth ambient + directional light */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -3, -3]} intensity={0.4} />

      <mesh castShadow receiveShadow scale={2.7}>
        <icosahedronGeometry args={[1, 1]} />

        <meshStandardMaterial
          color="#f0f0f0"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />

        {/* Only apply Decal if texture exists */}
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  console.log("🎯 Rendering icon:", icon);

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      shadows
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
