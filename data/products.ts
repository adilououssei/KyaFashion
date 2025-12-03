import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Veste en Jean Vintage",
    price: 59.99,
    category: "Vestes",
    image: "https://picsum.photos/id/338/500/700",
    description: "Une veste en jean classique avec une coupe oversize tendance. Parfaite pour la mi-saison.",
    isNew: true
  },
  {
    id: 2,
    name: "Robe d'Été Fleurie",
    price: 45.50,
    category: "Robes",
    image: "https://picsum.photos/id/342/500/700",
    description: "Légère et aérienne, cette robe est idéale pour les journées ensoleillées.",
    isNew: true
  },
  {
    id: 3,
    name: "T-shirt Minimaliste Blanc",
    price: 25.00,
    category: "Hauts",
    image: "https://picsum.photos/id/103/500/700",
    description: "Le basique indispensable. Coton bio de haute qualité."
  },
  {
    id: 4,
    name: "Pantalon Chino Beige",
    price: 39.99,
    category: "Pantalons",
    image: "https://picsum.photos/id/177/500/700",
    description: "Élégant et confortable, se porte aussi bien au bureau qu'en soirée."
  },
  {
    id: 5,
    name: "Blouson Cuir Synthétique",
    price: 89.90,
    category: "Vestes",
    image: "https://picsum.photos/id/237/500/700",
    description: "Un look rock sans compromis sur l'éthique. Finitions soignées."
  },
  {
    id: 6,
    name: "Pull en Maille Douce",
    price: 49.95,
    category: "Hauts",
    image: "https://picsum.photos/id/250/500/700",
    description: "Chaleur et confort pour l'hiver. Coupe ajustée."
  },
  {
    id: 7,
    name: "Sneakers Urbaines",
    price: 75.00,
    category: "Chaussures",
    image: "https://picsum.photos/id/1011/500/700",
    description: "Design moderne pour arpenter la ville avec style.",
    isNew: true
  },
  {
    id: 8,
    name: "Sac à Main Cuir",
    price: 65.00,
    category: "Accessoires",
    image: "https://picsum.photos/id/1069/500/700",
    description: "Pratique et chic, emportez vos essentiels partout."
  }
];

export const getFeaturedProducts = () => products.filter(p => p.isNew).slice(0, 4);