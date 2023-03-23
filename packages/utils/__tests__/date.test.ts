import { dateFormatter } from '../src/date';

describe('dateFormatter', () => {
  it('should format date with default parameters', () => {
    const result = dateFormatter('YYYY-MM-DD HH:mm');
    const expected = '2023-03-23 18:00';
    expect(result).toBe(expected);
  });

  it('should format date with given date parameter', () => {
    const result = dateFormatter('YYYY-MM-DD HH:mm:ss', '2022-01-13 04:00:00.000');
    const expected = '2022-01-13 04:00:00';
    expect(result).toBe(expected);
  });

  it('should throw error when the date is invalid', () => {
    expect(() => {
      dateFormatter('YYYY-MM-DD hh:mm:ss', 'invalid-date');
    }).toThrow('Invalid date: invalid-date');
  });

  it('should format date with all date formatter types', () => {
    const result = dateFormatter('YYYY-MM-DD HH:mm:ss');
    expect(result).toContain(String(new Date().getFullYear()));
    expect(result).toContain(formatNumber(new Date().getMonth() + 1));
    expect(result).toContain(formatNumber(new Date().getDate()));
    expect(result).toContain(formatNumber(new Date().getHours()));
    expect(result).toContain(formatNumber(new Date().getMinutes()));
    expect(result).toContain(formatNumber(new Date().getSeconds()));
  });
});

const formatNumber = (n) => String((n < 10 ? '0' + n : n));
