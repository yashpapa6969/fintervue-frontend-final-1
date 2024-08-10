import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

function WordFadeIn({
  words = '',
  delay = 0.35,
  variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}) {
  const _words = words.split(' ');

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        'font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]',
        className
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={i} variants={variants} custom={i}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default WordFadeIn;
