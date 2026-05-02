import React from 'react';
import { cn, vibrate } from '../lib/utils';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary shadow-[0_6px_0_0_#5a00c6] hover:bg-primary/90 focus-visible:ring-primary',
      secondary: 'bg-secondary text-on-secondary shadow-[0_6px_0_0_#004e60] hover:bg-secondary/90 focus-visible:ring-secondary',
      tertiary: 'bg-tertiary text-on-tertiary shadow-[0_6px_0_0_#574500] hover:bg-tertiary/90 focus-visible:ring-tertiary',
      error: 'bg-error text-on-error shadow-[0_6px_0_0_#690005] hover:bg-error/90 focus-visible:ring-error',
      success: 'bg-emerald-500 text-white shadow-[0_6px_0_0_#064e3b] hover:bg-emerald-600 focus-visible:ring-emerald-500',
      ghost: 'bg-white/5 backdrop-blur-md text-on-surface border border-white/10 hover:bg-white/10 shadow-lg',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg h-10',
      md: 'px-6 py-3 text-base rounded-lg h-14',
      lg: 'px-8 py-4 text-lg rounded-xl h-20',
      xl: 'px-10 py-5 text-xl rounded-2xl h-24',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      vibrate();
      if (props.onClick) props.onClick(e);
    };

    return (
      <motion.button
        whileTap={{ y: 2, scale: 0.98 }}
        ref={ref}
        onClick={handleClick}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-headline-md uppercase tracking-tight transition-all disabled:opacity-50 disabled:pointer-events-none active:shadow-none',
          variants[variant],
          variants[variant] !== variants.ghost && 'active:translate-y-1',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
  const Component = animate ? motion.div : 'div';
  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      className={cn(
        'glass-card rounded-[2rem] p-6 border-b-8 border-slate-900 shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10',
        className
      )}
    >
      {children}
    </Component>
  );
};

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const TopNavbar = ({ title = 'DUELO DAS PALAVRAS', subtitle, rightElement }: TopNavbarProps) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-24 bg-slate-950/80 backdrop-blur-xl rounded-b-[3rem] border-b-4 border-slate-900 shadow-[0_8px_0_0_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-4">
        <button className="p-2 text-violet-500 hover:bg-slate-800 transition-all duration-200 active:translate-y-1 rounded-full">
          <Menu size={32} />
        </button>
        <div className="flex flex-col">
          <h1 className="font-headline-lg italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 leading-none">
            {title}
          </h1>
          {subtitle && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </header>
  );
};
