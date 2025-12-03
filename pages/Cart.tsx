import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, CheckCircle } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulation du processus de paiement
    // Dans une app réelle, ici se ferait l'appel API vers Stripe/PayPal
    setIsSuccess(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  // Vue de succès après commande (Feedback utilisateur positif)
  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-600 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Commande Confirmée !</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          Merci pour votre achat chez <strong>Kya Fashion</strong>. Votre commande a bien été enregistrée.
          Vous recevrez un email de confirmation avec le numéro de suivi dès l'expédition.
        </p>
        <Link 
          to="/catalogue" 
          onClick={() => setIsSuccess(false)}
          className="px-8 py-3 bg-kya-black text-white rounded-sm font-medium hover:bg-gray-800 transition shadow-lg flex items-center"
        >
          Continuer mes achats <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  // Vue panier vide
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
           <ArrowRight className="text-gray-400 w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">Découvrez nos dernières nouveautés et trouvez votre style.</p>
        <Link 
          to="/catalogue" 
          className="px-8 py-3 bg-kya-black text-white rounded-sm font-medium hover:bg-gray-800 transition"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Votre Panier</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Liste des articles */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product/${item.id}`} className="hover:text-kya-gold transition">{item.name}</Link>
                      </h3>
                      <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Taille: {item.selectedSize}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 disabled:opacity-50 transition"
                        disabled={item.quantity <= 1}
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-medium min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                         className="p-1 hover:bg-gray-100 transition"
                         aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="font-medium text-red-500 hover:text-red-700 flex items-center transition"
                    >
                      <Trash2 size={16} className="mr-1" /> Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Résumé de commande */}
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8 sticky top-24">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h2>

          <div className="flow-root">
            <dl className="-my-4 divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Sous-total</dt>
                <dd className="font-medium text-gray-900">{total.toFixed(2)} €</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Livraison</dt>
                <dd className="font-medium text-green-600">Offerte</dd>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-gray-200 mt-4 pt-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-gray-900">{total.toFixed(2)} €</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center rounded-sm border border-transparent bg-kya-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-kya-gold focus:ring-offset-2 transition transform active:scale-[0.99]"
            >
              Passer la commande <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Paiement 100% sécurisé (Simulation).
            <br/>Aucun débit ne sera effectué.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;