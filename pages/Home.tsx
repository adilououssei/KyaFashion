import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/445/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            NOUVELLE COLLECTION
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
            Découvrez les tendances de la saison. Style audacieux pour une génération en mouvement.
          </p>
          <Link 
            to="/catalogue" 
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-sm text-kya-black bg-white hover:bg-gray-100 transition duration-300"
          >
            Acheter maintenant <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Populaires</h2>
            <p className="mt-2 text-gray-500">Nos meilleures ventes du moment.</p>
          </div>
          <Link to="/catalogue" className="hidden md:flex items-center text-sm font-semibold text-kya-gold hover:text-yellow-600">
            Voir tout <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
           <Link to="/catalogue" className="inline-flex items-center text-sm font-semibold text-kya-gold hover:text-yellow-600">
            Voir tout <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-kya-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600 text-sm">Expédition en 48h pour toute commande.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">Retour Gratuit</h3>
              <p className="text-gray-600 text-sm">30 jours pour changer d'avis.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">Transactions 100% sécurisées.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;