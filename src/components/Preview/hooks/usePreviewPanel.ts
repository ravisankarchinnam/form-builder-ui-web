import { useState, useCallback, useMemo, type FormEvent } from 'react';
import { useFormContext } from '@/hooks/useFormContext';
import type { ValidationError } from '@/types';
import { validateFields } from '@/utils/formValidator';

export function usePreviewPanel() {
  const { schema } = useFormContext();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const errorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const err of errors) {
      map.set(err.fieldId, err.message);
    }
    return map;
  }, [errors]);

  const handleChange = useCallback((fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => prev.filter((e) => e.fieldId !== fieldId));
    setSubmitted(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const validationErrors = validateFields(schema.fields, values);
      setErrors(validationErrors);
      setSubmitted(true);
    },
    [schema.fields, values],
  );

  const handleReset = useCallback(() => {
    setValues({});
    setErrors([]);
    setSubmitted(false);
  }, []);

  const hasFields = schema.fields.length > 0;
  const showSuccess = submitted && errors.length === 0 && hasFields;

  return { schema, values, errorMap, hasFields, showSuccess, handleChange, handleSubmit, handleReset };
}
