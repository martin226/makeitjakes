import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="font-bold text-2xl hover:opacity-90 transition-opacity">
            Make it <span className="text-primary">Jake's</span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
} 