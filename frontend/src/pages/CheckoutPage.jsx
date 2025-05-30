import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import FormField from '../components/FormField';
import { formatCardNumber, formatExpiryDate } from '../utils/formatters';
import {
  validateEmail,
  validatePhone,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateZip,
  validateRequired,
} from '../utils/validators';

const CheckoutPage = ({ backendUrl }) => {
  const navigate = useNavigate();
  const { cart, setOrderResult, setCustomerInfo } = useCart();
  const itemCount = parseInt(cart.items.reduce((total, item) => total + item.quantity, 0));

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState('approved');
  const [apiError, setApiError] = useState('');
  const [isCheckingCart, setIsCheckingCart] = useState(true);

  useEffect(() => {
    if (!cart || cart.items.length < 1) {
      navigate('/');
    } else {
      setIsCheckingCart(false); // only render when cart is valid
    }
  }, [cart, navigate]);

  if (isCheckingCart) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    let formattedValue = value;
    if (id === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (id === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setFormData({
      ...formData,
      [id]: formattedValue,
    });

    // Clear error for this field when user is typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    [
      'fullName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'cardNumber',
      'expiryDate',
      'cvv',
    ].forEach((field) => {
      if (!validateRequired(formData[field])) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., 555-123-4567)';
    }

    // Card validation
    if (formData.cardNumber && !validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry validation
    if (formData.expiryDate && !validateExpiry(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid future expiry date (MM/YY)';
    }

    // CVV validation
    if (formData.cvv && !validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }

    // Zip code validation
    if (formData.zipCode && !validateZip(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitCheckout = async () => {
    setIsSubmitting(true);
    setApiError('');

    const payload = {
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      items: cart.items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        variant: item.product.variant,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.orderSummary.total,
      transactionStatus: transactionType,
    };

    try {
      const response = await fetch(`${backendUrl}/api/v1/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Checkout failed');
      }

      const result = await response.json();
      // save or show confirmation
      setOrderResult(result);
      setCustomerInfo(formData);
      navigate('/thank-you');
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  error={errors.fullName}
                  required
                  className="md:col-span-2"
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  error={errors.email}
                  required
                />
                <FormField
                  label="Phone Number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="555-123-4567"
                  error={errors.phone}
                  required
                />
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                  error={errors.address}
                  required
                  className="md:col-span-2"
                />
                <FormField
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  error={errors.city}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="State"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    error={errors.state}
                    required
                  />
                  <FormField
                    label="ZIP Code"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    error={errors.zipCode}
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Card Number"
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  error={errors.cardNumber}
                  required
                  maxLength={19}
                  className="md:col-span-2"
                />
                <FormField
                  label="Expiry Date (MM/YY)"
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  error={errors.expiryDate}
                  required
                  maxLength={5}
                />
                <FormField
                  label="CVV"
                  id="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  error={errors.cvv}
                  required
                  maxLength={3}
                  type="password"
                />
              </div>

              <div className="mt-8 mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Transaction Simulation</h3>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transactionType"
                      value="approved"
                      checked={transactionType === 'approved'}
                      onChange={() => setTransactionType('approved')}
                      className="mr-2"
                    />
                    <span className="text-sm">Approved</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transactionType"
                      value="declined"
                      checked={transactionType === 'declined'}
                      onChange={() => setTransactionType('declined')}
                      className="mr-2"
                    />
                    <span className="text-sm">Declined</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transactionType"
                      value="error"
                      checked={transactionType === 'error'}
                      onChange={() => setTransactionType('error')}
                      className="mr-2"
                    />
                    <span className="text-sm">Gateway Error</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This is for demonstration purposes to simulate different transaction outcomes.
                </p>
              </div>

              {apiError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                  {apiError}
                </div>
              )}

              <button
                onClick={handleSubmitCheckout}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Complete Purchase'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex items-start py-6 first:pt-0 last:pb-0 border-b last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Variant: {item.variant.name}</p>
                        <p className="text-lg font-medium text-blue-600 mt-1">
                          {formatCurrency(item.product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span>Quantity: {parseInt(item.quantity) || 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(cart.orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(cart.orderSummary.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatCurrency(cart.orderSummary.shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(cart.orderSummary.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
