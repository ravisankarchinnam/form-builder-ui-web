import { memo } from 'react';
import { PANEL, BUTTON, PLACEHOLDER, FEEDBACK, ARIA } from '@/constants';
import { useImportExport } from '@/components/ImportExport/hooks/useImportExport';

const ImportExport = memo(function ImportExport() {
  const {
    jsonText,
    importError,
    importSuccess,
    handleExport,
    handleImport,
    handleTextChange,
  } = useImportExport();

  return (
    <section className="panel import-export-panel">
      <div className="panel__header">
        <h2>{PANEL.IMPORT_EXPORT}</h2>
      </div>
      <div className="panel__body">
        <div className="import-export__actions">
          <button className="btn btn--primary" onClick={handleExport}>
            {BUTTON.EXPORT}
          </button>
          <button className="btn btn--secondary" onClick={handleImport}>
            {BUTTON.IMPORT}
          </button>
        </div>

        <textarea
          className="import-export__textarea"
          value={jsonText}
          onChange={handleTextChange}
          placeholder={PLACEHOLDER.IMPORT_AREA}
          aria-label={ARIA.JSON_SCHEMA}
          spellCheck={false}
        />

        {importError && <div className="error-banner">{importError}</div>}
        {importSuccess && (
          <div className="success-banner">{FEEDBACK.IMPORT_SUCCESS}</div>
        )}
      </div>
    </section>
  );
});

export default ImportExport;
