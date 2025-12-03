import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">À Propos de Kya Fashion</h1>
          <div className="w-24 h-1 bg-kya-gold mx-auto"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 h-64">
             <img 
               src="https://picsum.photos/id/447/1200/400" 
               alt="Team working" 
               className="w-full h-full object-cover" 
             />
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fondée avec la conviction que la mode doit être accessible, audacieuse et authentique, 
              <strong>Kya Fashion</strong> est une marque de vêtements tendance dédiée aux jeunes adultes. 
              Nous croyons que chaque vêtement raconte une histoire, la vôtre.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre équipe passionnée de 10 employés travaille chaque jour pour dénicher les styles 
              les plus en vogue et les rendre disponibles en quelques clics. En pleine croissance, 
              notre nouvelle plateforme de vente en ligne marque une étape cruciale dans notre développement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-kya-gray rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌱</div>
                <h3 className="font-bold text-gray-900 mb-2">Croissance</h3>
                <p className="text-sm text-gray-500">Une entreprise dynamique en pleine expansion.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-kya-gray rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">Tendance</h3>
                <p className="text-sm text-gray-500">Toujours à l'affût des dernières modes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-kya-gray rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">❤️</div>
                <h3 className="font-bold text-gray-900 mb-2">Passion</h3>
                <p className="text-sm text-gray-500">Une équipe dévouée à votre style.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;