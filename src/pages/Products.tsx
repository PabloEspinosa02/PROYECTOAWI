import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5171/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold mt-2">${product.price}</p>
            </div>
            <div className="p-4 bg-gray-100">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
