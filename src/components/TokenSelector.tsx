import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import TokenIcon from './TokenIcon';
import { cn } from '@/lib/utils';

export type Token = {
  name: string;
  symbol: string;
  shortSymbol: 'BTC' | 'ETH' | 'LTC' | 'USDT' | 'XMR' | 'ZRX' | 'AAVE' | 'AVAX' | 'BNB';
  popular: boolean;
  network?: string;
};

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  variant?: 'send' | 'receive';
  className?: string;
}

const tokens: Token[] = [
  { name: 'Bitcoin', symbol: 'BTC', shortSymbol: 'BTC', popular: true },
  { name: 'Ethereum', symbol: 'ETH', shortSymbol: 'ETH', popular: true },
  { name: 'Tether', symbol: 'USDT', shortSymbol: 'USDT', popular: true, network: 'ERC20' },
  { name: 'Litecoin', symbol: 'LTC', shortSymbol: 'LTC', popular: true },
  { name: 'Monero', symbol: 'XMR', shortSymbol: 'XMR', popular: true },
  { name: '0x', symbol: 'ZRX', shortSymbol: 'ZRX', popular: false, network: 'ERC20' },
  { name: 'Aave', symbol: 'AAVE', shortSymbol: 'AAVE', popular: false, network: 'ERC20' },
  { name: 'Avalanche', symbol: 'AVAX', shortSymbol: 'AVAX', popular: false, network: 'C-Chain' },
  { name: 'BNB Beacon Chain', symbol: 'BNB', shortSymbol: 'BNB', popular: false, network: 'BEP2' },
];

const TokenSelector: React.FC<TokenSelectorProps> = ({ 
  selectedToken, 
  onTokenSelect, 
  variant = 'send', 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularTokens = filteredTokens.filter(token => token.popular);
  const allTokens = filteredTokens.filter(token => !token.popular);

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const textColor = variant === 'send' ? 'text-white' : 'text-blue-300';
  const symbolColor = variant === 'send' ? 'text-orange-400' : 'text-blue-300';

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        ref={selectorRef}
        className={cn(
          "token-selector",
          variant === 'send' ? "text-white" : "text-blue-300"
        )}
        onClick={toggleDropdown}
      >
        <TokenIcon symbol={selectedToken.shortSymbol} />
        <span className={cn("font-medium", symbolColor)}>{selectedToken.symbol}</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </div>
    </div>
  );
};

export default TokenSelector;