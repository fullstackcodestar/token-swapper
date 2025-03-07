
import React from 'react';
import { cn } from '@/lib/utils';

type TokenSymbol = 'BTC' | 'ETH' | 'LTC' | 'USDT' | 'XMR' | 'ZRX' | 'AAVE' | 'AVAX' | 'BNB';

interface TokenIconProps {
  symbol: TokenSymbol;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ symbol, size = 'md', className }) => {
  const sizeClass = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const getIconBySymbol = () => {
    switch (symbol) {
      case 'BTC':
        return (
          <div className={cn(`bg-token-bitcoin rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M14.5 11.5C15.0806 11.2071 15.5 10.7367 15.5 9.9V9.1C15.5 8.1 14.6046 7 13.5 7H10V11.5M14.5 11.5H10M14.5 11.5H15.5C16.6046 11.5 17.5 12.3954 17.5 13.5C17.5 14.6046 16.6046 15.5 15.5 15.5H13.5L10 15.5V11.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'ETH':
        return (
          <div className={cn(`bg-token-ethereum rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M7.5 12L12 5.5L16.5 12M7.5 12L12 15M7.5 12L12 13.5M16.5 12L12 15M16.5 12L12 13.5M12 15V18.5M12 15L7.5 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'LTC':
        return (
          <div className={cn(`bg-token-litecoin rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M5.5 13.5L8.5 5.5H11.5L9.5 11.5L14.5 9.5L12.5 18.5H5.5L6.5 15.5H4.5L5.5 13.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'USDT':
        return (
          <div className={cn(`bg-token-tether rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M12 6.5V15.5M12 6.5H7.5M12 6.5H16.5M7.5 9.5H16.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'XMR':
        return (
          <div className={cn(`bg-token-monero rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M5.5 9.5V14.5H9.5L12 12L14.5 14.5H18.5V9.5L12 15.5L5.5 9.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'ZRX':
        return (
          <div className={cn(`bg-token-zrx rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M6.5 7.5H17.5L6.5 16.5H17.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'AAVE':
        return (
          <div className={cn(`bg-token-aave rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M7.5 11.5L12 6L16.5 11.5M9 14.5L12 11.5L15 14.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'AVAX':
        return (
          <div className={cn(`bg-token-avalanche rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M12 6L7 15H17L12 6Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'BNB':
        return (
          <div className={cn(`bg-token-bnb rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <path
                d="M12 6L14.5 8.5L12 11L9.5 8.5L12 6Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 10.5L19 13L16.5 15.5L14 13L16.5 10.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10.5L10 13L7.5 15.5L5 13L7.5 10.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15L14.5 17.5L12 20L9.5 17.5L12 15Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className={cn(`bg-gray-500 rounded-full flex items-center justify-center ${sizeClass[size]}`, className)}>
            <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-white">
              <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        );
    }
  };

  return getIconBySymbol();
};

export default TokenIcon;
