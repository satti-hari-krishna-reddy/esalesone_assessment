module.exports = (order) => {
  return `
    <div style="font-family: sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #4f46e5;">✅ Order Confirmed - #${order.orderNumber}</h2>
      <p>Hi <strong>${order.customerInfo.fullName}</strong>,</p>
      <p>Thank you for your purchase! We're excited to process your order.</p>

      <h3 style="margin-top: 24px;">🛒 Order Summary:</h3>
      <ul>
        ${order.items
          .map(
            (item) => `
          <li style="margin-bottom: 8px;">
            ${item.name} × ${item.quantity} — <strong>$${item.price.toFixed(2)}</strong>
          </li>
        `
          )
          .join('')}
      </ul>

      <p><strong>Total Paid:</strong> $${order.totalAmount.toFixed(2)}</p>

      <h3 style="margin-top: 24px;">📦 Shipping To:</h3>
      <p>
        ${order.customerInfo.address}<br>
        ${order.customerInfo.city}, ${order.customerInfo.state} - ${order.customerInfo.zipCode}
      </p>

      <p style="margin-top: 30px;">You’ll receive another email once your order is shipped.</p>
      <p>Need help? Just reply to this email. We're here for you.</p>
      <p style="margin-top: 40px;">Thanks again!<br><strong>The E-SalesOne Team</strong></p>
    </div>
  `;
};
