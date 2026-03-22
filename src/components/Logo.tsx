import React from 'react';
import { Dumbbell } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  suffix?: string;
}

export default function Logo({ 
  className, 
  iconClassName, 
  textClassName, 
  showText = true,
  size = 'md',
  suffix
}: LogoProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-lg' },
    md: { container: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-xl' },
    lg: { container: 'w-12 h-12', icon: 'w-8 h-8', text: 'text-2xl' },
    xl: { container: 'w-16 h-16', icon: 'w-10 h-10', text: 'text-4xl' },
  };

  const currentSize = sizeClasses[size];

  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={cn("flex items-center gap-3 shrink-0", className)}>
      <div className={cn(
        currentSize.container,
        "bg-black rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/10",
        iconClassName
      )}>
        {!imageError ? (
          <img 
            src="/favicon.jpg" 
            alt="Logo" 
            className={cn("object-cover rounded-lg", currentSize.icon)}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <Dumbbell 
            className={cn("text-blue-500", currentSize.icon)} 
            strokeWidth={2.5}
          />
        )}
      </div>
      {showText && (
        <span className={cn(
          "font-black tracking-tighter whitespace-nowrap",
          currentSize.text,
          textClassName || "text-black"
        )}>
          GymLedger{suffix && <span className="ml-1.5 text-blue-600 font-bold">{suffix}</span>}
        </span>
      )}
    </div>
  );
}
