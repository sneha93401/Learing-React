import { Store, Truck } from 'lucide-react';

export default function ItemComp({prodImg, prodTitle, prodDes, prodPrice , handleCart , filteredProducts}) {
 
  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={prodImg}
          alt={prodTitle}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{prodTitle}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{prodDes}</p>

        <div className="mb-4">
          <span className="text-3xl font-bold text-orange-500">${prodPrice}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleBuyNow()}
            className="flex-1 bg-orange-500 hover:bg-orange-600 font-semibold py-3 px-4 rounded-lg transition-all cursor-pointer duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/50"
          >
            <Truck size={18} />
            Buy Now
          </button>

          <button
            onClick={() => handleCart()}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-orange-500 font-semibold py-3 cursor-pointer px-4 rounded-lg border border-orange-500 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30"
          >
            <Store size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}