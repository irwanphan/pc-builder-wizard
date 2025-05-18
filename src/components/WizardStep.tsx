import React from 'react';
import { Question, UserResponse } from '../types';
import { questions } from '../data/questions';
import { useWizard } from '../context/WizardContext';
import SingleChoiceQuestion from './questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import RangeQuestion from './questions/RangeQuestion';
import TextQuestion from './questions/TextQuestion';

interface WizardStepProps {
  stepIndex: number;
}

const WizardStep: React.FC<WizardStepProps> = ({ stepIndex }) => {
  const { state, setResponse, nextStep, prevStep, generateBuildRecommendation } = useWizard();
  const question = questions[stepIndex];
  
  if (!question) return null;
  
  // Find the current response if it exists
  const currentResponse = state.responses.find(
    response => response.questionId === question.id
  );
  
  const handleResponseChange = (value: string | string[] | number) => {
    const response: UserResponse = {
      questionId: question.id,
      value
    };
    setResponse(response);
  };
  
  const handleNext = () => {
    if (stepIndex === questions.length - 1) {
      generateBuildRecommendation();
    } else {
      nextStep();
    }
  };
  
  // Check if the current question has been answered
  const isQuestionAnswered = (): boolean => {
    if (!currentResponse) return false;
    
    if (Array.isArray(currentResponse.value)) {
      return (currentResponse.value as string[]).length > 0;
    }
    
    return currentResponse.value !== undefined && currentResponse.value !== '';
  };
  
  const renderQuestionComponent = () => {
    switch (question.type) {
      case 'single':
        return (
          <SingleChoiceQuestion
            question={question}
            selectedValue={currentResponse?.value as string || ''}
            onChange={handleResponseChange}
          />
        );
      case 'multiple':
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedValues={currentResponse?.value as string[] || []}
            onChange={handleResponseChange}
          />
        );
      case 'range':
        return (
          <RangeQuestion
            question={question}
            value={currentResponse?.value as number || (question.min || 0)}
            onChange={handleResponseChange}
          />
        );
      case 'text':
        return (
          <TextQuestion
            question={question}
            value={currentResponse?.value as string || ''}
            onChange={handleResponseChange}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto transition-all">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium text-gray-800">{question.text}</h2>
          <span className="text-sm text-gray-500">
            Step {stepIndex + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        {renderQuestionComponent()}
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={stepIndex === 0}
          className={`px-4 py-2 rounded-md transition-colors ${
            stepIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isQuestionAnswered()}
          className={`px-6 py-2 rounded-md transition-colors ${
            isQuestionAnswered()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-300 text-white cursor-not-allowed'
          }`}
        >
          {stepIndex === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default WizardStep;