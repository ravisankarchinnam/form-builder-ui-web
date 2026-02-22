import { useCallback, useMemo, type Dispatch, type ChangeEvent } from 'react';
import type { FormAction, FieldType } from '@/types';
import { ACTION, DIRECTION } from '@/constants';
import type { FieldEditorHandlers } from '@/components/Builder/types';

export function useFieldEditor(
  dispatch: Dispatch<FormAction>,
  path: string[],
  fieldId: string,
): FieldEditorHandlers {
  const fieldPath = useMemo(() => [...path, fieldId], [path, fieldId]);

  const handleLabelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: ACTION.UPDATE_FIELD,
        payload: { path: fieldPath, updates: { label: e.target.value } },
      });
    },
    [dispatch, fieldPath],
  );

  const handleRequiredChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: ACTION.UPDATE_FIELD,
        payload: { path: fieldPath, updates: { required: e.target.checked } },
      });
    },
    [dispatch, fieldPath],
  );

  const handleMinChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value === '' ? undefined : Number(e.target.value);
      dispatch({
        type: ACTION.UPDATE_FIELD,
        payload: { path: fieldPath, updates: { min: val } },
      });
    },
    [dispatch, fieldPath],
  );

  const handleMaxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value === '' ? undefined : Number(e.target.value);
      dispatch({
        type: ACTION.UPDATE_FIELD,
        payload: { path: fieldPath, updates: { max: val } },
      });
    },
    [dispatch, fieldPath],
  );

  const handleDelete = useCallback(() => {
    dispatch({ type: ACTION.DELETE_FIELD, payload: { path: fieldPath } });
  }, [dispatch, fieldPath]);

  const handleMoveUp = useCallback(() => {
    dispatch({
      type: ACTION.MOVE_FIELD,
      payload: { path: fieldPath, direction: DIRECTION.UP },
    });
  }, [dispatch, fieldPath]);

  const handleMoveDown = useCallback(() => {
    dispatch({
      type: ACTION.MOVE_FIELD,
      payload: { path: fieldPath, direction: DIRECTION.DOWN },
    });
  }, [dispatch, fieldPath]);

  const handleAddChild = useCallback(
    (type: FieldType) => {
      dispatch({
        type: ACTION.ADD_FIELD,
        payload: { parentPath: fieldPath, fieldType: type },
      });
    },
    [dispatch, fieldPath],
  );

  return {
    fieldPath,
    handleLabelChange,
    handleRequiredChange,
    handleMinChange,
    handleMaxChange,
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    handleAddChild,
  };
}
