'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const investors = [
  {
    id: 'investor-1',
    name: 'Eleanor Vance',
    tag: 'Growth Giant',
    backing: ['QuantumLeap', 'StellarForge', 'Apex Robotics'],
  },
  {
    id: 'investor-2',
    name: 'Marcus Thorne',
    tag: 'Deep Tech',
    backing: ['BioGen', 'FusionWorks', 'SynapseAI'],
  },
  {
    id: 'investor-3',
    name: 'Seraphina Chen',
    tag: 'Consumer Visionary',
    backing: ['EverLive', 'ConnectSphere', 'Artisanly'],
  },
  {
    id: 'investor-4',
    name: 'Julian Croft',
    tag: 'SaaS Architect',
    backing: ['CloudFlow', 'SecureStack', 'DataWeave'],
  },
  {
    id: 'investor-5',
    name: 'Isabella Rossi',
    tag: 'Fintech Futurist',
    backing: ['PayCore', 'BlockTrust', 'AssetGrid'],
  },
  {
    id: 'investor-6',
    name: 'Kenji Tanaka',
    tag: 'Hardware Pioneer',
    backing: ['ChipNext', 'Momentum Motors', 'Aetherio'],
  },
];

export default function Investors() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-16 text-center font-headline text-4xl font-semibold">
          Backed by the Best
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {investors.map((investor) => {
            const imageData = PlaceHolderImages.find(
              (img) => img.id === investor.id
            );
            return (
              <motion.div
                key={investor.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <motion.div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(65,222,129,0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    {imageData && (
                      <Image
                        src={imageData.imageUrl}
                        alt={investor.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                        data-ai-hint={imageData.imageHint}
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-semibold text-white">
                        {investor.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className="mt-1 border-accent/50 bg-accent/10 text-accent"
                      >
                        {investor.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Notable Backing
                    </h5>
                    <ul className="mt-2 space-y-1 text-sm text-white">
                      {investor.backing.map((company) => (
                        <li key={company}>{company}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
