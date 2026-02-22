import { useCallback } from 'react';
import { useFormContext } from '@/hooks/useFormContext';
import type { FieldType } from '@/types';
import { ACTION } from '@/constants';

export function useBuilderPanel() {
  const { schema, dispatch } = useFormContext();

  const handleAddRoot = useCallback(
    (type: FieldType) => {
      dispatch({ type: ACTION.ADD_FIELD, payload: { parentPath: [], fieldType: type } });
    },
    [dispatch],
  );

  return { schema, dispatch, handleAddRoot };
}
