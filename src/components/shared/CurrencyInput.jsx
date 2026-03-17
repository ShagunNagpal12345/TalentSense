import React, { useState } from 'react';

const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR ₹' },
  { code: 'USD', symbol: '$', label: 'USD $' },
  { code: 'GBP', symbol: '£', label: 'GBP £' },
  { code: 'EUR', symbol: '€', label: 'EUR €' }
];

/**
 * CurrencyInput
 * Props: label, value, onChange, placeholder, required
 * Combined value stored as "₹ 1500000" or "$ 120000"
 */
const CurrencyInput = ({ label, value, onChange, placeholder = "0", required = false }) => {
  // Parse existing value into currency + amount
  const parseValue = (v) => {
    if (!v) return { currency: 'INR', amount: '' };
    const symbols = ['₹', '$', '£', '€'];
    for (const sym of symbols) {
      if (v.startsWith(sym)) {
        const curr = CURRENCIES.find(c => c.symbol === sym);
        return { currency: curr?.code || 'INR', amount: v.replace(sym, '').trim() };
      }
    }
    return { currency: 'INR', amount: v };
  };

  const parsed = parseValue(value);
  const [currency, setCurrency] = useState(parsed.currency);
  const [amount, setAmount] = useState(parsed.amount);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    const sym = CURRENCIES.find(c => c.code === newCurrency)?.symbol || '₹';
    if (amount) onChange(`${sym} ${amount}`);
    else onChange('');
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    const sym = CURRENCIES.find(c => c.code === currency)?.symbol || '₹';
    if (newAmount) onChange(`${sym} ${newAmount}`);
    else onChange('');
  };

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          {label} {required && '*'}
        </label>
      )}
      <div className="flex gap-0">
        <select
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="px-3 py-3 bg-slate-50 dark:bg-slate-950 border border-r-0 border-slate-200 dark:border-slate-800 rounded-l-xl text-sm font-bold outline-none focus:border-[#0A66C2] text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-r-xl text-sm font-medium outline-none focus:border-[#0A66C2] text-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
