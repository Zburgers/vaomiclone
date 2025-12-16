'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { InfinityIcon, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#' },
  { name: 'The Engine', href: '#' },
  { name: 'Case Studies', href: '#' },
  { name: 'FAQs', href: '#' },
];

export default function Header() {
  return (
    <motion.header 
      className="absolute top-0 z-50 w-full p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <InfinityIcon className="size-8" />
          <span className="text-xl font-bold">Vaomi AI</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <Button className="group hidden items-center gap-2 bg-accent/80 text-black hover:bg-accent md:flex">
          <span>Book a FREE call</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Button>
      </div>
    </motion.header>
  );
}
