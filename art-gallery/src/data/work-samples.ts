import type { WorkSample } from "@/types/work";

// Original silent concept ads rendered from this project's product imagery.
// Rebuild with: node scripts/render-product-ads.mjs
export const workSamples: WorkSample[] = [
  {
    id: "aura-skin-ad", title: "A softer kind of ritual", brand: "AURA SKIN",
    category: { fr: "Beauté / Film produit", en: "Beauty / Product film" },
    description: {
      fr: "Une lumière douce, des textures minérales et un rituel quotidien. Publicité conceptuelle créée par PopArt Agency, sans audio.",
      en: "Soft light, mineral textures and an everyday ritual. A silent concept advertisement created by PopArt Agency.",
    },
    alt: { fr: "Flacon et coffret AURA SKIN sur un socle en pierre", en: "AURA SKIN bottle and packaging on a stone plinth" },
    media: { type: "video", src: "/videos/aura-skin.mp4", poster: "/videos/aura-skin-poster.jpg", mime: "video/mp4", duration: 10, width: 1280, height: 720 },
    featured: true, layout: "wide",
  },
  {
    id: "soniq-lab-ad", title: "Find your frequency", brand: "SONIQ LAB",
    category: { fr: "Audio / Film produit", en: "Audio / Product film" },
    description: {
      fr: "Un casque sculptural, des ondes graphiques et un format vertical pensé pour le social. Publicité conceptuelle créée par PopArt Agency, sans audio.",
      en: "Sculptural headphones and graphic sound waves, composed for a vertical social format. A silent concept advertisement created by PopArt Agency.",
    },
    alt: { fr: "Casque SONIQ LAB en métal brossé et cuir noir", en: "SONIQ LAB headphones in brushed metal and black leather" },
    media: { type: "video", src: "/videos/soniq-lab.mp4", poster: "/videos/soniq-lab-poster.jpg", thumbnail: "/videos/soniq-lab-thumbnail.jpg", mime: "video/mp4", duration: 10, width: 720, height: 960 },
    featured: true, layout: "standard",
  },
  {
    id: "noir-edition-ad", title: "Leave an impression", brand: "NOIR ÉDITION",
    category: { fr: "Parfum / Film produit", en: "Fragrance / Product film" },
    description: {
      fr: "Le verre, l'ombre et la lumière ambrée composent un film de parfum à l'allure éditoriale. Publicité conceptuelle créée par PopArt Agency, sans audio.",
      en: "Glass, shadow and amber light shape an editorial fragrance film. A silent concept advertisement created by PopArt Agency.",
    },
    alt: { fr: "Flacon de parfum NOIR ÉDITION dans une lumière ambrée", en: "NOIR ÉDITION fragrance bottle in amber light" },
    media: { type: "video", src: "/videos/noir-edition.mp4", poster: "/videos/noir-edition-poster.jpg", mime: "video/mp4", duration: 10, width: 1280, height: 720 },
    featured: true, layout: "standard",
  },
];
