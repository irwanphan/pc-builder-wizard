import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { ComponentType, Component, UsageType } from '../types';
import { components } from '../data/components';
import ComponentCard from './ComponentCard';
import PerformanceChart from './PerformanceChart';
import { formatCurrency } from '../lib/formatCurrency';

const ResultsView: React.FC = () => {
  const { state, swapBuildComponent, resetWizard } = useWizard();
  const { customizedBuild, recommendedBuild, budget, usageType } = state;
  
  const [activeTab, setActiveTab] = useState<ComponentType>('cpu');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  
  if (!customizedBuild) return null;
  
  const availableComponents = components.filter(
    component => component.type === activeTab
  );
  
  const handleComponentSelect = (componentId: string) => {
    swapBuildComponent(activeTab, componentId);
    setShowOptions(false);
  };

  const getBudgetStatus = () => {
    const currentPrice = customizedBuild.totalPrice;
    if (currentPrice <= budget) {
      return {
        status: 'under',
        message: `${Math.round((budget - currentPrice) / budget * 100)}% under budget`,
        color: 'text-green-600'
      };
    } else {
      return {
        status: 'over',
        message: `${Math.round((currentPrice - budget) / budget * 100)}% over budget`,
        color: 'text-red-600'
      };
    }
  };

  const budgetStatus = getBudgetStatus();
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-3xl font-bold mb-2">Your Custom PC Build</h2>
          <p className="opacity-90">
            Based on your requirements, we've created a customized PC build optimized for{' '}
            {usageType.map((type, index) => (
              <span key={type}>
                {index > 0 && index === usageType.length - 1 ? ' and ' : index > 0 ? ', ' : ''}
                {type.replace('-', ' ')}
              </span>
            ))}
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-1">Total Build Price: 
                <span className="text-blue-600 ml-2">{formatCurrency(customizedBuild.totalPrice, 'IDR')}</span>
              </h3>
              <p className={`${budgetStatus.color} font-medium`}>
                {budgetStatus.message} (Budget: {formatCurrency(budget, 'IDR')})
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={resetWizard}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-2"
              >
                Start Over
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Components</h3>
                <div className="bg-gray-100 p-1 rounded-lg flex overflow-x-auto whitespace-nowrap mb-4">
                  {Object.keys(customizedBuild.components).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setActiveTab(type as ComponentType);
                        setShowOptions(false);
                      }}
                      className={`px-4 py-2 rounded-md mr-1 whitespace-nowrap transition-colors ${
                        activeTab === type
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {customizedBuild.components[activeTab] && (
                    <ComponentCard
                      component={customizedBuild.components[activeTab]!}
                      isSelected={true}
                      onSelect={() => {}}
                      showSwapButton
                      onSwapClick={() => setShowOptions(!showOptions)}
                    />
                  )}
                </div>
                
                {showOptions && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium mb-3">Alternative Options</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {availableComponents
                        .filter(c => c.id !== customizedBuild.components[activeTab]?.id)
                        .map(component => (
                          <ComponentCard
                            key={component.id}
                            component={component}
                            isSelected={false}
                            onSelect={handleComponentSelect}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <PerformanceChart 
                  scores={customizedBuild.performanceScores} 
                  usageTypes={usageType}
                />
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Recommended For:</h4>
                  <ul className="space-y-1">
                    {Object.entries(customizedBuild.performanceScores)
                      .filter(([type, score]) => score > 80)
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, score]) => (
                        <li key={type} className="flex items-center text-sm">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          {type.replace('-', ' ')} - {Math.round(score)}% optimal
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;