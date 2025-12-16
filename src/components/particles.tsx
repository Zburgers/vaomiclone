'use client';

import React, { useRef, useEffect } from 'react';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export default function Particles({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, []);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      window.addEventListener('mousemove', (e) => {
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          mouse.current.x = x;
          mouse.current.y = y;
        }
      });
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      circles.current.push(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${hexToRgb(color)}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: any, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      
      // Update position
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      
      // Wrap around
      if (circle.x < -circle.size) circle.x = canvasSize.current.w + circle.size;
      else if (circle.x > canvasSize.current.w + circle.size) circle.x = -circle.size;
      
      if (circle.y < -circle.size) circle.y = canvasSize.current.h + circle.size;
      else if (circle.y > canvasSize.current.h + circle.size) circle.y = -circle.size;

      // Mouse interaction
      const dx = mouse.current.x - (circle.x + circle.translateX);
      const dy = mouse.current.y - (circle.y + circle.translateY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Simple parallax/avoidance effect
       if (distance < 200) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (200 - distance) / 200;
          const directionX = forceDirectionX * force * circle.magnetism;
          const directionY = forceDirectionY * force * circle.magnetism;
          circle.translateX -= directionX;
          circle.translateY -= directionY;
       } else {
         // Return to original position slowly
         circle.translateX += (0 - circle.translateX) * 0.05;
         circle.translateY += (0 - circle.translateY) * 0.05;
       }

      drawCircle(circle, true);
    });
    window.requestAnimationFrame(animate);
  };
  
  const hexToRgb = (hex: string) => {
      hex = hex.replace('#', '');
      const hexInt = parseInt(hex, 16);
      const r = (hexInt >> 16) & 255;
      const g = (hexInt >> 8) & 255;
      const b = hexInt & 255;
      return `${r}, ${g}, ${b}`;
  }

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ) => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
