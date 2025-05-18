import React from 'react';
import { UsageType } from '../types';

interface PerformanceChartProps {
  scores: Record<UsageType, number>;
  usageTypes: UsageType[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ scores, usageTypes }) => {
  // Filter to only show scores for selected usage types
  const relevantScores = Object.entries(scores)
    .filter(([type]) => usageTypes.includes(type as UsageType))
    .sort(([, a], [, b]) => b - a);
  
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatUsageType = (type: string): string => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div>
      <h4 className="font-medium mb-4">Performance Score</h4>
      <div className="space-y-3">
        {relevantScores.map(([type, score]) => (
          <div key={type} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatUsageType(type)}</span>
              <span className="text-gray-600">{Math.round(score)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getScoreColor(score)}`} 
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;