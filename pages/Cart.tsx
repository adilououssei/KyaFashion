import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-serif font-bold mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">Il semblerait que vous n'ayez pas encore trouvé votre bonheur.</p>
        <Link 
          to="/catalogue" 
          className="px-8 py-3 bg-kya-black text-white rounded-sm font-medium hover:bg-gray-800 transition"
        >
          Découvrir la collection
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    alert("Simulation: Commande validée ! Merci de votre achat chez Kya Fashion.");
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Votre Panier</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Cart Items */}
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
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Taille: {item.selectedSize}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                         className="p-1 hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="font-medium text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de la commande</h2>

          <div className="flow-root">
            <dl className="-my-4 divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Sous-total</dt>
                <dd className="font-medium text-gray-900">{total.toFixed(2)} €</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Livraison</dt>
                <dd className="font-medium text-gray-900">Offerte</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-gray-900">{total.toFixed(2)} €</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center rounded-sm border border-transparent bg-kya-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-kya-gold focus:ring-offset-2 focus:ring-offset-gray-50 transition"
            >
              Passer la commande <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Paiement 100% sécurisé via notre plateforme simulée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;