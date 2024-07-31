import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-lg mx-auto">
        <div className="relative">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
          <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-64 object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-800 font-bold text-xl mb-4">${product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600" onClick={onClose}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
