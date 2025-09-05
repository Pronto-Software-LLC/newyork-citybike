import { Moon, SunMedium } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const Icons = {
  sun: SunMedium,
  moon: Moon,
};

const iconVariants = cva('');

export function IconSun({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <SunMedium
      size={24}
      className={cn(iconVariants({ className }))}
      {...props}
    />
  );
}
