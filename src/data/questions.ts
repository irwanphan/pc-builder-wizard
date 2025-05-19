import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'usage',
    text: 'What will you primarily use your computer for?',
    type: 'multiple',
    options: [
      { id: 'gaming', text: 'Gaming' },
      { id: 'content-creation', text: 'Content Creation (Video/Photo Editing)' },
      { id: 'programming', text: 'Programming/Development' },
      { id: 'office', text: 'Office Work' },
      { id: 'streaming', text: 'Streaming' },
      { id: 'general', text: 'General Use' },
    ]
  },
  {
    id: 'budget',
    text: 'What is your budget for this PC build?',
    type: 'range',
    min: 8250000,  // 500 USD
    max: 82500000, // 5000 USD
    unit: 'Rp'
  },
  {
    id: 'applications',
    text: 'Which specific applications do you plan to run?',
    type: 'multiple',
    options: [
      { id: 'game-aaa', text: 'AAA Games' },
      { id: 'game-esports', text: 'Esports Titles' },
      { id: 'adobe-suite', text: 'Adobe Creative Suite' },
      { id: 'video-editing', text: '4K Video Editing' },
      { id: 'ide', text: 'Development IDEs' },
      { id: 'vm', text: 'Virtual Machines' },
      { id: 'office-suite', text: 'Office Suite' },
      { id: '3d-modeling', text: '3D Modeling' },
      { id: 'streaming-sw', text: 'Streaming Software' },
      { id: 'browser', text: 'Web Browsing' },
    ]
  },
  {
    id: 'performance-priority',
    text: 'What aspect of performance is most important to you?',
    type: 'single',
    options: [
      { id: 'speed', text: 'Raw Processing Speed' },
      { id: 'graphics', text: 'Graphics Quality' },
      { id: 'multitasking', text: 'Multitasking Capability' },
      { id: 'storage', text: 'Fast Storage/Load Times' },
      { id: 'silence', text: 'Quiet Operation' },
      { id: 'balanced', text: 'Balanced Performance' },
    ]
  },
  {
    id: 'upgrade-plans',
    text: 'Do you plan to upgrade components in the future?',
    type: 'single',
    options: [
      { id: 'yes-frequent', text: 'Yes, frequently' },
      { id: 'yes-occasionally', text: 'Yes, occasionally' },
      { id: 'no', text: 'No, I want a complete system' },
    ]
  }
];