
import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, HelpCircle, QrCode } from 'lucide-react';
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TokenSelector, { Token } from './TokenSelector';
import { cn } from '@/lib/utils';

interface ExchangeFormProps {
  className?: string;
}

const ExchangeForm: React.FC<ExchangeFormProps> = ({ className }) => {
  const [sendToken, setSendToken] = useState<Token>({
    name: 'Ethereum',
    symbol: 'ETH',
    shortSymbol: 'ETH',
    popular: true
  });
  
  const [receiveToken, setReceiveToken] = useState<Token>({
    name: 'Litecoin',
    symbol: 'LTC',
    shortSymbol: 'LTC',
    popular: true
  });
  
  const [sendAmount, setSendAmount] = useState<string>('1');
  const [receiveAmount, setReceiveAmount] = useState<string>('20.507137');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [orderType, setOrderType] = useState<'fixed' | 'float'>('float');
  
  // Exchange rates (simplified for demo)
  const exchangeRates = {
    ETH: {
      LTC: 20.715788,
      BTC: 0.057,
      USDT: 2174.31,
      XMR: 12.8,
      ZRX: 3600,
      AAVE: 18.5,
      AVAX: 58.3,
      BNB: 6.2
    },
    LTC: {
      ETH: 0.0477072,
      BTC: 0.0027,
      USDT: 102.56,
      XMR: 0.62,
      ZRX: 172.3,
      AAVE: 0.89,
      AVAX: 2.81,
      BNB: 0.3
    },
    BTC: {
      ETH: 17.54,
      LTC: 370,
      USDT: 38253,
      XMR: 224.7,
      ZRX: 63333,
      AAVE: 324.5,
      AVAX: 1023.1,
      BNB: 109.1
    }
  };

  // Helper to get exchange rate
  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    
    try {
      // @ts-ignore - simplified for demo
      return exchangeRates[from][to] || 1;
    } catch (e) {
      console.error("Exchange rate not found", e);
      return 1;
    }
  };

  // Calculate prices when inputs change
  useEffect(() => {
    const rate = getExchangeRate(sendToken.symbol, receiveToken.symbol);
    if (sendAmount) {
      const calculated = (parseFloat(sendAmount) * rate).toFixed(7);
      setReceiveAmount(calculated);
    }
  }, [sendAmount, sendToken, receiveToken]);

  // Handle switching tokens
  const handleSwitchTokens = () => {
    const tempToken = sendToken;
    setSendToken(receiveToken);
    setReceiveToken(tempToken);
    
    // Recalculate amounts
    const rate = getExchangeRate(receiveToken.symbol, sendToken.symbol);
    if (sendAmount) {
      const calculated = (parseFloat(sendAmount) * rate).toFixed(7);
      setReceiveAmount(calculated);
    }
  };

  // Get USD value
  const getUsdValue = (amount: string, token: Token): string => {
    if (!amount) return '0.00';
    
    let usdRate = 0;
    try {
      // @ts-ignore - simplified for demo
      usdRate = exchangeRates[token.symbol]['USDT'] || 0;
    } catch (e) {
      usdRate = token.symbol === 'USDT' ? 1 : 0;
    }
    
    return (parseFloat(amount) * usdRate).toFixed(2);
  };

  // Copy address to clipboard
  const handleCopyAddress = () => {
    if (destinationAddress) {
      navigator.clipboard.writeText(destinationAddress);
      toast.success("Address copied to clipboard", {
        description: "The destination address has been copied."
      });
    } else {
      toast.error("No address to copy", {
        description: "Please enter a destination address first."
      });
    }
  };

  return (
    <div className={cn("relative z-10 w-full max-w-4xl mx-auto", className)}>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Payrius Exchange</h1>
      </div>
      
      <div className="relative">
        {/* Send section */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-1">
            <label className="text-white opacity-80 text-sm">Send</label>
            <span className="text-white opacity-80 text-sm">{sendToken.name}</span>
          </div>
          
          <div className="input-send relative">
            <div className="flex items-center p-2">
              <input
                type="text"
                value={sendAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setSendAmount(value);
                }}
                className="flex-1 bg-transparent text-xl text-white p-2 focus:outline-none"
                placeholder="0"
              />
              <TokenSelector
                selectedToken={sendToken}
                onTokenSelect={setSendToken}
                variant="send"
              />
            </div>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <div className="text-gray-400">
              1 {sendToken.symbol} = {getExchangeRate(sendToken.symbol, receiveToken.symbol)} {receiveToken.symbol}
            </div>
            <div className="text-gray-400">
              ${getUsdValue(sendAmount, sendToken)}
            </div>
          </div>
        </div>
        
        {/* Switch button */}
        <div className="switch-button" onClick={handleSwitchTokens}>
          <ArrowLeftRight className="w-5 h-5 text-blue-300" />
        </div>
        
        {/* Receive section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-1">
            <label className="text-blue-300 text-sm">Receive</label>
            <span className="text-blue-300 text-sm">{receiveToken.name}</span>
          </div>
          
          <div className="input-receive relative">
            <div className="flex items-center p-2">
              <input
                type="text"
                value={receiveAmount}
                readOnly
                className="flex-1 bg-transparent text-xl text-white p-2 focus:outline-none"
                placeholder="0"
              />
              <TokenSelector
                selectedToken={receiveToken}
                onTokenSelect={setReceiveToken}
                variant="receive"
              />
            </div>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <div className="text-gray-400">
              1 {receiveToken.symbol} = {getExchangeRate(receiveToken.symbol, sendToken.symbol)} {sendToken.symbol}
            </div>
            <div className="text-gray-400">
              ${getUsdValue(receiveAmount, receiveToken)}
            </div>
          </div>
        </div>
        
        {/* Destination address */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-1">
            <label className="text-white opacity-80 text-sm">Destination</label>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder={`Your ${receiveToken.name} address`}
              className="destination-input"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <button 
                onClick={handleCopyAddress}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Order type and exchange button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white opacity-80 text-sm">Order type</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#242942] border-gray-700 text-gray-200 max-w-xs">
                    <p><strong>Fixed rate:</strong> Exchange rate is locked in when you place your order. Fee is 1.0%.</p>
                    <p className="mt-2"><strong>Float rate:</strong> Exchange rate will be determined at the time of exchange. Fee is 0.5%.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="order-tabs">
              <div 
                className={cn(
                  "order-tab", 
                  orderType === 'fixed' ? "order-tab-active" : "order-tab-inactive"
                )}
                onClick={() => setOrderType('fixed')}
              >
                Fixed rate (1.0%)
              </div>
              <div 
                className={cn(
                  "order-tab", 
                  orderType === 'float' ? "order-tab-active" : "order-tab-inactive"
                )}
                onClick={() => setOrderType('float')}
              >
                Float rate (0.5%)
              </div>
            </div>
          </div>
          
          <button
            className="exchange-button"
            onClick={() => {
              if (!destinationAddress) {
                toast.warning("Please enter a destination address", {
                  description: "A valid destination address is required to proceed."
                });
                return;
              }
              
              toast.success("Exchange initiated", {
                description: `Exchanging ${sendAmount} ${sendToken.symbol} for ${receiveAmount} ${receiveToken.symbol}`
              });
            }}
          >
            Exchange now
          </button>
        </div>
        
        {/* Exchange info */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          <p className="mb-1">The exchange service is provided by <span className="text-blue-400">FixedFloat</span>. Creating an order confirms your agreement with the FixedFloat rules.</p>
          <p>By using the site and creating an exchange, you agree to the Payrius' <span className="text-blue-400 cursor-pointer">Terms of Services</span> and <span className="text-blue-400 cursor-pointer">Privacy Policy</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeForm;
