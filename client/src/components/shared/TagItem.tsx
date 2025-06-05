import type { TagItemProps } from '../../lib/types/types';

export function TagItem({
  value,
  label,
  color,
  onRemove,
}: TagItemProps) {
  return (
    <span className="form-select-tag">
      <span
        className="form-select-circle"
        style={{ backgroundColor: color }}
      />
      {label}
      <button
        type="button"
        className="form-select-tag-remove"
        onClick={() => onRemove(value)}
      >
        ×
      </button>
    </span>
  );
}
