import { motion } from 'framer-motion';

interface StatusMessageProps {
  error?: string;
  status?: string;
}

export function StatusMessage({ error, status }: StatusMessageProps) {
  if (!error && !status) return null;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 text-sm text-blue-600 animate-pulse"
    >
      {status}
    </motion.div>
  );
} 