import React from 'react';
import { Question } from '../../types';

interface TextQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type your answer here..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default TextQuestion;