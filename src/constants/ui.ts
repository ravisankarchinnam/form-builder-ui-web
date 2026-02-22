export const APP = {
  TITLE: 'Configurable Form Builder',
  SUBTITLE:
    'Design dynamic forms with nested groups, real-time preview, and JSON import/export.',
} as const;

export const PANEL = {
  BUILDER: 'Builder',
  PREVIEW: 'Live Preview',
  IMPORT_EXPORT: 'Import / Export',
} as const;

export const BUTTON = {
  ADD_TEXT: '+ Text',
  ADD_NUMBER: '+ Number',
  ADD_GROUP: '+ Group',
  EXPORT: 'Export to JSON',
  IMPORT: 'Import from JSON',
  VALIDATE: 'Validate & Submit',
  RESET: 'Reset',
} as const;

export const LABEL = {
  LABEL: 'Label',
  REQUIRED: 'Required',
  MIN: 'Min',
  MAX: 'Max',
  CHILDREN: 'Children',
} as const;

export const PLACEHOLDER = {
  FIELD_LABEL: 'Field label…',
  MIN_MAX: '—',
  TEXT_INPUT: 'Enter text…',
  NUMBER_INPUT: 'Enter a number',
  IMPORT_AREA:
    'Paste JSON schema here, then click "Import from JSON"…',
} as const;

export const EMPTY_STATE = {
  BUILDER: 'No fields yet. Use the buttons above to start building your form.',
  PREVIEW: 'Add fields in the Builder to see a live preview here.',
  CHILDREN: 'No children yet. Add fields above.',
  GROUP: 'Empty group',
  UNLABELED: '(unlabeled)',
} as const;

export const SYMBOL = {
  ARROW_UP: '↑',
  ARROW_DOWN: '↓',
  CLOSE: '✕',
  REQUIRED: ' *',
} as const;

export const ARIA = {
  MOVE_UP: 'Move Up',
  MOVE_DOWN: 'Move Down',
  DELETE: 'Delete',
  JSON_SCHEMA: 'JSON schema',
} as const;

export const ERROR_BOUNDARY = {
  TITLE: 'Something went wrong',
  DESCRIPTION: 'An unexpected error occurred. Please refresh the page or try again.',
  RETRY: 'Try Again',
} as const;

export const FEEDBACK = {
  VALIDATION_SUCCESS: 'All fields are valid!',
  IMPORT_SUCCESS: 'Schema imported successfully!',
  ERR_EMPTY_JSON: 'JSON input is empty.',
  ERR_INVALID_JSON: 'Invalid JSON syntax. Please check your input.',
  ERR_INVALID_SCHEMA:
    'Invalid schema structure. Expected { "fields": [...] } with valid field definitions and unique IDs.',
} as const;

export const VALIDATION = {
  REQUIRED_FALLBACK: 'This field',
  INVALID_NUMBER: 'Must be a valid number.',
  MIN_EXCEEDS_MAX: 'Min must not exceed max.',
} as const;
