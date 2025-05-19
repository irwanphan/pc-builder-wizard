import React from 'react';
import { Component } from '../types';
import { formatCurrency } from '../lib/formatCurrency';

interface ComponentCardProps {
  component: Component;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showSwapButton?: boolean;
  onSwapClick?: () => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isSelected,
  onSelect,
  showSwapButton = false,
  onSwapClick
}) => {
  // Helper to format specs for display
  const formatSpec = (key: string, value: string | number): string => {
    switch (key) {
      case 'cores':
        return `${value} cores`;
      case 'threads':
        return `${value} threads`;
      case 'baseFrequency':
        return `${value} GHz base`;
      case 'boostFrequency':
        return `${value} GHz boost`;
      case 'tdp':
        return `${value}W TDP`;
      case 'vram':
        return `${value}GB VRAM`;
      case 'capacity': {
        const numValue = Number(value);
        return numValue >= 1000 ? `${numValue / 1000}TB` : `${numValue}GB`;
      }
      case 'readSpeed':
        return `${value} MB/s read`;
      case 'writeSpeed':
        return `${value} MB/s write`;
      default:
        return `${value}`;
    }
  };

  // Get top 4 specs to display
  const topSpecs = Object.entries(component.specs)
    .slice(0, 4)
    .map(([key, value]) => formatSpec(key, value));

  return (
    <div 
      className={`border rounded-lg transition-all ${
        isSelected 
          ? 'border-blue-500' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{component.name}</h3>
            <p className="text-gray-500 text-sm">{component.brand}</p>
          </div>
          <div className="text-lg font-medium text-blue-600">{formatCurrency(component.price, 'IDR')}</div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{component.description}</p>
          
          <div className="grid grid-cols-2 gap-y-1 gap-x-3 mt-2">
            {topSpecs.map((spec, index) => (
              <div key={index} className="text-xs text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></div>
                {spec}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            <span className="text-blue-700 font-medium">
              Performance score: {Math.round(
                Object.values(component.performance).reduce((sum, score) => sum + score, 0) / 
                Object.keys(component.performance).length
              )}
            </span>
          </div>
          
          {showSwapButton ? (
            <button
              onClick={onSwapClick}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Swap Component
            </button>
          ) : (
            <button
              onClick={() => onSelect(component.id)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;