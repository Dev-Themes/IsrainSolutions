export interface TradeCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  avgPriceUK: string;
  avgPriceUS: string;
  emergencyAvailable: boolean;
  commonJobs: string[];
}

export interface CityLocation {
  id: string;
  slug: string;
  name: string;
  country: "UK" | "US";
  stateCounty: string;
  postalPrefix: string;
  isPopular: boolean;
  populationText: string;
}

export interface VerifiedPro {
  id: string;
  slug: string;
  companyName: string;
  contactName: string;
  country: "UK" | "US";
  city: string;
  postcodeOrZip: string;
  phone: string;
  email: string;
  hourlyRate: number;
  calloutFee: number;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  isVerified: boolean;
  isInsuranceValid: boolean;
  insuranceAmount: string;
  licenseNumber: string;
  categories: string[]; // slugs
  bio: string;
  recentWork: string[];
  reviews: {
    author: string;
    rating: number;
    title: string;
    comment: string;
    city: string;
    date: string;
  }[];
}

export const CATEGORIES: TradeCategory[] = [
  {
    id: "cat_1",
    slug: "plumbing",
    name: "Emergency Plumbing & Heating",
    icon: "Wrench",
    shortDescription: "Burst pipes, leaks, boiler breakdowns, radiator repairs & drainage.",
    fullDescription: "From middle-of-the-night burst pipes to central heating installations, our network of vetted plumbers arrive equipped to solve domestic and commercial issues rapidly.",
    avgPriceUK: "£65 - £120 / hr",
    avgPriceUS: "£80 - £160 / hr ($95 - $190)",
    emergencyAvailable: true,
    commonJobs: [
      "Burst pipe & flood isolation",
      "Combi boiler repair & servicing",
      "Unblocking drains & toilets",
      "Bathroom fitting & tap replacements",
      "Water heater repairs",
    ],
  },
  {
    id: "cat_2",
    slug: "electrical",
    name: "Certified Electricians",
    icon: "Zap",
    shortDescription: "Rewiring, consumer unit upgrades, lighting, EV chargers & safety certificates.",
    fullDescription: "NICEIC, NAPIT, and OSHA licensed electricians delivering electrical safety certificates (EICR), consumer unit replacements, EV home chargers, and fault tracing.",
    avgPriceUK: "£55 - £95 / hr",
    avgPriceUS: "£70 - £130 / hr ($85 - $160)",
    emergencyAvailable: true,
    commonJobs: [
      "Consumer unit (fuse box) replacement",
      "Full & partial house rewiring",
      "EICR safety certificates",
      "Home EV charger installation",
      "Tripping breaker diagnostics",
    ],
  },
  {
    id: "cat_3",
    slug: "gas-boiler",
    name: "Gas Safe & Boiler Engineers",
    icon: "Flame",
    shortDescription: "Boiler replacement, central heating power flushing, annual servicing.",
    fullDescription: "Strictly Gas Safe Register engineers handling boiler servicing, radiator power flushes, gas pipe relocations, and smart thermostat integrations.",
    avgPriceUK: "£75 - £140 / hr",
    avgPriceUS: "£90 - £175 / hr ($110 - $210)",
    emergencyAvailable: true,
    commonJobs: [
      "Annual boiler service & CP12 gas safety cert",
      "New combi boiler supply & installation",
      "Radiator cold spot power flush",
      "Smart thermostat (Nest/Hive) install",
      "Gas leak detection & shutoff",
    ],
  },
  {
    id: "cat_4",
    slug: "roofing",
    name: "Roofing & Guttering Specialists",
    icon: "Home",
    shortDescription: "Slate/tile repairs, flat roofs, chimney repointing, gutter clearance.",
    fullDescription: "Experienced roofers tackling storm damage, slipped slates, chimney repointing, EPDM rubber flat roofs, and seamless aluminium guttering.",
    avgPriceUK: "£50 - £85 / hr",
    avgPriceUS: "£65 - £120 / hr ($80 - $145)",
    emergencyAvailable: true,
    commonJobs: [
      "Emergency leak patching after high winds",
      "Broken tile & slate replacement",
      "Flat roof replacement (EPDM/Felt)",
      "Chimney stack flashing & repointing",
      "Fascias, soffits & gutter replacement",
    ],
  },
  {
    id: "cat_5",
    slug: "hvac",
    name: "HVAC & Air Conditioning",
    icon: "ThermometerSnowflake",
    shortDescription: "Heat pumps, residential AC units, ventilation & duct maintenance.",
    fullDescription: "Air conditioning and climate control technicians offering efficient heat pump installations, split system AC servicing, and ventilation compliance.",
    avgPriceUK: "£65 - £110 / hr",
    avgPriceUS: "£85 - £150 / hr ($100 - $185)",
    emergencyAvailable: true,
    commonJobs: [
      "Air conditioning installation (multi-split)",
      "Heat pump conversion & servicing",
      "Refrigerant leak detection & recharge",
      "Duct cleaning and sanitisation",
      "Commercial ventilation balancing",
    ],
  },
  {
    id: "cat_6",
    slug: "landscaping",
    name: "Landscaping & Tree Surgery",
    icon: "Trees",
    shortDescription: "Patios, composite decking, garden fencing, paving, tree removal.",
    fullDescription: "Transform outdoor spaces with porcelain paving, bespoke timber decking, close-board fencing, turf laying, and NPTC certified arboriculture.",
    avgPriceUK: "£45 - £80 / hr",
    avgPriceUS: "£55 - £100 / hr ($70 - $125)",
    emergencyAvailable: false,
    commonJobs: [
      "Porcelain patio & sandstone paving",
      "Pressure-treated timber & composite decking",
      "Storm-damaged fence panel replacement",
      "Artificial lawn & natural turf installation",
      "Tree crown reduction & safe felling",
    ],
  },
  {
    id: "cat_7",
    slug: "painting",
    name: "Painting & Decorating",
    icon: "PaintBucket",
    shortDescription: "Interior emulsion, exterior masonry, wallpapering & woodwork finish.",
    fullDescription: "Meticulous painters and decorators with dustless sanding systems, perfect edge cutting, fine wallpaper hanging, and weather-resistant exterior painting.",
    avgPriceUK: "£35 - £65 / hr",
    avgPriceUS: "£45 - £85 / hr ($55 - $105)",
    emergencyAvailable: false,
    commonJobs: [
      "Full room preparation & emulsion painting",
      "Specialist wallpaper hanging & removal",
      "Exterior masonry and render coatings",
      "Sash window sanding, priming & glossing",
      "Plaster repair & hairline crack smoothing",
    ],
  },
  {
    id: "cat_8",
    slug: "locksmith",
    name: "Emergency Locksmiths",
    icon: "KeyRound",
    shortDescription: "24/7 lockout response, British Standard euro-cylinders, smart door locks.",
    fullDescription: "Non-destructive entry specialists, master key installations, BS 3621 insurance-approved lock upgrades, and electronic smart lock fittings.",
    avgPriceUK: "£70 - £130 / callout",
    avgPriceUS: "£85 - £160 / callout ($105 - $195)",
    emergencyAvailable: true,
    commonJobs: [
      "24/7 lockout emergency entry (zero damage)",
      "Ultion 3-star anti-snap cylinder fitting",
      "UPVC door mechanism (gearbox) replacement",
      "Smart biometric lock installation",
      "Burglary repair & door frame reinforcment",
    ],
  },
];

