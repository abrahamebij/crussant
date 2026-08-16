import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'classic',
    name: 'Margherita Croissant',
    price: '$4.50',
    image: '/images/croissant_classic.jpg',
    description: 'The queen of our atelier. 84% PDO Normandy butter, 72-hour cold-fermented dough, flaking golden honeycomb.',
  },
  {
    id: 'chocolat',
    name: 'Pain au Chocolat',
    price: '$5.25',
    image: '/images/pain_au_chocolat.jpg',
    description: 'Double batons of 64% Valrhona dark chocolate folded into crisp, butter-rich laminated pastry layers.',
  },
  {
    id: 'amande',
    name: 'Amande Frangipane',
    price: '$5.75',
    image: '/images/almond_croissant.jpg',
    description: 'Filled with velvety almond cream, topped with toasted sliced almonds and dusted confectioners sugar.',
  },
];

export const SignatureBakes: React.FC = () => {
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAdd = (id: string) => {
    setAddedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== id));
    }, 1800);
  };

  return (
    <section id="section-menu" className="signature-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-split">
          <div className="header-left">
            <span className="section-tag">OUR CLASSICS</span>
            <h2 className="section-title">SIGNATURE BAKES</h2>
          </div>
          <div className="header-right">
            <p className="section-desc">
              Each croissant is a masterclass in French viennoiserie. 81 honeycomb layers, stone-milled heirloom flour, baked to crisp perfection every morning.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {PRODUCTS.map((prod) => {
            const isAdded = addedIds.includes(prod.id);
            return (
              <div key={prod.id} className="product-card">
                <div className="product-image-wrap">
                  <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                  <span className="product-price-badge">{prod.price}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>
                  <button
                    className={`btn-add-cart ${isAdded ? 'added' : ''}`}
                    onClick={() => handleAdd(prod.id)}
                  >
                    {isAdded ? '✓ ADDED TO CART' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
