import React from 'react';
import CurrencySelect from './CurrencySelect';

const ExchangeAmounts = ({ formState, updateFormState, handleSwapCurrencies }) => {
  const handleFromCurrencyChange = (currency) => {
    if (currency.value === formState.toCurrency.value) {
      handleSwapCurrencies();
    } else {
      updateFormState({ fromCurrency: currency });
    }
  };

  const handleToCurrencyChange = (currency) => {
    if (currency.value === formState.fromCurrency.value) {
      handleSwapCurrencies();
    } else {
      updateFormState({ toCurrency: currency });
    }
  };

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateFormState({ fromAmount: value });
      
      if (formState.exchangeRate && value) {
        updateFormState({
          toAmount: (parseFloat(value) * formState.exchangeRate).toFixed(8)
        });
      } else {
        updateFormState({ toAmount: '' });
      }
    }
  };

  const handleToAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateFormState({ toAmount: value });
      
      if (formState.exchangeRate && value) {
        updateFormState({
          fromAmount: (parseFloat(value) / formState.exchangeRate).toFixed(8)
        });
      } else {
        updateFormState({ fromAmount: '' });
      }
    }
  };

  return (
    <div className="exchange-amounts" id="exchange_amount">
      <div className="col">
        <div className="wrap-header exch-header">
          <header>Send</header>
          <div className="ccy-name" id="select_ccyname_from">
            {formState.fromCurrency?.coin}
          </div>
        </div>
        <div className="input-wabbr toleft">
          <CurrencySelect 
            id="select_currency_from" 
            defaultValue={formState.fromCurrency.value} 
            onCurrencyChange={handleFromCurrencyChange}
          />
          <input 
            className="input-amount" 
            autoComplete="off" 
            type="text" 
            value={formState.fromAmount}
            onChange={handleFromAmountChange}
            id="select_amount_from"
            data-dir="from" 
            maxLength={18} 
          />
          <div id="select_maxmin_from" className="hint maxmin">
            {formState.fromAmount && parseFloat(formState.fromAmount) > 0 && 
              `Min: 0.001 / Max: 10.0`
            }
          </div>
          <span id="select_hinterror_from" className="hint error"></span>
          <label id="select_label_from" className="selectCurrencyTrigger" />
          <div className="exch-info">
            <div className="input-rate" id="select_rate_from">
              {formState.exchangeRate && 
                `1 ${formState.fromCurrency.coin} ≈ ${formState.exchangeRate.toFixed(6)} ${formState.toCurrency.coin}`
              }
            </div>
            <div className="rateusd">
              <span id="rate_usd_from">
                {formState.fromAmount && parseFloat(formState.fromAmount) > 0 && 
                  `≈ $${(parseFloat(formState.fromAmount) * 43500).toFixed(2)}`
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-middle">
        <button 
          type="button"
          className="btn-reverse" 
          id="btn_reverse"
          onClick={handleSwapCurrencies}
        >
          <span id="btn_reverse_from" className="btn-reverse-exch ico" />
          <span id="btn_reverse_to" className="btn-reverse-receive ico" />
        </button>
      </div>

      <div className="col">
        <div className="wrap-header exch-header">
          <header>Receive</header>
          <div className="ccy-name" id="select_ccyname_to">
            {formState.toCurrency?.coin}
          </div>
        </div>
        <div className="input-wabbr toright">
          <CurrencySelect 
            id="select_currency_to" 
            defaultValue={formState.toCurrency.value}
            onCurrencyChange={handleToCurrencyChange} 
          />
          <input 
            className="input-amount" 
            autoComplete="off" 
            type="text" 
            value={formState.toAmount}
            onChange={handleToAmountChange}
            id="select_amount_to"
            data-dir="to" 
            maxLength={18} 
          />
          <div id="select_maxmin_to" className="hint maxmin"></div>
          <span id="select_hinterror_to" className="hint error"></span>
          <label id="select_label_to" className="selectCurrencyTrigger" />
          <div className="exch-info">
            <div className="input-rate" id="select_rate_to">
              {formState.exchangeRate && 
                `1 ${formState.toCurrency.coin} ≈ ${(1/formState.exchangeRate).toFixed(6)} ${formState.fromCurrency.coin}`
              }
            </div>
            <div className="rateusd">
              <span id="rate_usd_to">
                {formState.toAmount && parseFloat(formState.toAmount) > 0 && 
                  `≈ $${(parseFloat(formState.toAmount) * 2850).toFixed(2)}`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAmounts;