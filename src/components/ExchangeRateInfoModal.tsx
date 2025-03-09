import React from 'react';
import { X } from 'lucide-react';

interface ExchangeRateInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExchangeRateInfoModal: React.FC<ExchangeRateInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#242942] rounded-lg max-w-xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-center text-white mb-6">
            What is the difference between fixed and a float rates?
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Fixed rate</h3>
              <p className="text-gray-200 mb-3">
                Opting for a fixed rate, you get the price you see at the point of initiating a transaction.
              </p>
              <ul className="list-disc pl-5 text-gray-200 space-y-2">
                <li>Pay just 1% + network fee.</li>
                <li>Rates freeze for 10 minutes.</li>
                <li>
                  If the market rate changes by more than 1.2% before the appearance of your
                  transaction on the blockchain network, you will be asked to make a refund or
                  continue exchanging at the market rate.
                </li>
              </ul>
              <p className="text-gray-200 mt-3 italic">
                Attention! Your transaction must be received within 10 minutes and the amount 
                must exactly match the amount of the order. Otherwise, you will be prompted to 
                make a refund or continue the exchange at the market rate.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-2">Float rate</h3>
              <p className="text-gray-200 mb-3">
                The exchange rate is finally set when your transaction receives the necessary
                number of blockchain network confirmations. If the market goes up, you will get
                more cryptocurrency, if down - less. All fair.
              </p>
              <ul className="list-disc pl-5 text-gray-200 space-y-2">
                <li>Pay just 0.5% + network fee.</li>
                <li>
                  The exchange will be made at the market rate, which is finally set within 10
                  minutes after your transaction receives the required number of confirmations
                  in the blockchain network.
                </li>
              </ul>
              <p className="text-gray-200 mt-3 italic">
                Example: you are exchanging 1 BTC for 28.37362386 ETH. With a fixed rate, you will
                receive exactly 28.37362386 ETH. With a float exchange rate, the amount of ETH can
                change both up and down. It depends on changes in the market rate.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateInfoModal;