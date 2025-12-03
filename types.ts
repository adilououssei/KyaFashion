/**
 * Représente un produit dans le catalogue.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
}

/**
 * Représente un article dans le panier, incluant la quantité et la taille choisie.
 */
export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

/**
 * Définition du contexte du panier pour la gestion d'état globale.
 */
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}