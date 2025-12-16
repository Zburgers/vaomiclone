'use client';
import { motion } from 'framer-motion';
import {
  Globe,
  Shuffle,
  GitCommit,
  Layers,
  Circle,
  Triangle,
  FileText,
  Square,
  Box,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const founders = [
  { name: 'Accel', icon: <Globe /> },
  { name: 'Menlo', icon: <Shuffle /> },
  { name: 'General Catalyst', icon: <GitCommit /> },
  { name: 'Khosla Ventures', icon: <Layers /> },
  { name: 'Lightspeed', icon: <Layers /> },
  { name: 'Bessemer', icon: <Circle /> },
  { name: 'Andreessen Horowitz', icon: <Triangle className="rotate-180" /> },
  { name: 'Greylock', icon: <Triangle /> },
  { name: 'Sequoia', icon: <FileText /> },
];

const funds = [
  { name: 'JAB Holdings', icon: <span className="font-bold">JAB</span> },
  {
    name: 'Walton Enterprises',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M0 0H24V24H0V0Z" fill="#888" />
        <path d="M6 6H18V18H6V6Z" fill="white" />
      </svg>
    ),
  },
  { name: 'Cascade', icon: <Shuffle /> },
  { name: 'Iconiq Capital', icon: <Box /> },
  { name: 'AlTouq Group', icon: <Circle /> },
  { name: 'Al Nowais', icon: <Circle className="size-5" /> },
  { name: 'Emerson Collective', icon: <Triangle /> },
  { name: 'Bessemer Trust', icon: <Square /> },
];

const Marquee = ({
  items,
  title,
  reverse = false,
}: {
  items: { name: string; icon: React.ReactNode }[];
  title: string;
  reverse?: boolean;
}) => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex w-full items-center overflow-hidden border-y border-white/10 py-4">
      <div className="z-10 bg-white px-2 py-1">
        <p className="whitespace-nowrap text-xs font-bold uppercase text-black">
          {title}
        </p>
      </div>
      <motion.div
        className="absolute left-0 flex"
        animate={{
          x: reverse ? ['-100%', '0%'] : ['0%', '-100%'],
        }}
        transition={{
          ease: 'linear',
          duration: 40,
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="mx-6 flex flex-shrink-0 items-center gap-3 text-lg font-medium text-muted-foreground"
          >
            <span
              className={cn(
                'flex size-6 items-center justify-center text-muted-foreground'
              )}
            >
              {item.icon}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HelpedRaise() {
  return (
    <section className="relative w-full space-y-4 py-16 bg-background">
      <div className="relative z-10 space-y-4">
        <Marquee
          title="SO FAR I HAVE HELPED FOUNDERS RAISE FROM"
          items={founders}
        />
        <Marquee
          title="& FUNDS' GPs RAISE FROM"
          items={funds}
          reverse={true}
        />
      </div>
    </section>
  );
}
