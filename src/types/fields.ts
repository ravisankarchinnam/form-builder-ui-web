export interface BaseField {
  id: string;
  label: string;
  required: boolean;
}

export interface TextField extends BaseField {
  type: 'text';
}

export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
}

export interface GroupField extends BaseField {
  type: 'group';
  children: FormField[];
}

export type FormField = TextField | NumberField | GroupField;

export type FieldType = FormField['type'];
