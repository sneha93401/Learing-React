import { Store } from "lucide-react";
import { useMemo, useState } from "react";
import ItemComp from "./ItemComp";
function ParentComp() {
  const ProductData = [
    {
      id: 1,
      title: "Wireless Headphones",
      description:
        "Premium noise-canceling headphones with 30-hour battery life",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Smart Watch Pro",
      description: "Track your fitness goals with advanced health monitoring",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Laptop Stand",
      description: "Ergonomic aluminum stand for improved posture and comfort",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Mechanical Keyboard",
      description: "RGB backlit gaming keyboard with tactile switches",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Wireless Mouse",
      description: "Precision gaming mouse with adjustable DPI settings",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      title: "USB-C Hub",
      description: "7-in-1 hub with HDMI, USB 3.0, and SD card reader",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Portable SSD",
      description: "1TB external storage with lightning-fast transfer speeds",
      price: 119.99,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
    },
    {
      id: 8,
      title: "Webcam HD",
      description: "1080p webcam with auto-focus and built-in microphone",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    },
    {
      id: 9,
      title: "Desk Lamp LED",
      description: "Adjustable brightness and color temperature desk lamp",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    },
    {
      id: 10,
      title: "Phone Stand",
      description: "Adjustable phone holder for desk and bedside table",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop",
    },
    {
      id: 11,
      title: "Bluetooth Speaker",
      description: "Waterproof portable speaker with 12-hour playtime",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    },
    {
      id: 12,
      title: "Cable Organizer",
      description: "Keep your cables tidy with this sleek management system",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1626954610461-c1a8c4734c20?w=500&h=500&fit=crop",
    },
    {
      id: 13,
      title: "Monitor 27 inch",
      description: "4K UHD display with HDR and 144Hz refresh rate",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
    },
    {
      id: 14,
      title: "Gaming Chair",
      description:
        "Ergonomic chair with lumbar support and adjustable armrests",
      price: 279.99,
      image:
        "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&h=500&fit=crop",
    },
    {
      id: 15,
      title: "Tablet 10 inch",
      description: "Lightweight tablet perfect for reading and streaming",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
    },
  ];

  const [cartState, setCartState] = useState(0);

  const handleCart = () => {
    setCartState(cartState + 1);
  };
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = useMemo(() => {
  return ItemComp.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [searchTerm]);

  return (
    <>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-orange-500">Tech</span> Store
            </h1>
            <p className="text-gray-400 text-lg">
              Discover amazing products at great prices
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-orange-500">
              <Store size={24} />
              <span className="font-semibold">{cartState} items in cart</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            className="mt-6 w-full md:w-1/2 mx-auto block p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2.5 gap-8">

            {ProductData.map((product) => (
              <ItemComp
                key={product.id}
                prodImg={product.image}
                prodTitle={product.title}
                prodDes={product.description}
                prodPrice={product.price}
                handleCart={handleCart}
                filteredProducts = {filteredProducts}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentComp;
