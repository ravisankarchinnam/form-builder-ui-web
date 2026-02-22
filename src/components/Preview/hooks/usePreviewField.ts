import { useCallback, type ChangeEvent } from 'react';

export function usePreviewField(
  fieldId: string,
  values: Readonly<Record<string, string>>,
  errorMap: ReadonlyMap<string, string>,
  onChange: (fieldId: string, value: string) => void,
) {
  const errorMessage = errorMap.get(fieldId);
  const value = values[fieldId] ?? '';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(fieldId, e.target.value);
    },
    [fieldId, onChange],
  );

  return { errorMessage, value, handleChange };
}
