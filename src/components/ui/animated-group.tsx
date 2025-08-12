'use client';
import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';
import React from 'react';

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: string;
  asChild?: string;
};

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
};

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  // Create motion components safely
  const MotionContainer = React.useMemo(() => {
    if (as === 'div') return motion.div;
    if (as === 'span') return motion.span;
    if (as === 'section') return motion.section;
    if (as === 'article') return motion.article;
    if (as === 'header') return motion.header;
    if (as === 'footer') return motion.footer;
    if (as === 'nav') return motion.nav;
    if (as === 'main') return motion.main;
    if (as === 'aside') return motion.aside;
    if (as === 'ul') return motion.ul;
    if (as === 'ol') return motion.ol;
    if (as === 'li') return motion.li;
    return motion.div;
  }, [as]);

  const MotionItem = React.useMemo(() => {
    if (asChild === 'div') return motion.div;
    if (asChild === 'span') return motion.span;
    if (asChild === 'section') return motion.section;
    if (asChild === 'article') return motion.article;
    if (asChild === 'header') return motion.header;
    if (asChild === 'footer') return motion.footer;
    if (asChild === 'nav') return motion.nav;
    if (asChild === 'main') return motion.main;
    if (asChild === 'aside') return motion.aside;
    if (asChild === 'ul') return motion.ul;
    if (asChild === 'ol') return motion.ol;
    if (asChild === 'li') return motion.li;
    return motion.div;
  }, [asChild]);

  return (
    <MotionContainer
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionItem key={index} variants={itemVariants}>
          {child}
        </MotionItem>
      ))}
    </MotionContainer>
  );
}

export { AnimatedGroup };