export const CITIES: CityLocation[] = [
  // UK Major Cities (Established Network)
  {
    id: "loc_uk_1",
    slug: "london",
    name: "London",
    country: "UK",
    stateCounty: "Greater London",
    postalPrefix: "SW, EC, N, SE",
    isPopular: true,
    populationText: "8.9M Residents &middot; 2,140 Verified Pros",
  },
  {
    id: "loc_uk_2",
    slug: "manchester",
    name: "Manchester",
    country: "UK",
    stateCounty: "Greater Manchester",
    postalPrefix: "M1 - M90",
    isPopular: true,
    populationText: "2.8M Residents &middot; 780 Verified Pros",
  },
  {
    id: "loc_uk_3",
    slug: "birmingham",
    name: "Birmingham",
    country: "UK",
    stateCounty: "West Midlands",
    postalPrefix: "B1 - B98",
    isPopular: true,
    populationText: "1.2M Residents &middot; 650 Verified Pros",
  },
  {
    id: "loc_uk_4",
    slug: "leeds",
    name: "Leeds",
    country: "UK",
    stateCounty: "West Yorkshire",
    postalPrefix: "LS1 - LS29",
    isPopular: true,
    populationText: "812k Residents &middot; 430 Verified Pros",
  },
  {
    id: "loc_uk_5",
    slug: "glasgow",
    name: "Glasgow",
    country: "UK",
    stateCounty: "Scotland",
    postalPrefix: "G1 - G84",
    isPopular: true,
    populationText: "635k Residents &middot; 390 Verified Pros",
  },
  {
    id: "loc_uk_6",
    slug: "bristol",
    name: "Bristol",
    country: "UK",
    stateCounty: "South West",
    postalPrefix: "BS1 - BS49",
    isPopular: true,
    populationText: "470k Residents &middot; 310 Verified Pros",
  },
  {
    id: "loc_uk_7",
    slug: "liverpool",
    name: "Liverpool",
    country: "UK",
    stateCounty: "Merseyside",
    postalPrefix: "L1 - L40",
    isPopular: false,
    populationText: "500k Residents &middot; 290 Verified Pros",
  },
  {
    id: "loc_uk_8",
    slug: "sheffield",
    name: "Sheffield",
    country: "UK",
    stateCounty: "South Yorkshire",
    postalPrefix: "S1 - S81",
    isPopular: false,
    populationText: "580k Residents &middot; 260 Verified Pros",
  },
  {
    id: "loc_uk_9",
    slug: "edinburgh",
    name: "Edinburgh",
    country: "UK",
    stateCounty: "Scotland",
    postalPrefix: "EH1 - EH55",
    isPopular: true,
    populationText: "525k Residents &middot; 340 Verified Pros",
  },
  {
    id: "loc_uk_10",
    slug: "newcastle",
    name: "Newcastle upon Tyne",
    country: "UK",
    stateCounty: "Tyne & Wear",
    postalPrefix: "NE1 - NE71",
    isPopular: false,
    populationText: "300k Residents &middot; 210 Verified Pros",
  },

  // USA Expansion Metro Hubs
  {
    id: "loc_us_1",
    slug: "austin",
    name: "Austin",
    country: "US",
    stateCounty: "Texas",
    postalPrefix: "78701 - 78759",
    isPopular: true,
    populationText: "980k Residents &middot; 410 Active Pros",
  },
  {
    id: "loc_us_2",
    slug: "dallas",
    name: "Dallas",
    country: "US",
    stateCounty: "Texas",
    postalPrefix: "75201 - 75398",
    isPopular: true,
    populationText: "1.3M Residents &middot; 580 Active Pros",
  },
  {
    id: "loc_us_3",
    slug: "chicago",
    name: "Chicago",
    country: "US",
    stateCounty: "Illinois",
    postalPrefix: "60601 - 60661",
    isPopular: true,
    populationText: "2.7M Residents &middot; 620 Active Pros",
  },
  {
    id: "loc_us_4",
    slug: "los-angeles",
    name: "Los Angeles",
    country: "US",
    stateCounty: "California",
    postalPrefix: "90001 - 90296",
    isPopular: true,
    populationText: "3.8M Residents &middot; 890 Active Pros",
  },
  {
    id: "loc_us_5",
    slug: "miami",
    name: "Miami",
    country: "US",
    stateCounty: "Florida",
    postalPrefix: "33101 - 33299",
    isPopular: true,
    populationText: "440k Residents &middot; 370 Active Pros",
  },
  {
    id: "loc_us_6",
    slug: "phoenix",
    name: "Phoenix",
    country: "US",
    stateCounty: "Arizona",
    postalPrefix: "85001 - 85099",
    isPopular: true,
    populationText: "1.6M Residents &middot; 430 Active Pros",
  },
  {
    id: "loc_us_7",
    slug: "atlanta",
    name: "Atlanta",
    country: "US",
    stateCounty: "Georgia",
    postalPrefix: "30301 - 30399",
    isPopular: false,
    populationText: "500k Residents &middot; 350 Active Pros",
  },
  {
    id: "loc_us_8",
    slug: "houston",
    name: "Houston",
    country: "US",
    stateCounty: "Texas",
    postalPrefix: "77001 - 77299",
    isPopular: true,
    populationText: "2.3M Residents &middot; 640 Active Pros",
  },
];

