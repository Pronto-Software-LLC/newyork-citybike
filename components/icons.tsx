import { Moon, SunMedium } from '@react-zero-ui/icon-sprite';
import { cva, type VariantProps } from 'class-variance-authority';

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
