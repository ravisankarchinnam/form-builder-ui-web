import { memo } from 'react';
import { PANEL, BUTTON, EMPTY_STATE, FEEDBACK } from '@/constants';
import { usePreviewPanel } from '@/components/Preview/hooks/usePreviewPanel';
import PreviewField from '@/components/Preview/PreviewField';

const PreviewPanel = memo(function PreviewPanel() {
  const {
    schema,
    values,
    errorMap,
    hasFields,
    showSuccess,
    handleChange,
    handleSubmit,
    handleReset,
  } = usePreviewPanel();

  return (
    <section className="panel preview-panel">
      <div className="panel__header">
        <h2>{PANEL.PREVIEW}</h2>
        {hasFields && (
          <button className="btn btn--ghost" type="button" onClick={handleReset}>
            {BUTTON.RESET}
          </button>
        )}
      </div>

      <div className="panel__body">
        {!hasFields && (
          <p className="empty-message">{EMPTY_STATE.PREVIEW}</p>
        )}

        {hasFields && (
          <form onSubmit={handleSubmit} noValidate>
            {schema.fields.map((field) => (
              <PreviewField
                key={field.id}
                field={field}
                values={values}
                errorMap={errorMap}
                onChange={handleChange}
              />
            ))}
            <div className="preview-actions">
              <button className="btn btn--primary" type="submit">
                {BUTTON.VALIDATE}
              </button>
            </div>
            {showSuccess && (
              <div className="success-banner">{FEEDBACK.VALIDATION_SUCCESS}</div>
            )}
          </form>
        )}
      </div>
    </section>
  );
});

export default PreviewPanel;
