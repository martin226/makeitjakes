import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 relative"
    >
      <h1 className="text-4xl font-bold tracking-tight mb-4 relative inline-block">
        Make it{' '}
        <span className="relative inline-block">
          <span className="relative z-10 text-blue-700">Jake's</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 bg-blue-200/80 -skew-y-2 transform origin-left"
          />
        </span>
      </h1>
      <p className="text-muted-foreground text-lg max-w-[500px]">
        Transform your resume into Jake&apos;s elegant LaTeX template with just one click. No
        LaTeX knowledge required.
      </p>
    </motion.div>
  );
} 