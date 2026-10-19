import { PortfolioProject } from "@/types/portfolio";

export const projects: PortfolioProject[] = [
  {
    id: "01",
    slug: "color-studies",
    title: "Color Studies",
    category: "Art Direction",
    client: "Fondation Carré",
    year: 2026,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Tension chromatique, ombre brute et géométrie sacrée.",
      en: "Chromatic tension, raw shadow and sacred geometry.",
    },
    caption: {
      fr: "Étude chromatique sur pigments purs en suspension et clair-obscur minéral.",
      en: "Chromatic study on pure suspended pigments and mineral chiaroscuro.",
    },
    description: {
      fr: "Une exploration de la résonance spectrale et des contrastes monolithiques au sein d'espaces architecturaux bruts.",
      en: "An exploration of spectral resonance and monolithic contrasts within raw architectural volumes.",
    },
    details: {
      fr: {
        concept: "Déconstruire le spectre de la couleur primaire pour révéler la tension vibratoire entre matière minérale et projection lumineuse.",
        artDirection: "Palette restreinte aux pigments purs, cadrages orthogonaux rigoureux et clair-obscur radical inspiré des maîtres du minimalisme.",
        execution: "Série photographique grand format complétée par un catalogue relié à la main en lin naturel et une exposition immersive à Paris.",
      },
      en: {
        concept: "Deconstructing the primary color spectrum to reveal vibratory tension between mineral texture and light projection.",
        artDirection: "Palette restricted to pure pigments, rigorous orthogonal compositions and radical chiaroscuro drawn from minimalist masters.",
        execution: "Large-format photographic series accompanied by a hand-bound natural linen catalog and an immersive exhibition in Paris.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FF665C",
    galleryImages: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Étude chromatique abstraite avec coulées de pigments écarlates et ocres sur fond sombre",
      en: "Abstract chromatic study featuring scarlet and ochre pigment flows on dark background",
    },
  },
  {
    id: "02",
    slug: "noise-visual-system",
    title: "Noise",
    category: "Visual Identity",
    client: "Atelier Sonore Paris",
    year: 2025,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Système visuel brutaliste et fréquences typographiques.",
      en: "Brutalist visual system and typographical frequencies.",
    },
    caption: {
      fr: "Architecture géométrique aux ombres franches et lignes minimales épurées.",
      en: "Geometric brutalist architecture with stark linear shadows and pristine forms.",
    },
    description: {
      fr: "Identité graphique modulaire et typographie générative pour un laboratoire acoustique d'avant-garde.",
      en: "Modular graphic identity and generative typography for an avant-garde acoustic laboratory.",
    },
    details: {
      fr: {
        concept: "Traduire visuellement les ondes sonores et les silences électroacoustiques sous forme d'empreintes géométriques haute densité.",
        artDirection: "Monochrome absolu, grille suisse brisée, micro-typographie technique et jeux de trames optiques.",
        execution: "Système d'identité dynamique réagissant au spectre audio en temps réel, signalétique architecturale et pochettes vinyles sérigraphiées.",
      },
      en: {
        concept: "Visually translating soundwaves and electroacoustic silences into high-density geometric prints.",
        artDirection: "Absolute monochrome, disrupted Swiss grid, technical micro-typography and kinetic optical raster effects.",
        execution: "Dynamic identity responding to live audio feeds in real time, architectural signage and silkscreened vinyl editions.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#6298FF",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Architecture géométrique aux ombres franches et lignes minimales",
      en: "Geometric brutalist architecture with stark shadows and clean lines",
    },
  },
  {
    id: "03",
    slug: "beyond-the-frame",
    title: "Beyond the Frame",
    category: "Exhibition",
    client: "Musée d'Art Contemporain",
    year: 2025,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Scénographie muséale et déconstruction spatiale.",
      en: "Museum scenography and spatial deconstruction.",
    },
    caption: {
      fr: "Scénographie muséale épurée avec volumes géométriques en suspension.",
      en: "Pristine museum scenography featuring suspended architectural volumes.",
    },
    description: {
      fr: "Conception scénographique et identité curatoriale pour une rétrospective questionnant les limites du tableau.",
      en: "Scenographic design and curatorial identity for a retrospective challenging the boundaries of the canvas.",
    },
    details: {
      fr: {
        concept: "Supprimer la frontière physique entre spectateur et œuvre d'art au moyen de volumes en lévitation.",
        artDirection: "Volumes suspendus, matières brutes en acier brossé et éclairage directionnel précis créant des halos sculpturaux.",
        execution: "Parcours d'exposition sur 1 400 m², cartels gravés dans l'aluminium et monographie d'exposition.",
      },
      en: {
        concept: "Eliminating the physical frontier between viewer and artwork through levitating spatial structures.",
        artDirection: "Suspended volumes, raw brushed steel textures and surgical directional illumination crafting sculpted halos.",
        execution: "1,400 sqm exhibition layout, aluminum etched captions, and hardbound bilingual exhibition catalog.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#F7D85B",
    galleryImages: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Galerie d'art contemporain épurée avec installation sculpturale",
      en: "Pristine contemporary art gallery with minimal sculptural installation",
    },
  },
  {
    id: "04",
    slug: "nocturne-architecture",
    title: "Nocturne Architecture",
    category: "Culture",
    client: "Revue Nocturne",
    year: 2026,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Chronique architecturale de la métropole nocturne.",
      en: "Architectural chronicle of the nocturnal metropolis.",
    },
    caption: {
      fr: "Monolithes urbains solitaires illuminés dans la brume nocturne.",
      en: "Solitary urban monoliths illuminated across nocturnal mist.",
    },
    description: {
      fr: "Une odyssée visuelle explorant les géométries silencieuses des grandes structures modernistes après minuit.",
      en: "A visual journey exploring silent geometries of modernist structures past midnight.",
    },
    details: {
      fr: {
        concept: "Capturer la poésie crépusculaire et la ferveur silencieuse des volumes architecturaux lorsque la ville s'endort.",
        artDirection: "Grains argentiques denses, contrastes profonds, fenêtres lumineuses dorées et atmosphères brumeuses.",
        execution: "Publication trimestrielle sur papier non couché 180g, tirages d'art numérotés et film 16mm.",
      },
      en: {
        concept: "Capturing twilight poetry and structural silence in monumental architecture as the city sleeps.",
        artDirection: "Dense analog film grain, deep shadows, amber window glows and enigmatic urban silhouettes.",
        execution: "Quarterly publication on 180g uncoated stock, numbered limited art prints, and a 16mm companion film.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#78E6BF",
    galleryImages: [
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Structures architecturales nocturnes illuminées dans la brume",
      en: "Nocturnal architectural structures illuminated in the mist",
    },
  },
  {
    id: "05",
    slug: "monolith-echoes",
    title: "Monolith Echoes",
    category: "Photography",
    client: "Revue Diptyque",
    year: 2025,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Monolithes de marbre et jeux d'ombres acérées.",
      en: "Marble monoliths and razor-sharp shadow play.",
    },
    caption: {
      fr: "Blocs sculptés de marbre brut aux reflets minéraux profonds.",
      en: "Chiseled blocks of raw marble with deep mineral reflections.",
    },
    description: {
      fr: "Série photographique grand format immortalisant la rencontre entre la roche sédimentaire et la découpe géométrique.",
      en: "Large-format photographic series capturing sedimentary stone meeting rigorous geometric carving.",
    },
    details: {
      fr: {
        concept: "Interroger la mémoire minérale de la pierre face à la précision géométrique contemporaine.",
        artDirection: "Noir et blanc contrasté, texture de marbre ultra-détaillée et cadrages orthogonaux.",
        execution: "Exposition itinérante en galeries européennes, livre grand format relié en toile noire.",
      },
      en: {
        concept: "Interrogating stone's mineral memory juxtaposed with contemporary geometric precision.",
        artDirection: "High-contrast monochrome, ultra-tactile marble grain, and unyielding orthogonal framing.",
        execution: "Traveling exhibition in European galleries, collector's volume clothbound in black canvas.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#BA9CFF",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Sculpture monolithique en marbre aux lignes géométriques nettes",
      en: "Monolithic marble sculpture with sharp geometric lines",
    },
  },
  {
    id: "06",
    slug: "new-dimensions",
    title: "New Dimensions",
    category: "Art Direction",
    client: "Maison Vesper",
    year: 2026,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Objets, espaces et échelles surréalistes.",
      en: "Objects, spaces and surrealist proportions.",
    },
    caption: {
      fr: "Formes curvilignes 3D aux reflets d'albâtre et chrome liquide.",
      en: "Curvilinear 3D fluid forms with alabaster and liquid chrome refractions.",
    },
    description: {
      fr: "Création d'un univers plastique où l'art de l'objet dialogue avec des architectures curvilignes en suspension.",
      en: "Creation of a plastic visual universe where object design converses with curvilinear suspended architecture.",
    },
    details: {
      fr: {
        concept: "Réinventer les codes de la haute création en mêlant artisanat verrier et modélisation organique fluide.",
        artDirection: "Formes ondulantes, reflets d'albâtre, teintes champagnes discrètes et géométrie pure.",
        execution: "Campagne internationale d'affichage éditorial, motion design 3D et pop-up spatial à Milan.",
      },
      en: {
        concept: "Reinventing luxury craft codes by pairing glass artisans with fluid organic digital geometries.",
        artDirection: "Undulating shapes, alabaster refractions, discrete champagne hues and unyielding formal clarity.",
        execution: "International billboard art campaign, 3D kinetic visuals, and an ephemeral architectural pop-up in Milan.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FF665C",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Sculpture 3D fluide aux reflets d'albâtre et courbes harmonieuses",
      en: "Fluid 3D sculptural installation with delicate reflections and harmonious curves",
    },
  },
  {
    id: "07",
    slug: "form-follows-feeling",
    title: "Form Follows Feeling",
    category: "Experimental Design",
    client: "Institut Suédois",
    year: 2025,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Sculptures typographiques en marbre et acier brut.",
      en: "Typographic sculptures in marble and raw steel.",
    },
    caption: {
      fr: "Monolithes de pierre polie et acier sablé d'une précision millimétrique.",
      en: "Polished stone monoliths and sandblasted structural steel in precision balance.",
    },
    description: {
      fr: "Une recherche matérielle sur la traduction émotionnelle des caractères de plomb en monolithes de pierre polie.",
      en: "Material research into emotional translations of metal type into polished stone monoliths.",
    },
    details: {
      fr: {
        concept: "Inverser la célèbre maxime moderniste pour affirmer que la forme découle de l'émotion sensorielle.",
        artDirection: "Textures tactiles contrastées entre roche taillée à la main et acier sablé d'une précision millimétrique.",
        execution: "Installation publique permanente de huit lettres sculpturales de 2 mètres de hauteur.",
      },
      en: {
        concept: "Inverting the modernist adage to demonstrate that form originates from visceral emotional resonance.",
        artDirection: "Tactile contrasts between hand-chiseled stone and micro-sandblasted structural steel.",
        execution: "Permanent public installation of eight monumental typographic sculptures standing two meters high.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#F7D85B",
    galleryImages: [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Sculpture abstraite minérale aux angles géométriques et ombres portées",
      en: "Mineral abstract sculpture with bold geometric facets and clean shadows",
    },
  },
  {
    id: "08",
    slug: "the-art-of-presence",
    title: "The Art of Presence",
    category: "Installation",
    client: "Biennale de Lyon",
    year: 2025,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Monolithes lumineux réactifs au silence spatial.",
      en: "Responsive light monoliths tuned to spatial silence.",
    },
    caption: {
      fr: "Faisceaux lasers et piliers de lumière découpant l'obscurité totale.",
      en: "Laser beams and luminous columns carving through total darkness.",
    },
    description: {
      fr: "Dispositif immersif composé de piliers d'ombre et de lumière réagissant aux mouvements imperceptibles des visiteurs.",
      en: "Immersive installation composed of shadow columns and reactive light pulsing to spatial dynamics.",
    },
    details: {
      fr: {
        concept: "Explorer le vide comme matière première et la présence humaine comme déclencheur plastique.",
        artDirection: "Espace intégralement plongé dans l'obscurité, fentes lumineuses monochromatiques et silence habité.",
        execution: "Dispositif interactif sans contact, capteurs LiDAR haute précision et programmation générative sur-mesure.",
      },
      en: {
        concept: "Exploring void as raw material and acoustic presence as catalyst for optical manifestation.",
        artDirection: "Totally darkened venue, razor-thin monochromatic light slits and concentrated acoustic silence.",
        execution: "Contactless interactive installation driven by precision LiDAR sensors and custom generative code.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#6298FF",
    galleryImages: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Installation de lumière monumentale dans un vaste espace immersif sombre",
      en: "Monumental light art installation in vast dark industrial interior",
    },
  },
  {
    id: "09",
    slug: "material-and-void",
    title: "Material & Void",
    category: "Editorial",
    client: "Éditions Sauvages",
    year: 2026,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Monographie reliant géologie cristalline et architecture brute.",
      en: "Monograph linking crystalline geology to raw modernism.",
    },
    caption: {
      fr: "Tension monolithique entre facettes de béton brut et ciel contrasté.",
      en: "Monolithic tension between raw concrete facets and stark sky.",
    },
    description: {
      fr: "Ouvrage d'art bilingue de 400 pages mettant en miroir les structures géologiques de la terre et le béton moderniste.",
      en: "400-page bilingual art book juxtaposing earth's geological structures with modernist raw concrete forms.",
    },
    details: {
      fr: {
        concept: "Révéler les correspondances formelles inattendues entre cristaux minéraux et gigantisme brutaliste.",
        artDirection: "Mise en page éditoriale rigoureuse, duo-tone noir et argent métallisé, micro-interlignage ultra-serré.",
        execution: "Reliure suisse à dos ouvert, sérigraphie sur carton brut Fedrigoni et tirage limité à 1 000 exemplaires numérotés.",
      },
      en: {
        concept: "Unveiling unexpected formal echoes between crystalline geology and brutalist architectural majesty.",
        artDirection: "Strict editorial grid system, duo-tone black and metallic silver printing, tightly tracked typography.",
        execution: "Open-spine Swiss binding, screenprinting on raw Fedrigoni board, limited to 1,000 hand-numbered copies.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#78E6BF",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Étude photographique éditoriale associant béton brut et géométrie",
      en: "Editorial study pairing raw concrete architecture with clean geometry",
    },
  },
  {
    id: "10",
    slug: "motion-without-borders",
    title: "Motion Without Borders",
    category: "Film",
    client: "Cinéma Sauvage",
    year: 2025,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Direction cinématique et générique expérimental.",
      en: "Kinetic art direction and experimental title sequencing.",
    },
    caption: {
      fr: "Atmosphère cinématique avec optique anamorphique et fumée en clair-obscur.",
      en: "Cinematic atmosphere with anamorphic optics and chiaroscuro smoke.",
    },
    description: {
      fr: "Direction visuelle cinétique et séquence de titres pour un documentaire d'art explorant l'effacement des frontières géographiques.",
      en: "Kinetic visual direction and title sequence for an independent documentary exploring the dissolution of borders.",
    },
    details: {
      fr: {
        concept: "Faire de la typographie un vecteur physique d'impulsion et de traversée à travers le temps et l'espace.",
        artDirection: "Typographie en mouvement continu, fondus au noir contemplatifs et texture optique 35mm anamorphique.",
        execution: "Générique complet de 3 minutes, identité de festival et campagne de promotion cinématique internationale.",
      },
      en: {
        concept: "Transforming typography into a physical vector of momentum traversing time and territorial barriers.",
        artDirection: "Continuous kinetic lettering, contemplative fades to black, and 35mm anamorphic optical texture.",
        execution: "Full 3-minute title sequence, film festival identity kit, and international cinematic trailer campaign.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FF665C",
    galleryImages: [
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Photogramme cinématique avec optique anamorphique et ombres cinématographiques",
      en: "Cinematic film still with anamorphic glass flares and dramatic shadow play",
    },
  },
  {
    id: "11",
    slug: "invisible-architecture",
    title: "Invisible Architecture",
    category: "Photography",
    client: "Pavillon de l'Arsenal",
    year: 2026,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Espace négatif et abstraction géométrique européenne.",
      en: "Negative space and European geometric abstraction.",
    },
    caption: {
      fr: "Ciel noir d'encre et lignes de fuite architecturales en noir et blanc.",
      en: "Inky black sky and architectural vanishing lines in high-contrast monochrome.",
    },
    description: {
      fr: "Une recherche d'angles impossibles et de vides sculptés à travers les ensembles architecturaux majeurs du continent.",
      en: "A photographic investigation into negative space and chiseled voids across Europe's major architectural landmarks.",
    },
    details: {
      fr: {
        concept: "Isoler le vide laissé par la matière pour en faire le sujet central de la composition photographique.",
        artDirection: "Contre-plongées vertigineuses, pureté monochrome, ciel noir d'encre et lignes de fuite acérées.",
        execution: "Tirages platine-palladium grand format, exposition rétrospective et coffret de collection.",
      },
      en: {
        concept: "Isolating the void carved by mass to elevate negative space as the sole protagonist of each frame.",
        artDirection: "Dizzying low-angle perspectives, pure monochrome, deep ink-black skies and razor-sharp vanishing lines.",
        execution: "Large-format platinum-palladium photographic prints, retrospective gallery display, and collector's boxset.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#BA9CFF",
    galleryImages: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Lignes architecturales épurées et géométrie en noir et blanc",
      en: "Stark modernist architectural facade geometry in high-contrast black and white",
    },
  },
  {
    id: "12",
    slug: "kinetic-resonance",
    title: "Kinetic Resonance",
    category: "Campaign",
    client: "Laboratoire Optique",
    year: 2025,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Ondes lumineuses cinétiques et trajectoires géométriques.",
      en: "Kinetic light waves and geometric trajectories.",
    },
    caption: {
      fr: "Prismes optiques et faisceaux laser refractés en haute vélocité.",
      en: "Optical prisms and refracted high-velocity laser trajectories.",
    },
    description: {
      fr: "Campagne cinétique célébrant l'énergie des flux photoniques à travers des dispositifs de réfraction prismatique.",
      en: "Kinetic campaign celebrating photonic energy flux across custom prismatic refraction devices.",
    },
    details: {
      fr: {
        concept: "Traduire la vitesse et la réfraction de la lumière par des traînées visuelles optiques et des surimpressions.",
        artDirection: "Flous cinétiques maîtrisés, typographie monumentale en équilibre précaire et textures sombres.",
        execution: "Campagne d'affichage métropolitain 4x3, bannières interactives et programme relié à la japonaise.",
      },
      en: {
        concept: "Translating optical velocity and light refraction into rhythmic geometric overlays.",
        artDirection: "Controlled kinetic blur, monumental typography suspended on the brink, and tactile dark gradients.",
        execution: "Metro billboard campaign, responsive interactive banners, and Japanese stab-bound programs.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#6298FF",
    galleryImages: [
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Ondes lumineuses cinétiques géométriques sur fond noir",
      en: "Kinetic geometric light waves against dark background",
    },
  },
  {
    id: "13",
    slug: "monochrome-pavilion",
    title: "Monochrome Pavilion",
    category: "Architecture",
    client: "Fondation Mies",
    year: 2026,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Structure moderniste en porte-à-faux et bassins miroirs.",
      en: "Cantilevered modernist structure and mirror reflection pools.",
    },
    caption: {
      fr: "Intérieur brutaliste épuré avec puits de lumière zénithale.",
      en: "Minimalist brutalist pavilion interior bathed in zenithal daylight.",
    },
    description: {
      fr: "Conception architecturale et identité spatiale d'un pavillon temporaire en béton teinté dans la masse et verre acoustique.",
      en: "Architectural design and spatial identity for a temporary pavilion in mass-tinted concrete and acoustic glass.",
    },
    details: {
      fr: {
        concept: "Explorer le rapport entre la masse tectonique du béton et la légèreté immatérielle de l'eau.",
        artDirection: "Lignes horizontales dominantes, surfaces mates et reflets spéculaires calmes.",
        execution: "Pavillon physique de 600 m², livre monographique et visites guidées privées.",
      },
      en: {
        concept: "Exploring the dialogue between the tectonic mass of concrete and the weightless serenity of water.",
        artDirection: "Dominant horizontal lines, matte tactile surfaces and tranquil specular reflections.",
        execution: "600 sqm physical pavilion, monographic publication and curated private architectural tours.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#F7D85B",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Intérieur de pavillon architectural aux lignes brutes",
      en: "Modernist pavilion interior with clean brutalist lines",
    },
  },
  {
    id: "14",
    slug: "silent-geometry",
    title: "Silent Geometry",
    category: "Sculpture",
    client: "Galerie Perrotin",
    year: 2025,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Polyèdres en laiton et volumes monolithiques sombres.",
      en: "Brass polyhedra and dark monolithic volumes.",
    },
    caption: {
      fr: "Sculpture polyédrique en apesanteur dans un vide architectural.",
      en: "Weightless polyhedral sculpture suspended in architectural void.",
    },
    description: {
      fr: "Ensemble de sculptures géométriques explorant les réfractions de la lumière sur des surfaces en laiton brossé et pierre de lave.",
      en: "Collection of geometric sculptures investigating light refractions across brushed brass and volcanic basalt.",
    },
    details: {
      fr: {
        concept: "Dépouiller la forme géométrique de tout ornement pour n'en conserver que la tension mathématique pure.",
        artDirection: "Volumes angulaires rigoureux, équilibre asymétrique et reflets chauds sur fond noir.",
        execution: "Douze pièces uniques taillées à la main, catalogue d'exposition numéroté et film d'art.",
      },
      en: {
        concept: "Stripping geometric forms of all ornamentation to retain solely their pure mathematical tension.",
        artDirection: "Rigorous angular volumes, asymmetrical balance and warm specular glows on black backdrop.",
        execution: "Twelve unique hand-carved pieces, numbered exhibition catalog, and an artistic short film.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#78E6BF",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Sculpture géométrique moderne aux lignes abstraites",
      en: "Modern geometric sculpture with abstract lines",
    },
  },
  {
    id: "15",
    slug: "acoustic-horizons",
    title: "Acoustic Horizons",
    category: "Industrial Design",
    client: "Nagel Audio",
    year: 2026,
    featured: false,
    layout: "standard",
    tagline: {
      fr: "Console analogique et mécanique acoustique de précision.",
      en: "Analog console and high-precision acoustic mechanics.",
    },
    caption: {
      fr: "Interface audio analogique en aluminium usiné et potentiomètres millimétrés.",
      en: "Analog audio interface in milled aluminum with precision potentiometers.",
    },
    description: {
      fr: "Design produit et interface mécanique d'une console audio de référence pour ingénieurs du son d'élite.",
      en: "Product design and mechanical interface for a reference-grade analog audio console.",
    },
    details: {
      fr: {
        concept: "Allier la chaleur de l'analogique et la rigueur tactile du design industriel fonctionnaliste.",
        artDirection: "Aluminium massif brossé, typographie gravée au laser et potentiomètres lestés.",
        execution: "Prototype fonctionnel primé aux Red Dot Awards, série limitée à 50 unités mondiales.",
      },
      en: {
        concept: "Fusing analog warmth with the tactile precision of functionalist industrial design.",
        artDirection: "Solid brushed aluminum, laser-engraved typography and custom weighted dials.",
        execution: "Red Dot Award-winning operational prototype, worldwide limited run of 50 units.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#BA9CFF",
    galleryImages: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Appareil audio de précision aux composants mécaniques épurés",
      en: "Precision audio equipment with sleek mechanical components",
    },
  },
  {
    id: "16",
    slug: "dark-matter",
    title: "Dark Matter",
    category: "Installation",
    client: "Observatoire Spatial",
    year: 2026,
    featured: true,
    layout: "wide",
    tagline: {
      fr: "Dynamique des fluides magnétiques et vide spatial.",
      en: "Magnetic fluid dynamics and spatial void.",
    },
    caption: {
      fr: "Réfraction de la lumière à travers un champ magnétique dans le vide.",
      en: "Refraction of light through a magnetic field in cosmic void.",
    },
    description: {
      fr: "Installation monumentale explorant la visualisation des forces gravitationnelles invisibles par ferrofluides et lasers.",
      en: "Monumental installation visualizing invisible gravitational forces through ferrofluids and lasers.",
    },
    details: {
      fr: {
        concept: "Rendre sensible à l'œil humain la matière noire qui structure l'univers visible.",
        artDirection: "Noir profond absolu, textures métalliques liquides et faisceaux monochromatiques précis.",
        execution: "Bassin de ferrofluide de 10 mètres de diamètre activé par électro-aimants modulaires en temps réel.",
      },
      en: {
        concept: "Making perceptible to the human eye the elusive dark matter structuring our cosmos.",
        artDirection: "Deepest obsidian black, liquid metallic textures and surgical monochromatic beams.",
        execution: "10-meter diameter ferrofluid pool controlled by modular electro-magnets in real time.",
      },
    },
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FF665C",
    galleryImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
    ],
    alt: {
      fr: "Installation artistique de matière noire et réfraction lumineuse",
      en: "Artistic dark matter and light refraction installation",
    },
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getRelatedProjects(currentSlug: string, count: number = 2): PortfolioProject[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, count);
}
