export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

export const validateCardNumber = (cardNumber) => {
  // Remove spaces and check if it's 16 digits
  const cleaned = cardNumber.replace(/\s+/g, '');
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiry = (expiry) => {
  // Check format MM/YY
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return false;
  }

  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
  const currentMonth = currentDate.getMonth() + 1; // January is 0

  // Convert to numbers
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  // Check if month is valid
  if (monthNum < 1 || monthNum > 12) {
    return false;
  }

  // Check if the date is in the future
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return false;
  }

  return true;
};

export const validateCVV = (cvv) => {
  return /^\d{3}$/.test(cvv);
};

export const validateZip = (zip) => {
  return /^\d{5}(-\d{4})?$/.test(zip);
};

export const validateRequired = (value) => {
  return value && value.trim() !== '';
};