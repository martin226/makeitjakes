import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-16 py-8 border-t"
    >
      <div className="container mx-auto px-6 text-center text-muted-foreground">
        <p>
          No data is permanently stored on our servers. Read our{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          . We're{' '}
          <a href="https://github.com/martin226/makeitjakes" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            open-source
          </a>{' '}
          ❤️! By{' '}
          <a href="https://x.com/_martinsit" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            @_martinsit
          </a>
          {' '} &copy; {new Date().getFullYear()}.
        </p>
      </div>
    </motion.footer>
  );
} 