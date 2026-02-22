import { memo, useCallback } from 'react';
import type { FieldType } from '@/types';
import { FIELD_TYPE, BUTTON } from '@/constants';

interface AddFieldButtonsProps {
  variant: 'primary' | 'small';
  onAdd: (type: FieldType) => void;
}

interface AddFieldButtonProps {
  type: FieldType;
  label: string;
  className: string;
  onAdd: (type: FieldType) => void;
}

const FIELD_OPTIONS: ReadonlyArray<{ type: FieldType; label: string }> = [
  { type: FIELD_TYPE.TEXT, label: BUTTON.ADD_TEXT },
  { type: FIELD_TYPE.NUMBER, label: BUTTON.ADD_NUMBER },
  { type: FIELD_TYPE.GROUP, label: BUTTON.ADD_GROUP },
];

const VARIANT_CLASS: Record<AddFieldButtonsProps['variant'], string> = {
  primary: 'btn btn--primary',
  small: 'btn btn--small',
};

const AddFieldButton = memo(function AddFieldButton({ type, label, className, onAdd }: AddFieldButtonProps) {
  const handleClick = useCallback(() => onAdd(type), [onAdd, type]);

  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
});

const AddFieldButtons = memo(function AddFieldButtons({ variant, onAdd }: AddFieldButtonsProps) {
  const className = VARIANT_CLASS[variant];

  return (
    <div className="add-buttons">
      {FIELD_OPTIONS.map(({ type, label }) => (
        <AddFieldButton key={type} type={type} label={label} className={className} onAdd={onAdd} />
      ))}
    </div>
  );
});

export default AddFieldButtons;
