import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Model() {
  // Path is from public/ root:
  const { scene } = useGLTF("/models/avatar/scene.gltf");
  return <primitive object={scene} scale={1.0} />;
}

// Optional: preload for smoother first render
useGLTF.preload("/models/avatar/scene.gltf");

export default function ModelViewer() {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        borderRadius: "16px",
        overflow: "hidden",
        background: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0.2, 3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}
