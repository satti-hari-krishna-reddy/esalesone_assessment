const Product = require('../models/Product');
const Order = require('../models/Order');
const sendEmail = require('../utils/mailer');
const { v4: uuidv4 } = require('uuid');

const generateApprovedTemplate = require('../emails/generateApprovedTemplate');
const generateDeclinedTemplate = require('../emails/generateDeclinedTemplate');
const generateGatewayErrorTemplate = require('../emails/generateGatewayErrorTemplate');

exports.handleCheckout = async (req, res) => {
  const { customerInfo, items, totalAmount, transactionStatus } = req.body;
  const orderNumber = uuidv4().slice(0, 8).toUpperCase();

  const newOrder = new Order({
    orderNumber,
    customerInfo,
    items,
    totalAmount,
    status: 'processing',
  });

  try {
    // Simulate transaction result
    if (transactionStatus === 'declined') {
      newOrder.status = 'Declined';
      await newOrder.save();
      await sendEmail({
        to: customerInfo.email,
        subject: `Transaction Failed - ${orderNumber}`,
        html: generateDeclinedTemplate(newOrder),
      });
      return res.status(402).json({ success: false, message: 'Transaction Declined' });
    }
    if (transactionStatus === 'error') {
      newOrder.status = 'Gateway Error';
      await newOrder.save();

      await sendEmail({
        to: customerInfo.email,
        subject: `Payment Gateway Error - ${orderNumber}`,
        html: generateGatewayErrorTemplate(newOrder),
      });
      return res.status(500).json({ success: false, message: 'Payment Gateway Error' });
    }

    // Validate inventory
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.name}` });
      }
      if (product.availableQuantity < item.quantity) {
        return res.status(400).json({ success: false, message: `${item.name} is out of stock` });
      }
    }

    // Deduct inventory
    for (const item of items) {
      const product = await Product.findById(item.productId);
      product.availableQuantity -= item.quantity;
      await product.save();
    }

    newOrder.status = 'Approved';
    await newOrder.save();

    await sendEmail({
      to: customerInfo.email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: generateApprovedTemplate(newOrder),
    });

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      timestamp: new Date().toISOString(),
      orderNumber,
      customerInfo,
    });
  } catch (err) {
    await sendEmail({
      to: customerInfo.email,
      subject: `Transaction Failed - ${orderNumber}`,
      html: generateDeclinedTemplate(newOrder),
    });
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
