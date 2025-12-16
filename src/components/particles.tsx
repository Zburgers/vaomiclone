'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Helper function to generate random numbers in a sphere
const inSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

const ParticleSystem = ({ quantity, color }: { quantity: number, color: string }) => {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef([0, 0]);

  const onMouseMove = (event: MouseEvent) => {
    mouse.current = [
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    ];
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const points = useMemo(
    () => inSphere(quantity, 5),
    [quantity]
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 45;

    // Make particles react to mouse
    const [mouseX, mouseY] = mouse.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 2, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouseY * 2, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default function Particles({ className, quantity = 1000, color = "#ffffff" }: { className?: string; quantity?: number; color?: string; }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ParticleSystem quantity={quantity} color={color} />
      </Canvas>
    </div>
  );
}
