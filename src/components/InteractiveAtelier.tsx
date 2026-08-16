import React, { useState } from 'react';

type BoxSize = 'S' | 'M' | 'L';

interface Addon {
  id: string;
  name: string;
  price: number;
}

const ADDONS: Addon[] = [
  { id: 'honey', name: 'Normandy Honey Glaze', price: 2 },
  { id: 'valrhona', name: 'Valrhona Chocolate Batons', price: 3 },
  { id: 'almond', name: 'Toasted Almond Crumble', price: 2 },
];

export const InteractiveAtelier: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<BoxSize>('M');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['honey']);
  const [isOrdered, setIsOrdered] = useState(false);

  const basePrices: Record<BoxSize, { label: string; count: string; price: number }> = {
    S: { label: 'Small Box', count: '4 Pastries', price: 16 },
    M: { label: 'Medium Box', count: '6 Pastries', price: 24 },
    L: { label: 'Grand Box', count: '12 Pastries', price: 44 },
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePrices[selectedSize].price + addonsTotal;

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 2000);
  };

  return (
    <section id="section-atelier" className="atelier-section">
      <div className="section-container">
        <div className="atelier-split">
          {/* Left Column: Interactive Platter Preview */}
          <div className="atelier-preview-col">
            <div className="platter-frame">
              <img
                src="/images/custom_platter.jpg"
                alt="Artisanal Ingredients Platter"
                className="platter-img"
              />
              <div className="platter-live-tag">
                <span className="live-dot"></span>
                <span>{basePrices[selectedSize].count} Selected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="atelier-config-col">
            <span className="section-tag">INTERACTIVE ATELIER</span>
            <h2 className="section-title">BUILD YOUR MASTERPIECE</h2>
            <p className="section-desc">
              Choose your box size, select artisanal finishing glazes, and let our master bakers bake it fresh for your pickup.
            </p>

            {/* Size Selector */}
            <div className="config-group">
              <label className="config-label">1. SELECT BOX SIZE</label>
              <div className="size-selector-pills">
                {(['S', 'M', 'L'] as BoxSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span className="size-letter">{size}</span>
                    <span className="size-meta">{basePrices[size].count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Addon Options */}
            <div className="config-group">
              <label className="config-label">2. ARTISANAL FINISHINGS</label>
              <div className="addons-grid">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      className={`addon-tile ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <span className="addon-check">{isChecked ? '✓' : '+'}</span>
                      <span className="addon-name">{addon.name}</span>
                      <span className="addon-price">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="config-footer">
              <div className="total-price-wrap">
                <span className="total-label">TOTAL PRICE</span>
                <span className="total-val">${totalPrice}</span>
              </div>
              <button
                type="button"
                className={`btn-build-box ${isOrdered ? 'ordered' : ''}`}
                onClick={handleOrder}
              >
                {isOrdered ? '✓ BUNDLE ADDED!' : 'ADD MASTERPIECE BOX'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
