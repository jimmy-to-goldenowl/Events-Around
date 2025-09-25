import { formatPrice } from '../../src/utils/number'

describe('formatPrice', () => {
  test('should return "0" for negative values', () => {
    expect(formatPrice(-10)).toBe('0');
    expect(formatPrice(-0.01)).toBe('0');
  });

  test('should format positive numbers to US locale string', () => {
    expect(formatPrice(1000)).toBe('1,000');
    expect(formatPrice(99.99)).toBe('99.99');
    expect(formatPrice(0)).toBe('0');
  });
});