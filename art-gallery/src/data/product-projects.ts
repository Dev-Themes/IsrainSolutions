import { ProductProject } from "@/types/products";

export const productProjects: ProductProject[] = [
  {
    id: "prod-01",
    slug: "noir-edition",
    brand: "NOIR ÉDITION",
    title: "The Shape of Scent",
    category: "Luxury Fragrance",
    year: 2026,
    accentColor: "#E8D49B",
    featured: true,
    layout: "wide",
    coverImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Flacon en verre noir fumé avec reflets ambrés et ombres sculpturales",
          en: "Smoked black glass fragrance bottle with amber reflections and sculptural shadows",
        },
        caption: {
          fr: "Flacon monolithique en verre poli noir et dorure à chaud discrète.",
          en: "Monolithic smoked glass vessel with restrained hot-foil typography.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Brume olfactive en suspension et silhouette sombre du capot métallique",
          en: "Suspended fragrance mist and dark silhouette of the metallic cap",
        },
        caption: {
          fr: "Capture cinétique de la dispersion olfactive en studio clair-obscur.",
          en: "Kinetic capture of olfactory dispersion in chiaroscuro studio lighting.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de la fiole ambrée et de la typographie éditoriale",
          en: "Detail of the amber flacon and editorial typography",
        },
        caption: {
          fr: "Équilibre tactile entre verre borosilicate et collerette en laiton vieilli.",
          en: "Tactile balance between borosilicate glass and aged brass collar.",
        },
      },
    ],
    alt: {
      fr: "Campagne visuelle NOIR ÉDITION — Flacon de parfum sculptural en verre noir fumé",
      en: "NOIR ÉDITION visual campaign — Sculptural black glass perfume bottle",
    },
    tagline: {
      fr: "La silhouette du parfum — Ombre, verre lourd et lumière ambrée.",
      en: "The Shape of Scent — Shadow, heavy glass, and amber light.",
    },
    summary: {
      fr: "Une identité de haute parfumerie bâtie autour du clair-obscur minéral et de la géométrie pure.",
      en: "A luxury fragrance identity built around mineral chiaroscuro and pure geometry.",
    },
    concept: {
      fr: {
        headline: "L'art de matérialiser l'invisible par le vide et la pénombre",
        paragraphs: [
          "NOIR ÉDITION explore la tension physique entre la fugacité d'une fragrance et le poids pérenne d'un objet sculptural. Conçu comme une œuvre monolithique, chaque flacon incarne un bloc de matière brute taillé par la lumière.",
          "Ce projet spéculatif imagine une marque où la forme prime sur le décoratif. Le flacon devient une ancre visuelle dans l'espace domestique, offrant un silence formel qui contraste avec l'effervescence de la parfumerie conventionnelle.",
          "Les compositions photographiques privilégient des contrastes profonds et des textures miroitantes, instaurant un dialogue direct entre verre noir soufflé, reflets d'or vieilli et réfraction liquide.",
        ],
      },
      en: {
        headline: "Materializing the invisible through void and penumbra",
        paragraphs: [
          "NOIR ÉDITION explores the physical tension between the fleeting nature of scent and the enduring weight of a sculptural object. Conceived as a monolithic statement, each flacon embodies a raw block sculpted by light.",
          "This speculative project envisions a house where pure form precedes ornamentation. The vessel becomes a visual anchor within domestic space, offering formal stillness that stands in deliberate contrast to conventional beauty marketing.",
          "The photographic direction prioritizes deep contrasts and reflective mineral surfaces, creating a direct dialogue between blown black glass, aged gold highlights, and liquid refraction.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Clair-obscur holistique, angles orthogonaux et réfraction sombre. La lumière n'éclaire pas l'objet : elle le révèle depuis l'obscurité.",
        palette: [
          { name: "Obsidian Black", hex: "#050505", role: "Fond d'exposition" },
          { name: "Warm Amber", hex: "#E8D49B", role: "Accent signature" },
          { name: "Smoked Quartz", hex: "#292929", role: "Volumes secondaires" },
        ],
        typography: "Serif néo-brutaliste aux déliés incisifs, combinée à une typographie technique monospace sans empattement.",
        materials: "Verre noir opaque teinté dans la masse, laiton sablé brossé à la main, emballage en pulpe compressée.",
        photography: "Éclairage rasoir à source unique, pose longue en chambre noire et focales macro 90mm.",
      },
      en: {
        narrative: "Holistic chiaroscuro, orthogonal angles, and dark refraction. Light does not illuminate the object: it unveils it from within darkness.",
        palette: [
          { name: "Obsidian Black", hex: "#050505", role: "Exhibition backdrop" },
          { name: "Warm Amber", hex: "#E8D49B", role: "Signature accent" },
          { name: "Smoked Quartz", hex: "#292929", role: "Secondary volumes" },
        ],
        typography: "Neo-brutalist serif with razor terminals paired with a technical monospaced sans.",
        materials: "Solid-tinted opaque black glass, hand-brushed sandblasted brass, molded raw paper pulp packaging.",
        photography: "Single-source razor illumination, long exposures in dark studio settings, and 90mm macro optics.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Verre borosilicate 3.3 noir", "Laiton massif usiné CNC", "Capsule scellée sans colle", "Carton noir teinté sans chlore"],
        specifications: ["Contenance : 100 ml / 3.4 FL. OZ.", "Poids brut : 480 g de verre lourd", "Édition numérotée sous le socle"],
        innovationNote: "Système de recharge magnétique hermétique éliminant tout plastique visible.",
      },
      en: {
        materialsList: ["Borosilicate 3.3 black glass", "CNC milled solid brass", "Glue-free friction seal capsule", "Chlorine-free dyed black paperboard"],
        specifications: ["Capacity: 100 ml / 3.4 FL. OZ.", "Gross weight: 480 g heavy glass base", "Numbered edition on underside plinth"],
        innovationNote: "Hermetic magnetic refill mechanism eliminating all visible plastic components.",
      },
    },
  },
  {
    id: "prod-02",
    slug: "aura-skin",
    brand: "AURA SKIN",
    title: "Tactile Simplicity",
    category: "Skincare",
    year: 2026,
    accentColor: "#78E6BF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1608248597359-250529d20120?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-250529d20120?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1608248597359-250529d20120?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Flacon compte-gouttes AURA SKIN en verre dépoli sur socle minéral",
          en: "AURA SKIN frosted glass dropper bottle on mineral plinth",
        },
        caption: {
          fr: "Finition dépolie soyeuse et pipette minimaliste en aluminium brossé.",
          en: "Silky frosted finish and minimalist brushed aluminum pipette.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Pots de crème cosmétique aux textures pastel et douces",
          en: "Skincare cream jars with soft pastel textures and gentle reflections",
        },
        caption: {
          fr: "Contenants empilables en céramique émaillée mate.",
          en: "Stackable containers crafted in matte glazed ceramic.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Gamme de soins visage aux reflets menthe et albâtre",
          en: "Skincare product range with mint and alabaster tones",
        },
        caption: {
          fr: "Harmonie chromatique douce et dépouillement graphique intégral.",
          en: "Soft chromatic harmony and integral graphic restraint.",
        },
      },
    ],
    alt: {
      fr: "AURA SKIN — Identité cosmétique tactile aux tons pastel et verre dépoli",
      en: "AURA SKIN — Tactile skincare identity in pastel tones and frosted glass",
    },
    tagline: {
      fr: "Pureté tactile — L'épure sensorielle du soin quotidien.",
      en: "Tactile Purity — Sensory reduction for daily ritual.",
    },
    summary: {
      fr: "Une gamme de soins spéculative alliant céramique brute, verre satiné et typographie médicale suisse.",
      en: "A speculative skincare ritual pairing raw ceramics, satin glass, and Swiss pharmaceutical typography.",
    },
    concept: {
      fr: {
        headline: "Réinventer le rituel cosmétique par le toucher et le calme visuel",
        paragraphs: [
          "AURA SKIN est née de la volonté de dépouiller l'univers de la beauté de ses promesses artificielles. En refusant les codes cliniques agressifs ou le packaging jetable, ce concept célèbre la sérénité des matières douces au toucher.",
          "Chaque récipient est conçu comme un galet érodé par le temps : équilibré, doux sous la paume et agréable à manipuler dans la pénombre de l'aube.",
          "L'art direction met en scène des textures crayeuses, des lumières enveloppantes d'aquarium et un vert menthe minéral qui apaise le regard.",
        ],
      },
      en: {
        headline: "Reimagining the skincare ritual through touch and visual stillness",
        paragraphs: [
          "AURA SKIN was born from a desire to strip cosmetic presentation of artificial visual noise. Rejecting aggressive clinical claims and disposable plastics, this concept celebrates the serenity of tactile materials.",
          "Each vessel is crafted like a river-smoothed stone: weighted, soft to palm, and intuitively handled even in dim morning light.",
          "The art direction stages chalky textures, diffused luminous wraps, and a mineral mint green that calms visual attention.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lumière douce diffuse, ombres pastel légères et composition d'apothicaire poétique.",
        palette: [
          { name: "Mineral Mint", hex: "#78E6BF", role: "Accent fraîcheur" },
          { name: "Alabaster White", hex: "#F3F3F1", role: "Surfaces principales" },
          { name: "Dull Basalt", hex: "#1A1A1A", role: "Contraste de lecture" },
        ],
        typography: "Grotesk suisse rigoureuse de type DIN 1451 allégée et ponctuée de micro-titres d'inventaire.",
        materials: "Verre borosilicate dépoli à l'acide, céramique kaolin non émaillée, aluminium anodisé mat.",
        photography: "Grand diffuseur octogonal 150cm et réflecteur blanc doux pour un modelé sans ombre dure.",
      },
      en: {
        narrative: "Diffused soft light, delicate pastel falloffs, and poetic apothecary composition.",
        palette: [
          { name: "Mineral Mint", hex: "#78E6BF", role: "Freshness accent" },
          { name: "Alabaster White", hex: "#F3F3F1", role: "Primary surfaces" },
          { name: "Dull Basalt", hex: "#1A1A1A", role: "Reading contrast" },
        ],
        typography: "Rigorous Swiss Grotesk based on lightweight DIN 1451 with indexed inventory captions.",
        materials: "Acid-etched frosted borosilicate, unglazed kaolin ceramic, matte anodized aluminum.",
        photography: "150cm octagonal softbox and bounce fill delivering seamless shadowless gradients.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Verre recyclé dépoli", "Céramique cuite à basse température", "Joint étanche en liège naturel", "Encres végétales sans solvant"],
        specifications: ["Formats : 30 ml, 50 ml, 120 ml", "Texture : Finition toucher peau de pêche", "Fermeture hermétique quart de tour"],
        innovationNote: "Pots rechargeables avec coupelle interne compostable en biopolymère d'algues.",
      },
      en: {
        materialsList: ["Recycled frosted glass", "Low-temperature bisqued ceramic", "Natural cork compression gasket", "Solvent-free vegetable ink printing"],
        specifications: ["Sizes: 30 ml, 50 ml, 120 ml", "Texture: Peach-skin velvety matte finish", "Quarter-turn hermetic twist lock"],
        innovationNote: "Refillable exterior vessels with compostable algae-derived inner pods.",
      },
    },
  },
  {
    id: "prod-03",
    slug: "soniq-lab",
    brand: "SONIQ LAB",
    title: "Acoustic Architecture",
    category: "Audio Technology",
    year: 2026,
    accentColor: "#6298FF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Casque audio SONIQ LAB en aluminium brossé sur fond studio sombre",
          en: "SONIQ LAB precision brushed aluminum over-ear headphones on dark studio background",
        },
        caption: {
          fr: "Structure unibody usinée dans un bloc d'aluminium aérospatial 6061.",
          en: "Unibody headband architecture machined from solid 6061 aerospace aluminum.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de l'arceau et des coussinets en mousse à mémoire acoustique",
          en: "Detail of headband hinge and acoustic memory foam cushions",
        },
        caption: {
          fr: "Charnière à friction fluide sans vis apparente et cuir végan respirant.",
          en: "Fluid friction hinge with concealed fastenings and breathable vegan skin.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Écouteurs sans fil SONIQ LAB dans leur boîtier en titane anodisé",
          en: "SONIQ LAB wireless acoustic earbuds in bead-blasted titanium case",
        },
        caption: {
          fr: "Boîtier à double chambre résonante et charge par induction.",
          en: "Dual-resonance acoustic chamber case with magnetic induction alignment.",
        },
      },
    ],
    alt: {
      fr: "SONIQ LAB — Casque circum-aural haute fidélité en aluminium et titane",
      en: "SONIQ LAB — High-fidelity over-ear headphones in aluminum and titanium",
    },
    tagline: {
      fr: "L'architecture du son — Électronique d'avant-garde et géométrie industrielle.",
      en: "Acoustic Architecture — Avant-garde electronics and industrial geometry.",
    },
    summary: {
      fr: "Une vision futuriste de l'écoute audiophile conciliant pureté mécanique, usinage CNC et bleu électrique.",
      en: "A futuristic audiophile vision uniting CNC mechanical purity, acoustic science, and electric blue.",
    },
    concept: {
      fr: {
        headline: "Quand l'instrument d'écoute devient un objet architectural",
        paragraphs: [
          "SONIQ LAB traite le son comme une onde matérielle sculptée par des chambres de résonance physiques plutôt que par des filtres numériques synthétiques.",
          "Ce casque audio spéculatif élimine tous les artefacts décoratifs habituels du matériel gaming ou grand public pour ne laisser subsister que la pureté du métal froid et de la mousse acoustique haute densité.",
          "La direction artistique explore les reflets métalliques rasants, le bleu cobalt des voyants laser et des cadrages ultra-précis inspirés de l'ingénierie spatiale.",
        ],
      },
      en: {
        headline: "Elevating the listening instrument into architectural sculpture",
        paragraphs: [
          "SONIQ LAB approaches sound as a physical wave sculpted through analog acoustic chambers rather than synthetic digital DSP filters.",
          "This speculative headphone design eliminates decorative tropes common in consumer electronics, preserving only cold brushed metal, beryllium drivers, and high-density acoustic memory foam.",
          "The art direction focuses on razor-edge specular reflections, cobalt blue indicators, and blueprint-like compositions inspired by aerospace laboratory photography.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lumière métallique tranchante, reflets linéaires sur surfaces microbillées et précision chirurgicale.",
        palette: [
          { name: "Electric Blue", hex: "#6298FF", role: "Signalétique laser" },
          { name: "Anodized Silver", hex: "#C8C9CC", role: "Composants métalliques" },
          { name: "Pitch Black", hex: "#08080A", role: "Chambre acoustique" },
        ],
        typography: "Typographie technique géométrique à chasse fixe et indexations en points millimétriques.",
        materials: "Alliage d'aluminium 6061-T6, dôme en béryllium pur, tissu acoustique tricoté en fil d'argent.",
        photography: "Éclairage de studio en profil d'aile d'avion, réflecteurs argentés striés et fond noir profond.",
      },
      en: {
        narrative: "Knife-edge specular light, linear gradients across bead-blasted surfaces, and surgical precision.",
        palette: [
          { name: "Electric Blue", hex: "#6298FF", role: "Laser telemetry" },
          { name: "Anodized Silver", hex: "#C8C9CC", role: "Metallic hardware" },
          { name: "Pitch Black", hex: "#08080A", role: "Acoustic void" },
        ],
        typography: "Technical monospaced geometric typeface with sub-millimeter indexing grids.",
        materials: "6061-T6 aerospace aluminum alloy, pure beryllium driver foil, silver-threaded woven acoustic textile.",
        photography: "Aero-profile studio lighting, directional silver striplights, and infinite deep black horizons.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Aluminium 6061 usiné 5 axes", "Aimants néodyme N52", "Arceau en acier ressort trempé", "Câble en cuivre OCC plaqué argent"],
        specifications: ["Réponse en fréquence : 4 Hz – 48 000 Hz", "Impédance : 32 Ohms", "Poids : 295 g parfaitement équilibré"],
        innovationNote: "Chambre à décompression passive éliminant la fatigue auriculaire sans distorsion.",
      },
      en: {
        materialsList: ["5-axis CNC 6061 aluminum", "N52 rare-earth neodymium magnets", "Spring-tempered structural steel band", "Silver-plated OCC copper cabling"],
        specifications: ["Frequency response: 4 Hz – 48,000 Hz", "Impedance: 32 Ohms", "Weight: 295 g with 50/50 center balance"],
        innovationNote: "Passive pressure-equalization vents eliminating ear canal fatigue without phase distortion.",
      },
    },
  },
  {
    id: "prod-04",
    slug: "forma-objects",
    brand: "FORMA OBJECTS",
    title: "Monolithic Living",
    category: "Furniture",
    year: 2026,
    accentColor: "#F7D85B",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Fauteuil sculptural FORMA OBJECTS dans un espace architectural épuré",
          en: "FORMA OBJECTS sculptural lounge chair in raw minimalist architectural interior",
        },
        caption: {
          fr: "Assise monolithique en béton cellulaire allégé et laine vierge feutrée.",
          en: "Monolithic seating form cast in lightweight aerated concrete and virgin wool.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Table basse sculpturale aux lignes géométriques et ombres portées",
          en: "Low sculptural coffee table with pure geometric lines and shadow play",
        },
        caption: {
          fr: "Plateau en chêne massif noirci à la flamme et piétement cantilever.",
          en: "Charred solid oak surface on structural cantilever base.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Canapé modulaire d'inspiration brutaliste dans un intérieur monochrome",
          en: "Brutalist-inspired modular sofa within a monochromatic concrete interior",
        },
        caption: {
          fr: "Architecture d'assise modulaire aux proportions horizontales radicales.",
          en: "Modular seating system configured with radical low-slung proportions.",
        },
      },
    ],
    alt: {
      fr: "FORMA OBJECTS — Mobilier d'auteur sculptural et mobilier architectural",
      en: "FORMA OBJECTS — Sculptural collectible furniture and architectural seating",
    },
    tagline: {
      fr: "Habiter le vide — Mobilier sculptural aux proportions radicales.",
      en: "Inhabiting the Void — Sculptural furniture with radical proportions.",
    },
    summary: {
      fr: "Une collection d'objets d'intérieur explorant le béton coulé, le bois brûlé et l'équilibre gravitaire.",
      en: "An interior object collection exploring cast concrete, scorched oak, and gravitational balance.",
    },
    concept: {
      fr: {
        headline: "Le mobilier comme micro-architecture au service de la contemplation",
        paragraphs: [
          "FORMA OBJECTS aborde l'assise non comme un simple outil de confort domestique, mais comme un monument à l'échelle du corps.",
          "Chaque pièce est dessinée selon des principes de réduction drastique, éliminant les jonctions superflues pour affirmer une masse visuelle continue.",
          "Les photographies subliment les variations de texture de la matière brute, où le béton coulé et le bois noirci captent la course du soleil sur les parois.",
        ],
      },
      en: {
        headline: "Furniture as micro-architecture dedicated to contemplation",
        paragraphs: [
          "FORMA OBJECTS treats seating not merely as casual domestic utility, but as an architectural monument scaled to the human silhouette.",
          "Each piece is drafted under radical reduction guidelines, stripping away visible fasteners to celebrate continuous material density.",
          "The photography captures subtle tactile variations in raw mass, where cast cellular concrete and charred oak register the path of daylight across walls.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Architecture d'ombre, lumière rasante de fin d'après-midi et géométrie monolithique.",
        palette: [
          { name: "Ochre Gold", hex: "#F7D85B", role: "Point focal" },
          { name: "Charred Oak", hex: "#1C1C1E", role: "Matière maîtresse" },
          { name: "Raw Concrete", hex: "#666668", role: "Contexte spatial" },
        ],
        typography: "Antiqua contemporaine contrastée, associée à des légendes d'échelle architecturale.",
        materials: "Béton fibré allégé, chêne français brûlé Shou Sugi Ban, drap de laine cardée.",
        photography: "Lumière naturelle orientée sud-ouest à travers de grandes baies d'atelier, sans lumière artificielle d'appoint.",
      },
      en: {
        narrative: "Raking architectural light, deep late-afternoon falloff, and monolithic geometry.",
        palette: [
          { name: "Ochre Gold", hex: "#F7D85B", role: "Focal punctuation" },
          { name: "Charred Oak", hex: "#1C1C1E", role: "Primary material" },
          { name: "Raw Concrete", hex: "#666668", role: "Spatial envelope" },
        ],
        typography: "High-contrast contemporary Antiqua matched with architectural scale callouts.",
        materials: "Glass-fiber reinforced lightweight concrete, Shou Sugi Ban scorched French oak, un-dyed wool felt.",
        photography: "Natural south-west daylight streaming through industrial studio glass without fill lighting.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Béton minéral allégé coulé", "Chêne brûlé et ciré à la main", "Feutre de laine 100% mérinos", "Insert de stabilisation en acier noir"],
        specifications: ["Dimensions fauteuil : L 92 × P 88 × H 68 cm", "Poids : 42 kg", "Fabrication artisanale en Île-de-France"],
        innovationNote: "Formulation exclusive de béton intégrant 40% de sédiments recyclés pour réduire l'empreinte carbone.",
      },
      en: {
        materialsList: ["Cast lightweight mineral concrete", "Hand-charred & waxed solid oak", "100% Merino felt upholstery", "Hidden structural steel counterweight"],
        specifications: ["Lounge chair dimensions: W 92 × D 88 × H 68 cm", "Weight: 42 kg", "Artisanal production in France"],
        innovationNote: "Proprietary concrete blend utilizing 40% recycled mineral fines for low carbon footprint.",
      },
    },
  },
  {
    id: "prod-05",
    slug: "tempus-01",
    brand: "TEMPUS 01",
    title: "Chronometric Silence",
    category: "Watches",
    year: 2026,
    accentColor: "#BA9CFF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Montre de luxe TEMPUS 01 sur pierre sombre polie",
          en: "TEMPUS 01 luxury timepiece on polished dark stone plinth",
        },
        caption: {
          fr: "Boîtier monobloc en titane grade 5 et verre saphir double dôme antireflet.",
          en: "Grade 5 titanium monobloc case with double-domed anti-reflective sapphire.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Macro-photographie du cadran et des index gravés au laser",
          en: "Macro photography of the dial and laser-etched hour indices",
        },
        caption: {
          fr: "Cadran noir mat profond sans chiffre ni logo superflu.",
          en: "Vantablack-inspired deep matte dial without extraneous branding.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détails du mouvement mécanique et du rotor en platine",
          en: "Mechanical movement details and platinum winding rotor",
        },
        caption: {
          fr: "Calibre mécanique manufacture avec ponts anglées et finitions microbillées.",
          en: "Manufacture caliber with hand-beveled bridges and micro-blasted textures.",
        },
      },
    ],
    alt: {
      fr: "TEMPUS 01 — Haute horlogerie contemporaine en titane brossé",
      en: "TEMPUS 01 — Contemporary haute horlogerie in brushed titanium",
    },
    tagline: {
      fr: "La mesure du silence — Titane grade 5 et cadran minéral noir.",
      en: "Measuring Stillness — Grade 5 titanium and mineral black dial.",
    },
    summary: {
      fr: "Une pièce d'horlogerie contemplative défiant l'ostentation par la rigueur mathématique du temps.",
      en: "A contemplative horological work defying luxury ostentation with mathematical silence.",
    },
    concept: {
      fr: {
        headline: "Redéfinir le temps comme un espace de calme intérieur",
        paragraphs: [
          "TEMPUS 01 remet en question la surabondance de complications horlogères. En soustrayant tout ce qui distrait l'œil, cette montre célèbre le passage discret de la seconde.",
          "Le boîtier en titane ultra-léger disparaît sur le poignet, tandis que les aiguilles taillées au diamant tracent leur révolution avec une fluidité hypnotique.",
          "Les photographies macro captent l'infiniment petit : micro-biseautages polis, grain du cadran en céramique noire et reflets subtils lavande de l'antireflet saphir.",
        ],
      },
      en: {
        headline: "Redefining chronometry as an internal sanctuary of calm",
        paragraphs: [
          "TEMPUS 01 challenges the excessive complications of traditional horology. By subtracting every decorative distraction, this timepiece honors the quiet passing of time.",
          "The ultra-light titanium case virtually disappears upon the wrist, while diamond-cut hands orbit the dial with hypnotic mechanical fluidity.",
          "The macro studio photography captures microscopic nuances: hand-polished chamfers, ceramic dial grain, and delicate lavender reflections from dual sapphire AR coatings.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Micro-précision, lumière polarisée rasante et noir absolu pour révéler l'extrême justesse des ajustements.",
        palette: [
          { name: "Lavender Reflection", hex: "#BA9CFF", role: "Reflet saphir" },
          { name: "Brushed Titanium", hex: "#8A8D91", role: "Boîtier métallique" },
          { name: "Void Black", hex: "#040404", role: "Fond de cadran" },
        ],
        typography: "Chiffres typographiques à espacement proportionnel inspirés des cadrans de bord suisses des années 1960.",
        materials: "Titane grade 5 brossé micro-satiné, saphir inrayable 9 Mohs, bracelet en caoutchouc FKM texturé.",
        photography: "Objectif macro 100mm avec lumière polarisée croisée pour éliminer les reflets parasites.",
      },
      en: {
        narrative: "Micro-precision, cross-polarized grazing light, and deep void blacks revealing micron-level tolerances.",
        palette: [
          { name: "Lavender Reflection", hex: "#BA9CFF", role: "Sapphire AR tint" },
          { name: "Brushed Titanium", hex: "#8A8D91", role: "Case metal" },
          { name: "Void Black", hex: "#040404", role: "Dial background" },
        ],
        typography: "Proportionally spaced numerals inspired by mid-century Swiss instrument telemetry.",
        materials: "Grade 5 micro-satin titanium, 9 Mohs scratchproof sapphire crystal, fluorocarbon FKM rubber strap.",
        photography: "100mm macro prime with cross-polarizing filters eliminating specular glare.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Titane grade 5 forgé", "Glace saphir bombée 2.8 mm", "Rotor en tungstène lourd", "Bracelet FKM à boucle déployante titane"],
        specifications: ["Diamètre : 39 mm | Épaisseur : 8.8 mm", "Réserve de marche : 72 heures", "Étanchéité : 10 ATM / 100 mètres"],
        innovationNote: "Mouvement mécanique suspendu sur amortisseurs viscoélastiques absorbant les chocs axiaux.",
      },
      en: {
        materialsList: ["Forged Grade 5 titanium", "2.8 mm double-curved sapphire", "Heavy tungsten winding mass", "FKM strap with titanium deployant buckle"],
        specifications: ["Case diameter: 39 mm | Thickness: 8.8 mm", "Power reserve: 72 hours", "Water resistance: 10 ATM / 100 meters"],
        innovationNote: "Mechanical movement suspended on internal viscoelastic dampers neutralizing axial shock.",
      },
    },
  },
  {
    id: "prod-06",
    slug: "mono-studio",
    brand: "MONO STUDIO",
    title: "Architectural Leather",
    category: "Fashion Accessories",
    year: 2026,
    accentColor: "#FF665C",
    featured: true,
    layout: "wide",
    coverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Sac en cuir géométrique MONO STUDIO sur piédestal en pierre noire",
          en: "MONO STUDIO geometric leather bag on black stone pedestal",
        },
        caption: {
          fr: "Structure rigide pliée à chaud sans couture extérieure apparente.",
          en: "Rigid folded silhouette crafted without exterior surface stitching.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de la tranche teintée à la main et de la poignée sculpturale",
          en: "Detail of hand-painted edges and sculptural top handle",
        },
        caption: {
          fr: "Teinture de tranche appliquée à la main en sept couches successives.",
          en: "Edge dye hand-applied across seven successive matte coats.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Tote bag en cuir brut sur fond de béton brut contemporain",
          en: "Raw leather tote bag framed against contemporary brutalist concrete",
        },
        caption: {
          fr: "Proportions monumentales inspirées de l'architecture brutaliste parisienne.",
          en: "Monumental proportions inspired by brutalist Parisian architecture.",
        },
      },
    ],
    alt: {
      fr: "MONO STUDIO — Maroquinerie d'art architecturale et objets de cuir rigides",
      en: "MONO STUDIO — Architectural collectible leather goods and structured bags",
    },
    tagline: {
      fr: "Sculpté pour le mouvement — Maroquinerie d'art aux plis millimétrés.",
      en: "Sculpted for Motion — Collectible leathercraft folded with millimeter precision.",
    },
    summary: {
      fr: "Une exploration de la maroquinerie structurée conçue selon des patrons de pliage origami et un cuir tanné végétal.",
      en: "An exploration of structured leather goods drafted via origami folding and vegetable-tanned hides.",
    },
    concept: {
      fr: {
        headline: "Transformer le cuir en une structure autoportante sans armature plastique",
        paragraphs: [
          "MONO STUDIO réinterprète le sac à main comme un volume architectural pur. En tirant parti de la mémoire de forme du cuir pleine fleur épais, le sac tient debout par sa seule géométrie.",
          "Ce concept élimine fermoirs chromés tapageurs et logos géants au profit d'une fermeture par pliage magnétique et d'une fente pour bandoulière découpée au laser.",
          "L'imagerie photographique confronte la souplesse organique de la peau animale à des arrière-plans en basalte taillé et des éclats de rouge corail électrique.",
        ],
      },
      en: {
        headline: "Transforming leather into self-supporting architecture without plastic stiffeners",
        paragraphs: [
          "MONO STUDIO reinterprets personal carry goods as pure geometric volumes. By harnessing the structural memory of thick full-grain leather, each bag stands through sheer geometric integrity.",
          "This speculative concept sheds gaudy hardware and loud emblems in favor of invisible magnetic fold closures and laser-carved strap pass-throughs.",
          "The editorial imagery juxtaposes the organic grain of vegetable-tanned hides against dressed basalt plinths and electric coral accents.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Géométrie sculpturale, ombres nettes au couteau et contrastes audacieux entre noir profond et corail vibrant.",
        palette: [
          { name: "Electric Coral", hex: "#FF665C", role: "Point d'énergie" },
          { name: "Matte Boxcalf", hex: "#121214", role: "Cuir principal" },
          { name: "Slate Grey", hex: "#424245", role: "Surfaces d'appui" },
        ],
        typography: "Typographie de titrage condensed géométrique inspirée des affiches d'avant-garde des années 1920.",
        materials: "Cuir de taurillon tanné végétal en Toscane, tranches finies à la cire d'abeille, aimants néodyme dissimulés.",
        photography: "Ombres dures obtenues par projecteur fresnel ponctuel simulant un soleil de midi zénithal.",
      },
      en: {
        narrative: "Sculptural geometry, razor-sharp hard shadows, and bold contrast between deep black and electric coral.",
        palette: [
          { name: "Electric Coral", hex: "#FF665C", role: "Dynamic energy point" },
          { name: "Matte Boxcalf", hex: "#121214", role: "Primary leather" },
          { name: "Slate Grey", hex: "#424245", role: "Supporting slate" },
        ],
        typography: "High-impact condensed geometric display typeface drawn from 1920s European modernist manifestos.",
        materials: "Full-grain vegetable-tanned Tuscan bullcalf, beeswax hand-burnished edge bevels, concealed magnetic latches.",
        photography: "Directional Fresnel spotlight generating sharp architectural shadow angles reminiscent of zenith midday sun.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Cuir pleine fleur 2.4 mm", "Fils de lin ciré au fuseau", "Pièces de doublure en suède de porc", "Fermoir magnétique en néodyme"],
        specifications: ["Dimensions : L 34 × H 26 × P 11 cm", "Poids : 620 g à vide", "Teinture aniline sans métaux lourds"],
        innovationNote: "Patronage unitaire en une seule découpe continue repliée sans colle toxique.",
      },
      en: {
        materialsList: ["2.4 mm full-grain leather", "Hand-waxed linen saddle thread", "Japanese pigskin suede lining", "Concealed rare-earth magnetic closures"],
        specifications: ["Dimensions: W 34 × H 26 × D 11 cm", "Tare weight: 620 g", "Heavy-metal-free aniline vat dye"],
        innovationNote: "Single-cut continuous pattern folded into dimensional form without structural adhesives.",
      },
    },
  },
  {
    id: "prod-07",
    slug: "vela-light",
    brand: "VELA LIGHT",
    title: "Atmospheric Radiance",
    category: "Lighting Design",
    year: 2026,
    accentColor: "#F7D85B",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Lampe sculpturale VELA LIGHT émettant un halo chaud dans la pénombre",
          en: "VELA LIGHT sculptural luminaire radiating warm ambient halo into darkness",
        },
        caption: {
          fr: "Diffuseur sphérique en verre opalin soufflé bouche et socle en fonte d'aluminium.",
          en: "Mouth-blown opal glass diffuser on sand-cast aluminum base.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Suspension minimaliste diffusant une lumière enveloppante",
          en: "Minimalist pendant luminaire casting soft ambient wrap",
        },
        caption: {
          fr: "Réflecteur parabolique créant un dégradé lumineux sans éblouissement.",
          en: "Parabolic reflector generating glare-free ambient gradation.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Globe lumineux architectural posé sur surface minérale sombre",
          en: "Architectural glowing sphere resting upon dark mineral surface",
        },
        caption: {
          fr: "Spectre lumineux accordé à 2400 Kelvins pour simuler la lumière crépusculaire.",
          en: "Warm 2400 Kelvin spectrum engineered to mimic dusk natural light.",
        },
      },
    ],
    alt: {
      fr: "VELA LIGHT — Luminaires d'art contemporains et sculptures de lumière",
      en: "VELA LIGHT — Contemporary sculptural luminaires and light art",
    },
    tagline: {
      fr: "L'art du crépuscule — Sculptures lumineuses et atmosphères intimistes.",
      en: "The Art of Dusk — Sculptural illumination and intimate atmospheres.",
    },
    summary: {
      fr: "Une collection d'éclairage d'ambiance sculptural explorant la diffusion opalescente et la température de couleur crépusculaire.",
      en: "A sculptural atmospheric lighting series exploring opalescent diffusion and twilight color temperatures.",
    },
    concept: {
      fr: {
        headline: "Éclairer l'espace en préservant le mystère de l'obscurité",
        paragraphs: [
          "VELA LIGHT prend le contre-pied de l'éclairage fonctionnel agressif. Pour ce projet, la lumière n'a pas pour but d'inonder une pièce mais de délimiter des sanctuaires chaleureux au cœur de l'ombre.",
          "Chaque luminaire fonctionne comme une présence sculpturale même éteint, mariant verre opalin laiteux et métal lourd brossé.",
          "Les visuels photographiques capturent la transition douce entre la source ardente et la pénombre environnante, créant des compositions presque picturales.",
        ],
      },
      en: {
        headline: "Illuminating space while preserving the poetic depth of darkness",
        paragraphs: [
          "VELA LIGHT takes an opposing stance to aggressive functional ceiling lighting. Here, light is not deployed to flood a room, but to carve warm sanctuaries within ambient shadow.",
          "Each luminaire maintains commanding sculptural presence even when powered off, uniting milky triplex opal glass and weighty brushed alloy.",
          "The editorial photography records the gentle gradation between luminous core and surrounding darkness, producing painterly visual poetry.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Dégradés de lumière douce, halos dorés chaleureux et pénombre veloutée sans saturation artificielle.",
        palette: [
          { name: "Twilight Amber", hex: "#F7D85B", role: "Halo lumineux" },
          { name: "Cast Aluminum", hex: "#4F4F52", role: "Piétement" },
          { name: "Nocturnal Black", hex: "#060608", role: "Ombre d'ambiance" },
        ],
        typography: "Typographie sans empattement géométrique inspirée du design scandinave d'après-guerre.",
        materials: "Verre opalin triplex soufflé à la bouche, fonte d'aluminium sablée, module LED haute fidélité IRC 98.",
        photography: "Photographie en très basse lumière avec sensibilité ISO 100 et exposition prolongée pour préserver les noirs purs.",
      },
      en: {
        narrative: "Smooth luminous falls, warm golden halos, and velvety shadow depth without artificial saturation.",
        palette: [
          { name: "Twilight Amber", hex: "#F7D85B", role: "Luminous halo" },
          { name: "Cast Aluminum", hex: "#4F4F52", role: "Base metal" },
          { name: "Nocturnal Black", hex: "#060608", role: "Ambient shadow" },
        ],
        typography: "Minimalist Scandinavian-inspired mid-century geometric sans with balanced tracking.",
        materials: "Hand-blown triplex opal glass, sand-cast aluminum, CRI 98 full-spectrum warm LED engine.",
        photography: "Ultra-low-light tripod capture at ISO 100 with long exposure maintaining deep velvety blacks.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Verre opalin 3 couches soufflé bouche", "Fonte d'aluminium recyclé", "Cordon textile tressé noir", "Variateur tactile sans contact"],
        specifications: ["Température de couleur : 2200K – 2700K", "Flux : 650 lumens réglable", "Hauteur : 38 cm | Diamètre globe : 28 cm"],
        innovationNote: "Variateur gyroscopique sensitif permettant d'ajuster l'intensité par simple inclinaison du socle.",
      },
      en: {
        materialsList: ["Three-ply mouth-blown opal glass", "Recycled sand-cast aluminum base", "Braided black textile cord", "Capacitive touchless dimmer"],
        specifications: ["Color temperature: 2200K – 2700K dim-to-warm", "Output: 650 lm adjustable", "Height: 38 cm | Globe diameter: 28 cm"],
        innovationNote: "Internal gyroscopic sensory control adjusting radiance by gently rotating the sculptural base.",
      },
    },
  },
  {
    id: "prod-08",
    slug: "atelier-zero",
    brand: "ATELIER ZERO",
    title: "Tactile Subtraction",
    category: "Sustainable Packaging",
    year: 2026,
    accentColor: "#78E6BF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Boîtes d'emballage ATELIER ZERO en carton brut avec gaufrage à sec",
          en: "ATELIER ZERO raw unbleached packaging boxes with blind debossing",
        },
        caption: {
          fr: "Boîtiers en carton recyclé non blanchi avec marquage en creux sans encre.",
          en: "Unbleached recycled pulp containers featuring inkless blind debossing.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de ficelle naturelle et papier kraft texturé",
          en: "Detail of raw botanical twine and heavy textured kraft paper",
        },
        caption: {
          fr: "Fermeture mécanique par pliage et lien en chanvre biologique.",
          en: "Mechanical interlocking fold closure secured with raw organic hemp.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Pochettes d'expédition écologiques et typographie éditoriale",
          en: "Eco-conscious mailing sleeves with minimal editorial typography",
        },
        caption: {
          fr: "Typographie épurée imprimée avec des pigments de marc de café recyclé.",
          en: "Refined typography printed using upcycled coffee ground pigments.",
        },
      },
    ],
    alt: {
      fr: "ATELIER ZERO — Système d'emballage circulaire et design packaging tactile",
      en: "ATELIER ZERO — Circular sustainable packaging system and tactile paper craft",
    },
    tagline: {
      fr: "Moins pour émouvoir — Packaging circulaire et gaufrage aveugle.",
      en: "Subtract to Resonate — Circular packaging and inkless debossing.",
    },
    summary: {
      fr: "Une identité de packaging éco-responsable prouvant que l'élimination des encres polluantes élève le prestige de l'objet.",
      en: "A sustainable packaging system demonstrating that stripping toxic inks elevates tactile luxury.",
    },
    concept: {
      fr: {
        headline: "Le luxe par le dépouillement écologique absolu",
        paragraphs: [
          "ATELIER ZERO est né d'un constat radical : les emballages les plus luxueux sont trop souvent les plus destructeurs pour l'environnement.",
          "Ce projet démontre qu'en supprimant films plastiques, vernis UV et dorures polluantes, la texture du papier recyclé brut acquiert une noblesse sensorielle sans égal.",
          "Les informations de marque sont communiquées par estampage à sec en bas-relief, jouant avec les ombres naturelles créées par le relief du carton.",
        ],
      },
      en: {
        headline: "Defining luxury through uncompromising ecological subtraction",
        paragraphs: [
          "ATELIER ZERO stems from a pointed truth: the most decadent retail packaging is frequently the most ecologically toxic.",
          "This project proves that by omitting plastic laminates, UV spot coatings, and foil stampings, raw recycled fibers achieve unparalleled tactile nobility.",
          "Brand signatures are delivered through inkless blind debossing, harnessing natural studio shadows cast into the debossed recesses of paperboard.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lumière naturelle rasante mettant en valeur le grain des fibres végétales et le relief du gaufrage.",
        palette: [
          { name: "Chlorophyll Mint", hex: "#78E6BF", role: "Signature végétale" },
          { name: "Unbleached Kraft", hex: "#D6C7B2", role: "Matière brute" },
          { name: "Deep Charcoal", hex: "#18181A", role: "Ombres de relief" },
        ],
        typography: "Serif éditoriale sobre aux empattements subtils, inspirée de l'imprimerie artisanale.",
        materials: "Carton 100% fibres recyclées post-consommation, papier de chanvre, colle d'amidon de pomme de terre.",
        photography: "Lumière du jour filtrée par un store en bambou créant des ombres rayées graphiques.",
      },
      en: {
        narrative: "Grazing daylight highlighting natural plant fibers and architectural deboss depths.",
        palette: [
          { name: "Chlorophyll Mint", hex: "#78E6BF", role: "Botanical signature" },
          { name: "Unbleached Kraft", hex: "#D6C7B2", role: "Raw paperboard" },
          { name: "Deep Charcoal", hex: "#18181A", role: "Deboss shadow" },
        ],
        typography: "Restrained book serif with subtle bracketed serifs echoing traditional letterpress publishing.",
        materials: "100% post-consumer recycled paperboard, unbleached hemp paper, potato starch adhesive.",
        photography: "Diffused daylight filtered through slatted blinds creating subtle rhythmic linear shadows.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Carton gris recyclé 650 g/m²", "Papier kraft vergé naturel", "Ficelle de lin brut biologique", "Pigments minéraux naturels"],
        specifications: ["Biodégradabilité : 100% compostable à domicile", "Assemblage : Pliage origami sans agrafe", "Origine : Fibres collectées en France"],
        innovationNote: "Découpe brevetée par rainurage micrométrique permettant un pliage ultra-précis sans rupture de fibre.",
      },
      en: {
        materialsList: ["650 gsm post-consumer recycled board", "Laid unbleached kraft liner", "Organic raw flax cordage", "Natural earth mineral pigments"],
        specifications: ["Biodegradability: 100% home compostable in 60 days", "Assembly: Interlocking origami folds", "Origin: Sourced and manufactured in France"],
        innovationNote: "Patented micro-grooving die-cut enabling crisp 90-degree folds without fiber stress fracturing.",
      },
    },
  },
  {
    id: "prod-09",
    slug: "sora-optics",
    brand: "SORA OPTICS",
    title: "Sculpted Perspective",
    category: "Eyewear",
    year: 2026,
    accentColor: "#6298FF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Lunettes de soleil sculpturales SORA OPTICS avec ombres graphiques sur fond ardoise",
          en: "SORA OPTICS architectural sunglasses casting bold graphic shadows on slate",
        },
        caption: {
          fr: "Monture en acétate japonais bio-sourcé usiné dans la masse (8 mm d'épaisseur).",
          en: "Japanese bio-acetate frame milled from 8mm solid block.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Lunettes de vue géométriques et verres antireflets bleu saphir",
          en: "Geometric optical eyewear and anti-reflective blue sapphire lenses",
        },
        caption: {
          fr: "Branches ergonomiques sans armature métallique apparente.",
          en: "Ergonomic temples featuring concealed titanium core wiring.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de la charnière monobloc à rivets plats polis",
          en: "Macro detail of flush five-barrel custom hinge and hand-polished rivets",
        },
        caption: {
          fr: "Charnière à 5 rivets intégrée dans l'acétate pour une durabilité infinie.",
          en: "Five-barrel barrel hinge embedded into acetate for lifetime endurance.",
        },
      },
    ],
    alt: {
      fr: "SORA OPTICS — Lunetterie de créateur d'inspiration architecturale en acétate",
      en: "SORA OPTICS — Architecturally sculpted designer eyewear in premium acetate",
    },
    tagline: {
      fr: "Voir et être vu — Géométrie optique et acétate japonais épais.",
      en: "Vision as Form — Optical geometry and heavy Japanese bio-acetate.",
    },
    summary: {
      fr: "Une collection de lunettes de soleil et de vue sculpturales défiant les silhouettes conventionnelles par des biseaux acérés.",
      en: "A sculptural eyewear collection challenging conventional contours with knife-edge bevels.",
    },
    concept: {
      fr: {
        headline: "Le cadre optique comme prolongement des lignes du visage",
        paragraphs: [
          "SORA OPTICS traite la lunette comme un filtre géométrique sur le monde. Les montures sont taillées dans des plaques d'acétate d'une épaisseur exceptionnelle de 8 millimètres, puis fraisées à la main.",
          "Ce volume sculptural apporte une présence scénographique immédiate sans jamais alourdir le port grâce à des allègements intérieurs invisibles.",
          "La direction visuelle s'appuie sur la réfraction de la lumière à travers les verres teintés bleu électrique et des reflets ultra-nets sur les biseaux polis miroir.",
        ],
      },
      en: {
        headline: "The optical frame as architectural extension of the facial anatomy",
        paragraphs: [
          "SORA OPTICS conceives eyewear as a geometric lens through which to experience reality. Frames are carved from rare 8mm Japanese bio-acetate slabs before undergoing extensive hand beveling.",
          "This volumetric boldness projects an unmistakable editorial posture, while internal hidden milling keeps overall weight surprisingly balanced.",
          "The visual language centers on light refraction through electric blue tinted lenses and mirror-polished faceted chamfers.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lignes d'ombre nettes, réfraction cristalline et angles biseautés aux reflets bleutés.",
        palette: [
          { name: "Electric Azure", hex: "#6298FF", role: "Teinte de verre" },
          { name: "Obsidian Acetate", hex: "#0E0E10", role: "Monture principale" },
          { name: "Polished Nickel", hex: "#C0C1C4", role: "Charnières" },
        ],
        typography: "Sans-serif typographique suisse moderne aux proportions ouvertes et lignes franches.",
        materials: "Acétate de cellulose japonais Takiron, verres solaires minéraux catégorie 3, charnières titane.",
        photography: "Lumière directe à fort contraste avec ombres portées nettes sur fond gris ardoise.",
      },
      en: {
        narrative: "Crisp architectural shadow lines, crystal refraction, and faceted bevels with cobalt glints.",
        palette: [
          { name: "Electric Azure", hex: "#6298FF", role: "Lens filtration" },
          { name: "Obsidian Acetate", hex: "#0E0E10", role: "Frame body" },
          { name: "Polished Nickel", hex: "#C0C1C4", role: "Hardware" },
        ],
        typography: "Modern Swiss sans-serif with open apertures and unyielding baseline discipline.",
        materials: "Japanese Takiron bio-cellulose acetate, Category 3 mineral glass lenses, titanium hinge assemblies.",
        photography: "High-contrast directional studio spotlight creating razor shadows on honed slate tablets.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Acétate de cellulose bio Takiron 8 mm", "Verres solaires minéraux Zeiss", "Charnières 5 cylindres en titane", "Plaquettes nasales intégrées"],
        specifications: ["Calibre : 49-22-145 mm", "Poids : 48 g", "Protection 100% UVA/UVB avec filtre antireflet interne"],
        innovationNote: "Polissage tambour rotatif à la poudre de bambou pendant 72 heures pour un éclat soyeux.",
      },
      en: {
        materialsList: ["8 mm Takiron bio-cellulose acetate", "Carl Zeiss Category 3 mineral lenses", "Custom 5-barrel titanium hinges", "Anatomically carved bridge"],
        specifications: ["Frame size: 49-22-145 mm", "Weight: 48 g", "100% UVA/UVB with backside anti-reflective coat"],
        innovationNote: "72-hour rotating barrel tumble polish using organic bamboo granules for unmatched silky luster.",
      },
    },
  },
  {
    id: "prod-10",
    slug: "kinetic-one",
    brand: "KINETIC ONE",
    title: "Ergonomic Future",
    category: "Wearable Technology",
    year: 2026,
    accentColor: "#BA9CFF",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Appareil portable futuriste KINETIC ONE brillant dans l'obscurité",
          en: "KINETIC ONE futuristic wearable device interface glowing in darkness",
        },
        caption: {
          fr: "Interface lumineuse tactile OLED flexible intégrée sous verre céramique saphir.",
          en: "Flexible micro-OLED matrix embedded beneath seamless sapphire ceramic.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Capteur biométrique discret en anneau de titane",
          en: "Minimalist biometric sensor ring crafted in polished titanium",
        },
        caption: {
          fr: "Anneau biométrique compact mesurant la variabilité cardiaque en continu.",
          en: "Compact biometric smart ring continuously measuring heart rate variability.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Accessoires technologiques KINETIC ONE sur basalte noir",
          en: "KINETIC ONE tech hardware arrayed upon dark volcanic basalt",
        },
        caption: {
          fr: "Finition PVD noir d'obsidienne résistante aux rayures et à l'eau de mer.",
          en: "Scratchproof obsidian black PVD finish resistant to seawater corrosion.",
        },
      },
    ],
    alt: {
      fr: "KINETIC ONE — Dispositif connecté biométrique futuriste et minimaliste",
      en: "KINETIC ONE — Futuristic biometric wearable device and sensory ring",
    },
    tagline: {
      fr: "L'intelligence invisible — Capteurs biométriques et titane d'obsidienne.",
      en: "Invisible Intelligence — Biometric sensors and obsidian titanium.",
    },
    summary: {
      fr: "Un dispositif portable spéculatif qui supprime l'encombrement des écrans classiques au profit de micro-pulsations haptiques.",
      en: "A speculative wearable device replacing noisy displays with subtle haptic micro-pulsations.",
    },
    concept: {
      fr: {
        headline: "Une technologie discrète qui s'efface pour laisser place à la vie",
        paragraphs: [
          "KINETIC ONE imagine l'après-smartphone : une ère où la technologie ne réclame plus notre attention par des notifications anxiogènes, mais nous accompagne de façon silencieuse.",
          "Conçu sous forme d'un galet ou d'un anneau de titane sans couture, l'objet communique par vibrations haptiques sub-sensorielles et un affichage spectral fugace.",
          "La direction artistique explore l'alliance du verre d'obsidienne, de la lumière ultraviolette et des graphismes d'interface holographiques ultra-minimalistes.",
        ],
      },
      en: {
        headline: "Quiet technology that recedes to keep attention present",
        paragraphs: [
          "KINETIC ONE envisions the post-smartphone era: an ecosystem where technology no longer commands visual anxiety through glowing notifications, but monitors wellness quietly.",
          "Engineered as a seamless titanium ring or organic pebble, the device communicates via sub-sensory haptic waves and subtle micro-spectral flashes.",
          "The art direction pairs obsidian glass, soft ultraviolet accents, and hyper-reduced holographic UI diagrams.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Esthétique cyberpunk raffinée, lueurs subtiles lavande et noir spatial absolu.",
        palette: [
          { name: "Spectral Lavender", hex: "#BA9CFF", role: "Interface active" },
          { name: "Space Titanium", hex: "#3A3B40", role: "Châssis monobloc" },
          { name: "Obsidian Core", hex: "#08080A", role: "Surface capteurs" },
        ],
        typography: "Typographie futuriste monospacée à micro-points inspirée de l'astronautique.",
        materials: "Titane grade 5 forgé sous vide, céramique zircone biocompatible, capteurs photopléthysmographiques infrarouges.",
        photography: "Studio noir absolu avec reflets rasants en néon lavande et lumière stroboscopique.",
      },
      en: {
        narrative: "Restrained cyberpunk luxury, subtle lavender telemetry glints, and deep aerospace black.",
        palette: [
          { name: "Spectral Lavender", hex: "#BA9CFF", role: "Active telemetry" },
          { name: "Space Titanium", hex: "#3A3B40", role: "Unibody chassis" },
          { name: "Obsidian Core", hex: "#08080A", role: "Sensor crystal" },
        ],
        typography: "Micro-dot matrix monospaced typography inspired by spacecraft telemetry terminals.",
        materials: "Vacuum-forged Grade 5 titanium, medical biocompatible zirconia ceramic, infrared PPG sensors.",
        photography: "Zero-light studio stage with razor-thin lavender edge lighting and calibrated micro-strobes.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Titane grade 5 avec traitement DLC", "Verre saphir monocristallin", "Batterie solide miniature", "Résine biocompatible testée médicalement"],
        specifications: ["Autonomie : 7 jours en surveillance continue", "Étanchéité : 50 mètres (5 ATM)", "Poids : 4.2 grammes"],
        innovationNote: "Moteur haptique piézoélectrique capable de simuler des pulsations tactiles à fréquence variable.",
      },
      en: {
        materialsList: ["Grade 5 titanium with Diamond-Like Carbon", "Single-crystal sapphire window", "Solid-state micro battery", "Medical grade biocompatible polymer"],
        specifications: ["Battery life: 7 days continuous sensing", "Water resistance: 50 meters (5 ATM)", "Weight: 4.2 grams"],
        innovationNote: "Custom piezoelectric haptic transducer delivering variable-frequency micro-pulses.",
      },
    },
  },
  {
    id: "prod-11",
    slug: "memoire",
    brand: "MÉMOIRE",
    title: "Tactile Archival",
    category: "Stationery",
    year: 2026,
    accentColor: "#E8D49B",
    featured: false,
    layout: "standard",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Carnet de notes luxueux MÉMOIRE relié en lin naturel sur bois sombre",
          en: "MÉMOIRE luxury clothbound notebook bound in natural linen on dark timber",
        },
        caption: {
          fr: "Reliure cousue suisse à dos ouvert permettant une ouverture à 180° à plat.",
          en: "Swiss exposed-spine thread binding permitting 180-degree lay-flat writing.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Feuilles de papier vergé artisanal à bords frangés",
          en: "Artisanal deckle-edge laid paper sheets with tactile grain",
        },
        caption: {
          fr: "Papier d'art 120 g/m² fabriqué au moulin avec barbes naturelles.",
          en: "120 gsm mill-made artist paper with natural feather deckled margins.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Papeterie éditoriale et plume avec marquage or discret",
          en: "Editorial stationery and fountain pen with restrained gold foil details",
        },
        caption: {
          fr: "Marquage à chaud doré à la feuille sur toile de coton brute.",
          en: "Genuine gold leaf hot stamping impressed on raw Belgian cotton cloth.",
        },
      },
    ],
    alt: {
      fr: "MÉMOIRE — Papeterie d'art contemporaine, reliure cousue et papier d'exception",
      en: "MÉMOIRE — Contemporary fine art stationery, archival binding, and tactile paper",
    },
    tagline: {
      fr: "Graver la pensée — Reliure cousue main et papier de coton vergé.",
      en: "Inscribing Thought — Hand-sewn binding and deckle cotton paper.",
    },
    summary: {
      fr: "Une collection d'objets d'écriture haut de gamme redonnant à l'acte manuscrit sa solennité et sa beauté matérielle.",
      en: "A luxury writing stationery collection restoring physical gravity and permanence to handwriting.",
    },
    concept: {
      fr: {
        headline: "La matérialité de l'écriture manuscrite contre l'amnésie numérique",
        paragraphs: [
          "MÉMOIRE est un sanctuaire tactile dans un monde saturé d'écrans éphémères. Chaque carnet est pensé comme un artefact patrimonial destiné à traverser les décennies sans altération.",
          "Les pages en pur chiffon de coton absorbent l'encre des plumes avec une douceur incomparable, éliminant toute bavure et offrant une texture crissante sous la plume.",
          "L'art direction met en valeur la patine du temps, la lumière dorée d'un bureau d'écrivain et des cadrages serrés sur le fil de couture et le grain vergé.",
        ],
      },
      en: {
        headline: "The permanence of physical ink against digital amnesia",
        paragraphs: [
          "MÉMOIRE stands as a tactile sanctuary in a landscape inundated by fleeting pixels. Every volume is crafted as an archival artifact destined to endure across generations.",
          "Pure cotton rag paper welcomes fountain pen ink with velvet absorbency, preventing feathering while producing a soft acoustic scratch beneath the nib.",
          "The art direction honors the patina of time, warm golden lamplight across an author's desk, and macro studies of bookbinding stitches and deckle edges.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lumière ambrée intime, textures de lin fibreux et solennité éditoriale.",
        palette: [
          { name: "Archival Gold", hex: "#E8D49B", role: "Marquage à chaud" },
          { name: "Unbleached Linen", hex: "#D9D2C7", role: "Toile de reliure" },
          { name: "Ebony Ink", hex: "#151517", role: "Encre et contraste" },
        ],
        typography: "Serif d'inspiration Didot aux déliés fins et lettrines classiques.",
        materials: "Toile de lin belge non teintée, papier 100% coton sans acide, fil de lin poissé.",
        photography: "Lumière latérale chaude simulant une lampe de banquier en laiton sur bureau en chêne ancien.",
      },
      en: {
        narrative: "Intimate amber warmth, fibrous linen textures, and literary editorial solemnity.",
        palette: [
          { name: "Archival Gold", hex: "#E8D49B", role: "Hot foil imprint" },
          { name: "Unbleached Linen", hex: "#D9D2C7", role: "Cover bookcloth" },
          { name: "Ebony Ink", hex: "#151517", role: "Ink contrast" },
        ],
        typography: "High-contrast Didone book serif with hairline serifs and classical capitals.",
        materials: "Raw unbleached Belgian linen bookcloth, 100% acid-free cotton rag paper, beeswax-dressed linen thread.",
        photography: "Low directional side tungsten warmth evocative of an antique library brass reading lamp.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Papier vergé 120 g/m² 100% coton", "Toile de lin brute tissée en Belgique", "Fil de couture au lin ciré", "Marquage or véritable 22 carats"],
        specifications: ["Format : A5 (148 × 210 mm) | 192 pages", "Épaisseur : 18 mm", "Papier neutre au pH 7.5 garanti 200 ans"],
        innovationNote: "Reliure à plat complète à 180 degrés sans pli résistant grâce à la couture apparente à l'ancienne.",
      },
      en: {
        materialsList: ["120 gsm 100% cotton laid paper", "Raw Belgian-woven linen buckram", "Waxed linen binding thread", "22k genuine gold leaf stamping"],
        specifications: ["Format: A5 (148 × 210 mm) | 192 pages", "Spine thickness: 18 mm", "Archival pH 7.5 paper rated for 200+ years"],
        innovationNote: "Full 180-degree flat-opening binding with exposed spine stitches eliminating gutter bounce.",
      },
    },
  },
  {
    id: "prod-12",
    slug: "casa-noma",
    brand: "CASA NOMA",
    title: "Organic Earth",
    category: "Home Objects",
    year: 2026,
    accentColor: "#FF665C",
    featured: true,
    layout: "wide",
    coverImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
    ],
    imageDetails: [
      {
        src: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Vases en céramique brute CASA NOMA aux formes sculpturales et ombres solaires",
          en: "CASA NOMA sculptural ceramic vases cast in raw terracotta with sunbeam shadows",
        },
        caption: {
          fr: "Vases sculpturaux modelés à la main en grès chamotté rouge.",
          en: "Sculptural vessels hand-coiled in grogged red stoneware clay.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Détail de terre cuite et texture minérale poreuse",
          en: "Detail of raw terracotta porous mineral grain and clay folds",
        },
        caption: {
          fr: "Texture rugueuse non émaillée révélant les grains de silice naturelle.",
          en: "Unglazed tactile surface revealing natural silica and mineral inclusions.",
        },
      },
      {
        src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
        alt: {
          fr: "Art de la table contemporain et assiettes en céramique organique",
          en: "Contemporary ceramic tableware arrayed in natural organic light",
        },
        caption: {
          fr: "Pièces de table asymétriques aux bords libres et ondulations organiques.",
          en: "Asymmetrical tableware celebrating organic freeform contours.",
        },
      },
    ],
    alt: {
      fr: "CASA NOMA — Céramiques sculpturales contemporaines et art de la table minéral",
      en: "CASA NOMA — Contemporary sculptural ceramics and mineral tableware",
    },
    tagline: {
      fr: "La mémoire de la terre — Grès chamotté et courbures organiques.",
      en: "Earth Memory — Grogged stoneware and organic curves.",
    },
    summary: {
      fr: "Une collection d'objets domestiques en grès brut cuit au feu de bois, explorant les imperfections wabi-sabi.",
      en: "A domestic object series in wood-fired raw stoneware celebrating wabi-sabi organic asymmetry.",
    },
    concept: {
      fr: {
        headline: "L'imperfection sacrée de la terre comme réponse à la standardisation",
        paragraphs: [
          "CASA NOMA s'inspire de la philosophie wabi-sabi où chaque fêlure, asymétrie et nuance de cuisson au feu de bois confère à l'objet son âme singulière.",
          "Les récipients refusent la perfection froide de l'usinage industriel pour embrasser les traces visibles des doigts de l'artisan et la porosité de la terre cuite.",
          "La direction photographique capte la course de la lumière méditerranéenne sur les parois granuleuses, réchauffant l'espace d'une présence tellurique et rassurante.",
        ],
      },
      en: {
        headline: "Sacred organic imperfection as an antidote to mechanical standardization",
        paragraphs: [
          "CASA NOMA draws from wabi-sabi philosophy, where subtle fissures, asymmetrical contours, and wood-ash kiln gradations impart singular soul to every piece.",
          "These domestic vessels reject the sterility of mass factory molds, embracing the visible fingerprints of the maker and the natural porosity of terracotta.",
          "The photographic narrative captures the sweep of Mediterranean afternoon sun across granular surfaces, infusing interiors with telluric warmth.",
        ],
      },
    },
    creativeDirection: {
      fr: {
        narrative: "Lumière dorée du sud, textures granuleuses de terre cuite et teintes de terre de Sienne brûlée.",
        palette: [
          { name: "Terracotta Coral", hex: "#FF665C", role: "Énergie terreuse" },
          { name: "Raw Ochre Clay", hex: "#C78C53", role: "Texture céramique" },
          { name: "Volcanic Ash", hex: "#1D1C1A", role: "Ombres de cuisson" },
        ],
        typography: "Typographie display organique aux empattements subtils évoquant les inscriptions lapidaires.",
        materials: "Grès chamotté rouge, cuisson au four à bois anagama à 1280°C, engobe minéral naturel.",
        photography: "Soleil couchant d'été projetant des ombres étirées et sculpturales sur sol en plâtre blanc.",
      },
      en: {
        narrative: "Golden Mediterranean sunset, granular grogged terracotta texture, and burnt sienna warmth.",
        palette: [
          { name: "Terracotta Coral", hex: "#FF665C", role: "Earthy warmth" },
          { name: "Raw Ochre Clay", hex: "#C78C53", role: "Ceramic grain" },
          { name: "Volcanic Ash", hex: "#1D1C1A", role: "Kiln shadow" },
        ],
        typography: "Organic display serif with subtle flared terminals reminiscent of ancient lapidary carvings.",
        materials: "Red grogged stoneware clay, wood-fired in anagama kiln at 1280°C, natural mineral slip glaze.",
        photography: "Low golden summer sun casting elongated sculptural shadows across white chalk plaster floors.",
      },
    },
    designDetails: {
      fr: {
        materialsList: ["Grès chamotté naturel français", "Engobe de cendres de bois", "Cuisson haute température 1280°C", "Étanche pour eau douce"],
        specifications: ["Hauteur : 32 cm | Diamètre max : 24 cm", "Poids : 3.8 kg", "Chaque pièce est unique et signée de l'artisan"],
        innovationNote: "Cuisson anagama de 48 heures sans émail artificiel créant des dégradés de vitrification naturelle sous l'action des cendres volantes.",
      },
      en: {
        materialsList: ["French grogged natural stoneware", "Natural wood-ash slip coating", "High-fire 1280°C kiln cycle", "Vitrified and watertight"],
        specifications: ["Height: 32 cm | Max diameter: 24 cm", "Weight: 3.8 kg", "Each vessel is one-of-a-kind and artisan signed"],
        innovationNote: "48-hour continuous wood firing where airborne fly-ash melts organically into a natural satin vitrified glaze.",
      },
    },
  },
];

export function getProductBySlug(slug: string): ProductProject | undefined {
  return productProjects.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, count = 2): ProductProject[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return productProjects.slice(0, count);

  return productProjects
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category if available, otherwise balanced rotation
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, count);
}
