// Mock API response for products list
export const getProducts = () => {
  return [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      shortDescription: "High-quality wireless headphones with active noise cancellation",
      price: 249.99,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      shortDescription: "Advanced fitness tracking with heart rate monitoring",
      price: 199.99,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      shortDescription: "True wireless earbuds with premium sound quality",
      price: 159.99,
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
};

// Mock API response for single product
export const getProductById = (id) => {
  const products = {
    1: {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals on the go.",
      price: 249.99,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      variants: [
        { id: 1, name: "Matte Black", inStock: true },
        { id: 3, name: "Navy Blue", inStock: false },
      ],
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0",
        "Built-in microphone",
        "Touch controls",
        "Quick charge (3 hours in 10 minutes)",
      ]
    },
    2: {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Track your fitness goals with precision using our advanced smartwatch. Features include heart rate monitoring, sleep tracking, and 20+ sport modes.",
      price: 199.99,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      variants: [
        { id: 1, name: "Black", inStock: true },
        { id: 2, name: "White", inStock: false },
      ],
      features: [
        "24/7 Heart Rate Monitoring",
        "Sleep Tracking",
        "20+ Sport Modes",
        "5 ATM Water Resistance",
        "7-day Battery Life",
        "GPS Tracking"
      ]
    },
    3: {
      id: 3,
      name: "Wireless Earbuds",
      description: "Immerse yourself in premium sound with our true wireless earbuds. Featuring active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
      price: 159.99,
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      variants: [
        { id: 1, name: "White", inStock: true },
        { id: 2, name: "Black", inStock: false }
      ],
      features: [
        "Active Noise Cancellation",
        "Touch Controls",
        "24h Battery Life with Case",
        "IPX4 Water Resistance",
        "Wireless Charging",
        "Voice Assistant Support"
      ]
    }
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products[id]);
    }, 500);
  });
};

export const simulateTransaction = (formData, simulationType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (simulationType) {
        case "approved":
          resolve({
            success: true,
            orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            message: "Transaction approved successfully",
            timestamp: new Date().toISOString(),
            customerData: formData
          });
          break;
        case "declined":
          reject({
            success: false,
            error: "payment_declined",
            message: "Your payment was declined. Please check your card details and try again.",
            code: "CARD_DECLINED"
          });
          break;
        case "error":
          reject({
            success: false,
            error: "gateway_error",
            message: "A payment processing error occurred. Please try again later.",
            code: "GATEWAY_ERROR"
          });
          break;
        default:
          reject({
            success: false,
            error: "unknown_error",
            message: "An unknown error occurred. Please try again.",
            code: "UNKNOWN_ERROR"
          });
      }
    }, 1500);
  });
};