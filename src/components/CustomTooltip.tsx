import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomTooltipProps {
  tooltipText: string;
  onClick?: () => void;
  className?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  tooltipText, 
  onClick,
  className 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div 
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={tooltipRef}
    >
      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#0C0D16] cursor-pointer">
        <HelpCircle className="w-4 h-4 text-blue-400" />
      </div>
      
      <div 
        className={cn(
          "absolute left-5 flex items-center h-7 px-3 bg-[#0C0D16] text-white text-sm whitespace-nowrap rounded-full transition-all duration-200",
          showTooltip 
            ? "opacity-100 translate-x-0 pointer-events-auto" 
            : "opacity-0 -translate-x-2 pointer-events-none"
        )}
      >
        {tooltipText}
      </div>
    </div>
  );
};

export default CustomTooltip;