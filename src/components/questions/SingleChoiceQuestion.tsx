import React from 'react';
import { Question } from '../../types';

interface SingleChoiceQuestionProps {
  question: Question;
  selectedValue: string;
  onChange: (value: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  selectedValue,
  onChange
}) => {
  if (!question.options) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map(option => (
        <div 
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            selectedValue === option.id
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${
              selectedValue === option.id
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {selectedValue === option.id && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="font-medium text-gray-800">{option.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;