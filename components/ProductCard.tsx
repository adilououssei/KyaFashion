import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[3/4] overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-kya-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
            Nouveau
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-sm font-bold text-gray-900 mb-2 truncate">
          <Link to={`/product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-kya-black">{product.price.toFixed(2)} €</p>
          <div className="bg-gray-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;