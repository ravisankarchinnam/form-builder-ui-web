import { createContext } from 'react';
import type { FormContextValue } from '@/types';

export const FormContext = createContext<FormContextValue | null>(null);
