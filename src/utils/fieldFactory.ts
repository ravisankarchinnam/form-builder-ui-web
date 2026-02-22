import type { FormField, FieldType } from '@/types';
import { FIELD_TYPE } from '@/constants';

let counter = 0;

export function generateId(): string {
  return `field_${Date.now()}_${++counter}`;
}

export function createField(fieldType: FieldType): FormField {
  const base = { id: generateId(), label: '', required: false };

  switch (fieldType) {
    case FIELD_TYPE.TEXT:
      return { ...base, type: FIELD_TYPE.TEXT };
    case FIELD_TYPE.NUMBER:
      return { ...base, type: FIELD_TYPE.NUMBER };
    case FIELD_TYPE.GROUP:
      return { ...base, type: FIELD_TYPE.GROUP, children: [] };
  }
}
