import type { FormSchema, FormField } from '@/types';
import { FIELD_TYPE } from '@/constants';

function isValidFieldArray(fields: unknown): fields is FormField[] {
  if (!Array.isArray(fields)) return false;
  return fields.every(isValidField);
}

function isValidField(field: unknown): field is FormField {
  if (typeof field !== 'object' || field === null) return false;
  const f = field as Record<string, unknown>;

  if (
    typeof f.id !== 'string' ||
    typeof f.label !== 'string' ||
    typeof f.required !== 'boolean'
  ) {
    return false;
  }

  switch (f.type) {
    case FIELD_TYPE.TEXT:
      return true;
    case FIELD_TYPE.NUMBER:
      if (f.min !== undefined && typeof f.min !== 'number') return false;
      if (f.max !== undefined && typeof f.max !== 'number') return false;
      return true;
    case FIELD_TYPE.GROUP:
      return isValidFieldArray(f.children);
    default:
      return false;
  }
}

function collectIds(fields: FormField[]): string[] {
  const ids: string[] = [];
  for (const field of fields) {
    ids.push(field.id);
    if (field.type === 'group') {
      ids.push(...collectIds(field.children));
    }
  }
  return ids;
}

function hasDuplicateIds(fields: FormField[]): boolean {
  const ids = collectIds(fields);
  return new Set(ids).size !== ids.length;
}

export function isValidSchema(data: unknown): data is FormSchema {
  if (typeof data !== 'object' || data === null) return false;
  const fields = (data as Record<string, unknown>).fields;
  if (!isValidFieldArray(fields)) return false;
  return !hasDuplicateIds(fields);
}
