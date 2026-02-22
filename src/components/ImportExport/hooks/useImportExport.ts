import { useState, useCallback, type ChangeEvent } from 'react';
import { useFormContext } from '@/hooks/useFormContext';
import { isValidSchema } from '@/utils/schemaValidator';
import { ACTION, FEEDBACK } from '@/constants';

export function useImportExport() {
  const { schema, dispatch } = useFormContext();
  const [jsonText, setJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExport = useCallback(() => {
    setJsonText(JSON.stringify(schema, null, 2));
    setImportError(null);
    setImportSuccess(false);
  }, [schema]);

  const handleImport = useCallback(() => {
    setImportError(null);
    setImportSuccess(false);

    if (!jsonText.trim()) {
      setImportError(FEEDBACK.ERR_EMPTY_JSON);
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setImportError(FEEDBACK.ERR_INVALID_JSON);
      return;
    }

    if (!isValidSchema(parsed)) {
      setImportError(FEEDBACK.ERR_INVALID_SCHEMA);
      return;
    }

    dispatch({ type: ACTION.IMPORT_SCHEMA, payload: { schema: parsed } });
    setImportSuccess(true);
  }, [jsonText, dispatch]);

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setJsonText(e.target.value);
      setImportError(null);
      setImportSuccess(false);
    },
    [],
  );

  return { jsonText, importError, importSuccess, handleExport, handleImport, handleTextChange };
}
