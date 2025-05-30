import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

const ThankYouPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isCheckingCart, setIsCheckingCart] = useState(true);

  useEffect(() => {
    if (!cart || cart.items.length < 1) {
      navigate('/');
    } else {
      setIsCheckingCart(false); // only render when cart is valid
    }
  }, [cart, navigate]);

  if (isCheckingCart) return null;

  const { orderNumber, timestamp } = cart.orderResult;
  const { items, variant, quantity, orderSummary, customerInfo } = cart;

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600">
              Your order has been successfully placed. We've sent a confirmation to your email.
            </p>
          </div>

          <div className="border-b border-gray-200 mb-6 pb-6">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Order Number:</span> {orderNumber}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Order Date:</span>{' '}
              {new Date(timestamp).toLocaleString()}
            </p>

            {items.map((item, index) => {
              const { product, variant, quantity } = item;
              return (
                <div key={index} className="flex items-start mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">Variant: {variant.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                    <p className="text-sm font-medium mt-1">{formatCurrency(product.price)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
              <p className="text-gray-700">{customerInfo.fullName}</p>
              <p className="text-gray-700">{customerInfo.address}</p>
              <p className="text-gray-700">
                {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}
              </p>
              <p className="text-gray-700">{customerInfo.email}</p>
              <p className="text-gray-700">{customerInfo.phone}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Payment Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(orderSummary.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatCurrency(orderSummary.shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(orderSummary.total)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Payment method: Card ending in {customerInfo.cardNumber.slice(-4)}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-block py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
