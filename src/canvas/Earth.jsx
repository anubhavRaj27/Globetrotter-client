import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Earth = () => {
    const earth = useGLTF("/earth/scene.gltf");

  return (
    <primitive object={earth.scene} scale={0.25} position-y={0} rotation-y={0} />
  );
};

useGLTF.preload('/earth/scene.gltf');

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <ambientLight intensity={1} />
        <directionalLight position={[5,5,5]} intensity={1.5} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
