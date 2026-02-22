import { memo, type ChangeEvent } from 'react';
import type { FormField } from '@/types';
import { FIELD_TYPE, LABEL, PLACEHOLDER, VALIDATION } from '@/constants';

interface FieldEditorBodyProps {
  field: FormField;
  onLabelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRequiredChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FieldEditorBody = memo(function FieldEditorBody({
  field,
  onLabelChange,
  onRequiredChange,
  onMinChange,
  onMaxChange,
}: FieldEditorBodyProps) {
  const hasMinMaxConflict =
    field.type === FIELD_TYPE.NUMBER &&
    field.min != null &&
    field.max != null &&
    field.min > field.max;

  return (
    <div className="field-editor__body">
      <label className="field-editor__label">
        <span>{LABEL.LABEL}</span>
        <input
          type="text"
          value={field.label}
          onChange={onLabelChange}
          placeholder={PLACEHOLDER.FIELD_LABEL}
          className="input"
        />
      </label>

      <label className="field-editor__checkbox">
        <input
          type="checkbox"
          checked={field.required}
          onChange={onRequiredChange}
        />
        <span>{LABEL.REQUIRED}</span>
      </label>

      {field.type === FIELD_TYPE.NUMBER && (
        <>
          <div className="field-editor__number-opts">
            <label>
              <span>{LABEL.MIN}</span>
              <input
                type="number"
                value={field.min ?? ''}
                onChange={onMinChange}
                placeholder={PLACEHOLDER.MIN_MAX}
                className="input input--small"
              />
            </label>
            <label>
              <span>{LABEL.MAX}</span>
              <input
                type="number"
                value={field.max ?? ''}
                onChange={onMaxChange}
                placeholder={PLACEHOLDER.MIN_MAX}
                className="input input--small"
              />
            </label>
          </div>
          {hasMinMaxConflict && (
            <span className="field-editor__warning">{VALIDATION.MIN_EXCEEDS_MAX}</span>
          )}
        </>
      )}
    </div>
  );
});

export default FieldEditorBody;
