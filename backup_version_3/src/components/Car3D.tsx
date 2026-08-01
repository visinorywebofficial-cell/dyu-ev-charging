'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

function CarMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Load the model automatically with caching
  const { scene } = useGLTF('/car.glb');

  // Mathematical Sync to SVG Path (No DOM Proxy, No GSAP Plugins)
  useFrame(() => {
    if (!groupRef.current) return;
    
    const container = document.getElementById('about-container');
    const path = document.getElementById('car-path') as any as SVGPathElement;
    
    if (container && path) {
      // 1. Calculate pure mathematical scroll progress relative to the container
      const containerRect = container.getBoundingClientRect();
      const scrollY = -containerRect.top;
      const maxScroll = containerRect.height - window.innerHeight;
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      }
      
      const totalLen = path.getTotalLength();
      
      // 2. Get the exact mathematical point on the SVG curve
      const pt = path.getPointAtLength(progress * totalLen);
      
      // The SVG is set to viewBox="0 0 1000 4000" and preserves no aspect ratio,
      // mapping 1000 directly to window width, and 4000 to container height.
      const screenX = (pt.x / 1000) * window.innerWidth;
      const containerY = (pt.y / 4000) * containerRect.height;
      const screenY = containerRect.top + containerY;
      
      // 3. Convert screen coordinates to Normalized Device Coordinates (-1 to 1)
      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;
      
      // 4. Unproject perfectly into 3D world space at Z=0
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      const pos = camera.position.clone().add(vec.multiplyScalar(distance));
      
      groupRef.current.position.copy(pos);
      
      // 5. Calculate rotation by sampling two points slightly apart
      // If we are at the very end of the path, we look backwards to get a valid tangent
      let p1 = progress;
      let p2 = progress + 0.005;
      
      if (p2 > 1) {
        p1 = 1 - 0.005;
        p2 = 1;
      }
      
      const pt1 = path.getPointAtLength(p1 * totalLen);
      const pt2 = path.getPointAtLength(p2 * totalLen);
      
      const screenX1 = (pt1.x / 1000) * window.innerWidth;
      const screenY1 = containerRect.top + ((pt1.y / 4000) * containerRect.height);
      
      const screenX2 = (pt2.x / 1000) * window.innerWidth;
      const screenY2 = containerRect.top + ((pt2.y / 4000) * containerRect.height);
      
      // Calculate angle in 2D screen space
      const angle = Math.atan2(screenY2 - screenY1, screenX2 - screenX1);
      
      // Map screen angle to 3D Z-rotation.
      // The car natively points DOWN on screen (-Y) due to its initial rotation.
      // So when the path goes down (angle = PI/2), we want 0 rotation.
      groupRef.current.rotation.z = -(angle - Math.PI / 2);
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[Math.PI / 2, Math.PI, 0]} scale={[1.5, 1.5, 1.5]}>
        <Clone object={scene} />
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/car.glb');

export default function Car3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 40 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <CarMesh />
      </Suspense>
      
    </Canvas>
  );
}
