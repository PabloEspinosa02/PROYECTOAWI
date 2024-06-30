import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  userId: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = 4; // Esto debería ser dinámico, basado en el usuario autenticado

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5171/api/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('There was an error fetching the cart items!', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Carrito de Compras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={item.product.imageUrl || 'https://via.placeholder.com/150'} alt={item.product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-gray-800 font-bold mt-2">${item.product.price}</p>
            </div>
            <div className="p-4 bg-gray-100">
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default Cart;
