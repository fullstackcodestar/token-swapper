
import React, { useState, useEffect, useRef } from 'react';

const CurrencySelect = ({ id, defaultValue, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  // Currency data
  const currencies = {
    popular: [
      { value: "BTC", label: "Bitcoin", network: "BTC", img: "btc", showNetwork: 0, coin: "BTC", inactive: 0, color: "#f7931a" },
      { value: "ETH", label: "Ethereum", network: "ETH", img: "eth", showNetwork: 0, coin: "ETH", inactive: 0, color: "#627eea" },
      { value: "USDT", label: "Tether (ERC20)", network: "ETH", img: "usdt", showNetwork: 1, coin: "USDT", inactive: 0, color: "#26a17b" },
      { value: "LTC", label: "Litecoin", network: "LTC", img: "ltc", showNetwork: 0, coin: "LTC", inactive: 0, color: "#b5b5b5" },
      { value: "XMR", label: "Monero", network: "XMR", img: "xmr", showNetwork: 0, coin: "XMR", inactive: 0, color: "#ff6600" }
    ],
    all: [
      { value: "ZRX", label: "0x (ERC20)", network: "ETH", img: "zrx", showNetwork: 1, coin: "ZRX", inactive: 0, color: "#302c2c" },
      { value: "AAVEETH", label: "Aave (ERC20)", network: "ETH", img: "aaveeth", showNetwork: 1, coin: "AAVE", inactive: 0, color: "#b6509e" },
      { value: "AVAX", label: "Avalanche (C-Chain)", network: "C-CHAIN", img: "avax", showNetwork: 1, coin: "AVAX", inactive: 1, color: "#e84142" },
      { value: "BNB", label: "BNB Beacon Chain (BEP2)", network: "BNB", img: "bnb", showNetwork: 0, coin: "BNB", inactive: 0, color: "#f3ba2f" }
    ]
  };

  // Find and set the initial currency based on defaultValue
  useEffect(() => {
    const allCurrencies = [...currencies.popular, ...currencies.all];
    const defaultCurrency = allCurrencies.find(c => c.value === defaultValue);
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultValue]);

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    // Add when mounted, remove when unmounted
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Handle clicking on label to show dropdown
  useEffect(() => {
    const labelElement = document.getElementById(`select_label_${id.split('_').pop()}`);
    if (labelElement) {
      const handleLabelClick = () => {
        setIsOpen(true);
      };
      
      labelElement.addEventListener('click', handleLabelClick);
      return () => {
        labelElement.removeEventListener('click', handleLabelClick);
      };
    }
  }, [id]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Select a currency from the dropdown
  const handleSelectCurrency = (currency) => {
    if (currency.inactive === 1) return;
    
    setSelectedCurrency(currency);
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

  // Filter currencies based on search term
  const filteredCurrencies = {
    popular: currencies.popular.filter(currency => 
      currency.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      currency.value.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    all: currencies.all.filter(currency => 
      currency.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      currency.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  return (
    <div className="ui-select-wrapper" ref={dropdownRef}>
      {/* Hidden select element */}
      <select id={id} className="hidden" defaultValue={defaultValue} ref={selectRef}>
        {currencies.popular.concat(currencies.all).map(currency => (
          <option 
            key={currency.value}
            value={currency.value} 
            data-img={currency.img} 
            data-network={currency.network}
            data-shownetwork={currency.showNetwork}
            data-coin={currency.coin}
            data-inactive={currency.inactive}
          >
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
