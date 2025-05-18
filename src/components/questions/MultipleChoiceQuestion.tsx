import React from 'react';
import { Question } from '../../types';

interface MultipleChoiceQuestionProps {
  question: Question;
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedValues,
  onChange
}) => {
  if (!question.options) return null;

  const handleToggle = (optionId: string) => {
    let newValues: string[];
    
    if (selectedValues.includes(optionId)) {
      // Remove if already selected
      newValues = selectedValues.filter(id => id !== optionId);
    } else {
      // Add if not selected
      newValues = [...selectedValues, optionId];
    }
    
    onChange(newValues);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map(option => (
        <div 
          key={option.id}
          onClick={() => handleToggle(option.id)}
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            selectedValues.includes(option.id)
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
              selectedValues.includes(option.id)
                ? 'bg-blue-500 border-blue-500'
                : 'border-2 border-gray-300'
            }`}>
              {selectedValues.includes(option.id) && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="font-medium text-gray-800">{option.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;