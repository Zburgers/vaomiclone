'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Typewriter = () => {
  const text = "Hi, I'm Vaomi.".split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center text-4xl font-bold md:text-6xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-3">
          {word}
        </motion.span>
      ))}
      <motion.span
        className="ml-1 inline-block h-10 w-1.5 rounded-full bg-white align-middle"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center gap-6 text-center">
        <Typewriter />
        <motion.p
          className="max-w-xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          The Quiet Force Which Turns Vision Into Conviction.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Button
            variant="outline"
            className="rounded-full border-white/30 bg-transparent px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Book a FREE call
          </Button>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 h-full w-full bg-background bg-dot-white/[0.2]" />
       <div className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e4233,transparent)]" />
    </section>
  );
}
