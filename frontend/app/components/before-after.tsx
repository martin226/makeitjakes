import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import before from '~/assets/img/before.png';
import after from '~/assets/img/after.png';

export function BeforeAfter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col md:flex-row items-center gap-8 mb-12 px-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative w-[180px] md:w-[200px] h-[254px] md:h-[282px] rounded-lg overflow-hidden shadow-lg"
      >
        <img src={before} alt="Before transformation" className="w-full h-full object-contain" />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm py-2 text-center backdrop-blur-sm">
          Before
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex md:flex-col items-center gap-2"
      >
        <MoveRight className="w-6 h-6 md:w-8 md:h-8 text-blue-500 rotate-90 md:rotate-0" />
        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          Industry Standard
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative w-[180px] md:w-[200px] h-[254px] md:h-[282px] rounded-lg overflow-hidden shadow-lg"
      >
        <img src={after} alt="After transformation" className="w-full h-full object-contain" />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm py-2 text-center backdrop-blur-sm">
          After
        </div>
      </motion.div>
    </motion.div>
  );
} 