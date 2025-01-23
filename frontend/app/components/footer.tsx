import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-8 text-center"
    >
      <p className="text-sm text-muted-foreground">
        No data is stored on our servers. Read our{' '}
        <a href="" className="underline">
          Privacy Policy
        </a>
        . We're{' '}
        <a href="https://github.com/martin226/makeitjakes" className="underline" target="_blank">
          open-source
        </a>{' '}
        ❤️! &copy; {new Date().getFullYear()} Martin Sit.
      </p>
    </motion.div>
  );
} 