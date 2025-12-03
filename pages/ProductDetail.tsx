import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Check, ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Produit introuvable</h2>
        <button onClick={() => navigate('/catalogue')} className="mt-4 text-kya-gold hover:underline">
          Retour au catalogue
        </button>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm text-gray-500 hover:text-kya-black mb-8 transition"
      >
        <ArrowLeft size={16} className="mr-1" /> Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-kya-black mb-6">{product.price.toFixed(2)} €</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Taille</h3>
            <div className="flex space-x-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border transition ${
                    selectedSize === size
                      ? 'border-kya-black bg-kya-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full md:w-auto px-8 py-4 flex items-center justify-center rounded-sm text-base font-bold transition duration-300 ${
              isAdded 
                ? 'bg-green-600 text-white'
                : 'bg-kya-black text-white hover:bg-gray-800'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="mr-2" size={20} /> Ajouté au panier
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2" size={20} /> Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;