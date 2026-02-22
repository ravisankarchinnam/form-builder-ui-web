import type { FormField, ValidationError } from '@/types';
import { FIELD_TYPE, VALIDATION } from '@/constants';
import { requiredMessage, minMessage, maxMessage } from '@/utils/formatting';

export function validateFields(
  fields: FormField[],
  values: Record<string, string>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    if (field.type === FIELD_TYPE.GROUP) {
      errors.push(...validateFields(field.children, values));
      continue;
    }

    const val = values[field.id] ?? '';

    if (field.required && val.trim() === '') {
      errors.push({ fieldId: field.id, message: requiredMessage(field.label) });
      continue;
    }

    if (field.type === FIELD_TYPE.NUMBER && val.trim() !== '') {
      const num = Number(val);
      if (isNaN(num)) {
        errors.push({ fieldId: field.id, message: VALIDATION.INVALID_NUMBER });
      } else {
        if (field.min != null && num < field.min) {
          errors.push({ fieldId: field.id, message: minMessage(field.min) });
        }
        if (field.max != null && num > field.max) {
          errors.push({ fieldId: field.id, message: maxMessage(field.max) });
        }
      }
    }
  }

  return errors;
}
