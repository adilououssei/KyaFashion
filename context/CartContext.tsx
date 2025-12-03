import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CartItem, CartContextType, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider CartProvider
 * Composant React qui enveloppe l'application pour fournir l'état du panier.
 * Gère la persistance des données via localStorage.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialisation de l'état du panier.
  // On tente de récupérer une sauvegarde locale au démarrage.
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('kya-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erreur lors de la lecture du panier:", error);
      return [];
    }
  });

  // Effet de bord : Sauvegarde le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('kya-cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Ajoute un produit au panier.
   * Logique métier :
   * - Si le produit (même ID et même taille) existe déjà, on incrémente la quantité.
   * - Sinon, on ajoute une nouvelle entrée.
   */
  const addToCart = (product: Product, size: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prevCart.map(item =>
          (item.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  /**
   * Retire un article du panier.
   * La suppression se fait sur la combinaison ID + Taille.
   */
  const removeFromCart = (productId: number, size: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  /**
   * Met à jour la quantité d'un article.
   * Empêche la quantité de descendre en dessous de 1.
   */
  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === productId && item.selectedSize === size)
          ? { ...item, quantity }
          : item
      )
    );
  };

  /** Vide entièrement le panier */
  const clearCart = () => setCart([]);

  // Calculs dérivés pour l'affichage (évite de stocker ces valeurs dans le state)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personnalisé useCart
 * Permet d'accéder au contexte du panier depuis n'importe quel composant enfant.
 * Lève une erreur si utilisé hors du CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};