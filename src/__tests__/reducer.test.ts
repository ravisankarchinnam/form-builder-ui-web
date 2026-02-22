import { describe, it, expect } from 'vitest';
import { formReducer } from '@/state/reducer';
import type { FormSchema, FormField, FormAction } from '@/types';

function textField(id: string, label = '', required = false): FormField {
  return { id, label, required, type: 'text' };
}

function numberField(
  id: string,
  opts: { label?: string; required?: boolean; min?: number; max?: number } = {},
): FormField {
  return { id, label: opts.label ?? '', required: opts.required ?? false, type: 'number', min: opts.min, max: opts.max };
}

function groupField(id: string, children: FormField[], label = ''): FormField {
  return { id, label, required: false, type: 'group', children };
}

function schema(...fields: FormField[]): FormSchema {
  return { fields };
}

describe('formReducer', () => {
  describe('ADD_FIELD', () => {
    it('adds a text field at root level', () => {
      const state = schema();
      const result = formReducer(state, {
        type: 'ADD_FIELD',
        payload: { parentPath: [], fieldType: 'text' },
      });

      expect(result.fields).toHaveLength(1);
      expect(result.fields[0].type).toBe('text');
    });

    it('adds a number field at root level', () => {
      const state = schema();
      const result = formReducer(state, {
        type: 'ADD_FIELD',
        payload: { parentPath: [], fieldType: 'number' },
      });

      expect(result.fields).toHaveLength(1);
      expect(result.fields[0].type).toBe('number');
    });

    it('adds a group field at root level', () => {
      const state = schema();
      const result = formReducer(state, {
        type: 'ADD_FIELD',
        payload: { parentPath: [], fieldType: 'group' },
      });

      expect(result.fields).toHaveLength(1);
      expect(result.fields[0].type).toBe('group');
      if (result.fields[0].type === 'group') {
        expect(result.fields[0].children).toEqual([]);
      }
    });

    it('adds a child field inside a nested group', () => {
      const group = groupField('g1', []);
      const state = schema(group);

      const result = formReducer(state, {
        type: 'ADD_FIELD',
        payload: { parentPath: ['g1'], fieldType: 'text' },
      });

      const g = result.fields[0];
      expect(g.type).toBe('group');
      if (g.type === 'group') {
        expect(g.children).toHaveLength(1);
        expect(g.children[0].type).toBe('text');
      }
    });
  });

  describe('UPDATE_FIELD', () => {
    it('updates label and required at root', () => {
      const state = schema(textField('f1'));

      const result = formReducer(state, {
        type: 'UPDATE_FIELD',
        payload: { path: ['f1'], updates: { label: 'Name', required: true } },
      });

      expect(result.fields[0].label).toBe('Name');
      expect(result.fields[0].required).toBe(true);
    });

    it('updates min and max on a number field', () => {
      const state = schema(numberField('n1'));

      const result = formReducer(state, {
        type: 'UPDATE_FIELD',
        payload: { path: ['n1'], updates: { min: 5, max: 100 } },
      });

      const f = result.fields[0];
      if (f.type === 'number') {
        expect(f.min).toBe(5);
        expect(f.max).toBe(100);
      }
    });

    it('updates a deeply nested field by path', () => {
      const inner = textField('inner');
      const group = groupField('g1', [inner]);
      const state = schema(group);

      const result = formReducer(state, {
        type: 'UPDATE_FIELD',
        payload: { path: ['g1', 'inner'], updates: { label: 'Deep' } },
      });

      const g = result.fields[0];
      if (g.type === 'group') {
        expect(g.children[0].label).toBe('Deep');
      }
    });
  });

  describe('DELETE_FIELD', () => {
    it('removes a field at root', () => {
      const state = schema(textField('f1'), textField('f2'));

      const result = formReducer(state, {
        type: 'DELETE_FIELD',
        payload: { path: ['f2'] },
      });

      expect(result.fields).toHaveLength(1);
      expect(result.fields[0].id).toBe('f1');
    });

    it('removes a nested child from a group', () => {
      const group = groupField('g1', [textField('c1'), textField('c2')]);
      const state = schema(group);

      const result = formReducer(state, {
        type: 'DELETE_FIELD',
        payload: { path: ['g1', 'c1'] },
      });

      const g = result.fields[0];
      if (g.type === 'group') {
        expect(g.children).toHaveLength(1);
        expect(g.children[0].id).toBe('c2');
      }
    });
  });

  describe('MOVE_FIELD', () => {
    it('moves a field down at root', () => {
      const state = schema(textField('a'), textField('b'));

      const result = formReducer(state, {
        type: 'MOVE_FIELD',
        payload: { path: ['a'], direction: 'down' },
      });

      expect(result.fields[0].id).toBe('b');
      expect(result.fields[1].id).toBe('a');
    });

    it('moves a field up at root', () => {
      const state = schema(textField('a'), textField('b'));

      const result = formReducer(state, {
        type: 'MOVE_FIELD',
        payload: { path: ['b'], direction: 'up' },
      });

      expect(result.fields[0].id).toBe('b');
      expect(result.fields[1].id).toBe('a');
    });

    it('is a no-op when moving first item up', () => {
      const state = schema(textField('a'), textField('b'));

      const result = formReducer(state, {
        type: 'MOVE_FIELD',
        payload: { path: ['a'], direction: 'up' },
      });

      expect(result.fields[0].id).toBe('a');
      expect(result.fields[1].id).toBe('b');
    });

    it('is a no-op when moving last item down', () => {
      const state = schema(textField('a'), textField('b'));

      const result = formReducer(state, {
        type: 'MOVE_FIELD',
        payload: { path: ['b'], direction: 'down' },
      });

      expect(result.fields[0].id).toBe('a');
      expect(result.fields[1].id).toBe('b');
    });

    it('moves a child within a group', () => {
      const group = groupField('g1', [textField('c1'), textField('c2')]);
      const state = schema(group);

      const result = formReducer(state, {
        type: 'MOVE_FIELD',
        payload: { path: ['g1', 'c1'], direction: 'down' },
      });

      const g = result.fields[0];
      if (g.type === 'group') {
        expect(g.children[0].id).toBe('c2');
        expect(g.children[1].id).toBe('c1');
      }
    });
  });

  describe('IMPORT_SCHEMA', () => {
    it('replaces entire state with imported schema', () => {
      const state = schema(textField('old'));
      const imported = schema(textField('new1'), numberField('new2'));

      const result = formReducer(state, {
        type: 'IMPORT_SCHEMA',
        payload: { schema: imported },
      });

      expect(result.fields).toHaveLength(2);
      expect(result.fields[0].id).toBe('new1');
      expect(result.fields[1].id).toBe('new2');
    });
  });

  it('preserves immutability — returns new object on mutation', () => {
    const state = schema(textField('f1'));

    const result = formReducer(state, {
      type: 'UPDATE_FIELD',
      payload: { path: ['f1'], updates: { label: 'changed' } },
    });

    expect(result).not.toBe(state);
    expect(result.fields[0]).not.toBe(state.fields[0]);
  });

  it('returns state unchanged for unknown action', () => {
    const state = schema(textField('f1'));
    const result = formReducer(state, { type: 'UNKNOWN' } as unknown as FormAction);
    expect(result).toBe(state);
  });
});
