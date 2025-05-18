import { UserResponse, Component, PCBuild, UsageType, ComponentType } from '../types';
import { components } from '../data/components';

// Filter components by type
const getComponentsByType = (type: ComponentType): Component[] => {
  return components.filter(component => component.type === type);
};

// Calculate performance score for a build based on selected usage types
const calculatePerformanceScores = (build: PCBuild, usageTypes: UsageType[]): Record<UsageType, number> => {
  const scores: Record<UsageType, number> = {
    gaming: 0,
    office: 0,
    'content-creation': 0,
    programming: 0,
    streaming: 0,
    general: 0
  };

  // Only calculate scores for selected usage types
  usageTypes.forEach(usageType => {
    let totalScore = 0;
    let componentCount = 0;
    
    // Weight different components based on their importance for different usage types
    const weights: Record<ComponentType, number> = {
      cpu: usageType === 'content-creation' || usageType === 'programming' ? 0.35 : 0.25,
      gpu: usageType === 'gaming' || usageType === 'content-creation' ? 0.35 : 0.15,
      ram: 0.15,
      storage: 0.1,
      motherboard: 0.05,
      psu: 0.05,
      case: 0.025,
      cooling: 0.025
    };
    
    Object.entries(build.components).forEach(([type, component]) => {
      if (component) {
        const weight = weights[type as ComponentType];
        totalScore += component.performance[usageType] * weight;
        componentCount++;
      }
    });
    
    scores[usageType] = componentCount > 0 ? totalScore : 0;
  });
  
  return scores;
};

// Main recommendation function
export const generateRecommendation = (
  responses: UserResponse[],
  budget: number,
  usageTypes: UsageType[]
): PCBuild => {
  // Initialize empty build
  const build: PCBuild = {
    components: {
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      psu: null,
      case: null,
      cooling: null
    },
    totalPrice: 0,
    performanceScores: {
      gaming: 0,
      office: 0,
      'content-creation': 0,
      programming: 0,
      streaming: 0,
      general: 0
    }
  };

  // Budget allocation percentages based on usage types
  const allocations: Record<ComponentType, number> = {
    cpu: 0.25,
    gpu: 0.3,
    motherboard: 0.12,
    ram: 0.1,
    storage: 0.12,
    psu: 0.06,
    case: 0.03,
    cooling: 0.02
  };

  // Adjust allocations based on usage types
  if (usageTypes.includes('gaming')) {
    allocations.gpu = 0.35;
    allocations.cpu = 0.22;
  } else if (usageTypes.includes('content-creation')) {
    allocations.cpu = 0.3;
    allocations.ram = 0.15;
    allocations.storage = 0.15;
  } else if (usageTypes.includes('programming')) {
    allocations.cpu = 0.3;
    allocations.ram = 0.15;
    allocations.gpu = 0.2;
  }

  // Select components based on budget allocations
  const componentTypes: ComponentType[] = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case', 'cooling'];
  
  componentTypes.forEach(type => {
    const componentBudget = budget * allocations[type];
    const options = getComponentsByType(type);
    
    // Sort by performance-to-price ratio for the most important usage type
    const primaryUsage = usageTypes[0] || 'general';
    
    options.sort((a, b) => {
      const aValue = a.performance[primaryUsage] / a.price;
      const bValue = b.performance[primaryUsage] / b.price;
      return bValue - aValue;
    });
    
    // Find the best component within budget
    const selectedComponent = options.find(c => c.price <= componentBudget) || options[0];
    
    if (selectedComponent) {
      build.components[type] = selectedComponent;
      build.totalPrice += selectedComponent.price;
    }
  });
  
  // Calculate performance scores
  build.performanceScores = calculatePerformanceScores(build, usageTypes);
  
  return build;
};

// Function to swap a component in a build
export const swapComponent = (
  build: PCBuild,
  componentType: ComponentType,
  newComponentId: string
): PCBuild => {
  const newComponent = components.find(c => c.id === newComponentId);
  
  if (!newComponent) {
    return build;
  }
  
  const newBuild: PCBuild = {
    ...build,
    components: { ...build.components },
    totalPrice: build.totalPrice
  };
  
  // Subtract old component price if it exists
  if (build.components[componentType]) {
    newBuild.totalPrice -= build.components[componentType]!.price;
  }
  
  // Add new component
  newBuild.components[componentType] = newComponent;
  newBuild.totalPrice += newComponent.price;
  
  // Recalculate performance scores
  const usageTypes = Object.keys(build.performanceScores).filter(
    key => build.performanceScores[key as UsageType] > 0
  ) as UsageType[];
  
  newBuild.performanceScores = calculatePerformanceScores(newBuild, usageTypes);
  
  return newBuild;
};