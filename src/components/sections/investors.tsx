'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';

const investors = [
  {
    name: 'Tamer Azer',
    role: 'PARTNER @ SHOROOQ PARTNERS',
    badge: 'VC LEADER',
    highlights: '$300M+ AUM • Seed Stage Leader',
    ecosystem: 'Pure Harvest, TruKKer, NymCard',
    quote: '"Beyond capital, they truly understand the founder journey."',
    image: 'https://picsum.photos/seed/tamer/100/100',
  },
  {
    name: 'Hamed Tehrane',
    role: 'INVESTMENT MANAGER @ INVESTCORP',
    badge: 'TOP TIER',
    highlights: '$50B AUM • Forbes #2 ME Asset Mgr',
    ecosystem: 'Gucci, Tiffany & Co., Corneliani, Riva',
    quote: '"Access to a global PE platform with immense consumer exposure."',
    image: 'https://picsum.photos/seed/hamed/100/100',
  },
  {
    name: 'Abdulnasser Alsharafi',
    role: 'INVESTOR RELATIONS @ ADIO',
    badge: 'GATEKEEPER',
    highlights: '$10B+ Impact • Govt Ecosystem',
    ecosystem: 'Pure Harvest, Anghami, Starzplay',
    quote: '"Abu Dhabi Investment Office. Fast-tracks licensing and incentives."',
    image: 'https://picsum.photos/seed/abdul/100/100',
  },
  {
    name: 'Rabea Ragheb',
    role: 'VENTURE LEAD @ ARAMCO VENTURES',
    badge: 'SOVEREIGN TIE',
    highlights: '$7.5B Capital • Sovereign Venture',
    ecosystem: 'Carbon Clean, Energy Vault, Pragmatic',
    quote: '"Guided market-entry timing within the Saudi Vision 2030 ecosystem."',
    image: 'https://picsum.photos/seed/rabea/100/100',
  },
   {
    name: 'Cultural Dev. Fund',
    role: 'INVESTMENT TEAM @ CDF',
    badge: 'GOV FUND',
    highlights: '$500M Fund • Vision 2030 Pillar',
    ecosystem: 'Film, Music, Cultural Assets',
    quote: '"Strategic capital deployment for cultural infrastructure."',
    image: 'https://picsum.photos/seed/cdf/100/100',
  },
];

const Card = ({ investor }: { investor: any }) => (
  <div className="w-[400px] flex-shrink-0 rounded-xl border border-white/10 bg-black p-6 mx-4 hover:border-white/20 transition-colors">
    <div className="flex items-start justify-between">
       <div className="flex items-center gap-4">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image src={investor.image} alt={investor.name} fill className="object-cover grayscale" />
          </div>
          <div>
              <h4 className="text-lg font-bold text-white">{investor.name}</h4>
              <p className="text-[10px] font-bold text-[#1db954] uppercase tracking-wide">{investor.role}</p>
          </div>
       </div>
       <div className="flex flex-col items-end gap-2">
           <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">{investor.badge}</span>
           <Linkedin className="size-4 text-muted-foreground" />
       </div>
    </div>
    
    <div className="mt-6 space-y-4">
        <div className="rounded bg-white/5 p-3">
            <p className="text-[10px] text-muted-foreground uppercase mb-1">HIGHLIGHTS</p>
            <p className="text-sm font-bold text-white">{investor.highlights}</p>
        </div>
        
        <div>
             <p className="text-[10px] text-muted-foreground uppercase mb-1">ECOSYSTEM WINS</p>
             <p className="text-xs text-muted-foreground">{investor.ecosystem}</p>
        </div>
        
        <p className="text-xs italic text-muted-foreground/70 pt-4 border-t border-white/10">
            {investor.quote}
        </p>
    </div>
  </div>
);

export default function Investors() {
    // Duplicate 4 times to ensure seamless infinite scroll
    const duplicatedInvestors = [...investors, ...investors, ...investors, ...investors];
    
    return (
        <section className="w-full bg-background py-32 overflow-hidden">
             <div className="text-center mb-16 px-4">
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">And recent introductions</h2>
                 <p className="text-muted-foreground text-lg">Real connections we made for our partners.</p>
             </div>
             
             <div className="relative w-full flex">
                 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                 <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                 
                 <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ 
                        ease: 'linear', 
                        duration: 40, 
                        repeat: Infinity 
                    }}
                 >
                     {duplicatedInvestors.map((inv, i) => (
                         <Card key={i} investor={inv} />
                     ))}
                 </motion.div>
             </div>
        </section>
    )
}
