import type { FieldType } from '@/types';

export const FIELD_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  GROUP: 'group',
} as const;

export const FIELD_TYPE_LABELS: Readonly<Record<FieldType, string>> = {
  [FIELD_TYPE.TEXT]: 'Text',
  [FIELD_TYPE.NUMBER]: 'Number',
  [FIELD_TYPE.GROUP]: 'Group',
};
