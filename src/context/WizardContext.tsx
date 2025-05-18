import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WizardState, UserResponse, UsageType, ComponentType, PCBuild } from '../types';
import { questions } from '../data/questions';
import { generateRecommendation, swapComponent } from '../utils/recommendationEngine';

interface WizardContextType {
  state: WizardState;
  setResponse: (response: UserResponse) => void;
  nextStep: () => void;
  prevStep: () => void;
  generateBuildRecommendation: () => void;
  swapBuildComponent: (componentType: ComponentType, componentId: string) => void;
  resetWizard: () => void;
}

const initialState: WizardState = {
  step: 0,
  totalSteps: questions.length,
  responses: [],
  recommendedBuild: null,
  customizedBuild: null,
  budget: 1500,
  usageType: [],
  applications: [],
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WizardState>(initialState);

  const setResponse = (response: UserResponse) => {
    setState(prevState => {
      // Remove any existing response for this question
      const filteredResponses = prevState.responses.filter(
        r => r.questionId !== response.questionId
      );
      
      // Add the new response
      const newResponses = [...filteredResponses, response];
      
      // Update specific tracked values
      let newState = { ...prevState, responses: newResponses };
      
      if (response.questionId === 'budget') {
        newState.budget = response.value as number;
      }
      
      if (response.questionId === 'usage') {
        newState.usageType = response.value as UsageType[];
      }
      
      if (response.questionId === 'applications') {
        newState.applications = response.value as string[];
      }
      
      return newState;
    });
  };

  const nextStep = () => {
    setState(prevState => ({
      ...prevState,
      step: Math.min(prevState.step + 1, prevState.totalSteps)
    }));
  };

  const prevStep = () => {
    setState(prevState => ({
      ...prevState,
      step: Math.max(prevState.step - 1, 0)
    }));
  };

  const generateBuildRecommendation = () => {
    const recommendedBuild = generateRecommendation(
      state.responses,
      state.budget,
      state.usageType
    );
    
    setState(prevState => ({
      ...prevState,
      recommendedBuild,
      customizedBuild: recommendedBuild, // Start with the recommended build
      step: prevState.totalSteps // Move to the results step
    }));
  };

  const swapBuildComponent = (componentType: ComponentType, componentId: string) => {
    if (!state.customizedBuild) return;
    
    const updatedBuild = swapComponent(
      state.customizedBuild,
      componentType,
      componentId
    );
    
    setState(prevState => ({
      ...prevState,
      customizedBuild: updatedBuild
    }));
  };

  const resetWizard = () => {
    setState(initialState);
  };

  return (
    <WizardContext.Provider
      value={{
        state,
        setResponse,
        nextStep,
        prevStep,
        generateBuildRecommendation,
        swapBuildComponent,
        resetWizard
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextType => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};