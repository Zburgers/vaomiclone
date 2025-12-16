'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Particles from '@/components/particles';

const issues = [
  {
    title: '"Too Early."',
    phrase: 'Phrase #1',
    description:
      'Investors pass on visionary ideas because they don’t fit existing models. We find the data to prove the future.',
  },
  {
    title: '"Too Crowded."',
    phrase: 'Phrase #2',
    description:
      'In a sea of competitors, your unique signal is lost. We amplify your differentiation with surgical precision.',
  },
  {
    title: '"We\'ll Circle Back."',
    phrase: 'Phrase #3',
    description:
      'A polite "no" that leaves you in limbo. We turn vague objections into actionable insights and re-engagement.',
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
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <div className="flex h-screen w-full items-center justify-center">
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Slide scrollYProgress={scrollYProgress} start={0} end={0.33}>
           <div className="flex flex-col items-center text-center">
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
        </Slide>
        
        <Slide scrollYProgress={scrollYProgress} start={0.33} end={0.66}>
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="grid w-full max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-3"
            >
              {issues.map((issue) => (
                <motion.div variants={itemVariants} key={issue.title}>
                  <Card className="h-full border-white/10 bg-white/10 p-6 text-center backdrop-blur-md">
                    <CardHeader className="p-0">
                      <Badge
                        variant="outline"
                        className="mx-auto mb-4 border-accent/50 bg-accent/10 text-xs text-accent"
                      >
                        {issue.phrase}
                      </Badge>
                      <CardTitle className="text-xl font-medium text-white">
                        {issue.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2 p-0 text-sm text-muted-foreground">
                      <p>{issue.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
        </Slide>

        <Slide scrollYProgress={scrollYProgress} start={0.66} end={1.0}>
           <div className="relative flex flex-col items-center text-center">
             <Particles
                className="absolute inset-[-200px] z-0"
                quantity={500}
                color="#888888"
              />
            <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Conviction is not a line on a spreadsheet.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              It is the unwavering belief in a future that doesn't exist yet. We
              don't just build pitch decks; we build that belief.
            </p>
          </div>
        </Slide>
      </div>
    </section>
  );
}
