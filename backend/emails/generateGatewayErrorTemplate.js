module.exports = (order) => {
  return `
    <div style="font-family: sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #f59e0b;">⚠️ Gateway Error - Order #${order.orderNumber}</h2>
      <p>Hi <strong>${order.customerInfo.fullName}</strong>,</p>

      <p>We hit a technical snag while processing your transaction. This may have been a temporary issue with the payment gateway.</p>

      <p><strong>If any amount was deducted, it will be automatically refunded within 3-5 working days.</strong></p>

      <a href="https://yourdomain.com/checkout" style="display: inline-block; margin-top: 20px; background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
        Retry Checkout
      </a>

      <p style="margin-top: 20px;">Still having trouble? Reach us at <a href="mailto:support@esalesone.com">support@esalesone.com</a></p>

      <p style="margin-top: 30px;">Thanks for your patience.<br><strong>The E-SalesOne Team</strong></p>
    </div>
  `;
};
