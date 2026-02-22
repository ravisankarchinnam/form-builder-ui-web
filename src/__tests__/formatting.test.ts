import { describe, it, expect } from 'vitest';
import { requiredMessage, minMessage, maxMessage, numberPlaceholder } from '@/utils/formatting';

describe('requiredMessage', () => {
  it('includes the label in the message', () => {
    expect(requiredMessage('Email')).toBe('Email is required.');
  });

  it('falls back when label is empty', () => {
    const msg = requiredMessage('');
    expect(msg).toContain('is required.');
    expect(msg).toContain('This field');
  });
});

describe('minMessage', () => {
  it('returns the minimum value in the message', () => {
    expect(minMessage(5)).toBe('Minimum value is 5.');
    expect(minMessage(0)).toBe('Minimum value is 0.');
    expect(minMessage(-10)).toBe('Minimum value is -10.');
  });
});

describe('maxMessage', () => {
  it('returns the maximum value in the message', () => {
    expect(maxMessage(100)).toBe('Maximum value is 100.');
    expect(maxMessage(0)).toBe('Maximum value is 0.');
  });
});

describe('numberPlaceholder', () => {
  it('shows both min and max when provided', () => {
    const result = numberPlaceholder(1, 99);
    expect(result).toContain('min: 1');
    expect(result).toContain('max: 99');
  });

  it('shows only min when max is undefined', () => {
    const result = numberPlaceholder(5, undefined);
    expect(result).toContain('min: 5');
    expect(result).not.toContain('max');
  });

  it('shows only max when min is undefined', () => {
    const result = numberPlaceholder(undefined, 50);
    expect(result).toContain('max: 50');
    expect(result).not.toContain('min');
  });

  it('returns base placeholder when neither min nor max provided', () => {
    const result = numberPlaceholder(undefined, undefined);
    expect(result).toBe('Enter a number');
    expect(result).not.toContain('min');
    expect(result).not.toContain('max');
  });
});
