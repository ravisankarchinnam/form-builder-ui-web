import { memo, type Dispatch } from 'react';
import type { FormField, FormAction, FieldType } from '@/types';
import { LABEL, EMPTY_STATE } from '@/constants';
import AddFieldButtons from '@/components/Builder/AddFieldButtons';
import FieldEditor from '@/components/Builder/FieldEditor/FieldEditor';

interface FieldEditorChildrenProps {
  children: FormField[];
  fieldPath: string[];
  dispatch: Dispatch<FormAction>;
  onAddChild: (type: FieldType) => void;
}

const FieldEditorChildren = memo(function FieldEditorChildren({
  children,
  fieldPath,
  dispatch,
  onAddChild,
}: FieldEditorChildrenProps) {
  return (
    <div className="field-editor__children">
      <div className="field-editor__children-header">
        <span>{LABEL.CHILDREN}</span>
        <AddFieldButtons variant="small" onAdd={onAddChild} />
      </div>
      {children.length === 0 && (
        <p className="empty-message">{EMPTY_STATE.CHILDREN}</p>
      )}
      {children.map((child, i) => (
        <FieldEditor
          key={child.id}
          field={child}
          path={fieldPath}
          index={i}
          siblingCount={children.length}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
});

export default FieldEditorChildren;
