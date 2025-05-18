export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'range' | 'text';
  options?: Option[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface Option {
  id: string;
  text: string;
  image?: string;
}

export interface UserResponse {
  questionId: string;
  value: string | string[] | number;
}

export type UsageType = 
  | 'gaming' 
  | 'office' 
  | 'content-creation' 
  | 'programming' 
  | 'streaming' 
  | 'general';

export type ComponentType = 
  | 'cpu' 
  | 'gpu' 
  | 'motherboard' 
  | 'ram' 
  | 'storage' 
  | 'psu' 
  | 'case' 
  | 'cooling';

export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  brand: string;
  price: number;
  performance: Record<UsageType, number>;
  description: string;
  specs: Record<string, string | number>;
  image?: string;
}

export interface PCBuild {
  components: Record<ComponentType, Component | null>;
  totalPrice: number;
  performanceScores: Record<UsageType, number>;
}

export interface WizardState {
  step: number;
  totalSteps: number;
  responses: UserResponse[];
  recommendedBuild: PCBuild | null;
  customizedBuild: PCBuild | null;
  budget: number;
  usageType: UsageType[];
  applications: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: ComponentType;
  price: number;
  stock: number;
  specs: Record<string, string | number>;
  created_at: string;
  updated_at: string;
}