'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { InfinityIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '#' },
  { name: 'The Engine', href: '#' },
  { name: 'Case Studies', href: '#' },
  { name: 'FAQs', href: '#' },
];

export default function Header() {
  return (
    <motion.header 
      className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-5xl px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2">
          <InfinityIcon className="size-6 text-white" />
          <span className="text-lg font-bold text-white">Vaomi AI</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Button size="sm" className="group hidden items-center gap-2 rounded-full bg-[#1db954] hover:bg-[#1db954]/80 text-black md:flex font-semibold">
          <span>Book a FREE call</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Button>
      </div>
    </motion.header>
  );
}
