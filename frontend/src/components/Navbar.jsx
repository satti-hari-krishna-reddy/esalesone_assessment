import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">eSalesOne</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <User size={20} />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
