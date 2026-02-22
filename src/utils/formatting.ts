import { PLACEHOLDER, VALIDATION } from '@/constants';

export function requiredMessage(label: string): string {
  return `${label || VALIDATION.REQUIRED_FALLBACK} is required.`;
}

export function minMessage(min: number): string {
  return `Minimum value is ${min}.`;
}

export function maxMessage(max: number): string {
  return `Maximum value is ${max}.`;
}

export function numberPlaceholder(min?: number, max?: number): string {
  const parts: string[] = [];
  if (min != null) parts.push(`min: ${min}`);
  if (max != null) parts.push(`max: ${max}`);

  return parts.length > 0
    ? `${PLACEHOLDER.NUMBER_INPUT} (${parts.join(', ')})`
    : PLACEHOLDER.NUMBER_INPUT;
}
