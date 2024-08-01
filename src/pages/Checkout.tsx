import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from './CartContext';
import axios from 'axios';
import { IMercadoPagoItem } from '../interfaces/IMercadoPagoItem';

// Inicializa MercadoPago con tu clave de prueba
initMercadoPago('TEST-f45a5a82-69b7-4ac0-810d-6e3afbc816e9', {
  locale: "es-MX"
});

const Checkout: React.FC = () => {
  const { cart, total } = useCart();
  const [preferenceId, setPreferenceId] = useState<string>('');
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {

    handlePayment()

    const generatePreferenceId = async () => {
      try {
        const response = await axios.post('/api/payments/create-payment', {
          transactionAmount: total,
          token: 'fake-token', // Reemplaza con el token real si es necesario
          description: 'Compra en TiendaUT',
          installments: 1,
          paymentMethodId: 'visa', // Reemplaza con el ID de método de pago real si es necesario
          payer: { email: 'payer@example.com' }
        });
        setPreferenceId(response.data.id);
      } catch (error) {
        console.error('Error al generar la preferencia de pago:', error);
      }
    };

    if (total > 0) {
      generatePreferenceId();
    }
  }, [total]);

  const handleMercadoPago = async (token: string, paymentMethodId: string) => {
    try {
      const response = await axios.post('/api/payments/create-payment', {
        transactionAmount: total,
        token,
        description: 'Compra en TiendaUT',
        installments: 1,
        paymentMethodId,
        payer: { email: 'payer@example.com' }
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error al procesar con MercadoPago:', error);
    }
  };

  const handlePayPal = async () => {
    try {
      const response = await axios.post('/api/payments/create-paypal-order', { amount: total });
      if (response.data && response.data.links) {
        const approvalUrl = response.data.links.find((link: any) => link.rel === "approve").href;
        window.location.href = approvalUrl;
      }
    } catch (error) {
      console.error('Error al procesar con PayPal:', error);
    }
  };


  const handlePayment = async () => {
    const preferenceId = await createPreference();
    if (preferenceId) {
      setPreferenceId(preferenceId)
      console.log('ID obtenido:', preferenceId);
      
    }
  }

  const createPreference = async () => {
    try {

      const postData: IMercadoPagoItem[] = cart.map((item) => ({
        id: item.id.toString(),
        title: item.name,
        description: item.name,
        pictureUrl: item.imageUrl,
        quantity: item.quantity,
        unitPrice: Math.round(Number(item.price)), 
      }));

      console.log(postData);
      
      
      const response = await axios.post('http://localhost:5171/api/Payments/create-preference', postData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      console.log(response.data);
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md flex max-w-6xl w-full">
        {/* Carrito de Compras */}
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
            <a href="/" className="text-blue-500">Continue Shopping</a>
          </div>
          <div>
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">${item.price}</span>
                  <div className="flex items-center">
                    <button className="text-gray-500">+</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="text-gray-500">-</button>
                  </div>
                  <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Detalles de Pago */}
        <div className="w-1/3 bg-blue-500 text-white rounded-r-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
          <div className="mb-4">
            <label className="block mb-1">Payment Methods</label>
            <div className="flex space-x-4">
              <img src="/images/visa.png" alt="Visa" className="h-8" />
              <img src="/images/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Total Amount</label>
            <p className="text-lg font-semibold">${total}</p>
          </div>

          <div className="flex flex-col space-y-4 mb-6">
            <button 
              // onClick={() => handleMercadoPago('fake-token', 'visa')} 
              onClick={() => handlePayment()}
              className="bg-green-500 w-full py-3 rounded text-lg font-semibold">
              Pagar con Mercado Pago
            </button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
            <PayPalScriptProvider options={{
              clientId: "AU9UVcWCW38gPF0aYqqB1KUsRj7eLP4EvOTraH98yH0j-cwFxkEo2qQV17t6rPH67p8B5bTHRsXiZ597",
              "enable-funding": "venmo",
              country: "MX",
              currency: "MXN"
            }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async () => {
                  try {
                    const response = await fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ cart }),
                    });
                    const orderData = await response.json();
                    if (orderData.id) return orderData.id;
                    throw new Error("Failed to create order");
                  } catch (error) {
                    console.error(error);
                    setMessage(`Could not initiate PayPal Checkout...${error}`);
                  }
                }}
                onApprove={async (data, _actions) => {
                  try {
                    const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });
                    const orderData = await response.json();
                    const transaction = orderData.purchase_units[0].payments.captures[0];
                    setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
                  } catch (error) {
                    console.error(error);
                    setMessage(`Sorry, your transaction could not be processed...${error}`);
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
          
          {paymentCompleted && <p>Pago completado con éxito</p>}
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
