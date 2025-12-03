import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CartItem, CartContextType, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider pour gérer l'état global du panier d'achat.
 * Persiste les données dans le localStorage pour conserver le panier au rechargement.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialisation depuis le localStorage si disponible
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('kya-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erreur lors de la lecture du panier:", error);
      return [];
    }
  });

  // Sauvegarde dans le localStorage à chaque modification du panier
  useEffect(() => {
    localStorage.setItem('kya-cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Ajoute un produit au panier. Si le produit (même ID et même taille) existe déjà,
   * incrémente simplement la quantité.
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
   * Retire un article spécifique du panier.
   */
  const removeFromCart = (productId: number, size: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  /**
   * Met à jour la quantité d'un article.
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

  const clearCart = () => setCart([]);

  // Calculs dérivés
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte du panier.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};