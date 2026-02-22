import { describe, it, expect } from 'vitest';
import { isValidSchema } from '@/utils/schemaValidator';

describe('isValidSchema', () => {
  it('accepts a valid schema with text, number, and group fields', () => {
    const data = {
      fields: [
        { id: '1', label: 'Name', required: true, type: 'text' },
        { id: '2', label: 'Age', required: false, type: 'number', min: 0, max: 120 },
        {
          id: '3',
          label: 'Address',
          required: false,
          type: 'group',
          children: [
            { id: '4', label: 'Street', required: true, type: 'text' },
          ],
        },
      ],
    };

    expect(isValidSchema(data)).toBe(true);
  });

  it('rejects non-object input', () => {
    expect(isValidSchema(null)).toBe(false);
    expect(isValidSchema('string')).toBe(false);
    expect(isValidSchema(42)).toBe(false);
    expect(isValidSchema([1, 2])).toBe(false);
  });

  it('rejects schema missing the fields key', () => {
    expect(isValidSchema({})).toBe(false);
    expect(isValidSchema({ data: [] })).toBe(false);
  });

  it('rejects a field with missing required properties', () => {
    expect(isValidSchema({ fields: [{ id: '1' }] })).toBe(false);
    expect(isValidSchema({ fields: [{ id: '1', label: 'X' }] })).toBe(false);
    expect(isValidSchema({ fields: [{ type: 'text', label: 'X', required: true }] })).toBe(false);
  });

  it('rejects a number field with non-numeric min/max', () => {
    const data = {
      fields: [
        { id: '1', label: 'N', required: false, type: 'number', min: 'low' },
      ],
    };
    expect(isValidSchema(data)).toBe(false);

    const data2 = {
      fields: [
        { id: '1', label: 'N', required: false, type: 'number', max: true },
      ],
    };
    expect(isValidSchema(data2)).toBe(false);
  });

  it('rejects schema with duplicate IDs including nested', () => {
    const data = {
      fields: [
        { id: 'dup', label: 'A', required: false, type: 'text' },
        {
          id: 'g1',
          label: 'Group',
          required: false,
          type: 'group',
          children: [
            { id: 'dup', label: 'B', required: false, type: 'text' },
          ],
        },
      ],
    };

    expect(isValidSchema(data)).toBe(false);
  });
});
