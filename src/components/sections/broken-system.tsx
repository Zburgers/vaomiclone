'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const issues = [
  {
    title: 'Too Early',
    description:
      'Investors pass on visionary ideas because they don’t fit existing models. We find the data to prove the future.',
  },
  {
    title: 'Too Crowded',
    description:
      'In a sea of competitors, your unique signal is lost. We amplify your differentiation with surgical precision.',
  },
  {
    title: 'We’ll Circle Back',
    description:
      'A polite "no" that leaves you in limbo. We turn vague objections into actionable insights and re-engagement.',
  },
];

export default function BrokenSystem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            The fundraising system is broken.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            Founders are told to build the future, but judged by the past. We
            level the playing field.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {issues.map((issue) => (
            <motion.div variants={itemVariants} key={issue.title}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {issue.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{issue.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
