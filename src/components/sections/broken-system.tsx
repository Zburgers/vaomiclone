'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlanetMesh from '@/components/planet-mesh';
import { 
  Zap, 
  Database, 
  Clock, 
  TrendingDown, 
  Flame, 
  Activity, 
  Radio, 
  Globe
} from 'lucide-react';

const issues = [
  {
    title: '"Too Early."',
    phrase: 'Phrase #1',
    description: 'Investors pass on visionary ideas because they don’t fit existing models.',
  },
  {
    title: '"Too Crowded."',
    phrase: 'Phrase #2',
    description: 'In a sea of competitors, your unique signal is lost.',
  },
  {
    title: '"We\'ll Circle Back."',
    phrase: 'Phrase #3',
    description: 'A polite "no" that leaves you in limbo.',
  },
];

const Slide = ({
  children,
  scrollYProgress,
  start,
  end,
}: {
  children: React.ReactNode;
  scrollYProgress: any;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.8, 1, 1, 0.8]);
  
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        {children}
      </div>
    </motion.div>
  );
};


export default function BrokenSystem() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={targetRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Slide 1: The Problem */}
        <Slide scrollYProgress={scrollYProgress} start={0} end={0.25}>
           <div className="flex flex-col items-center text-center gap-12">
            <div>
                <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Founders aren&apos;t failing.
                <br />
                The fundraising system is.
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                Every founder knows this feeling. You’ve built something that
                changes lives, but when it’s time to raise, the world stops
                listening.
                </p>
            </div>
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {issues.map((issue) => (
                <Card key={issue.title} className="bg-white/5 border-white/10 p-6 text-center backdrop-blur-md hover:bg-white/10 transition-colors">
                    <CardHeader className="p-0">
                      <Badge
                        variant="outline"
                        className="mx-auto mb-4 border-accent/50 bg-accent/10 text-xs text-accent uppercase"
                      >
                        {issue.phrase}
                      </Badge>
                      <CardTitle className="text-xl font-medium text-white">
                        {issue.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-4 p-0 text-sm text-muted-foreground">
                      <p>{issue.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Slide>
        
        {/* Slide 2: Conviction */}
        <Slide scrollYProgress={scrollYProgress} start={0.25} end={0.5}>
          <div className="flex flex-col items-center justify-center text-center">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                 And this is because conviction<br/>takes precedence.
             </h2>
             <div className="flex items-center gap-8 md:gap-24 mb-16">
                 <div className="flex flex-col items-center gap-6">
                     <div className="bg-white p-4 rounded shadow-lg">
                        <TrendingDown className="size-16 text-black" />
                     </div>
                     <p className="text-muted-foreground max-w-[200px]">Raising capital isn&apos;t a financial process.</p>
                 </div>
                 <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                 <div className="flex flex-col items-center gap-6">
                     <div className="relative">
                        <Flame className="size-24 text-orange-500 fill-orange-500 animate-pulse" />
                     </div>
                     <p className="text-white font-bold text-xl max-w-[200px]">It is an<br/>emotional one.</p>
                 </div>
             </div>
             <p className="text-xl text-muted-foreground">Capital doesn&apos;t move for logic alone. It moves for belief.</p>
          </div>
        </Slide>

        {/* Slide 3: Dream Round Formula */}
        <Slide scrollYProgress={scrollYProgress} start={0.5} end={0.75}>
           <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              To solve this, we came up with the<br/>
              Dream Round Formula
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-16">
              Every round that changes a company&apos;s destiny has <span className="text-white font-semibold">three ingredients</span>:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full">
                <div className="flex flex-col items-center gap-4 group">
                      <div className="rounded-full bg-blue-500/10 p-6 text-blue-500 ring-1 ring-blue-500/50 transition-all group-hover:bg-blue-500/20 group-hover:scale-110">
                          <Zap size={40} />
                      </div>
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm mt-4">THE STORY</h3>
                      <p className="text-muted-foreground">That makes people believe.</p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                      <div className="rounded-full bg-purple-500/10 p-6 text-purple-500 ring-1 ring-purple-500/50 transition-all group-hover:bg-purple-500/20 group-hover:scale-110">
                          <Database size={40} />
                      </div>
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm mt-4">THE INVESTORS</h3>
                      <p className="text-muted-foreground">Who already understand that story.</p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                      <div className="rounded-full bg-emerald-500/10 p-6 text-emerald-500 ring-1 ring-emerald-500/50 transition-all group-hover:bg-emerald-500/20 group-hover:scale-110">
                          <Clock size={40} />
                      </div>
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm mt-4">THE TIMING</h3>
                      <p className="text-muted-foreground">Connecting when the signal is strongest.</p>
                </div>
            </div>
          </div>
        </Slide>
        
        {/* Slide 4: Capital Intelligence Network */}
        <Slide scrollYProgress={scrollYProgress} start={0.75} end={1.0}>
            <div className="relative flex flex-col items-center justify-center text-center h-full w-full">
                <PlanetMesh className="absolute inset-0 -z-10 opacity-60" color="#ffffff" radius={300} count={1200} />
                
                <div className="space-y-6 max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg">Which is powered by</p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white">The Capital Intelligence Network</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A super intelligent system that has mapped over <span className="text-white font-bold">750,000</span> venture
                        transactions in the span of the last 15 years and tracks <span className="text-white font-bold">60,000</span> allocators
                        globally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 mt-8">
                    <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <Activity size={14} className="text-emerald-500" /> Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold text-white text-left">Smart Money</div>
                            <div className="text-xs text-muted-foreground text-left">Signals</div>
                            <div className="flex gap-1 mt-3">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-emerald-500/20'}`} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    
                     <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <Radio size={14} className="text-blue-500" /> Live Feed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold text-white text-left">Daily Intent</div>
                            <div className="text-xs text-muted-foreground text-left">Decoding</div>
                             <div className="mt-3 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                <div className="h-px flex-1 bg-blue-500/30" />
                                <span className="text-[10px] text-blue-500">ACTIVE</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <Globe size={14} className="text-purple-500" /> Reach
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold text-white text-left">Global</div>
                            <div className="text-xs text-muted-foreground text-left">Coverage</div>
                            <div className="mt-3 relative h-6 w-full overflow-hidden rounded bg-purple-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-[shimmer_2s_infinite]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Slide>
      </div>
    </section>
  );
}
