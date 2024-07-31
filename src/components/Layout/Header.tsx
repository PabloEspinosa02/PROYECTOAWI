import React from 'react';
import { useCart } from '../../pages/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface HeaderProps {
  setIsCartOpen: (isOpen: boolean) => void;
  isProductsPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ setIsCartOpen, isProductsPage }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className={`fixed top-0 left-0 right-0 p-1 flex items-center ${isProductsPage ? 'bg-black' : 'bg-transparent'} text-white z-30`}>
      <div className="flex items-center">
        <img src="/images/logo1.png" alt="Logo" className="h-20 mr-10" />
      </div>
      <nav className="flex flex-grow justify-start space-x-10 text-2xl ml-20">
        <a href="/" className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105">Inicio</a>
        <a href="/products" className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105">Productos</a>
        <a href="https://www.utcancun.edu.mx/" className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105">Página UT</a>
      </nav>
      <div className="flex space-x-4 text-2xl">
        <a href="#iniciar-sesion" className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105">
          <img src="/images/acceso.png" alt="Acceso" className="h-8 w-8" />
        </a>
        <div className="relative flex items-center cursor-pointer" onClick={() => setIsCartOpen(true)}>
          <ShoppingCartIcon fontSize="large" className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItemCount}</span>
          )}
        </div>
        <button className="transition ease-in-out duration-300 hover:text-gray-400 hover:transform hover:-translate-y-1 hover:scale-105">Logout</button>
      </div>
    </header>
  );
};

export default Header;
