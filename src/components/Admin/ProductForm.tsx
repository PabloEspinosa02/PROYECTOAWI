import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, product, onCancel, onUpdate }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (product) {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setUrlImage(product.imageUrl);
    } else {
        setName('');
        setPrice('');
        setDescription('');
        setUrlImage('');
    }
  }, [product]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ id: product?.id, name, price });
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    onSubmit({ name, price, description, imageUrl: urlImage });
    setName('');
    setPrice('');
    setDescription('');
    setUrlImage('');
  }

    const handleUpdate = (e: any) => {
        e.preventDefault();
        onUpdate( product.id, { name, price, description, imageUrl: urlImage }); 
        setName('');
        setPrice('');
        setDescription('');
        setUrlImage('');
    }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">URL de la Imagen</label>
        <input
          type="text"
          value={urlImage}
          onChange={(e) => setUrlImage(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={product ? handleUpdate : handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {product ? 'Actualizar' : 'Agregar'}
        </button>
        {product && (
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
