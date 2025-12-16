'use client';
import React, { useRef, useEffect } from 'react';

interface Pin {
  label: string;
  lat: number;
  lon: number;
  color: string;
  textColor?: string;
}

interface GlobeMeshProps {
  className?: string;
  radius?: number;
  pins?: Pin[];
}

export default function GlobeMesh({
  className = '',
  radius = 300,
  pins = [],
}: GlobeMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  
  useEffect(() => {
    const handleResize = () => {
        if (containerRef.current && canvasRef.current) {
            canvasRef.current.width = containerRef.current.offsetWidth;
            canvasRef.current.height = containerRef.current.offsetHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    
    let animationId: number;
    const animate = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const cx = width / 2;
        const cy = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        rotationRef.current += 0.002;
        
        const latSteps = 12; // Fewer steps for cleaner mesh
        const lonSteps = 24;
        
        // Helper to project point
        const project = (lat: number, lon: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon * Math.PI / 180) + rotationRef.current;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            
            const scale = 800 / (800 + z);
            return { x: cx + x * scale, y: cy + y * scale, z, scale };
        };

        // Draw Mesh Lines (Latitudes)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let lat = -80; lat <= 80; lat += 180 / latSteps) {
            ctx.beginPath();
            let first = true;
            for (let lon = 0; lon <= 360; lon += 360 / lonSteps) {
                const p = project(lat, lon);
                if (p.z > -radius * 0.5) {
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                } else {
                    first = true; // Break line if behind
                }
            }
            ctx.stroke();
        }

        // Draw Mesh Lines (Longitudes)
        for (let lon = 0; lon < 360; lon += 360 / lonSteps) {
            ctx.beginPath();
            let first = true;
            for (let lat = -90; lat <= 90; lat += 180 / latSteps) {
                 const p = project(lat, lon);
                 if (p.z > -radius * 0.5) {
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                 } else {
                     first = true;
                 }
            }
            ctx.stroke();
        }
        
        // Draw Dots at intersections
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let lat = -90; lat <= 90; lat += 180 / latSteps) {
            for (let lon = 0; lon < 360; lon += 360 / lonSteps) {
                 const p = project(lat, lon);
                 if (p.z > -radius * 0.5) {
                     const size = 1.5 * p.scale;
                     ctx.beginPath();
                     ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                     ctx.fill();
                 }
            }
        }
        
        // Draw Pins
        pins.forEach(pin => {
             const p = project(pin.lat, pin.lon);
             const visible = p.z > -radius * 0.2; // Only front-ish
             
             if (visible) {
                 // Pin stick
                 // Project a point further out
                 const phi = (90 - pin.lat) * (Math.PI / 180);
                 const theta = (pin.lon * Math.PI / 180) + rotationRef.current;
                 const stickLen = 40;
                 const x2 = (radius + stickLen) * Math.sin(phi) * Math.cos(theta);
                 const y2 = (radius + stickLen) * Math.cos(phi);
                 const z2 = (radius + stickLen) * Math.sin(phi) * Math.sin(theta);
                 const scale2 = 800 / (800 + z2);
                 const px = cx + x2 * scale2;
                 const py = cy + y2 * scale2;

                 ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                 ctx.beginPath();
                 ctx.moveTo(p.x, p.y);
                 ctx.lineTo(px, py);
                 ctx.stroke();
                 
                 // Label Badge
                 const text = pin.label;
                 ctx.font = `bold ${10 * scale2}px sans-serif`;
                 const metrics = ctx.measureText(text);
                 const padding = 8 * scale2;
                 const bw = metrics.width + padding * 2;
                 const bh = 22 * scale2;
                 
                 // Pill shape
                 ctx.fillStyle = pin.color;
                 roundRect(ctx, px - bw/2, py - bh/2, bw, bh, bh/2);
                 ctx.fill();
                 
                 ctx.fillStyle = pin.textColor || '#000';
                 ctx.textAlign = 'center';
                 ctx.textBaseline = 'middle';
                 ctx.fillText(text, px, py);
             }
        });
        
        animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [pins, radius]);
  
  return (
      <div ref={containerRef} className={className}>
          <canvas ref={canvasRef} />
      </div>
  )
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
