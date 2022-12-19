import {
  AnimatePresence as MAnimatePresence,
  motion,
  AnimatePresenceProps,
} from 'framer-motion';
import React from 'react';

const AnimatePresence = ({
  children,
  ...props
}: React.PropsWithChildren & AnimatePresenceProps) => (
  <MAnimatePresence {...props}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  </MAnimatePresence>
);
export default AnimatePresence;
