import type { Dispatch, ChangeEvent } from 'react';
import type { FormField, FormAction, FieldType } from '@/types';

export interface FieldEditorProps {
  field: FormField;
  path: string[];
  index: number;
  siblingCount: number;
  dispatch: Dispatch<FormAction>;
}

export interface FieldEditorHandlers {
  fieldPath: string[];
  handleLabelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRequiredChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleAddChild: (type: FieldType) => void;
}
