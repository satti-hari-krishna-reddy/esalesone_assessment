const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold text-blue-600">eSalesOne</span>
            <p className="text-sm text-gray-600 mt-1">© 2025 eSalesOne. All rights reserved.</p>
          </div>
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
