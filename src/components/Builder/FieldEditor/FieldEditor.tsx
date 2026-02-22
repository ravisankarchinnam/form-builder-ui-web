import { memo } from 'react';
import { FIELD_TYPE } from '@/constants';
import { useFieldEditor } from '@/components/Builder/hooks/useFieldEditor';
import type { FieldEditorProps } from '@/components/Builder/types';
import FieldEditorHeader from '@/components/Builder/FieldEditor/FieldEditorHeader';
import FieldEditorBody from '@/components/Builder/FieldEditor/FieldEditorBody';
import FieldEditorChildren from '@/components/Builder/FieldEditor/FieldEditorChildren';

const FieldEditor = memo(function FieldEditor({
  field,
  path,
  index,
  siblingCount,
  dispatch,
}: FieldEditorProps) {
  const {
    fieldPath,
    handleLabelChange,
    handleRequiredChange,
    handleMinChange,
    handleMaxChange,
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    handleAddChild,
  } = useFieldEditor(dispatch, path, field.id);

  return (
    <div className={`field-editor field-editor--${field.type}`}>
      <FieldEditorHeader
        fieldType={field.type}
        index={index}
        siblingCount={siblingCount}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onDelete={handleDelete}
      />

      <FieldEditorBody
        field={field}
        onLabelChange={handleLabelChange}
        onRequiredChange={handleRequiredChange}
        onMinChange={handleMinChange}
        onMaxChange={handleMaxChange}
      />

      {field.type === FIELD_TYPE.GROUP && (
        <FieldEditorChildren
          children={field.children}
          fieldPath={fieldPath}
          dispatch={dispatch}
          onAddChild={handleAddChild}
        />
      )}
    </div>
  );
});

export default FieldEditor;
