import { Component } from '../types';

export const components: Component[] = [
  // CPUs
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'Core i5-14600K',
    brand: 'Intel',
    price: 319,
    performance: {
      gaming: 85,
      office: 90,
      'content-creation': 75,
      programming: 85,
      streaming: 80,
      general: 90
    },
    description: 'A great mid-range CPU with excellent gaming performance and good multitasking capabilities.',
    specs: {
      cores: 14,
      threads: 20,
      baseFrequency: 3.5,
      boostFrequency: 5.0,
      tdp: 125,
      socket: 'LGA 1700',
    }
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'Ryzen 7 7800X3D',
    brand: 'AMD',
    price: 449,
    performance: {
      gaming: 95,
      office: 85,
      'content-creation': 80,
      programming: 85,
      streaming: 85,
      general: 90
    },
    description: 'High-end gaming CPU with 3D V-Cache technology for exceptional gaming performance.',
    specs: {
      cores: 8,
      threads: 16,
      baseFrequency: 4.2,
      boostFrequency: 5.0,
      tdp: 120,
      socket: 'AM5',
    }
  },
  {
    id: 'cpu-3',
    type: 'cpu',
    name: 'Ryzen 9 7950X',
    brand: 'AMD',
    price: 699,
    performance: {
      gaming: 90,
      office: 95,
      'content-creation': 95,
      programming: 95,
      streaming: 95,
      general: 95
    },
    description: 'Top-tier CPU with exceptional multi-threaded performance, ideal for content creation and heavy workloads.',
    specs: {
      cores: 16,
      threads: 32,
      baseFrequency: 4.5,
      boostFrequency: 5.7,
      tdp: 170,
      socket: 'AM5',
    }
  },
  
  // GPUs
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'GeForce RTX 4060 Ti',
    brand: 'NVIDIA',
    price: 399,
    performance: {
      gaming: 80,
      office: 70,
      'content-creation': 75,
      programming: 70,
      streaming: 80,
      general: 75
    },
    description: 'Great mid-range GPU for 1080p and 1440p gaming with good ray tracing capabilities.',
    specs: {
      vram: 8,
      memoryType: 'GDDR6',
      tdp: 160,
    }
  },
  {
    id: 'gpu-2',
    type: 'gpu',
    name: 'Radeon RX 7800 XT',
    brand: 'AMD',
    price: 499,
    performance: {
      gaming: 85,
      office: 75,
      'content-creation': 80,
      programming: 75,
      streaming: 80,
      general: 80
    },
    description: 'Powerful GPU with excellent 1440p gaming performance and good value.',
    specs: {
      vram: 16,
      memoryType: 'GDDR6',
      tdp: 263,
    }
  },
  {
    id: 'gpu-3',
    type: 'gpu',
    name: 'GeForce RTX 4080 Super',
    brand: 'NVIDIA',
    price: 999,
    performance: {
      gaming: 95,
      office: 85,
      'content-creation': 90,
      programming: 85,
      streaming: 95,
      general: 90
    },
    description: 'High-end GPU that delivers exceptional 4K gaming performance with DLSS and ray tracing.',
    specs: {
      vram: 16,
      memoryType: 'GDDR6X',
      tdp: 320,
    }
  },
  
  // RAM
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Vengeance LPX 16GB',
    brand: 'Corsair',
    price: 69,
    performance: {
      gaming: 75,
      office: 80,
      'content-creation': 70,
      programming: 80,
      streaming: 70,
      general: 80
    },
    description: 'Reliable RAM with good performance for gaming and everyday tasks.',
    specs: {
      capacity: 16,
      speed: 3200,
      type: 'DDR4',
      latency: 'CL16',
    }
  },
  {
    id: 'ram-2',
    type: 'ram',
    name: 'Trident Z5 RGB 32GB',
    brand: 'G.Skill',
    price: 159,
    performance: {
      gaming: 90,
      office: 90,
      'content-creation': 95,
      programming: 95,
      streaming: 95,
      general: 90
    },
    description: 'High-performance DDR5 RAM with RGB lighting, perfect for content creation and multitasking.',
    specs: {
      capacity: 32,
      speed: 6000,
      type: 'DDR5',
      latency: 'CL36',
    }
  },
  
  // Storage
  {
    id: 'storage-1',
    type: 'storage',
    name: '970 EVO Plus 1TB',
    brand: 'Samsung',
    price: 119,
    performance: {
      gaming: 85,
      office: 85,
      'content-creation': 85,
      programming: 85,
      streaming: 85,
      general: 85
    },
    description: 'Fast and reliable NVMe SSD for quick boot times and responsive applications.',
    specs: {
      capacity: 1000,
      type: 'NVMe SSD',
      readSpeed: 3500,
      writeSpeed: 3300,
    }
  },
  {
    id: 'storage-2',
    type: 'storage',
    name: '980 PRO 2TB',
    brand: 'Samsung',
    price: 219,
    performance: {
      gaming: 90,
      office: 90,
      'content-creation': 95,
      programming: 90,
      streaming: 90,
      general: 90
    },
    description: 'Top-tier PCIe 4.0 NVMe SSD with exceptional speed for demanding workloads.',
    specs: {
      capacity: 2000,
      type: 'NVMe SSD',
      readSpeed: 7000,
      writeSpeed: 5100,
    }
  },
  
  // Other components would follow similar patterns
  // Motherboards, PSUs, Cases, Cooling
];