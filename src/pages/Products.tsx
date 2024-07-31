import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { useCart } from './CartContext'; // Importar el contexto del carrito

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart(); // Obtener la función addToCart del contexto

  useEffect(() => {
    axios.get('http://localhost:5171/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart({ ...product, quantity });
    setModalIsOpen(false); // Cerrar el modal después de agregar al carrito
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 mt-24">
      <h2 className="text-4xl font-bold text-center mb-8">Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentPageData.map(product => (
          <div key={product.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-48 object-contain"/>
            <button onClick={() => openModal(product)} className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Quick View</button>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold mt-2">${product.price}</p>
            </div>
            <div className="p-4 bg-gray-100">
              <button onClick={() => handleAddToCart(product, 1)} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      {selectedProduct && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Quick View"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)', // Sombra en el fondo
            },
            content: {
              width: '70%', // Ajustar tamaño del modal
              height: 'auto',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'row', // Alinear imagen y detalles lado a lado
              justifyContent: 'space-between',
              padding: '20px',
            }
          }}
        >
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">X</button>
          <img src={selectedProduct.imageUrl || 'https://via.placeholder.com/150'} alt={selectedProduct.name} className="w-1/2 h-auto object-contain"/>
          <div className="p-4 w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="text-gray-800 font-bold mt-4">${selectedProduct.price}</p>
            <div className="mt-4">
              <label className="block text-gray-700">Cantidad:</label>
              <input type="number" className="border rounded w-16 p-2" defaultValue={1} min={1} />
            </div>
            <button onClick={() => handleAddToCart(selectedProduct, 1)} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mt-4">Añadir al Carrito</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
