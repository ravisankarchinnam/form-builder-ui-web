import { memo } from 'react';
import { FIELD_TYPE, EMPTY_STATE, PLACEHOLDER, SYMBOL } from '@/constants';
import { numberPlaceholder } from '@/utils/formatting';
import { usePreviewField } from '@/components/Preview/hooks/usePreviewField';
import type { PreviewFieldProps } from '@/components/Preview/types';

const PreviewField = memo(function PreviewField({
  field,
  values,
  errorMap,
  onChange,
}: PreviewFieldProps) {
  const { errorMessage, value, handleChange } = usePreviewField(field.id, values, errorMap, onChange);

  const displayLabel = field.label || EMPTY_STATE.UNLABELED;

  if (field.type === FIELD_TYPE.GROUP) {
    return (
      <fieldset className="preview-group">
        <legend className="preview-group__legend">
          {displayLabel}
          {field.required && <span className="required-star" aria-hidden="true">{SYMBOL.REQUIRED}</span>}
        </legend>
        {field.children.length === 0 && (
          <p className="empty-message">{EMPTY_STATE.GROUP}</p>
        )}
        {field.children.map((child) => (
          <PreviewField
            key={child.id}
            field={child}
            values={values}
            errorMap={errorMap}
            onChange={onChange}
          />
        ))}
      </fieldset>
    );
  }

  const placeholder =
    field.type === FIELD_TYPE.NUMBER
      ? numberPlaceholder(field.min, field.max)
      : PLACEHOLDER.TEXT_INPUT;

  return (
    <div className={`preview-field${errorMessage ? ' preview-field--error' : ''}`}>
      <label className="preview-field__label" htmlFor={field.id}>
        {displayLabel}
        {field.required && <span className="required-star" aria-hidden="true">{SYMBOL.REQUIRED}</span>}
      </label>
      <input
        id={field.id}
        className="input"
        type={field.type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errorMessage && <span className="preview-field__error">{errorMessage}</span>}
    </div>
  );
});

export default PreviewField;
