import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeaturesCardProps {
  title: string;
  description: string;
  imagePath: string;
}

export function FeaturesCard({
  title,
  description,
  imagePath,
}: FeaturesCardProps) {
  return (
    <motion.div
      initial={{ x: '100%', visibility: 'hidden' }}
      whileInView={{ x: 0, visibility: 'initial' }}
      className="flex w-full max-w-6xl flex-grow flex-col-reverse items-center gap-14 md:flex-row md:gap-20"
    >
      <div className="flex flex-col gap-1 px-4 text-gray-700 md:gap-3 md:px-0">
        <h2 className="text-center text-2xl font-medium md:text-start md:text-4xl">
          {title}
        </h2>
        <p className="text-center text-xl font-light md:text-start md:text-2xl">
          {description}
        </p>
      </div>
      <div className="relative h-[200px] w-[380px] flex-shrink-0 overflow-hidden rounded-lg object-cover md:h-[240px] md:w-[420px]">
        <Image src={imagePath} alt={title} fill />
      </div>
    </motion.div>
  );
}
