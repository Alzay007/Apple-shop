export const isFieldFilled = (value: string) => {
  return value.trim().length > 0;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  if (/\s/.test(password)) {
    return false;
  }

  return true;
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+380\d{9}$/;
  return phoneRegex.test(phone);
};
