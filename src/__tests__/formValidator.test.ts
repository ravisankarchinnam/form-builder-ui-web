import { describe, it, expect } from 'vitest';
import { validateFields } from '@/utils/formValidator';
import type { FormField } from '@/types';

function textField(id: string, opts: { label?: string; required?: boolean } = {}): FormField {
  return { id, label: opts.label ?? 'Field', required: opts.required ?? false, type: 'text' };
}

function numberField(
  id: string,
  opts: { label?: string; required?: boolean; min?: number; max?: number } = {},
): FormField {
  return {
    id,
    label: opts.label ?? 'Number',
    required: opts.required ?? false,
    type: 'number',
    min: opts.min,
    max: opts.max,
  };
}

function groupField(id: string, children: FormField[]): FormField {
  return { id, label: 'Group', required: false, type: 'group', children };
}

describe('validateFields', () => {
  it('returns empty array when all fields are valid', () => {
    const fields = [textField('f1'), numberField('n1')];
    const values = { f1: 'hello', n1: '42' };

    expect(validateFields(fields, values)).toEqual([]);
  });

  it('reports error for required text field with empty value', () => {
    const fields = [textField('f1', { label: 'Name', required: true })];
    const values = { f1: '' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].fieldId).toBe('f1');
    expect(errors[0].message).toContain('Name');
    expect(errors[0].message).toContain('required');
  });

  it('reports error for required number field with empty value', () => {
    const fields = [numberField('n1', { label: 'Age', required: true })];
    const values = { n1: '' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].fieldId).toBe('n1');
    expect(errors[0].message).toContain('Age');
  });

  it('reports error for non-numeric input in number field', () => {
    const fields = [numberField('n1')];
    const values = { n1: 'abc' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('valid number');
  });

  it('reports error when number is below min', () => {
    const fields = [numberField('n1', { min: 10 })];
    const values = { n1: '5' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('10');
  });

  it('reports error when number exceeds max', () => {
    const fields = [numberField('n1', { max: 100 })];
    const values = { n1: '150' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('100');
  });

  it('validates children recursively inside groups', () => {
    const inner = textField('c1', { label: 'Inner', required: true });
    const fields = [groupField('g1', [inner])];
    const values = { c1: '' };

    const errors = validateFields(fields, values);
    expect(errors).toHaveLength(1);
    expect(errors[0].fieldId).toBe('c1');
  });

  it('passes non-required empty fields without error', () => {
    const fields = [
      textField('f1', { required: false }),
      numberField('n1', { required: false }),
    ];
    const values = { f1: '', n1: '' };

    expect(validateFields(fields, values)).toEqual([]);
  });
});
