/**
 * Représente un produit dans le catalogue Kya Fashion.
 * @interface Product
 */
export interface Product {
  /** Identifiant unique du produit */
  id: number;
  /** Nom commercial du produit */
  name: string;
  /** Prix unitaire en euros */
  price: number;
  /** Catégorie du produit (ex: Robes, Vestes...) */
  category: string;
  /** URL de l'image du produit */
  image: string;
  /** Description détaillée pour la fiche produit */
  description: string;
  /** Indique si le produit appartient à la nouvelle collection */
  isNew?: boolean;
}

/**
 * Représente un article ajouté au panier.
 * Étend l'interface Product avec des propriétés spécifiques à la commande.
 * @interface CartItem
 * @extends Product
 */
export interface CartItem extends Product {
  /** Quantité commandée */
  quantity: number;
  /** Taille sélectionnée (ex: S, M, L) */
  selectedSize: string;
}

/**
 * Interface définissant les méthodes et propriétés exposées par le contexte du panier.
 * Permet la gestion globale de l'état du panier dans toute l'application.
 * @interface CartContextType
 */
export interface CartContextType {
  /** Liste des articles actuellement dans le panier */
  cart: CartItem[];
  /** Fonction pour ajouter un produit au panier */
  addToCart: (product: Product, size: string) => void;
  /** Fonction pour retirer un article spécifique (ID + Taille) du panier */
  removeFromCart: (productId: number, size: string) => void;
  /** Fonction pour modifier la quantité d'un article */
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  /** Fonction pour vider intégralement le panier */
  clearCart: () => void;
  /** Montant total du panier en euros */
  total: number;
  /** Nombre total d'articles dans le panier */
  itemCount: number;
}