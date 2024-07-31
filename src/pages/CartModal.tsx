import React from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onRequestClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 40 // Ensure the modal is above other elements
        },
        content: {
          top: '10%', // Adjust the top position as needed
          right: '0',
          bottom: '10%', // Adjust the bottom position as needed
          left: 'auto',
          width: '30%', // Adjust the width as needed
          marginRight: '0',
          padding: '0',
          borderRadius: '0',
          border: 'none',
          zIndex: 50 // Ensure the modal is above other elements
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-semibold">Carrito de Compras</h2>
          <button onClick={onRequestClose} className="text-2xl">&times;</button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover mr-4" />
                    <div>
                      <h3 className="text-lg">{item.name}</h3>
                      <p>{item.quantity} x ${item.price}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">&times;</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">${totalPrice}</span>
          </div>
          <button onClick={clearCart} className="bg-red-500 text-white w-full py-2 rounded-md mb-2">Vaciar Carrito</button>
          <Link to="/checkout">
            <button onClick={onRequestClose} className="bg-blue-500 text-white w-full py-2 rounded-md">Proceder al Pago</button>
          </Link>
          <button onClick={onRequestClose} className="bg-gray-300 text-black w-full py-2 rounded-md">Cerrar</button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
