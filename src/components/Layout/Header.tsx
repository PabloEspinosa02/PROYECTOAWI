import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-transparent text-white z-20">
      <div className="flex items-center">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" className="h-24 mr-8" /> {/* Ajuste del tamaño del logo */}
      </div>
      <nav className="flex-grow flex justify-center space-x-8 text-2xl"> {/* Ajuste del tamaño del texto y centrado */}
        <a href="#inicio" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">Inicio</a>
        <a href="#productos" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">Productos</a>
        <a href="#ut" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">Página UT</a>
      </nav>
      <div className="flex space-x-4 text-2xl">
        <a href="#crear-cuenta" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">Crear Cuenta</a>
        <a href="#linea" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">|</a>
        <a href="#iniciar-sesion" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110">Iniciar sesión</a>
        <div className="flex items-center">
          <ShoppingCartIcon fontSize="large" className="transition ease-in-out duration-300 hover:text-gray-400 hover:-translate-y-1 hover:scale-110" />
          <span>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

