'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, InfinityIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-black pt-40 pb-8 overflow-hidden flex flex-col justify-between min-h-[90vh]">
        {/* Top Grid Background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-20 pointer-events-none" />
        
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 space-y-12">
             <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                If you are building something the world should believe in,<br/>
                let me open the right doors for you.
            </p>
            
            <h1 className="font-black text-[15vw] md:text-[20vw] leading-[0.8] tracking-tighter text-[#111] transition-colors duration-700 hover:text-white select-none cursor-default">
                VAOMI.AI
            </h1>

            <div>
                 <Button
                  className="group rounded bg-white px-8 py-6 text-sm font-bold text-black hover:bg-white/90"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </div>

        <div className="container mx-auto px-4 mt-32 w-full">
            <div className="h-px w-full bg-white/10 mb-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                <div className="flex items-center gap-2 text-white font-sans normal-case tracking-normal">
                    <InfinityIcon className="size-4" />
                    <span className="font-bold">Vaomi.ai</span>
                </div>
                <p>© 2025 VAOMI. ALL RIGHTS RESERVED</p>
            </div>
        </div>
    </footer>
  );
}
