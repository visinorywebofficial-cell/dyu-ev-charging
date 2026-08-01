'use client';
import React, { useRef, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

// Error Boundary for Three.js / Canvas rendering
interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('CanvasErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function CarMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Load the model automatically with caching
  const { scene } = useGLTF('/car.glb');

  // Mathematical Sync to SVG Path (No DOM Proxy, No GSAP Plugins)
  useFrame(() => {
    if (!groupRef.current || typeof window === 'undefined') return;
    
    const container = document.getElementById('about-container');
    const path = document.getElementById('car-path') as any as SVGPathElement;
    
    if (container && path && typeof path.getTotalLength === 'function') {
      try {
        // 1. Calculate pure mathematical scroll progress relative to the container
        const containerRect = container.getBoundingClientRect();
        const scrollY = -containerRect.top;
        const maxScroll = containerRect.height - (window.innerHeight || 800);
        
        let progress = 0;
        if (maxScroll > 0) {
          progress = Math.max(0, Math.min(1, scrollY / maxScroll));
        }
        
        const totalLen = path.getTotalLength();
        if (!totalLen) return;
        
        // 2. Get the exact mathematical point on the SVG curve
        const pt = path.getPointAtLength(progress * totalLen);
        
        const winWidth = window.innerWidth || 1000;
        const winHeight = window.innerHeight || 800;

        const screenX = (pt.x / 1000) * winWidth;
        const containerY = (pt.y / 4000) * containerRect.height;
        const screenY = containerRect.top + containerY;
        
        // 3. Convert screen coordinates to Normalized Device Coordinates (-1 to 1)
        const ndcX = (screenX / winWidth) * 2 - 1;
        const ndcY = -(screenY / winHeight) * 2 + 1;
        
        // 4. Unproject perfectly into 3D world space at Z=0
        const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        const distance = -camera.position.z / vec.z;
        const pos = camera.position.clone().add(vec.multiplyScalar(distance));
        
        groupRef.current.position.copy(pos);
        
        // 5. Calculate rotation by sampling two points slightly apart
        let p1 = progress;
        let p2 = progress + 0.005;
        
        if (p2 > 1) {
          p1 = 1 - 0.005;
          p2 = 1;
        }
        
        const pt1 = path.getPointAtLength(p1 * totalLen);
        const pt2 = path.getPointAtLength(p2 * totalLen);
        
        const screenX1 = (pt1.x / 1000) * winWidth;
        const screenY1 = containerRect.top + ((pt1.y / 4000) * containerRect.height);
        
        const screenX2 = (pt2.x / 1000) * winWidth;
        const screenY2 = containerRect.top + ((pt2.y / 4000) * containerRect.height);
        
        // Calculate angle in 2D screen space
        const angle = Math.atan2(screenY2 - screenY1, screenX2 - screenX1);
        groupRef.current.rotation.z = -(angle - Math.PI / 2);
      } catch (err) {
        console.warn('Error inside CarMesh useFrame:', err);
      }
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

export default function Car3D() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (webGLSupported === false) {
    return null; // Graceful fallback: render nothing instead of crashing on devices without WebGL
  }

  if (webGLSupported === null) {
    return null; // Wait for client-side check
  }

  return (
    <CanvasErrorBoundary fallback={null}>
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 40 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        gl={{ powerPreference: 'low-power', antialias: false }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <CarMesh />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}

