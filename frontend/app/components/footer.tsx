import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-8 text-center"
    >
      <p className="text-sm text-muted-foreground">
        No data is permanently stored on our servers. Read our{' '}
        <Link to="/privacy" className="underline hover:text-blue-600 transition-colors">
          Privacy Policy
        </Link>
        . We're{' '}
        <a href="https://github.com/martin226/makeitjakes" className="underline hover:text-blue-600 transition-colors" target="_blank">
          open-source
        </a>{' '}
        ❤️! By{' '}
        <a href="https://x.com/_martinsit" className="underline hover:text-blue-600 transition-colors" target="_blank">
          @_martinsit
        </a>
        .
      </p>
    </motion.div>
  );
} 