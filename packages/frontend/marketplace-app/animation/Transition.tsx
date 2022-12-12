import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Container } from '@nextui-org/react';
import React from 'react';

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.75,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
};

const Transition = ({ children }: React.PropsWithChildren) => {
  const { asPath } = useRouter();

  return (
    <Container as="div" css={{ height: '100vh' }}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Transition;
