import type { FieldType } from '@/types/fields';
import type { FormSchema } from '@/types/schema';

export type FormAction =
  | { type: 'ADD_FIELD'; payload: { parentPath: string[]; fieldType: FieldType } }
  | { type: 'UPDATE_FIELD'; payload: { path: string[]; updates: FieldUpdates } }
  | { type: 'DELETE_FIELD'; payload: { path: string[] } }
  | { type: 'MOVE_FIELD'; payload: { path: string[]; direction: MoveDirection } }
  | { type: 'IMPORT_SCHEMA'; payload: { schema: FormSchema } };

export type MoveDirection = 'up' | 'down';

export interface FieldUpdates {
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
}
