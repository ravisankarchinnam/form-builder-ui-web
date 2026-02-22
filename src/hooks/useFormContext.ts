import { useContext } from 'react';
import { FormContext } from '@/state/context';
import type { FormContextValue } from '@/types';

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within FormProvider');
  return ctx;
}
