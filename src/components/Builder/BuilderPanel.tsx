import { memo } from 'react';
import { PANEL, EMPTY_STATE } from '@/constants';
import { useBuilderPanel } from '@/components/Builder/hooks/useBuilderPanel';
import AddFieldButtons from '@/components/Builder/AddFieldButtons';
import FieldEditor from '@/components/Builder/FieldEditor';

const BuilderPanel = memo(function BuilderPanel() {
  const { schema, dispatch, handleAddRoot } = useBuilderPanel();

  return (
    <section className="panel builder-panel">
      <div className="panel__header">
        <h2>{PANEL.BUILDER}</h2>
        <AddFieldButtons variant="primary" onAdd={handleAddRoot} />
      </div>

      <div className="panel__body">
        {schema.fields.length === 0 && (
          <p className="empty-message">{EMPTY_STATE.BUILDER}</p>
        )}
        {schema.fields.map((field, i) => (
          <FieldEditor
            key={field.id}
            field={field}
            path={[]}
            index={i}
            siblingCount={schema.fields.length}
            dispatch={dispatch}
          />
        ))}
      </div>
    </section>
  );
});

export default BuilderPanel;
