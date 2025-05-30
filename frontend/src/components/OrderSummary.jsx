import { formatCurrency } from '../utils/formatters';

const OrderSummary = ({ orderSummary, product, variant, quantity, showFull = false }) => {
  if (!orderSummary || !product) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex items-start mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="font-medium">{product.name}</h3>
          {variant && <p className="text-sm text-gray-600">Variant: {variant.name}</p>}
          <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
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

      {showFull && (
        <div className="mt-6 text-sm text-gray-500">
          <p className="mb-1">Estimated delivery: 3-5 business days</p>
          <p>Free returns within 30 days</p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