export const VERIFIED_PROS: VerifiedPro[] = [
  {
    id: "pro_uk_1",
    slug: "apex-plumbing-heating-london",
    companyName: "Apex Heating & Emergency Plumbing Ltd",
    contactName: "David Thornton",
    country: "UK",
    city: "London",
    postcodeOrZip: "SW6 2PY",
    phone: "+44 20 7946 0812",
    email: "david@apexplumbing.co.uk",
    hourlyRate: 85,
    calloutFee: 95,
    rating: 4.96,
    reviewCount: 148,
    yearsInBusiness: 14,
    isVerified: true,
    isInsuranceValid: true,
    insuranceAmount: "£5,000,000 Direct Line Public Liability",
    licenseNumber: "Gas Safe Register #592104",
    categories: ["plumbing", "gas-boiler"],
    bio: "Family-run heating and plumbing company established in 2012. We cover Central and South West London with a fleet of 5 fully stocked vans. Specialists in Vaillant and Worcester Bosch boiler diagnostics and high-pressure unvented cylinders.",
    recentWork: [
      "Emergency boiler heat exchanger repair in Fulham (2 hour turnaround)",
      "Complete bathroom replumbing and Hansgrohe shower valve install in Clapham",
      "Lead pipe mains water supply replacement in Kensington",
    ],
    reviews: [
      {
        author: "Charlotte Henderson",
        rating: 5,
        title: "Saved us from a major ceiling collapse on Sunday evening",
        comment: "A pipe burst under our master bathroom floorboards at 8pm. David was at our door within 35 minutes, found the shutoff, cut out the split copper section, and restored mains pressure with zero fuss. Exceptional tradesman.",
        city: "London",
        date: "2 days ago",
      },
      {
        author: "Mark Alistair",
        rating: 5,
        title: "Worcester Bosch Combi Installation",
        comment: "Apex replaced our 18-year-old noisy boiler with a brand new Worcester 8000. Clean work, magnetic filter installed, system chemically flushed, and signed off on the Gas Safe portal before leaving.",
        city: "London",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: "pro_uk_2",
    slug: "mcr-power-electrics",
    companyName: "MCR Power & Electrical Solutions",
    contactName: "Liam O'Connor",
    country: "UK",
    city: "Manchester",
    postcodeOrZip: "M3 4LY",
    phone: "+44 161 832 9410",
    email: "enquiries@mcrelectrics.co.uk",
    hourlyRate: 65,
    calloutFee: 75,
    rating: 4.92,
    reviewCount: 94,
    yearsInBusiness: 9,
    isVerified: true,
    isInsuranceValid: true,
    insuranceAmount: "£2,000,000 AXA Commercial Shield",
    licenseNumber: "NICEIC Approved Contractor #D60312",
    categories: ["electrical"],
    bio: "Fully accredited NICEIC electricians covering Greater Manchester, Salford, and Cheshire. Expert in consumer unit surge protection upgrades, landlord safety EICRs, and home EV charging points.",
    recentWork: [
      "10-way dual RCD metal consumer unit upgrade in Didsbury",
      "Full 3-bedroom Victorian terrace rewire in Chorlton",
      "7.4kW Ohme Home Pro EV wallbox installation in Altrincham",
    ],
    reviews: [
      {
        author: "Stephen Croft",
        rating: 5,
        title: "Prompt EICR inspection and fuseboard replacement",
        comment: "Liam carried out our electrical certificate for our new rental flat. He explained each fault clearly, gave an itemized quote, and came back the next morning to fit a modern RCBO board with surge protection.",
        city: "Manchester",
        date: "1 week ago",
      },
    ],
  },
  {
    id: "pro_uk_3",
    slug: "vanguard-roofing-birmingham",
    companyName: "Vanguard Roofing & Heritage Restorations",
    contactName: "Simon Fletcher",
    country: "UK",
    city: "Birmingham",
    postcodeOrZip: "B13 8RA",
    phone: "+44 121 449 2219",
    email: "simon@vanguardroofing.co.uk",
    hourlyRate: 55,
    calloutFee: 60,
    rating: 4.88,
    reviewCount: 82,
    yearsInBusiness: 17,
    isVerified: true,
    isInsuranceValid: true,
    insuranceAmount: "£2,000,000 Aviva Tradesman Liability",
    licenseNumber: "National Federation of Roofing Contractors #9204",
    categories: ["roofing"],
    bio: "Specialist roofing contractors with over 17 years of experience handling pitched slate, clay tile, and high-performance flat felt roofs across the West Midlands and Solihull.",
    recentWork: [
      "Storm leak fix and 24 slipped Welsh slates replaced in Moseley",
      "Firestone EPDM flat roof on double garage in Solihull (20-year warranty)",
      "Full chimney repointing and lead flashing replacement in Edgbaston",
    ],
    reviews: [
      {
        author: "Harriet Davies",
        rating: 5,
        title: "Honest, tidy and fixed what two other roofers failed to find",
        comment: "We had water penetrating a bedroom ceiling for 6 months. Simon brought a drone camera, immediately showed us the cracked valley gutter, and repaired it that afternoon. Superb service.",
        city: "Birmingham",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: "pro_us_1",
    slug: "lone-star-air-austin",
    companyName: "Lone Star Climate & HVAC Masters",
    contactName: "Marcus Vance",
    country: "US",
    city: "Austin",
    postcodeOrZip: "78704",
    phone: "+1 (512) 555-0391",
    email: "service@lonestarhvac-tx.com",
    hourlyRate: 110,
    calloutFee: 89,
    rating: 4.95,
    reviewCount: 167,
    yearsInBusiness: 11,
    isVerified: true,
    isInsuranceValid: true,
    insuranceAmount: "$2,000,000 Travelers General Liability",
    licenseNumber: "Texas TDLR TACLB #48291E (Master HVAC)",
    categories: ["hvac"],
    bio: "Keeping Central Texas cool and comfortable. Master licensed technicians serving Travis, Williamson, and Hays counties. Trane and Carrier certified dealers providing emergency same-day AC diagnostics.",
    recentWork: [
      "Emergency capacitor and condenser fan motor replacement in South Congress",
      "Carrier Infinity 19 SEER2 dual heat pump system install in Westlake Hills",
      "Whole-home Aeroseal duct sealing and UV air purifier installation in Round Rock",
    ],
    reviews: [
      {
        author: "Tyler Campbell",
        rating: 5,
        title: "AC died when it was 104°F outside — Marcus saved us",
        comment: "Our compressor shut down on a Saturday in July. Called Lone Star through TradeConnect, Marcus arrived within 90 minutes with the exact run capacitor needed, charged fair rates, and had cold air blowing in 30 minutes.",
        city: "Austin",
        date: "3 days ago",
      },
    ],
  },
  {
    id: "pro_us_2",
    slug: "windy-city-precision-plumbing",
    companyName: "Windy City Precision Plumbing & Sewer",
    contactName: "Anthony Russo",
    country: "US",
    city: "Chicago",
    postcodeOrZip: "60614",
    phone: "+1 (312) 555-0182",
    email: "anthony@windycityprecision.com",
    hourlyRate: 125,
    calloutFee: 95,
    rating: 4.91,
    reviewCount: 119,
    yearsInBusiness: 16,
    isVerified: true,
    isInsuranceValid: true,
    insuranceAmount: "$1,000,000 State Farm Business Protection",
    licenseNumber: "Illinois Licensed Plumber #055-043921",
    categories: ["plumbing"],
    bio: "Third-generation Chicago plumbing company. Hydro-jetting, sewer camera inspections, frozen pipe thawing, and tankless water heater installations across Lincoln Park, Lakeview, and the Loop.",
    recentWork: [
      "Emergency frozen main water line thaw and insulation in Lincoln Park",
      "Navien tankless water heater conversion in Bucktown",
      "Hydro-jet main line tree root clearing with HD video inspection",
    ],
    reviews: [
      {
        author: "Elena Rostova",
        rating: 5,
        title: "Very professional, clear pricing upfront",
        comment: "Anthony explained every line item before starting work on our sewer backup. Showed us the video footage of the blockage and cleared it cleanly. Would definitely hire again.",
        city: "Chicago",
        date: "1 week ago",
      },
    ],
  },
];


export interface JobCostGuide {
  job: string;
  category: string;
  ukPriceRange: string;
  usPriceRange: string;
  duration: string;
  materialsIncluded: boolean;
  notes: string;
}

export const TYPICAL_JOB_PRICES: JobCostGuide[] = [
  {
    job: "Emergency burst pipe repair & isolation",
    category: "Plumbing",
    ukPriceRange: "£110 - £180",
    usPriceRange: "$140 - $240",
    duration: "1 - 2 hours",
    materialsIncluded: true,
    notes: "Includes isolation valve replacement and up to 1m of copper/poly pipe.",
  },
  {
    job: "Combi boiler service & CP12 inspection",
    category: "Boilers & Gas",
    ukPriceRange: "£85 - £130",
    usPriceRange: "$110 - $170",
    duration: "1 hour",
    materialsIncluded: false,
    notes: "Flue gas analysis, magnetic filter clean, safety certificate issued.",
  },
  {
    job: "10-Way dual RCD metal consumer unit upgrade",
    category: "Electrical",
    ukPriceRange: "£420 - £650",
    usPriceRange: "$550 - $850",
    duration: "Half day (4 - 5 hrs)",
    materialsIncluded: true,
    notes: "Full circuit testing, certification, and Part P notification included.",
  },
  {
    job: "Pitched roof slipped slate & tile repair (up to 15 tiles)",
    category: "Roofing",
    ukPriceRange: "£160 - £290",
    usPriceRange: "$210 - $380",
    duration: "2 - 3 hours",
    materialsIncluded: true,
    notes: "Includes ladder access, replacement slates, and ridge mortar check.",
  },
  {
    job: "Heat pump / AC annual diagnostic & refrigerant check",
    category: "HVAC",
    ukPriceRange: "£95 - £160",
    usPriceRange: "$120 - $210",
    duration: "1 - 2 hours",
    materialsIncluded: false,
    notes: "Coil wash, electrical draw test, and delta-T temperature verification.",
  },
  {
    job: "Ultion 3-star anti-snap lock replacement",
    category: "Locksmith",
    ukPriceRange: "£115 - £175",
    usPriceRange: "$150 - $220",
    duration: "45 minutes",
    materialsIncluded: true,
    notes: "BS 3621 insurance approved cylinder supplied with 3 keys.",
  },
];

export const GALLERY_PHOTOS = [
  {
    id: "gal_1",
    title: "15mm Copper Manifold & Press-Fit Isolations",
    trade: "Plumbing",
    location: "Fulham, London",
    caption: "Clean soldered copper pipework and lever valves installed for a pressurised unvented cylinder system in an Edwardian cellar.",
    accentColor: "#223832",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/copper-pipework.jpg",
  },
  {
    id: "gal_2",
    title: "Worcester Bosch Combi Heat Exchanger Inspection",
    trade: "Heating & Gas",
    location: "Didsbury, Manchester",
    caption: "Full strip-down service showing clean stainless-steel heat exchanger and freshly flushed magnetic system filter.",
    accentColor: "#29322b",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/boiler-inspection.jpg",
  },
  {
    id: "gal_3",
    title: "18th Edition RCBO Metal Consumer Unit Upgrade",
    trade: "Electrical",
    location: "Edgbaston, Birmingham",
    caption: "Neatly dressed wiring with individual RCBOs and Type 2 surge protection device (SPD) in a residential garage.",
    accentColor: "#1d2e29",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/electrical-consumer-unit.jpg",
  },
  {
    id: "gal_4",
    title: "Welsh Slate Valley Gutter & Lead Flashing Repointing",
    trade: "Roofing",
    location: "Headingley, Leeds",
    caption: "Code 4 milled lead valley installed with copper clips and fresh lime mortar bedding along weathered stone gables.",
    accentColor: "#2b2a26",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/copper-pipework.jpg",
  },
  {
    id: "gal_5",
    title: "Dual Heat Pump Manifold Gauge Pressure Diagnostics",
    trade: "HVAC",
    location: "Round Rock, Austin TX",
    caption: "Nitrogen pressure hold test and micron vacuum pull down on 410A refrigerant lines prior to system commissioning.",
    accentColor: "#1e332c",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/hvac-heat-pump.jpg",
  },
  {
    id: "gal_6",
    title: "Porcelain Patio Paving with Mortar Bed Jointing",
    trade: "Landscaping",
    location: "Solihull, West Midlands",
    caption: "20mm outdoor porcelain tiles laid on full wet mortar bed with SBR slurry primer and resin brush-in joints.",
    accentColor: "#332c25",
    aspect: "aspect-4/3",
    imageUrl: "/images/trades/boiler-inspection.jpg",
  },
];

export const HOME_REVIEWS = [
  {
    id: "rev_1",
    author: "Charlotte H.",
    city: "South West London",
    service: "Plumbing",
    rating: 5,
    date: "November 2026",
    title: "Burst pipe isolated and fixed within an hour",
    comment: "A joint gave way behind our downstairs toilet on a cold Saturday morning. The plumber arrived in 35 minutes with the exact copper fitting needed and charged the exact rate quoted over the phone.",
    verified: true,
  },
  {
    id: "rev_2",
    author: "Liam T.",
    city: "Manchester",
    service: "Electrical",
    rating: 5,
    date: "October 2026",
    title: "Tidy consumer unit installation and signed off EICR",
    comment: "Old rewirable fusebox replaced with a modern surge-protected board. Tidy work, labelled every breaker properly, and emailed through the electrical certificate the same evening.",
    verified: true,
  },
  {
    id: "rev_3",
    author: "Simon G.",
    city: "Austin, Texas",
    service: "HVAC",
    rating: 5,
    date: "November 2026",
    title: "Replaced a dead capacitor when the house reached 90 degrees",
    comment: "Marcus showed up with the meter, diagnosed the run capacitor within 10 minutes, checked the compressor amps, and had our cold air running before lunch. Straightforward, honest tradesman.",
    verified: true,
  },
  {
    id: "rev_4",
    author: "Harriet D.",
    city: "Birmingham",
    service: "Roofing",
    rating: 5,
    date: "October 2026",
    title: "Found the leak other roofers missed",
    comment: "Water was leaking into our loft whenever the wind blew south. Simon climbed up, showed us the cracked valley lead on his camera, gave a firm price, and returned Monday to fix it cleanly.",
    verified: true,
  },
];

export const BLOG_ARTICLES = [
  {
    slug: "winter-boiler-pressure-guide",
    title: "How to check and top up your combi boiler water pressure",
    excerpt: "If your central heating stops firing or radiators stay cold at the bottom, your system pressure may have dropped below 1 bar. Here is how to refill the loop safely.",
    readTime: "4 min read",
    category: "Heating & Boilers",
    date: "10 November 2026",
    author: "David Thornton, Gas Safe Engineer",
  },
  {
    slug: "eicr-landlord-regulations-checklist",
    title: "Electrical safety certificates (EICR): What inspectors check",
    excerpt: "A plain explanation of C1, C2 and FI codes on an electrical report, why surge protection is now required, and how often tests must happen.",
    readTime: "6 min read",
    category: "Electrical",
    date: "28 October 2026",
    author: "Liam O'Connor, NICEIC Contractor",
  },
  {
    slug: "storm-roof-damage-first-steps",
    title: "What to do immediately after high winds damage your roof",
    excerpt: "Steps to stop water reaching your ceilings, safe isolation of electrics, and how to photograph damage for your home insurance claim before repairs start.",
    readTime: "5 min read",
    category: "Roofing",
    date: "14 October 2026",
    author: "Simon Fletcher, Roofing Specialist",
  },
];

export const FAQS = [
  {
    id: "faq_1",
    question: "How does TradeConnect verify tradespeople before they can quote?",
    answer: "Every contractor must supply proof of identity, business registration, and an active public liability insurance certificate with at least £1,000,000 ($1,000,000 in the US) of cover. For specialist work, we verify accreditation numbers directly with official bodies: Gas Safe Register in the UK for gas, NICEIC or NAPIT for electrical, and state licensing boards (such as TDLR in Texas) in the USA.",
  },
  {
    id: "faq_2",
    question: "Is posting a job request completely free for homeowners?",
    answer: "Yes, posting a job is 100% free with no obligation to hire. You describe the issue, specify your postcode or town, and receive quotes from up to 3 vetted local professionals. You choose whether to hire one, or walk away.",
  },
  {
    id: "faq_3",
    question: "How quickly will a local contractor respond to my request?",
    answer: "Emergency requests (burst pipes, total power loss, heating failure in winter) trigger direct priority dispatch, with trades typically contacting you within 30 to 60 minutes. Standard repairs and planned home improvement requests typically receive responses within 2 hours.",
  },
  {
    id: "faq_4",
    question: "Do I pay the tradesperson through TradeConnect or directly?",
    answer: "You deal directly with the tradesperson. We do not take a cut of their hourly fee or add hidden surcharges to their invoice. Payment terms (cash, bank transfer, or card) are agreed directly between you and the contractor upon completion of the work.",
  },
  {
    id: "faq_5",
    question: "What should I check before letting a contractor start work in my home?",
    answer: "Always ask to see their physical ID card (such as a Gas Safe card or state license), confirm the agreed price in writing (text message or email is fine), and clarify whether materials are included or billed separately. Never pay the full amount upfront before materials are on-site.",
  },
  {
    id: "faq_6",
    question: "How are customer reviews verified?",
    answer: "Reviews on TradeConnect can only be submitted by homeowners who posted a genuine job request through the platform. We check job reference numbers to prevent fake reviews, duplicate postings, and paid testimonials.",
  },
  {
    id: "faq_7",
    question: "What areas of the UK and US do you currently cover?",
    answer: "In the UK, we currently cover approximately 45% of towns and metropolitan areas, including Greater London, Greater Manchester, West Midlands, West Yorkshire, Merseyside, and Scotland. In the US, we have launched in Texas (Austin, Dallas, Houston), Chicago, Los Angeles, Miami, and Phoenix, with ongoing regional expansion.",
  },
];
