import React from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '../../ui/glowing-effect';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNegative: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, isNegative }) => {
  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';
  const iconColor = isNegative ? 'text-[#E8E7E3]' : 'text-[#0a0a0a]';

  return (
    <div className={cn(
      "relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
      borderColor
    )}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        isNegative={isNegative}
      />
      <div className={cn(
        "relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-8",
        isNegative 
          ? 'bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]' 
          : 'bg-[#E8E7E3] border-black/10'
      )}>
        <div className={cn(
          "w-fit rounded-lg border-[0.75px] p-3",
          isNegative ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
        )}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className={cn(
            "text-xl sm:text-2xl font-semibold leading-tight",
            isNegative ? 'text-white' : 'text-black'
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-sm sm:text-base leading-relaxed",
            isNegative ? 'text-white/70' : 'text-black/70'
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
