export interface BlogArticleSection {
  heading: string;
  subsections?: {
    subheading: string;
    body: string[];
  }[];
  body?: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  tableOfContents: { id: string; title: string }[];
  sections: BlogArticleSection[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "winter-boiler-pressure-guide",
    title: "How to Check and Top Up Combi Boiler Water Pressure Safely",
    excerpt: "If your central heating stops firing or radiators stay cold at the bottom, your system pressure may have dropped below 1 bar. Here is the exact technical method to refill the loop safely without an emergency callout.",
    readTime: "7 min read",
    category: "Heating & Boilers",
    date: "10 November 2026",
    author: "David Thornton",
    authorRole: "Gas Safe Registered Heating Engineer (#592104)",
    tableOfContents: [
      { id: "understanding-sealed-pressure", title: "1. Understanding Sealed Heating System Pressure" },
      { id: "symptoms-of-low-pressure", title: "2. Symptoms of Low Boiler Pressure" },
      { id: "locating-filling-loop", title: "3. Locating and Identifying Your Filling Loop" },
      { id: "step-by-step-refill", title: "4. Step-by-Step Repressurising Protocol" },
      { id: "troubleshooting-leaks", title: "5. When Low Pressure Indicates a System Leak" },
    ],
    sections: [
      {
        heading: "1. Understanding Sealed Heating System Pressure",
        body: [
          "Modern combination (combi) boilers and system boilers operate as closed-circuit, sealed hydronic systems. Unlike older open-vented gravity systems that rely on a cold water feed-and-expansion cistern in the loft, sealed systems are pressurised directly with cold mains water.",
          "For water to circulate through your pipework, heat exchangers, and radiators efficiently, the system must maintain an optimal static pressure when cold — typically between 1.0 and 1.5 bar. When the central heating fires up and the circulating water heats up, it expands into an internal diaphragm expansion vessel, causing the pressure gauge to naturally rise to 1.8 - 2.3 bar. If pressure falls below roughly 0.8 bar, low-pressure safety sensors inside the boiler trigger a lockout code (such as F22 on Vaillant, EA/224 on Worcester Bosch, or F1 on Ideal) to protect the heat exchanger from dry firing.",
        ],
      },
      {
        heading: "2. Symptoms of Low Boiler Pressure",
        body: [
          "Before unscrewing any inspection access panels or calling a technician, look out for the standard warning signs of low system pressure:",
          "• Radiators failing to heat up, particularly those situated on upper floors or at the furthest ends of the pipe run.",
          "• The pressure gauge needle resting in the red zone (below 1.0 bar) when the system has cooled completely.",
          "• Digital display showing an active fault or lock-out code indicating loss of water pressure.",
          "• Gurgling or bubbling noises within the central heating pipework caused by air entering the depressurised circuit.",
        ],
      },
      {
        heading: "3. Locating and Identifying Your Filling Loop",
        body: [
          "To restore the pressure, you need to use the filling loop. The filling loop is a temporary or semi-permanent bridge between your mains cold water supply pipe and the boiler return heating pipe.",
          "External Braided Hose Loops: Most boilers feature an external silver flexible braided hose situated directly beneath the boiler casing. It connects two small isolation valves, usually fitted with small black, blue, or chrome lever handles or slotted screwdriver valves.",
          "Internal Keyed or Keyless Links: Many contemporary boilers (such as Worcester Bosch Greenstar series) feature an internal filling link. Keyed versions require you to insert an L-shaped plastic key into a manifold slot, turn it 45 degrees, and turn an adjacent white nut. Keyless versions simply have a small blue lever pull-down under the front fascia.",
        ],
      },
      {
        heading: "4. Step-by-Step Repressurising Protocol",
        body: [
          "Follow this safe, professional protocol to restore your boiler's operating pressure without overfilling:",
          "Step 1: Ensure the central heating is idle and cooled down. Turn off the heating programmer or room thermostat. Never top up a hot boiler with cold mains water; introducing cold water into a scalding heat exchanger can induce thermal shock and crack cast aluminium or composite components. Do not tamper with electrical breakers or remove safety covers — repressurising is purely an external hydraulic operation.",
          "Step 2: Inspect the filling loop connection. Ensure both ends of the silver braided hose are tightened securely to the respective valves. Keep a small rag or cloth handy in case of residual seepage.",
          "Step 3: Slowly open the first valve fully. If your loop has levers, turn the lever until it is in line with the pipework. If it has screwdriver slots, turn the screw 90 degrees.",
          "Step 4: Gradually open the second valve while watching the pressure gauge. You will hear water rushing into the circuit. Keep a close eye on the needle on the mechanical gauge or digital readout.",
          "Step 5: Close both valves firmly once the needle reaches 1.2 to 1.5 bar. Do not allow the pressure to exceed 1.8 bar when cold. If you accidentally overfill above 2.5 bar, bleed a small amount of water from a downstairs radiator drain-off valve or bleed nipple until the needle returns to the normal zone.",
          "Step 6: Ensure the filling loop valves are completely closed and disconnect the hose if required by local UK Water Regulations (WRAS) to prevent back-siphonage into the drinking water mains.",
          "Step 7: Switch your central heating programmer back on. The fault code should clear, and the boiler pump will resume its standard circulation cycle.",
        ],
      },
      {
        heading: "5. When Low Pressure Indicates a System Leak",
        body: [
          "It is normal for a central heating system to lose a fractional amount of pressure over 12 months, especially after bleeding radiators in the autumn. However, if your boiler loses pressure repeatedly within a few days or weeks, there is an underlying issue that requires a Gas Safe registered engineer:",
          "• Pin-hole radiator leaks or weeping thermostatic radiator valve (TRV) tails hidden behind skirting boards or under carpets.",
          "• Failed expansion vessel diaphragm: When the internal rubber diaphragm perishes or loses its Schrader valve air charge, water cannot expand, forcing the 3-bar Pressure Relief Valve (PRV) to eject water outside through the copper blow-off pipe.",
          "• Internal main heat exchanger pinhole leakage: Water evaporates inside the combustion chamber, escaping unseen through the flue condensate trap.",
          "If your pressure gauge drops repeatedly, book a certified heating engineer on TradeConnect to carry out a comprehensive system pressure integrity test.",
        ],
      },
    ],
  },
  {
    slug: "eicr-landlord-regulations-checklist",
    title: "Electrical Safety Certificates (EICR): What Inspectors Check & Decoding C1, C2, and FI Codes",
    excerpt: "A comprehensive guide to Electrical Installation Condition Reports (EICRs) for UK landlords and US rental owners. Learn what inspectors test, the legal requirements, and how to resolve failed observations.",
    readTime: "8 min read",
    category: "Electrical",
    date: "28 October 2026",
    author: "Liam O'Connor",
    authorRole: "NICEIC Approved Electrical Contractor (#D60312)",
    tableOfContents: [
      { id: "what-is-an-eicr", title: "1. What is an Electrical Installation Condition Report?" },
      { id: "legal-mandates-landlords", title: "2. Legal Mandates for Landlords (UK & US)" },
      { id: "inspection-phases", title: "3. The Two Core Phases: Visual Inspection & Dead/Live Testing" },
      { id: "decoding-observation-codes", title: "4. Decoding Observation Codes (C1, C2, C3, and FI)" },
      { id: "cost-and-remedial-turnaround", title: "5. Remedial Turnaround Times and Average Pricing" },
    ],
    sections: [
      {
        heading: "1. What is an Electrical Installation Condition Report?",
        body: [
          "An Electrical Installation Condition Report (EICR), previously known as a Periodic Inspection Report (PIR), is a thorough in-depth assessment of the permanent electrical infrastructure in a residential or commercial property. Carried out exclusively by certified, competent electricians (such as NICEIC, NAPIT, or ELECSA registered contractors in the UK, or state-licensed master electricians in the US), an EICR verifies that fixed cabling, consumer units, socket outlets, switches, and bonding comply with modern electrical standards (BS 7671 18th Edition Amendment 2).",
        ],
      },
      {
        heading: "2. Legal Mandates for Landlords (UK & US)",
        body: [
          "In England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require private landlords to ensure electrical installations in rented properties are inspected and tested at least every five years by a qualified person.",
          "Landlords must provide a copy of the report to existing tenants within 28 days, to new tenants before occupancy, and to local authorities within 7 days upon request. Failure to comply can result in local council enforcement fines of up to £30,000 per violation.",
          "In the US, while federal regulations leave rental electrical oversight to state and municipal building codes (such as Chicago Municipal Code Title 14 or California Civil Code 1941.1), habitability laws mandate that landlords maintain all electrical wiring, outlets, and panel boards in safe, code-compliant operating order. Increasingly, US insurers require certified electrical reports before issuing commercial landlord liability policies.",
        ],
      },
      {
        heading: "3. The Two Core Phases: Visual Inspection & Dead/Live Testing",
        body: [
          "During an EICR assessment, which typically takes between 2.5 and 4 hours for an average 3-bedroom property, the electrician executes two exhaustive procedures:",
          "Phase A: Visual Inspection — The contractor inspects the incoming mains supply service cutout, earth bonding conductors to incoming water and gas pipework (minimum 10mm² copper in the UK), consumer unit enclosure fire-rating (metal clad non-combustible casing), and searches for damaged socket faceplates, exposed copper cores, or thermal heat scorch marks.",
          "Phase B: Instrument Testing — Using a calibrated Multifunction Tester (MFT), the electrician conducts dead tests (continuity of protective conductors, ring final circuit continuity, and insulation resistance at 500V DC) followed by live tests (earth fault loop impedance Ze and Zs, and RCD trip disconnection times in milliseconds at 1x and 5x rated current).",
        ],
      },
      {
        heading: "4. Decoding Observation Codes (C1, C2, C3, and FI)",
        body: [
          "Any deficiencies discovered during testing are categorized using standardized classification codes:",
          "• Code C1 (Danger Present): Immediate risk of injury or electric shock. The electrician must make the installation safe immediately (e.g., exposed live 230V terminals, broken socket covers exposing conductors). An EICR with a C1 code is automatically UNSATISFACTORY.",
          "• Code C2 (Potentially Dangerous): Urgent remedial action required. Conditions that do not present immediate danger but could become hazardous under fault conditions (e.g., absence of supplementary bonding in bathrooms, lack of RCD protection on socket circuits likely to supply outdoor equipment, high earth loop impedance). Automatically UNSATISFACTORY.",
          "• Code FI (Further Investigation Required): The inspector identified a circuit anomaly that could not be verified on-site without deeper access (e.g., hidden junction boxes or unverified shared neutral cables). Automatically UNSATISFACTORY until investigated.",
          "• Code C3 (Improvement Recommended): The installation does not meet modern standards but does not present danger (e.g., plastic consumer unit in a non-escape route, absence of Type 2 Surge Protection Devices). A report with only C3 codes is deemed SATISFACTORY.",
        ],
      },
      {
        heading: "5. Remedial Turnaround Times and Average Pricing",
        body: [
          "If a property receives an Unsatisfactory report due to C1, C2, or FI observations, the landlord has a legal deadline of 28 days (or sooner if specified by the inspector) to commission remedial repairs and obtain written confirmation of compliance.",
          "Average EICR inspection costs range from £140 to £260 ($180 to $320 in the US) depending on property size and the number of consumer unit circuits. Common remedial works include replacing obsolete consumer units with modern RCBO metal boards (£450 - £680) and installing missing main earth bonding conductors (£120 - £180).",
        ],
      },
    ],
  },
  {
    slug: "storm-roof-damage-first-steps",
    title: "Emergency Roof Damage After Storms: A Homeowner's Protocol",
    excerpt: "What to do immediately after high winds or hail compromise your roof. Safe water containment, structural checks, insurance documentation, and hiring verified roofers.",
    readTime: "6 min read",
    category: "Roofing",
    date: "14 October 2026",
    author: "Simon Fletcher",
    authorRole: "NFRC Certified Roofing Specialist (#9204)",
    tableOfContents: [
      { id: "immediate-safety-checks", title: "1. Immediate Ground Safety & Internal Containment" },
      { id: "documenting-damage", title: "2. Documenting the Scene for Insurance Claims" },
      { id: "temporary-waterproofing", title: "3. Temporary Tarping vs Permanent Repairs" },
      { id: "hiring-storm-proof-trades", title: "4. Avoiding Rogue Storm Chasers" },
      { id: "repair-cost-benchmarks", title: "5. Typical Storm Repair Cost Benchmarks" },
    ],
    sections: [
      {
        heading: "1. Immediate Ground Safety & Internal Containment",
        body: [
          "Severe gale force winds (Storms Babet, Ciaran, and severe weather fronts) can rip off ridge tiles, dislodge Welsh slates, or damage chimney lead flashings in seconds. Your initial focus must be life safety, not ascending the roof:",
          "• Never climb onto a damaged roof in active storm conditions or wet weather. Saturated roof tiles, wind shear, and compromised batten timbers cause dozens of fatal falls annually.",
          "• Cordon off ground perimeters beneath the eaves: Hanging gutters, loose verge mortar, and cracked slates can slide without warning hours after high winds subside.",
          "• Inside the home, contain active leaks immediately: Place buckets and large plastic containers beneath ceiling drips. If plasterboard ceilings begin to sag and bow under trapped water, puncture the center of the bulge with a screwdriver or bradawl to drain the water into a container and prevent a catastrophic ceiling collapse.",
        ],
      },
      {
        heading: "2. Documenting the Scene for Insurance Claims",
        body: [
          "Before any emergency contractor starts cutting or clearing debris, document every detail thoroughly for your building insurance loss adjuster:",
          "Take wide-angle and close-up photographs from ground level using optical zoom. Photograph fallen slates or ridge tiles in the garden before clearing them. Indoors, photograph stained plasterwork, damaged flooring, and ruined furnishings with date-stamped digital images. Keep receipts for all emergency containment materials (tarpaulins, buckets, industrial dehumidifiers).",
        ],
      },
      {
        heading: "3. Temporary Tarping vs Permanent Repairs",
        body: [
          "Insurance companies prioritize mitigation of secondary water ingress. A reputable roofing contractor will first install heavy-duty reinforced waterproof tarpaulins weighted down with timber battening screwed securely into sound rafter sections. This protects your loft insulation and timbers while you await insurance claim sign-off for permanent slate/tile replacement, lead flashing renewals, and mortar repointing.",
        ],
      },
      {
        heading: "4. Avoiding Rogue Storm Chasers",
        body: [
          "Following severe storms, rogue doorstep contractors frequently knock on doors claiming they 'noticed loose tiles from the street' and demanding upfront cash payments. Protect your home and wallet:",
          "• Never hire contractors who knock uninvited or cannot provide proof of public liability insurance.",
          "• Demand written estimates on headed paper detailing itemized materials, access costs (scaffolding or cherry picker), and disposal fees.",
          "• Verify their trade body registrations through official directories like TradeConnect, the National Federation of Roofing Contractors (NFRC), or the Confederation of Roofing Contractors (CORC).",
        ],
      },
      {
        heading: "5. Typical Storm Repair Cost Benchmarks",
        body: [
          "Standard storm damage repair costs across the UK and US:",
          "• Emergency temporary tarping & weatherproofing: £180 - £350 ($240 - $480).",
          "• Replacing up to 15 slipped or broken roof slates/tiles: £160 - £290 ($210 - $380).",
          "• Rebedding and repointing dislodged mortar ridge tiles (per 3m run): £220 - £400 ($290 - $520).",
          "• Chimney stack lead flashing re-dressing & mortar repointing: £280 - £550 ($360 - $700).",
        ],
      },
    ],
  },
  {
    slug: "heat-pump-vs-gas-boiler-comparison",
    title: "Air Source Heat Pumps vs Combi Gas Boilers: 2026 Costs & Efficiency",
    excerpt: "An impartial technical comparison of air source heat pumps and modern condensing gas boilers. Upfront capital costs, electricity vs gas tariffs, boiler upgrade schemes, and insulation prerequisites.",
    readTime: "9 min read",
    category: "HVAC & Heating",
    date: "04 November 2026",
    author: "Marcus Vance",
    authorRole: "Master HVAC Specialist (TDLR TACLB #48291E)",
    tableOfContents: [
      { id: "core-operating-principles", title: "1. Core Operating Principles: Combustion vs Thermodynamics" },
      { id: "efficiency-and-cop", title: "2. Efficiency & Seasonal Performance (SCOP vs AFUE)" },
      { id: "capital-installation-costs", title: "3. Real-World Upfront Capital Costs & Government Grants" },
      { id: "running-costs-running-math", title: "4. Running Cost Economics: Electricity vs Gas Tariffs" },
      { id: "suitability-verdict", title: "5. Which System Suits Your Home?" },
    ],
    sections: [
      {
        heading: "1. Core Operating Principles: Combustion vs Thermodynamics",
        body: [
          "Choosing between a modern condensing combi gas boiler and an Air Source Heat Pump (ASHP) represents the fundamental divide in residential decarbonisation today.",
          "A combi gas boiler burns methane gas to generate instantaneous heat, converting fuel directly through stainless steel or cast aluminium heat exchangers. It delivers high-temperature hot water (60°C - 75°C) rapidly, requiring smaller radiator surface areas.",
          "An Air Source Heat Pump operates like a refrigerator in reverse. Using refrigerant cycles (typically R32 or R290 propane), it extracts low-grade ambient heat from outside air — even at -15°C — and compresses it to deliver low-flow temperature hot water (35°C - 50°C) into an unvented hot water cylinder and oversized radiators or underfloor heating.",
        ],
      },
      {
        heading: "2. Efficiency & Seasonal Performance (SCOP vs AFUE)",
        body: [
          "A modern A-rated condensing gas boiler operates at roughly 92% to 94% AFUE (Annual Fuel Utilization Efficiency). For every 1 kWh of gas burned, approximately 0.93 kWh of usable thermal energy enters the heating circuit.",
          "By contrast, an air source heat pump delivers a Seasonal Coefficient of Performance (SCOP) between 3.0 and 4.2. That means for every 1 kWh of electricity consumed by the compressor, the heat pump produces 3 to 4.2 kWh of heat energy — an effective operating efficiency of 300% to 420%.",
        ],
      },
      {
        heading: "3. Real-World Upfront Capital Costs & Government Grants",
        body: [
          "In the UK, replacing an existing combi boiler with a high-efficiency Worcester Bosch or Vaillant system typically costs £2,200 to £3,800 ($2,800 to $4,800), including system chemical flushing, magnetic filter, and smart controls.",
          "A full ASHP installation ranges from £9,000 to £14,500. However, in the UK, the government's Boiler Upgrade Scheme (BUS) provides a £7,500 non-repayable voucher toward heat pump installations, reducing out-of-pocket costs to £3,500 - £7,000.",
          "In the US, the Inflation Reduction Act (IRA) Section 25C Energy Efficient Home Improvement Credit covers 30% of heat pump equipment and installation costs up to $2,000, supplemented by state utility rebates (e.g., Austin Energy, Oncor in Texas) offering an additional $800 to $2,500.",
        ],
      },
      {
        heading: "4. Running Cost Economics: Electricity vs Gas Tariffs",
        body: [
          "While heat pumps achieve 300%+ efficiency, running costs depend heavily on the electricity-to-gas price ratio. In the UK, electricity averages 24p/kWh compared to roughly 6p/kWh for mains gas (a 4:1 ratio). To break even financially on running costs, an ASHP must achieve an annual SCOP of at least 3.8. Pair an ASHP with home solar photovoltaic panels and off-peak battery tariffs, however, and heat pump running costs drop by up to 50%.",
        ],
      },
      {
        heading: "5. Which System Suits Your Home?",
        body: [
          "A combi boiler remains the most cost-effective solution for compact Victorian terraces, flats with limited external garden clearances, and homes with poor cavity and loft insulation.",
          "A heat pump is the premier choice for modern well-insulated properties, suburban detached homes, properties off the mains gas grid (replacing expensive heating oil or LPG), and homeowners seeking zero on-site carbon emissions.",
        ],
      },
    ],
  },
  {
    slug: "unblocking-blocked-drains-guide",
    title: "Blocked Drains & Toilets: DIY Plunging vs Professional Hydro-Jetting",
    excerpt: "How to tell whether a domestic drainage blockage is a localized trap obstruction or a main sewer line backup. DIY plunging techniques, enzyme cleaners, and hydro-jetting costs.",
    readTime: "6 min read",
    category: "Emergency Plumbing",
    date: "02 November 2026",
    author: "Anthony Russo",
    authorRole: "Licensed Master Plumber (IL #055-043921)",
    tableOfContents: [
      { id: "local-vs-main-line", title: "1. Diagnosing Local Fixture Traps vs Main Sewer Blockages" },
      { id: "effective-diy-plunging", title: "2. The Correct Way to Plunge Sinks & Toilets" },
      { id: "chemical-cleaner-dangers", title: "3. Why Chemical Caustic Cleaners Damage Pipework" },
      { id: "professional-equipment", title: "4. Professional Remediation: Mechanical Snakes & Hydro-Jetting" },
      { id: "unblocking-costs-guide", title: "5. Drain Unblocking Cost Guide" },
    ],
    sections: [
      {
        heading: "1. Diagnosing Local Fixture Traps vs Main Sewer Blockages",
        body: [
          "Before taking action on a slow-draining appliance, you must determine whether the restriction is localized to a single fixture or stems from a mainline sewer failure:",
          "• Localised Blockage: Only one sink, shower, or toilet drains sluggishly. When you flush, water does not back up into adjacent baths or shower trays. The obstruction is almost always trapped hair, soap scum, or foreign items caught in the fixture's P-trap or waste tailpiece.",
          "• Mainline Sewer Blockage: Flushing a toilet causes waste water to burble or emerge into the ground-floor shower pan. When the washing machine discharges, adjacent floor wastes or outdoor gully traps overflow. This indicates a major blockage in the 100mm (4-inch) underground soil drainage pipe.",
        ],
      },
      {
        heading: "2. The Correct Way to Plunge Sinks & Toilets",
        body: [
          "Most homeowners plunge incorrectly, using the wrong tool and failing to create an airtight hydraulic seal:",
          "• For sinks and baths, use a flat-bottomed cup plunger. Crucially, seal the overflow aperture with a damp cloth or duct tape. If the overflow is left open, plunging merely pushes air harmlessly out of the overflow vent rather than driving hydraulic pressure down through the trap.",
          "• For toilets, use a flange plunger or accordion plunger with a fold-out rubber cone that inserts securely into the toilet bowl throat. Plunge with rapid, rhythmic push-and-pull strokes to dislodge the vacuum seal.",
        ],
      },
      {
        heading: "3. Why Chemical Caustic Cleaners Damage Pipework",
        body: [
          "Plumbers strongly advise against using aggressive chemical drain unblockers (sodium hydroxide or concentrated sulfuric acid). These generate extreme exothermic heat within standing water, which can soften, deform, and melt modern PVC/ABS push-fit and solvent-weld pipes, melt rubber trap seals, and damage glazed sanitaryware finishes. If the chemical fails to clear the obstruction, the plumber must dismantle the trap while exposed to hazardous caustic acid burns.",
        ],
      },
      {
        heading: "4. Professional Remediation: Mechanical Snakes & Hydro-Jetting",
        body: [
          "When manual plunging fails, professional drainage engineers deploy heavy-duty equipment:",
          "• Rigid Sectional Cable Machines (Snakes): Motorized steel cables rotating at 400 RPM with specialized cutting heads bore through grease blockages and clear roots.",
          "• High-Pressure Water Jetting (Hydro-Jetting): Mobile jetting units delivering 3,000 to 4,000 PSI at 12 gallons per minute scour the interior walls of underground clay and PVC drainage pipes, slicing through invading tree roots and flushing hardened fatbergs clean into the municipal main.",
          "• CCTV Drain Camera Survey: Insertion of high-definition robotic fibre-optic cameras to inspect pipe fractures, ground settlement displacement, or root intrusion without invasive excavation.",
        ],
      },
      {
        heading: "5. Drain Unblocking Cost Guide",
        body: [
          "Realistic professional drainage pricing:",
          "• Local P-trap mechanical clearance or toilet auger: £85 - £140 ($110 - $185).",
          "• External main gully / underground soil pipe high-pressure hydro-jetting: £140 - £260 ($190 - $340) for 1-2 hours.",
          "• Comprehensive CCTV drain survey with video report: £160 - £290 ($210 - $380).",
        ],
      },
    ],
  },
  {
    slug: "consumer-unit-replacement-regulations",
    title: "Upgrading Your Consumer Unit (Fuse Box): 18th Edition Regulations Explained",
    excerpt: "Why older rewirable fuse boards fail modern electrical safety standards. Learn about metal non-combustible enclosures, individual RCBOs, and Type 2 Surge Protection Devices.",
    readTime: "7 min read",
    category: "Electrical",
    date: "25 October 2026",
    author: "Liam O'Connor",
    authorRole: "NICEIC Approved Electrical Contractor (#D60312)",
    tableOfContents: [
      { id: "danger-of-rewirable-fuses", title: "1. The Inherent Risks of Obsolete Rewirable Fuseboxes" },
      { id: "18th-edition-mandates", title: "2. Key Requirements of the 18th Edition Wiring Regulations" },
      { id: "rcbo-vs-dual-rcd", title: "3. Dual RCD vs Individual RCBO Protection" },
      { id: "surge-protection-spds", title: "4. Understanding Type 2 Surge Protection (SPDs)" },
      { id: "installation-and-part-p", title: "5. The Installation Process & Part P Certification" },
    ],
    sections: [
      {
        heading: "1. The Inherent Risks of Obsolete Rewirable Fuseboxes",
        body: [
          "Many older UK homes built before 1990 still feature traditional rewirable fuse boards (BS 3036) or early plastic-cased consumer units with basic miniature circuit breakers (MCBs). These legacy panels carry severe electrical hazards:",
          "• No RCD shock protection: Rewirable fuses only protect against extreme electrical overloads and short circuits. If someone touches a live wire or damages a lawnmower cable, a fuse will take seconds to blow — long after a fatal cardiac shock has been delivered.",
          "• Asbestos flash guards: Many classic rewirable carriers contain woven asbestos flash pads behind the fuse wire.",
          "• Combustible plastic enclosures: Overheated connections can ignite plastic casings, which was the leading cause of residential electrical fires in escape routes prior to 2016.",
        ],
      },
      {
        heading: "2. Key Requirements of the 18th Edition Wiring Regulations",
        body: [
          "Under BS 7671:2018+A2:2022 (The 18th Edition IET Wiring Regulations), modern residential consumer units must satisfy stringent fire and safety criteria:",
          "• Non-combustible metal casing: The consumer unit outer enclosure must be manufactured from steel or non-flammable metal with self-closing, latching lids to contain any internal electrical fire.",
          "• 30mA residual current protection across all final socket circuits and bathroom lighting circuits.",
          "• Arc Fault Detection Devices (AFDDs) recommended for high-risk circuits to detect micro-arcing inside damaged cables and junction boxes.",
        ],
      },
      {
        heading: "3. Dual RCD vs Individual RCBO Protection",
        body: [
          "When upgrading a consumer unit, homeowners generally choose between two configurations:",
          "Dual RCD Boards: Divide circuits into two banks protected by two main RCD switches. While lower in initial equipment cost, a single nuisance earth fault (e.g., moisture in an outdoor garden light) trips the entire bank, cutting power to half the house, including fridge-freezers and home internet.",
          "Full RCBO Boards: The modern professional gold standard. Every single circuit receives its own dedicated Residual Current Circuit Breaker with Overcurrent protection (RCBO). If a fault occurs on one downstairs socket circuit, only that single breaker trips, leaving all other circuits, lighting, and appliances operating unaffected.",
        ],
      },
      {
        heading: "4. Understanding Type 2 Surge Protection (SPDs)",
        body: [
          "With modern households packed with sensitive electronics (smart TVs, heat pump inverters, laptops, induction hobs, EV chargers), transient overvoltage surges from grid switching or lightning strikes can instantly fry delicate circuit boards. 18th Edition Amendment 2 mandates the inclusion of Type 2 Surge Protection Devices (SPDs) in replacement consumer units unless the homeowner formally signs an exemption risk assessment.",
        ],
      },
      {
        heading: "5. The Installation Process & Part P Certification",
        body: [
          "Consumer unit replacement is legally Notifiable Work under Building Regulations Approved Document Part P (England & Wales). The electrician isolates the mains supply, meticulously tests every existing circuit for insulation degradation, installs the new metal board, connects new 10mm² main protective bonding, and completes comprehensive dead/live testing.",
          "Upon completion, the registered electrician issues an Electrical Installation Certificate (EIC) and registers the notification with your local authority building control within 30 days.",
          "Average upgrade cost: £450 - £750 ($600 - $980) fully certified including testing, materials, and Part P sign-off.",
        ],
      },
    ],
  },
  {
    slug: "ac-sizing-and-efficiency-seer2",
    title: "Residential Air Conditioning Sizing & SEER2 Ratings: Homeowner Buyer's Guide",
    excerpt: "How to calculate cooling capacity using Manual J load principles, decoding SEER2 vs SEER efficiency metrics, and selecting between central ducted and mini-split AC units.",
    readTime: "8 min read",
    category: "HVAC",
    date: "20 October 2026",
    author: "Marcus Vance",
    authorRole: "Master HVAC Specialist (TDLR TACLB #48291E)",
    tableOfContents: [
      { id: "dangers-of-oversizing", title: "1. The Pitfalls of Oversizing vs Undersizing AC Units" },
      { id: "manual-j-load-calculation", title: "2. Understanding Manual J Heating & Cooling Load Calculations" },
      { id: "seer-vs-seer2", title: "3. Decoding SEER vs the New SEER2 Energy Standards" },
      { id: "ducted-vs-ductless", title: "4. Central Ducted Systems vs Ductless Multi-Split Inverters" },
      { id: "ac-installation-costs", title: "5. Average Installation Costs & Equipment Tiers" },
    ],
    sections: [
      {
        heading: "1. The Pitfalls of Oversizing vs Undersizing AC Units",
        body: [
          "When installing a new air conditioning or heat pump system, bigger is not better. Oversizing an AC unit is one of the most common and damaging mistakes made by unqualified contractors:",
          "An oversized unit cools a home too quickly (short cycling). Because it reaches the thermostat setpoint in just 7 to 10 minutes, the compressor shuts down before the evaporator coil has had sufficient run time to dehumidify the air. The result is a cold, clammy, humid indoor environment where mold thrives. Frequent start-stops also cause premature compressor motor wear and spike utility bills.",
          "Conversely, an undersized unit runs continuously in 95°F+ heat waves, failing to reach setpoint temperatures while straining electrical components.",
        ],
      },
      {
        heading: "2. Understanding Manual J Heating & Cooling Load Calculations",
        body: [
          "Professional HVAC contractors never size equipment based solely on square footage rules of thumb (e.g., '1 ton per 500 sq ft'). Instead, certified engineers run an ACCA Manual J load calculation that accounts for:",
          "• Solar orientation: Direction of glazing and window solar heat gain coefficients (SHGC).",
          "• Building envelope: Attic insulation R-values, wall cavities, and window pane thermal ratings.",
          "• Air infiltration rates (CFM leakage from blower door diagnostics).",
          "• Internal heat loads from occupants, lighting, computers, and kitchen cooking appliances.",
        ],
      },
      {
        heading: "3. Decoding SEER vs the New SEER2 Energy Standards",
        body: [
          "Effective January 1, 2023, the US Department of Energy enacted SEER2 (Seasonal Energy Efficiency Ratio 2) standards, updating testing procedures (M1) to reflect real-world static duct pressure (0.50 in. WG rather than the outdated 0.10 in. WG).",
          "• In Southern US climates (Texas, Florida, Arizona), the federal minimum for residential split-system AC is 14.3 SEER2 (equivalent to roughly 15.0 SEER).",
          "• Premium variable-speed inverter systems reach 18.0 to 22.0 SEER2, modulating cooling output between 25% and 100% capacity to maintain whisper-quiet operation and steady 45% relative indoor humidity.",
        ],
      },
      {
        heading: "4. Central Ducted Systems vs Ductless Multi-Split Inverters",
        body: [
          "Central Ducted Systems: Ideal for homes with existing ductwork in crawlspaces or attics. One outdoor condensing unit and indoor air handler distribute conditioned air through supply registers throughout the home.",
          "Ductless Mini-Split Systems: Highly popular in the UK and in older US historic properties without ducted plenums. Individual wall-mounted, floor-standing, or ceiling cassette units connect via small 3-inch refrigerant line sets to a single quiet inverter outdoor unit, allowing room-by-room zoned temperature control.",
        ],
      },
      {
        heading: "5. Average Installation Costs & Equipment Tiers",
        body: [
          "Realistic turnkey installation pricing (equipment, labor, permits, electrical disconnect, and warranty):",
          "• Single-room ductless mini-split (12,000 BTU / 1 Ton, 20 SEER2): £1,650 - £2,800 ($2,100 - $3,500).",
          "• Multi-room 3-zone ductless mini-split system: £4,200 - £7,500 ($5,500 - $9,500).",
          "• Central ducted AC & heat pump full system replacement (3-5 Ton, 15-18 SEER2): $4,800 - $11,500 (1-2 days install duration).",
        ],
      },
    ],
  },
  {
    slug: "preventing-frozen-pipes-winter",
    title: "Preventing and Safely Thawing Frozen Pipes: A Plumber's Protocol",
    excerpt: "How sub-zero cold snaps cause domestic pipe bursts, insulating vulnerable unheated lofts and crawlspaces, and the safe step-by-step method to thaw frozen lines without rupturing copper joints.",
    readTime: "6 min read",
    category: "Emergency Plumbing",
    date: "12 October 2026",
    author: "David Thornton",
    authorRole: "Gas Safe Registered Heating Engineer (#592104)",
    tableOfContents: [
      { id: "why-pipes-burst", title: "1. The Physics of Water Expansion and Hydraulic Rupture" },
      { id: "high-risk-pipe-locations", title: "2. Identifying Vulnerable Pipework in Your Home" },
      { id: "preventative-winterisation", title: "3. Proactive Winterisation Measures" },
      { id: "safe-thawing-protocol", title: "4. Step-by-Step Safe Thawing Protocol" },
      { id: "emergency-burst-triage", title: "5. What to Do If a Pipe Bursts" },
    ],
    sections: [
      {
        heading: "1. The Physics of Water Expansion and Hydraulic Rupture",
        body: [
          "When water freezes, it expands by approximately 9% in volume. Contrary to popular belief, a copper or plastic pipe rarely splits at the exact point of the ice blockage. Instead, as the ice plug expands outward, it traps water between the freeze point and the closed household tap, multiplying hydraulic pressure from standard 45 PSI mains up to an astonishing 3,000+ PSI. This immense hydraulic force splits the pipe wall or blows solder and compression fittings apart.",
        ],
      },
      {
        heading: "2. Identifying Vulnerable Pipework in Your Home",
        body: [
          "Pipes most susceptible to freezing during winter cold snaps include:",
          "• Water supply pipes routed through unheated loft spaces, crawlspaces, and uninsulated basements.",
          "• Pipework running inside exterior-facing wall cavities, particularly on north-facing elevations.",
          "• External garden hose bibbs / outdoor bib taps and exposed plastic condensate discharge pipes from condensing boilers.",
        ],
      },
      {
        heading: "3. Proactive Winterisation Measures",
        body: [
          "Protect your home before freezing temperatures arrive:",
          "• Insulate with closed-cell polyethylene foam lagging: Fit lagging with a minimum 19mm wall thickness over all pipes in unheated areas. Miter joints and seal seams with water-resistant insulation tape.",
          "• Disconnect garden hoses and isolate outside taps: Shut off the dedicated internal isolation valve, open the outside tap to drain residual water, and fit an insulated thermal jacket.",
          "• Maintain background heating: During severe freezes, never switch heating off completely when away. Keep thermostats set to a minimum frost-protection level of 13°C - 15°C (55°F).",
          "• Open sink vanity doors on exterior walls during extreme sub-zero nights to allow ambient room warmth to circulate around plumbing traps.",
        ],
      },
      {
        heading: "4. Step-by-Step Safe Thawing Protocol",
        body: [
          "If a tap produces only a trickle or nothing on a sub-zero morning:",
          "Step 1: Locate and test the main water stopcock. Ensure you can shut off the mains instantly if a hairline crack opens as ice melts.",
          "Step 2: Open the cold tap served by the frozen line to allow melting water and steam pressure to vent.",
          "Step 3: Apply gentle heat starting from the tap end working backward toward the frozen section. Use a hairdryer on medium heat, a heated towel wrapped around the pipe, or an electric heating pad. NEVER use open blowtorches, propane torches, or heat guns on indoor pipework; doing so risks steam explosions, boiling water scalds, and structural timber fires.",
        ],
      },
      {
        heading: "5. What to Do If a Pipe Bursts",
        body: [
          "If a pipe ruptures, act instantly:",
          "1. Immediately turn the main stopcock clockwise to shut off the incoming water supply.",
          "2. Open all cold taps to rapidly drain remaining water from the pipework down into sinks and bathtubs.",
          "3. Switch off the central heating and immersion heater.",
          "4. If water is leaking near electrical consumer units or sockets, turn off the electrical main switch if safe to do so.",
          "5. Book an emergency verified plumber on TradeConnect for immediate soldering, press-fit splicing, and pressure testing.",
        ],
      },
    ],
  },
  {
    slug: "hiring-tradespeople-contractor-checklist",
    title: "Homeowner Due Diligence Checklist: How to Verify Licences & Insurance",
    excerpt: "A practical guide to hiring vetted contractors. Verifying Gas Safe, NICEIC, and US state licenses, understanding public liability policies, and structuring payment milestones.",
    readTime: "7 min read",
    category: "Homeowner Advice",
    date: "08 October 2026",
    author: "Charlotte Henderson",
    authorRole: "TradeConnect Consumer Compliance Editor",
    tableOfContents: [
      { id: "accreditation-verification", title: "1. Verifying Official Trade Licences Directly" },
      { id: "insurance-validation", title: "2. Demanding & Validating Public Liability Policies" },
      { id: "written-scopes-estimates", title: "3. Written Scopes of Work vs Vague Quotes" },
      { id: "safe-payment-milestones", title: "4. Structuring Safe Payment Milestones & Deposits" },
      { id: "contract-and-guarantee", title: "5. Completion Handover, Guarantees, & Sign-Off" },
    ],
    sections: [
      {
        heading: "1. Verifying Official Trade Licences Directly",
        body: [
          "Never rely on badges printed on a contractor's business card or van livery alone. Disreputable traders frequently print Gas Safe or NICEIC logos illegally. Always perform three-point independent verification:",
          "• Gas & Heating (UK): Request their 6-digit Gas Safe registration number. Check it on the official Gas Safe Register website (gassaferegister.co.uk). Check the photo ID card upon arrival and check the reverse side to verify they are qualified for domestic natural gas appliances, unvented cylinders, or LPG.",
          "• Electrical (UK): Check the electrical contractor on the Electrical Competent Person Register (electricalcompetentperson.co.uk) verifying NICEIC, NAPIT, or ELECSA certification.",
          "• US Contractors: Check state licensing databases (e.g., Texas Department of Licensing and Regulation - TDLR, California CSLB). Confirm the license status is 'Active' with zero open disciplinary suspensions.",
        ],
      },
      {
        heading: "2. Demanding & Validating Public Liability Policies",
        body: [
          "Public Liability Insurance (General Liability in the US) protects your home if a contractor accidentally causes structural damage, floods your property, or triggers a fire during hot works (welding/torch-on roofing):",
          "Insist on seeing a current Certificate of Insurance. In the UK, ensure a minimum cover of £1,000,000 (TradeConnect verified pros carry £2M to £5M). In the US, look for $1,000,000 to $2,000,000 general aggregate liability. Verify that the policy name exactly matches the limited company or trading entity named on your contract.",
        ],
      },
      {
        heading: "3. Written Scopes of Work vs Vague Quotes",
        body: [
          "Never accept an estimate delivered via verbal agreement or scribbled on a generic scrap of paper. A professional quote must clearly itemize:",
          "• Full breakdown of materials (specifying exact brands and model numbers of boilers, consumer units, or roofing felt).",
          "• Labor duration and hourly/day rates.",
          "• Clear statement on whether building control notification fees, waste disposal/skip hire, and VAT/sales tax are included.",
          "• Defined contingency terms for unseen structural rot, damaged joists, or obsolete wiring discovered during demolition.",
        ],
      },
      {
        heading: "4. Structuring Safe Payment Milestones & Deposits",
        body: [
          "How you pay a contractor is your primary protection against incomplete or substandard work:",
          "• Never pay 100% upfront before work commences.",
          "• Deposits should never exceed 10% to 20% for standard jobs (unless bespoke non-refundable materials like custom hardwood windows or steel beams must be ordered).",
          "• Tie interim payments to verifiable project milestones (e.g., 30% upon first-fix plumbing rough-in, 30% upon second-fix sanitaryware installation, and the final 10% - 20% retention held until the system is fully tested, commissioned, and safety certificates are handed over).",
        ],
      },
      {
        heading: "5. Completion Handover, Guarantees, & Sign-Off",
        body: [
          "Before releasing final retention funds, conduct a systematic snagging walk-through with the contractor. Verify that manufacturer warranty registration cards are completed, Building Regulations compliance certificates (Part P, Gas Safe Building Notice) are queued, and test reports are signed.",
        ],
      },
    ],
  },
  {
    slug: "repointing-and-masonry-preservation",
    title: "Brick Repointing & Chimney Stack Maintenance: Lime vs Cement Mortar",
    excerpt: "Why modern hard Portland cement causes spalling and damp when used on historic masonry. Learn the technical difference between lime and cement, repointing styles, and chimney stack repairs.",
    readTime: "7 min read",
    category: "Roofing & Masonry",
    date: "01 October 2026",
    author: "Simon Fletcher",
    authorRole: "NFRC Certified Roofing Specialist (#9204)",
    tableOfContents: [
      { id: "purpose-of-pointing", title: "1. The True Structural Role of Masonry Mortar Joints" },
      { id: "lime-vs-cement-disaster", title: "2. The Danger of Portland Cement on Pre-1930s Bricks" },
      { id: "identifying-failed-mortar", title: "3. Warning Signs of Deteriorating Pointing & Chimney Stacks" },
      { id: "repointing-technique", title: "4. Professional Raking Out & Repointing Methodology" },
      { id: "repointing-costs-guide", title: "5. Masonry & Chimney Repointing Pricing" },
    ],
    sections: [
      {
        heading: "1. The True Structural Role of Masonry Mortar Joints",
        body: [
          "In traditional solid brick and stone construction, the mortar between bricks is designed as a sacrificial, breathable bedding layer. Its function is not merely to bond bricks together, but to act as a porous moisture buffer that allows rainwater penetrating the masonry to evaporate harmlessly back into the atmosphere.",
        ],
      },
      {
        heading: "2. The Danger of Portland Cement on Pre-1930s Bricks",
        body: [
          "One of the most widespread conservation blunders in home maintenance is repointing older Victorian, Georgian, or historic masonry with dense, impermeable Portland cement:",
          "Traditional soft red bricks and handmade lime mortar work together as a breathable system. When modern cement is pointed over soft historic bricks, moisture can no longer escape through the joints. Trapped behind the dense cement, winter freeze-thaw cycles cause the outer face of the bricks to crack, crumble, and blow off completely (spalling). Once spalled, the brick core deteriorates rapidly, leading to severe penetrative damp.",
          "For pre-1930s solid masonry, always use Hydraulic Lime (NHL 2 or NHL 3.5) or non-hydraulic lime putty mixed with sharp aggregate sand.",
        ],
      },
      {
        heading: "3. Warning Signs of Deteriorating Pointing & Chimney Stacks",
        body: [
          "Examine your property's exterior walls and chimney stacks annually:",
          "• Deep erosion: Mortar recessed by more than 10mm to 15mm behind the brick face.",
          "• Loose, sandy mortar that rubs away easily with light finger pressure.",
          "• Plant growth: Ferns, moss, and buddleia rooted in upper mortar joints or chimney haunching.",
          "• Internal damp patches on chimney breast walls inside upper bedrooms.",
        ],
      },
      {
        heading: "4. Professional Raking Out & Repointing Methodology",
        body: [
          "Proper repointing requires disciplined mechanical and manual steps:",
          "1. Raking out: Mortar is raked back to a uniform depth of at least twice the joint height (typically 15-20mm) using a diamond-tipped oscillating blade or manual plugging chisels. Angle grinders must be handled with utmost care to avoid scoring and chopping the brick edges.",
          "2. Dust removal & pre-wetting: Joints are flushed with water to clear loose dust and prevent dry bricks from sapping moisture from fresh lime mortar.",
          "3. Application & finish: Mortar is firmly ironed into the bed and perp joints using pointing irons. Common traditional finishes include flush joints, weather-struck, or recessed bucket-handle finishes.",
        ],
      },
      {
        heading: "5. Masonry & Chimney Repointing Pricing",
        body: [
          "Repointing benchmarks across the UK and US:",
          "• Repointing brickwork per square meter: £45 - £85 / m² ($60 - $110 / m²), plus scaffolding access costs.",
          "• Full 2-storey Victorian gable wall repointing: £2,800 - £5,200 ($3,600 - $6,800).",
          "• Chimney stack dismantle, rebuild top 6 courses, and full lime repoint: £850 - £1,800 ($1,100 - $2,400).",
        ],
      },
    ],
  },
];
