import { memo } from 'react';
import { FIELD_TYPE_LABELS, SYMBOL, ARIA } from '@/constants';
import type { FormField } from '@/types';

interface FieldEditorHeaderProps {
  fieldType: FormField['type'];
  index: number;
  siblingCount: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

const FieldEditorHeader = memo(function FieldEditorHeader({
  fieldType,
  index,
  siblingCount,
  onMoveUp,
  onMoveDown,
  onDelete,
}: FieldEditorHeaderProps) {
  return (
    <div className="field-editor__header">
      <span className="field-editor__type-badge" data-type={fieldType}>
        {FIELD_TYPE_LABELS[fieldType]}
      </span>
      <div className="field-editor__actions">
        <button
          className="btn btn--icon"
          onClick={onMoveUp}
          disabled={index === 0}
          title={ARIA.MOVE_UP}
          aria-label={ARIA.MOVE_UP}
        >
          <span aria-hidden="true">{SYMBOL.ARROW_UP}</span>
        </button>
        <button
          className="btn btn--icon"
          onClick={onMoveDown}
          disabled={index === siblingCount - 1}
          title={ARIA.MOVE_DOWN}
          aria-label={ARIA.MOVE_DOWN}
        >
          <span aria-hidden="true">{SYMBOL.ARROW_DOWN}</span>
        </button>
        <button
          className="btn btn--icon btn--danger"
          onClick={onDelete}
          title={ARIA.DELETE}
          aria-label={ARIA.DELETE}
        >
          <span aria-hidden="true">{SYMBOL.CLOSE}</span>
        </button>
      </div>
    </div>
  );
});

export default FieldEditorHeader;
