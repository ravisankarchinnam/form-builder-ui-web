import type { Dispatch } from 'react';
import type { FormSchema } from '@/types/schema';
import type { FormAction } from '@/types/actions';

export interface FormContextValue {
  schema: FormSchema;
  dispatch: Dispatch<FormAction>;
}
