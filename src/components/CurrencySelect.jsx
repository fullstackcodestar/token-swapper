
import React, { useState, useEffect, useRef } from 'react';

const CurrencySelect = ({ id, defaultValue, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);

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

  useEffect(() => {
    const allCurrencies = [...currencies.popular, ...currencies.all];
    const defaultCurrency = allCurrencies.find(c => c.value === defaultValue);
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
    
    document.addEventListener('click', handleClickOutside);
    
    const labelTrigger = document.getElementById(`select_label_${id.split('_').pop()}`);
    if (labelTrigger) {
      labelTrigger.addEventListener('click', () => setIsOpen(true));
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (labelTrigger) {
        labelTrigger.removeEventListener('click', () => setIsOpen(true));
      }
    };
  }, [defaultValue, id]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
        !event.target.classList.contains('selectCurrencyTrigger')) {
      setIsOpen(false);
    }
  };

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

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

      <div 
        className="ui-select-current" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCurrency && (
          <>
            <div className="coin-ticker">
              <span className="name">{selectedCurrency.coin}</span>
              {selectedCurrency.showNetwork === 1 && (
                <sup data-network={selectedCurrency.network}>
                  <span>{selectedCurrency.network}</span>
                </sup>
              )}
            </div>
            <div className={`coin-ico svgcoin ${selectedCurrency.img}`}></div>
            <div className="coin-outer">
              <span className="coin-name">{selectedCurrency.label}</span>
            </div>
          </>
        )}
      </div>
      
      {isOpen && (
        <div className="ui-select-dropdown">
          <div className="ui-select-search">
            <input 
              type="text" 
              placeholder="Type a currency or ticker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="currencies-group">
            <div className="group-header">Popular currencies</div>
            <ul className="currencies-list">
              {filteredCurrencies.popular.map((currency) => (
                <li 
                  key={currency.value}
                  className={`currency-item ${currency.inactive === 1 ? 'inactive' : ''}`}
                  onClick={() => currency.inactive !== 1 && handleSelectCurrency(currency)}
                >
                  <div className="currency-icon">
                    <div className={`coin-ico svgcoin ${currency.img}`}></div>
                  </div>
                  <div className="currency-name" style={{ color: currency.color }}>
                    {currency.label}
                    {currency.showNetwork === 1 && (
                      <span className="network-tag">{currency.network}</span>
                    )}
                  </div>
                  <div className="currency-ticker">
                    {currency.coin}
                    {currency.showNetwork === 1 && (
                      <div className="network-badge">{currency.network}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {filteredCurrencies.all.length > 0 && (
            <div className="currencies-group">
              <div className="group-header">All currencies</div>
              <ul className="currencies-list">
                {filteredCurrencies.all.map((currency) => (
                  <li 
                    key={currency.value}
                    className={`currency-item ${currency.inactive === 1 ? 'inactive' : ''}`}
                    onClick={() => currency.inactive !== 1 && handleSelectCurrency(currency)}
                  >
                    <div className="currency-icon">
                      <div className={`coin-ico svgcoin ${currency.img}`}></div>
                    </div>
                    <div className="currency-name" style={{ color: currency.color }}>
                      {currency.label}
                      {currency.showNetwork === 1 && (
                        <span className="network-tag">{currency.network}</span>
                      )}
                    </div>
                    <div className="currency-ticker">
                      {currency.coin}
                      {currency.showNetwork === 1 && (
                        <div className="network-badge">{currency.network}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {filteredCurrencies.popular.length === 0 && filteredCurrencies.all.length === 0 && (
            <div className="no-results">
              No currencies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
