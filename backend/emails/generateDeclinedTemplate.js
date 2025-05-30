module.exports = (order) => {
  return `
    <div style="font-family: sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #dc2626;">❌ Transaction Declined - Order #${order.orderNumber}</h2>
      <p>Hi <strong>${order.customerInfo.fullName}</strong>,</p>
      <p>Unfortunately, your payment could not be processed and the transaction was declined.</p>

      <p>Please try again or contact your bank for more info.</p>

      <a href="https://yourdomain.com/checkout" style="display: inline-block; margin-top: 20px; background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
        Retry Checkout
      </a>

      <p style="margin-top: 20px;">Need help? Contact us at <a href="mailto:support@esalesone.com">support@esalesone.com</a></p>

      <p style="margin-top: 30px;">Thanks for shopping with us.<br><strong>The E-SalesOne Team</strong></p>
    </div>
  `;
};
