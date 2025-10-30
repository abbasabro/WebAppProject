const {
  validateName,
  validateEmail,
  validatePhone,
  validateDOB,
  validatePassword,
  checkPasswordStrength,
} = require('../script.js');

test('Valid name passes', () => {
  expect(validateName('John Doe')).toBe(true);
});

test('Invalid email fails', () => {
  expect(validateEmail('invalid')).toBe(false);
});

test('Phone number with 10 digits passes', () => {
  expect(validatePhone('1234567890')).toBe(true);
});

test('Password strength increases with complexity', () => {
  const weak = checkPasswordStrength('abc');
  const strong = checkPasswordStrength('Abcdef1!');
  expect(strong).toBeGreaterThan(weak);
});
