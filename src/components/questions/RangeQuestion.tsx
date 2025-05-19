import React, { useState, useEffect } from 'react';
import { Question } from '../../types';
import { formatCurrency } from '../../lib/formatCurrency';

interface RangeQuestionProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
}

const RangeQuestion: React.FC<RangeQuestionProps> = ({
  question,
  value,
  onChange
}) => {
  const [localValue, setLocalValue] = useState<number>(value);
  const min = question.min || 0;
  const max = question.max || 100;
  const unit = question.unit || '';
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setLocalValue(newValue);
  };
  
  const handleChangeEnd = () => {
    onChange(localValue);
  };
  
  // Calculate the percentage filled for gradient background
  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700">{formatCurrency(min, 'IDR')}</span>
        <span className="text-xl font-bold text-blue-600">{formatCurrency(localValue, 'IDR')}</span>
        <span className="text-gray-700">{formatCurrency(max, 'IDR')}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleChangeEnd}
          onTouchEnd={handleChangeEnd}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
        />
      </div>
      
      <div className="mt-6">
        <p className="font-medium text-gray-600 mb-2">Budget tiers:</p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="font-semibold mb-1">Entry level</div>
            <div className="text-gray-600">{formatCurrency(8250000, 'IDR')} - {formatCurrency(16500000, 'IDR')}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="font-semibold mb-1">Mid-range</div>
            <div className="text-gray-600">{formatCurrency(16500000, 'IDR')} - {formatCurrency(33000000, 'IDR')}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="font-semibold mb-1">High-end</div>
            <div className="text-gray-600">{formatCurrency(33000000, 'IDR')}+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeQuestion;