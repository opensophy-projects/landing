import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ServiceGridItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

interface ServicesGridProps {
  items: ServiceGridItem[];
  isNegative: boolean;
  cols?: 2 | 3 | 4;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  items,
  isNegative,
  cols = 3,
}) => {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[cols];

  return (
    <div className={cn(
      "relative grid divide-y",
      colClass,
      // Vertical dividers via divide-x per row — handled with borders per cell
      isNegative ? "border border-white/10 divide-white/10" : "border border-black/10 divide-black/10"
    )}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          viewport={{ once: true }}
          className={cn(
            "group relative p-8 md:p-10 space-y-3 transition-colors duration-200",
            // Add right border to simulate divide-x in a grid
            // Every col-th item: no right border (last in row)
            "border-r",
            isNegative
              ? "border-white/10 hover:bg-white/[0.025]"
              : "border-black/10 hover:bg-black/[0.025]",
            // Remove right border for last in each row
            cols === 3 && [
              i % 3 === 2 && "border-r-0",
            ],
            cols === 4 && [
              i % 4 === 3 && "border-r-0",
            ],
            cols === 2 && [
              i % 2 === 1 && "border-r-0",
            ],
          )}
        >
          <div className="space-y-2">
            {item.tag && (
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isNegative ? "text-white/30" : "text-black/30"
              )}>
                {item.tag}
              </span>
            )}
            <h3 className={cn(
              "text-base font-semibold leading-snug",
              isNegative ? "text-white/90" : "text-black/90"
            )}>
              {item.title}
            </h3>
          </div>
          <p className={cn(
            "text-sm leading-relaxed",
            isNegative ? "text-white/50" : "text-black/55"
          )}>
            {item.description}
          </p>

          {/* Subtle hover accent line at top */}
          <div className={cn(
            "absolute top-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-500",
            isNegative ? "bg-white/20" : "bg-black/15"
          )} />
        </motion.div>
      ))}
    </div>
  );
};