
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

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className={cn(
          "token-selector",
          variant === 'send' ? "text-white" : "text-blue-300"
        )}
        onClick={toggleDropdown}
      >
        <TokenIcon symbol={selectedToken.shortSymbol} />
        <span className="font-medium">{selectedToken.symbol}</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </div>

      <div className={cn("token-list", isOpen ? "visible" : "")}>
        <div className="token-search">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Type a currency or ticker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="transition-all duration-300"
            />
          </div>
        </div>

        {popularTokens.length > 0 && (
          <>
            <div className="px-4 py-2 text-sm text-gray-400">Popular currencies</div>
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {popularTokens.map((token) => (
                <div
                  key={token.symbol}
                  className={cn(
                    "token-item",
                    selectedToken.symbol === token.symbol ? "token-item-active" : ""
                  )}
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    <TokenIcon symbol={token.shortSymbol} />
                    <div>
                      <div className="text-white">{token.name}</div>
                      {token.network && (
                        <div className="text-xs text-gray-400">{token.network}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right font-medium text-gray-300">{token.symbol}</div>
                </div>
              ))}
            </div>
            <div className="token-divider"></div>
          </>
        )}

        {allTokens.length > 0 && (
          <>
            <div className="px-4 py-2 text-sm text-gray-400">All currencies</div>
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {allTokens.map((token) => (
                <div
                  key={token.symbol}
                  className={cn(
                    "token-item",
                    selectedToken.symbol === token.symbol ? "token-item-active" : ""
                  )}
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    <TokenIcon symbol={token.shortSymbol} />
                    <div>
                      <div className="text-white">{token.name}</div>
                      {token.network && (
                        <div className="text-xs text-gray-400">{token.network}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right font-medium text-gray-300">{token.symbol}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredTokens.length === 0 && (
          <div className="p-4 text-center text-gray-400">No tokens found</div>
        )}
      </div>
    </div>
  );
};

export default TokenSelector;
