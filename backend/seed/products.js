const Product = require('../models/Product');

const initialProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones...',
    price: 249.99,
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    variants: [
      { id: 1, name: 'Matte Black', inStock: true },
      { id: 3, name: 'Navy Blue', inStock: false },
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Touch controls',
      'Quick charge (3 hours in 10 minutes)',
    ],
    availableQuantity: 100,
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with precision using our advanced smartwatch...',
    price: 199.99,
    image:
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    variants: [
      { id: 1, name: 'Black', inStock: true },
      { id: 2, name: 'White', inStock: false },
    ],
    features: [
      '24/7 Heart Rate Monitoring',
      'Sleep Tracking',
      '20+ Sport Modes',
      '5 ATM Water Resistance',
      '7-day Battery Life',
      'GPS Tracking',
    ],
    availableQuantity: 100,
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    description: 'Immerse yourself in premium sound with our true wireless earbuds...',
    price: 159.99,
    image:
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    variants: [
      { id: 1, name: 'White', inStock: true },
      { id: 2, name: 'Black', inStock: false },
    ],
    features: [
      'Active Noise Cancellation',
      'Touch Controls',
      '24h Battery Life with Case',
      'IPX4 Water Resistance',
      'Wireless Charging',
      'Voice Assistant Support',
    ],
    availableQuantity: 100,
  },
];

async function seedInitialProducts() {
  const existingCount = await Product.countDocuments();
  if (existingCount === 0) {
    await Product.insertMany(initialProducts);
    console.log('[SEED] Products added to DB');
  } else {
    console.log('[SEED] Products already exist, skipping seed');
  }
}

module.exports = seedInitialProducts;
