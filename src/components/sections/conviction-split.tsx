'use client';
import { motion } from 'framer-motion';
import GlobeMesh from '@/components/globe-mesh';

const pins = [
  { label: 'GenAI', lat: 30, lon: -20, color: '#0ea5e9' }, // Sky
  { label: 'BioTech', lat: 40, lon: 40, color: '#a855f7' }, // Purple
  { label: 'Singapore FO', lat: 10, lon: 100, color: '#f97316' }, // Orange
  { label: 'Defense', lat: 50, lon: -100, color: '#64748b' }, // Slate
  { label: 'Deeptech', lat: 20, lon: -60, color: '#ec4899' }, // Pink
  { label: 'London FO', lat: 51, lon: 0, color: '#6366f1' }, // Indigo
  { label: 'Fintech', lat: 35, lon: 139, color: '#22c55e' }, // Green
  { label: 'Gulf Family Office', lat: 25, lon: 55, color: '#eab308' }, // Yellow
  { label: 'NY Single FO', lat: 40, lon: -74, color: '#3b82f6' }, // Blue
  { label: 'Consumer', lat: -20, lon: -40, color: '#3b82f6' }, // Blue
  { label: 'Swiss Multi-FO', lat: 46, lon: 8, color: '#ef4444' }, // Red
];

export default function ConvictionSplit() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <GlobeMesh 
        className="absolute inset-0 z-0 opacity-80" 
        radius={350} 
        pins={pins}
      />
      
      <div className="relative z-10 max-w-5xl px-4 text-center pointer-events-none">
        <motion.h2 
          className="text-2xl md:text-4xl font-medium leading-tight text-white/90 drop-shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          And because conviction has no boundaries, we operate across every modern
          sector — from <span className="font-bold text-white">deeptech</span> to <span className="font-bold text-white">consumer</span> — mapping where global conviction is
          headed.
        </motion.h2>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </section>
  );
}
