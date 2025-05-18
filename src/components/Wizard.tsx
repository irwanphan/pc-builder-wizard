import { useWizard } from '../context/WizardContext';
import WizardStep from './WizardStep';
import ResultsView from './ResultsView';

export default function Wizard() {
  const { state } = useWizard();
  const { step, totalSteps, recommendedBuild } = state;
  
  // Show results view if we have recommendations and are at the last step
  if (recommendedBuild && step >= totalSteps) {
    return <ResultsView />;
  }
  
  return <WizardStep stepIndex={step} />;
}

export { Wizard }