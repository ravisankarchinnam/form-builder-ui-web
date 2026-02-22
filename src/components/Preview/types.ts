import type { FormField } from '@/types';

export interface PreviewFieldProps {
  field: FormField;
  values: Readonly<Record<string, string>>;
  errorMap: ReadonlyMap<string, string>;
  onChange: (fieldId: string, value: string) => void;
}
