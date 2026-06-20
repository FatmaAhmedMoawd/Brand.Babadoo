import React from 'react';
import { ProductItem } from '../types';

export const TopProducts: React.FC = () => {
  const products: ProductItem[] = [
    {
      id: 1,
      name: 'Premium Beef Burger',
      category: 'Main Course',
      totalSales: '15.4k EGP',
      change: '+24.5%',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      category: 'Main Course',
      totalSales: '12.3k EGP',
      change: '+18.2%',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Grilled Chicken Special',
      category: 'Main Course',
      totalSales: '10.9k EGP',
      change: '+32.7%',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Crispy French Fries',
      category: 'Side Dish',
      totalSales: '9.2k EGP',
      change: '+15.8%',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div id="top-products-card" className="bg-white border border-gray-100 rounded-[24px] p-3.5 xs:p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full w-full overflow-hidden">
      {/* Card Header section */}
      <div id="top-products-header" className="flex items-center justify-between mb-6">
        <h2 id="top-products-title" className="text-xl font-bold font-cairo text-gray-900 leading-none">
          Top Selling Products
        </h2>
        <button
          id="top-products-view-all"
          className="text-base font-bold font-cairo text-[#AE6727] hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Product List space */}
      <div id="top-products-list" className="space-y-[18px]">
        {products.map((prod) => (
          <div
            key={prod.id}
            id={`product-row-${prod.id}`}
            className="flex items-center justify-between gap-1.5 xs:gap-3 sm:gap-4 group hover:bg-gray-50/50 p-1 rounded-2xl transition-colors text-start"
          >
            {/* Rank Number + Product Thumbnail details */}
            <div id={`product-info-left-${prod.id}`} className="flex items-center gap-1.5 xs:gap-3 sm:gap-4 flex-1 min-w-0">
              {/* Product Rank Number index */}
              <span id={`product-rank-${prod.id}`} className="text-sm sm:text-lg font-bold font-mono text-gray-400 w-4 sm:w-5 text-center shrink-0">
                {prod.id}
              </span>

              {/* Product image with referrerPolicy */}
              <img
                id={`product-image-${prod.id}`}
                src={prod.image}
                alt={prod.name}
                width={56}
                height={56}
                style={{ aspectRatio: '1/1' }}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl object-cover border border-gray-100 shadow-xs shrink-0 flex-shrink-0"
                referrerPolicy="no-referrer"
              />

              {/* Title & category */}
              <div id={`product-text-meta-${prod.id}`} className="min-w-0">
                <h3 id={`product-name-${prod.id}`} className="font-bold text-gray-900 font-cairo text-sm sm:text-[16px] leading-5 sm:leading-6 truncate group-hover:text-[#AE6727] transition-colors">
                  {prod.name}
                </h3>
                <p id={`product-category-${prod.id}`} className="text-gray-400 font-cairo text-xs sm:text-sm mt-0.5 font-medium">
                  {prod.category}
                </p>
              </div>
            </div>

            {/* Total Sales count & change block */}
            <div id={`product-financials-block-${prod.id}`} className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-6 shrink-0 text-end">
              <div id={`product-sales-count-${prod.id}`} className="flex flex-col select-none leading-none">
                <span className="hidden xs:block text-[9.5px] sm:text-[12px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
                  Total Sales
                </span>
                <span className="font-bold text-gray-950 font-sans text-xs xs:text-sm sm:text-[17px] mt-0.5 leading-none">
                  {prod.totalSales}
                </span>
              </div>

              {/* Percentage Indicator Box */}
              <span
                id={`product-percent-badge-${prod.id}`}
                className="inline-flex items-center py-0.5 px-1.5 sm:py-1.5 sm:px-3 rounded-lg text-[9.5px] sm:text-xs font-black font-sans text-green-600 bg-green-50 border border-green-100/60 leading-none"
              >
                {prod.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
