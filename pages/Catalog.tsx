import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Filter } from 'lucide-react';

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'Tous' 
      ? products 
      : products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">Catalogue</h1>
        
        {/* Simple Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Filter size={18} className="text-gray-500 mr-2 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-kya-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Aucun produit trouvé dans cette catégorie.
        </div>
      )}
    </div>
  );
};

export default Catalog;