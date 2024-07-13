'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';
import HomeButtons from './_components/home-buttons';
import NavBar from './_components/navbar';
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from '@/components/ui/typewriteeffectsmooth';

const renderArourabackground = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-8"
      >
        <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-5xl">
          Record your daily expenses effortlessly. Categorize your spending to
          see where your money goes.
        </h1>
      </motion.div>
    </AuroraBackground>
  );
};

export default function Home() {
  const words = [
    {
      text: 'Take Contorl of Your',
    },
    {
      text: 'Finances With Mudra.',
      className: 'text-green-500 dark:text-blue-500',
    },
  ];

  return (
    <div className=" flex min-h-screen w-full flex-col">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-1">
        <div className="flex w-6/12 flex-col justify-center space-y-6 px-10 py-10 md:px-10 md:py-10">
          <TypewriterEffectSmooth words={words} />
          <p className="text-base leading-relaxed md:text-lg">
            Welcome to Mudra, your ultimate companion for managing expenses
            effortlessly. Track your spending, set budgets, and achieve your
            financial goals with ease. Mudra helps you take control of your
            finances, ensuring every penny is well spent and well saved.
          </p>
          <HomeButtons />
        </div>
        <div className="w-6/12">{renderArourabackground()}</div>
      </div>
    </div>
  );
}
