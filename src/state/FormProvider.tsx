import { useReducer, type ReactNode } from 'react';
import type { FormSchema } from '@/types';
import { FormContext } from '@/state/context';
import { formReducer } from '@/state/reducer';

const INITIAL_SCHEMA: FormSchema = { fields: [] };

export default function FormProvider({ children }: { children: ReactNode }) {
  const [schema, dispatch] = useReducer(formReducer, INITIAL_SCHEMA);

  return (
    <FormContext.Provider value={{ schema, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}
