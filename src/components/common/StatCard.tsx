
import React from 'react';
import { cn } from '@/lib/utils';
import { useCountAnimation } from '@/utils/animations';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
  animate?: boolean;
  formatValue?: (value: number) => string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'neo';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
  animate = true,
  formatValue,
  size = 'md',
  variant = 'default'
}) => {
  const numericValue = typeof value === 'number' ? value : 0;
  const animatedValue = animate ? useCountAnimation(numericValue) : numericValue;
  
  const displayValue = 
    typeof value === 'string' 
      ? value 
      : (formatValue ? formatValue(animate ? animatedValue : numericValue) : animatedValue.toString());
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5'
  };
  
  const variantClasses = {
    default: 'bg-white dark:bg-card shadow-subtle hover:shadow-elevated transition-shadow duration-300',
    glass: 'glass-card',
    neo: 'neo-card'
  };
  
  return (
    <div 
      className={cn(
        'rounded-xl border border-border/40',
        variantClasses[variant],
        sizeClasses[size],
        'hover-lift',
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline gap-1">
            <p className={cn(
              'font-semibold',
              size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'
            )}>
              {displayValue}
            </p>
            {trend && (
              <span className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              )}>
                {trend.isPositive ? '↑' : '↓'}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center text-muted-foreground/70">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
