import React, { useState, useRef } from 'react';

const ExchangeAddress = ({ formState, updateFormState }) => {
  const [addressError, setAddressError] = useState(false);
  const [tagError, setTagError] = useState(false);
  const addressRef = useRef(null);
  const tagRef = useRef(null);

  const validateAddress = (address) => {
    if (!address || address.length < 10) {
      setAddressError(true);
      return false;
    }
    setAddressError(false);
    return true;
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    updateFormState({ destinationAddress: address });
    validateAddress(address);
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    updateFormState({ destinationTag: tag });
    setTagError(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      updateFormState({ destinationAddress: text });
      validateAddress(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleClearAddress = () => {
    updateFormState({ destinationAddress: '' });
    setAddressError(false);
    if (addressRef.current) {
      addressRef.current.focus();
    }
  };

  const handleClearTag = () => {
    updateFormState({ destinationTag: '' });
    setTagError(false);
    if (tagRef.current) {
      tagRef.current.focus();
    }
  };

  const needsTag = formState.toCurrency && ['XRP', 'XLM', 'BNB', 'EOS', 'ATOM', 'TON'].includes(formState.toCurrency.coin);

  return (
    <div className="exchange-address-wrap">
      <div className="exchange-wallet active center">
        <div className="wrap-header">
          <header>Destination</header>
        </div>
        <div className="field">
          <textarea 
            className="nonextra" 
            type="text" 
            required 
            id="receive_wallet" 
            autoComplete="off"
            value={formState.destinationAddress}
            onChange={handleAddressChange}
            ref={addressRef}
          />
          <span 
            id="receive_wallet_error" 
            className={`hint error ${addressError ? '' : 'hidden'}`}
          >
            Invalid address
          </span>
          <div className="funcbuttons">
            <button 
              type="button" 
              className="ico paste hoverhl" 
              id="wallet_paste" 
              title="Paste"
              onClick={handlePaste}
            />
            <button 
              type="button" 
              className="ico scanqr hoverhl" 
              id="wallet_scanqr" 
              title="Scan QR code" 
            />
            <button 
              type="button" 
              className="ico close hoverhl" 
              id="wallet_clear"
              onClick={handleClearAddress}
            />
          </div>
          <div className="addresss-list-wrap">
            <div 
              className="addresss-list" 
              id="wallet_addressbook" 
              data-emptylist="Favorite address is empty" 
            />
          </div>
        </div>
      </div>

      <div 
        className={`exchange-wallet exchange-wallet-extra center ${needsTag ? '' : 'hidden'}`} 
        id="wallet_extra_outer"
      >
        <div className="wrap-header">
          <header id="receive_extraid_label">
            {formState.toCurrency?.coin === 'XRP' ? 'Destination Tag' : 'Memo'} 
            {needsTag ? '' : ' (optional)'}
          </header>
        </div>
        <div className="field">
          <input 
            className="nonextra" 
            type="text" 
            value={formState.destinationTag} 
            required={needsTag}
            id="receive_extraid" 
            autoComplete="off"
            onChange={handleTagChange}
            ref={tagRef}
          />
          <span 
            id="receive_extraid_error" 
            className={`hint error ${tagError ? '' : 'hidden'}`}
          >
            Invalid
          </span>
          <div className="funcbuttons">
            <button 
              type="button" 
              className="ico paste hoverhl none" 
              id="extraid_paste" 
            />
            <button 
              type="button" 
              className="ico close hoverhl" 
              id="extraid_clear"
              onClick={handleClearTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAddress;