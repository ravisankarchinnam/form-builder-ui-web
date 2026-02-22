import type { FormSchema, FormAction, FormField } from '@/types';
import { createField } from '@/utils/fieldFactory';
import { ACTION } from '@/constants';

function updateFieldsAtPath(
  fields: FormField[],
  path: string[],
  updater: (siblings: FormField[], targetId: string) => FormField[],
): FormField[] {
  if (path.length === 0) return fields;

  const [targetId, ...rest] = path;

  if (rest.length === 0) {
    return updater(fields, targetId);
  }

  return fields.map((field) => {
    if (field.id === targetId && field.type === 'group') {
      return {
        ...field,
        children: updateFieldsAtPath(field.children, rest, updater),
      };
    }
    return field;
  });
}

export function formReducer(state: FormSchema, action: FormAction): FormSchema {
  switch (action.type) {
    case ACTION.ADD_FIELD: {
      const { parentPath, fieldType } = action.payload;
      const newField = createField(fieldType);

      if (parentPath.length === 0) {
        return { ...state, fields: [...state.fields, newField] };
      }

      return {
        ...state,
        fields: updateFieldsAtPath(state.fields, parentPath, (siblings, parentId) =>
          siblings.map((f) =>
            f.id === parentId && f.type === 'group'
              ? { ...f, children: [...f.children, newField] }
              : f,
          ),
        ),
      };
    }

    case ACTION.UPDATE_FIELD: {
      const { path, updates } = action.payload;
      return {
        ...state,
        fields: updateFieldsAtPath(state.fields, path, (siblings, targetId) =>
          siblings.map((f) => (f.id === targetId ? { ...f, ...updates } : f)),
        ),
      };
    }

    case ACTION.DELETE_FIELD: {
      const { path } = action.payload;
      return {
        ...state,
        fields: updateFieldsAtPath(state.fields, path, (siblings, targetId) =>
          siblings.filter((f) => f.id !== targetId),
        ),
      };
    }

    case ACTION.MOVE_FIELD: {
      const { path, direction } = action.payload;
      return {
        ...state,
        fields: updateFieldsAtPath(state.fields, path, (siblings, targetId) => {
          const idx = siblings.findIndex((f) => f.id === targetId);
          if (idx === -1) return siblings;

          const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (swapIdx < 0 || swapIdx >= siblings.length) return siblings;

          const result = [...siblings];
          [result[idx], result[swapIdx]] = [result[swapIdx], result[idx]];
          return result;
        }),
      };
    }

    case ACTION.IMPORT_SCHEMA:
      return action.payload.schema;

    default:
      return state;
  }
}
