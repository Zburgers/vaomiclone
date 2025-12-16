'use client';

import React, { useRef, useEffect } from 'react';

interface PlanetMeshProps {
  className?: string;
  color?: string;
  radius?: number;
  count?: number;
}

export default function PlanetMesh({
  className = '',
  color = '#ffffff',
  radius = 200,
  count = 800,
}: PlanetMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Particles
  const particles = useRef<{ x: number; y: number; z: number; baseAlpha: number }[]>([]);

  useEffect(() => {
    initParticles();
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize mouse from -1 to 1
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const initParticles = () => {
    particles.current = [];
    for (let i = 0; i < count; i++) {
      // Random point on sphere (approx)
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      particles.current.push({ x, y, z, baseAlpha: Math.random() * 0.5 + 0.5 });
    }
  };

  const animate = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Rotation logic
    // Auto rotate slowly
    const autoSpeed = 0.002;
    // Mouse influence
    const mouseSpeed = 0.05;
    
    const angleY = autoSpeed + mouse.current.x * mouseSpeed;
    const angleX = -mouse.current.y * mouseSpeed;

    particles.current.forEach((p) => {
      // Rotate around Y axis
      let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
      let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
      
      // Rotate around X axis
      let y1 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
      let z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);
      
      p.x = x1;
      p.y = y1;
      p.z = z2;
      
      // Project 3D to 2D
      const perspective = 400;
      const scale = perspective / (perspective + p.z);
      
      const x2d = centerX + p.x * scale;
      const y2d = centerY + p.y * scale;
      
      // Draw
      const alpha = (p.z + radius) / (2 * radius); // Faded at back
      if (scale > 0) {
        ctx.beginPath();
        ctx.arc(x2d, y2d, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * p.baseAlpha})`;
        ctx.fill();
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
