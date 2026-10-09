export type ServiceAreaStatus = 'primary' | 'regular' | 'extended';

export interface ServiceArea {
  slug: string;
  town: string;
  st: string;
  stateName: string;
  status: ServiceAreaStatus;
  neighborhoods?: string[];
  zips?: string[];
  localNote?: string;
  localFaq?: { question: string; answer: string }[];
  recentWork?: { problem: string; diagnosis: string; solution: string }[];
  nearby?: string[];
  placeholder?: boolean;
}

export const serviceAreas: ServiceArea[] = [
  { 
    slug: 'katy', 
    town: 'Katy', 
    st: 'TX', 
    stateName: 'Texas',
    status: 'primary',
    neighborhoods: ['Cinco Ranch', 'Grand Lakes'],
    placeholder: false,
    localNote: "Katy's rapid growth means we service both brand new systems in recent developments and older units in established neighborhoods.",
    recentWork: [
      { problem: "System running constantly but not cooling.", diagnosis: "Low refrigerant due to a coil leak.", solution: "Replaced indoor coil and recharged system." }
    ],
    nearby: ['sugar-land', 'cypress']
  },
  { slug: 'sugar-land', town: 'Sugar Land', st: 'TX', stateName: 'Texas', status: 'regular', placeholder: false },
  { slug: 'cypress', town: 'Cypress', st: 'TX', stateName: 'Texas', status: 'extended', placeholder: false },
  { slug: 'beasley', town: 'Beasley', st: 'TX', stateName: 'Texas', status: 'regular', placeholder: false }
];
