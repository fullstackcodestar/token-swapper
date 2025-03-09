import React, { useState, useEffect } from 'react';
// import { ArrowLeftRight, Copy, Help, QrCode } from 'lucide-react';
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TokenSelector, { Token } from './TokenSelector';
import TokenInput from './TokenInput';
import ExchangeRateInfoModal from './ExchangeRateInfoModal';
import { cn } from '@/lib/utils';

interface ExchangeFormProps {
  className?: string;
}

const ExchangeForm: React.FC<ExchangeFormProps> = ({ className }) => {
  const [isSwitching, setIsSwitching] = useState<Boolean>(false);
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleSwitchTokens = () => {
    // Set switching state to trigger animations
    setIsSwitching(true);

    // Use setTimeout to let the animation happen before switching tokens
    setTimeout(() => {
      const tempToken = sendToken;
      setSendToken(receiveToken);
      setReceiveToken(tempToken);

      // Recalculate amounts
      const rate = getExchangeRate(receiveToken.symbol, sendToken.symbol);
      if (sendAmount) {
        const calculated = (parseFloat(sendAmount) * rate).toFixed(7);
        setReceiveAmount(calculated);
      }

    }, 200);
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
        <div className="flex items-center gap-4 mb-8 w-full relative flex-col md:flex-row">
          <TokenInput
            label="Send"
            value={sendAmount}
            onChange={setSendAmount}
            selectedToken={sendToken}
            onTokenSelect={setSendToken}
            variant="send"
            minAmount="0.005"
            maxAmount="13.1264821"
            className={`transition-all duration-300 ease-in-out ${isSwitching ? 'border-blue-500' : ''
              }`}
            labelClassName={`transition-colors duration-300 ${isSwitching ? 'text-blue-500' : ''
              }`}
          />

          <div className="flex-shrink-0 w-10 flex justify-center items-center">
            <button
              onClick={handleSwitchTokens}
              className={`flex items-center justify-center ${isSwitching
                ? 'text-blue-500 rotate-180'
                : 'text-blue-400'
                } transition-all duration-500 ease-in-out`}
            >
              <i className="pi pi-arrow-right-arrow-left"></i>
            </button>
          </div>

          <TokenInput
            label="Receive"
            value={receiveAmount}
            selectedToken={receiveToken}
            onTokenSelect={setReceiveToken}
            variant="receive"
            readOnly
            exchangeRate={`1 ${receiveToken.symbol} = ${getExchangeRate(receiveToken.symbol, sendToken.symbol)} ${sendToken.symbol}`}
            usdValue={getUsdValue(receiveAmount, receiveToken)}
            className={`transition-all duration-300 ease-in-out ${isSwitching ? 'border-blue-500' : ''
              }`}
            labelClassName={`transition-colors duration-300 ${isSwitching ? 'text-blue-500' : ''
              }`}
          />
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
              className="w-full bg-[#00000080] text-white border border-[#ff1493] rounded-xl p-4 pr-20 transition-all duration-300 text-base"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <button
                onClick={handleCopyAddress}
                className="p-2 text-gray-400 text-white transition-colors"
              >
                <i className="pi pi-clipboard text-2xl"></i>
              </button>
              <button className="p-2 text-gray-400 text-white transition-colors">
                <i className="pi pi-qrcode text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Order type and exchange button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative items-center md:items-start">
          <div className="flex items-start gap-2 relative flex-col md:flex-row md:items-center w-full md:w-auto">
            <span className="text-white text-base font-bold">Order type</span>
            <div className="order-tabs w-full md:w-auto">
              <div
                className={cn(
                  "order-tab text-base w-1/2 md:w-auto",
                  orderType === 'fixed' ? "order-tab-active" : "order-tab-inactive"
                )}
                onClick={() => setOrderType('fixed')}
              >
                Fixed rate (1.0%)
              </div>
              <div
                className={cn(
                  "order-tab text-base w-1/2 md:w-auto",
                  orderType === 'float' ? "order-tab-active" : "order-tab-inactive"
                )}
                onClick={() => setOrderType('float')}
              >
                Float rate (0.5%)
              </div>
            </div>
            <div className="group tooltip rounded-full bg-[#00000080] text-white flex align-middle gap-2 p-[4px_12px] cursor-pointer"
              onClick={() => setIsModalOpen(true)}>
              <div className="text-white hover:text-white  rounded-full">?</div>
              <div className="tooltip-content text-[0.8em]/[1.8em] hidden group-hover:block">
                What is the difference?
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
          <p className="mb-1">The exchange service is provided by <span className="text-blue-400">FixedFloat</span>. Creating an order confirms your agreement with the <span className="text-blue-400">FixedFloat</span> rules.</p>
          <p>By using the site and creating an exchange, you agree to the Payrius' <span className="text-blue-400 cursor-pointer">Terms of Services</span> and <span className="text-blue-400 cursor-pointer">Privacy Policy</span>.</p>
        </div>
      </div>

      {/* Exchange Rate Info Modal */}
      <ExchangeRateInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div >
  );
};

export default ExchangeForm;