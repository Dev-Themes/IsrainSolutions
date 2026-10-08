export interface ServiceArea {
  slug: string;
  city: string;
  state: string;
  neighborhoods?: string[];
  localNote?: string;
  zip?: string[];
}

export const serviceAreas: ServiceArea[] = [
  { slug: "katy", city: "Katy", state: "TX", neighborhoods: [] },
  { slug: "sugar-land", city: "Sugar Land", state: "TX", neighborhoods: [] },
  { slug: "cypress", city: "Cypress", state: "TX", neighborhoods: [] },
  { slug: "spring", city: "Spring", state: "TX", neighborhoods: [] },
  { slug: "richmond", city: "Richmond", state: "TX", neighborhoods: [] },
  { slug: "pearland", city: "Pearland", state: "TX", neighborhoods: [] },
  { slug: "woodlands", city: "The Woodlands", state: "TX", neighborhoods: [] },
  { slug: "tomball", city: "Tomball", state: "TX", neighborhoods: [] },
];
