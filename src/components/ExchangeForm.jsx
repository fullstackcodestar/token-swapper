import React, { useState, useEffect } from 'react';
import ExchangeAmounts from './ExchangeAmounts';
import ExchangeAddress from './ExchangeAddress';
import ExchangeOptions from './ExchangeOptions';

const ExchangeForm = () => {
  // Main state for the form
  const [formState, setFormState] = useState({
    fromCurrency: { value: "BTC", label: "Bitcoin", network: "BTC", img: "btc", coin: "BTC" },
    toCurrency: { value: "ETH", label: "Ethereum", network: "ETH", img: "eth", coin: "ETH" },
    fromAmount: '',
    toAmount: '',
    destinationAddress: '',
    destinationTag: '',
    exchangeType: 'float', // 'float' or 'fixed'
    exchangeRate: null,
    isValid: false
  });

  // Handler for updating form state
  const updateFormState = (updates) => {
    setFormState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Update exchange rate when currencies change
  useEffect(() => {
    if (formState.fromCurrency && formState.toCurrency) {
      const mockRates = {
        BTC: { ETH: 15.2, LTC: 165.8, XMR: 212.5 },
        ETH: { BTC: 0.065, LTC: 10.9, XMR: 14 },
        LTC: { BTC: 0.006, ETH: 0.092, XMR: 1.28 },
        XMR: { BTC: 0.0047, ETH: 0.072, LTC: 0.78 }
      };

      let rate;
      const fromCoin = formState.fromCurrency.coin;
      const toCoin = formState.toCurrency.coin;

      if (fromCoin === toCoin) {
        rate = 1; // Same coin, possibly different networks
      } else if (mockRates[fromCoin] && mockRates[fromCoin][toCoin]) {
        rate = mockRates[fromCoin][toCoin];
      } else if (mockRates[toCoin] && mockRates[toCoin][fromCoin]) {
        rate = 1 / mockRates[toCoin][fromCoin];
      } else {
        rate = 1; // Fallback
      }

      updateFormState({ exchangeRate: rate });
      
      // Recalculate amounts if needed
      if (formState.fromAmount) {
        updateFormState({
          toAmount: (parseFloat(formState.fromAmount) * rate).toFixed(8)
        });
      }
    }
  }, [formState.fromCurrency, formState.toCurrency]);

  // Validate form
  useEffect(() => {
    const isValid = 
      formState.fromAmount > 0 && 
      formState.toAmount > 0 && 
      formState.destinationAddress.length > 10 && // Simple validation
      formState.fromCurrency.value !== formState.toCurrency.value;

    updateFormState({ isValid });
  }, [
    formState.fromAmount, 
    formState.toAmount, 
    formState.destinationAddress,
    formState.fromCurrency,
    formState.toCurrency
  ]);

  // Swap currencies and amounts
  const handleSwapCurrencies = () => {
    updateFormState({
      fromCurrency: formState.toCurrency,
      toCurrency: formState.fromCurrency,
      fromAmount: formState.toAmount,
      toAmount: formState.fromAmount
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.isValid) return;
    
    console.log("Exchange submitted:", formState);
    // Here you would typically send to an API
  };

  return (
    <form className="exchange-form" onSubmit={handleSubmit}>
      <ExchangeAmounts 
        formState={formState} 
        updateFormState={updateFormState}
        handleSwapCurrencies={handleSwapCurrencies}
      />
      <ExchangeAddress 
        formState={formState} 
        updateFormState={updateFormState} 
      />
      <ExchangeOptions 
        formState={formState} 
        updateFormState={updateFormState} 
      />
      <div className="exchange-terms">
        The exchange service is provided by{" "}
        <a href="https://ff.io/?ref=9zedgxed">FixedFloat</a>. Creating an
        order confirms your agreement with the{" "}
        <a href="https://ff.io/?ref=9zedgxed">FixedFloat</a> rules.
      </div>
      <div className="exchange-terms">
        By using the site and creating an exchange, you agree to the
        Payrius' <a href="#terms-of-service">Terms of Services</a> and{" "}
        <a href="#privacy-policy">Privacy Policy.</a>
      </div>
    </form>
  );
};

export default ExchangeForm;