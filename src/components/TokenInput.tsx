import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import TokenSelector, { Token } from './TokenSelector';
import { Search } from 'lucide-react';
import TokenIcon from './TokenIcon';

interface TokenInputProps {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    onTokenSelect: (token: Token) => void;
    selectedToken: Token;
    variant: 'send' | 'receive';
    readOnly?: boolean;
    minAmount?: string;
    maxAmount?: string;
    placeholder?: string;
    className?: string;
    exchangeRate?: string;
    usdValue?: string;
    width?: string;
    labelClassName?: string;
}

const TokenInput: React.FC<TokenInputProps> = ({
    label,
    value,
    onChange,
    onTokenSelect,
    selectedToken,
    variant,
    readOnly = false,
    minAmount,
    maxAmount,
    placeholder = '0',
    className,
    exchangeRate,
    labelClassName,
    usdValue,
    width = "100%"
}) => {
    const [isTokenListOpen, setIsTokenListOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const labelColor = variant === 'send' ? 'text-white opacity-80' : 'text-blue-400';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const value = e.target.value.replace(/[^0-9.]/g, '');
            onChange(value);
        }
    };
    
    const tokens = [
      { name: 'Bitcoin', symbol: 'BTC', shortSymbol: 'BTC' as const, popular: true },
      { name: 'Ethereum', symbol: 'ETH', shortSymbol: 'ETH' as const, popular: true },
      { name: 'Tether', symbol: 'USDT', shortSymbol: 'USDT' as const, popular: true, network: 'ERC20' },
      { name: 'Litecoin', symbol: 'LTC', shortSymbol: 'LTC' as const, popular: true },
      { name: 'Monero', symbol: 'XMR', shortSymbol: 'XMR' as const, popular: true },
      { name: '0x', symbol: 'ZRX', shortSymbol: 'ZRX' as const, popular: false, network: 'ERC20' },
      { name: 'Aave', symbol: 'AAVE', shortSymbol: 'AAVE' as const, popular: false, network: 'ERC20' },
      { name: 'Avalanche', symbol: 'AVAX', shortSymbol: 'AVAX' as const, popular: false, network: 'C-Chain' },
      { name: 'BNB Beacon Chain', symbol: 'BNB', shortSymbol: 'BNB' as const, popular: false, network: 'BEP2' },
    ];
    
    const filteredTokens = tokens.filter(token => 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const popularTokens = filteredTokens.filter(token => token.popular);
    const allTokens = filteredTokens.filter(token => !token.popular);
    
    const handleTokenSelect = (token: Token) => {
      onTokenSelect(token);
      setIsTokenListOpen(false);
      setSearchTerm('');
    };
    
    const toggleTokenList = () => {
      setIsTokenListOpen(!isTokenListOpen);
    };
    
    const textColor = variant === 'send' ? 'text-white' : 'text-blue-300';
    const symbolColor = variant === 'send' ? 'text-orange-400' : 'text-blue-300';

    return (
        <div className={cn("w-full min-w-0 flex-1 relative", className)}>
            <div className="flex justify-between items-center mb-1">
                <label className={cn("text-white opacity-80 text-sm", labelClassName)}>
                    {label}
                </label>
                <span className={`${labelColor} text-sm truncate max-w-[120px]`}>{selectedToken.name}</span>
            </div>

            <div className={`input-${variant} relative`}>
                <div className="flex items-center p-2">
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readOnly}
                        className="flex-1 min-w-0 bg-transparent text-2xl text-white p-2 focus:outline-none"
                        placeholder={placeholder}
                    />
                    <div 
                      className={cn(
                        "token-selector",
                        variant === 'send' ? "text-white" : "text-blue-300"
                      )}
                      onClick={toggleTokenList}
                    >
                      <TokenIcon symbol={selectedToken.shortSymbol} />
                      <span className={cn("font-medium", symbolColor)}>{selectedToken.symbol}</span>
                      <svg className="h-4 w-4 opacity-70" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
            </div>

            {isTokenListOpen && (
              <div className="token-list w-full visible">
                <div className="token-search">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type a currency or ticker"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {popularTokens.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-400">Popular currencies</div>
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
                          <div className={cn("text-right font-medium", 
                            token.shortSymbol === 'BTC' ? 'text-orange-400' : 
                            token.shortSymbol === 'ETH' ? 'text-indigo-300' :
                            token.shortSymbol === 'USDT' ? 'text-green-400' :
                            token.shortSymbol === 'LTC' ? 'text-blue-300' :
                            token.shortSymbol === 'XMR' ? 'text-orange-500' :
                            'text-gray-300'
                          )}>{token.symbol}</div>
                        </div>
                      ))}
                    </>
                  )}

                  {allTokens.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-400">All currencies</div>
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
                          <div className={cn("text-right font-medium", 
                            token.shortSymbol === 'ZRX' ? 'text-gray-300' : 
                            token.shortSymbol === 'AAVE' ? 'text-purple-400' :
                            token.shortSymbol === 'AVAX' ? 'text-red-400' :
                            token.shortSymbol === 'BNB' ? 'text-yellow-400' :
                            'text-gray-300'
                          )}>{token.symbol}</div>
                        </div>
                      ))}
                    </>
                  )}

                  {filteredTokens.length === 0 && (
                    <div className="p-4 text-center text-gray-400">No tokens found</div>
                  )}
                </div>
              </div>
            )}

            {(minAmount || maxAmount || exchangeRate || usdValue) && (
                <div className="flex justify-between text-sm mt-1">
                    {(minAmount || maxAmount) && (
                        <div className="text-gray-400">
                            {minAmount && `min: ${minAmount} ${selectedToken.symbol}`}
                            {maxAmount && !minAmount && `max: ${maxAmount} ${selectedToken.symbol}`}
                        </div>
                    )}

                    {(maxAmount && minAmount) && (
                        <div className="text-gray-400">
                            max: {maxAmount} {selectedToken.symbol}
                        </div>
                    )}

                    {exchangeRate && (
                        <div className="text-gray-400">
                            {exchangeRate}
                        </div>
                    )}

                    {usdValue && (
                        <div className="text-gray-400">
                            ${usdValue}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TokenInput;