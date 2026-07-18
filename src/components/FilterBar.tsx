import { Search } from 'lucide-react'

export interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  firstLabel?: string
  firstValue?: string
  firstOptions?: FilterOption[]
  onFirstChange?: (value: string) => void
  secondLabel?: string
  secondValue?: string
  secondOptions?: FilterOption[]
  onSecondChange?: (value: string) => void
  resultCount?: number
}

export function FilterBar({
  query,
  onQueryChange,
  placeholder,
  firstLabel,
  firstValue,
  firstOptions,
  onFirstChange,
  secondLabel,
  secondValue,
  secondOptions,
  onSecondChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar" aria-label="Collection filters">
      <label className="search-field">
        <Search size={16} strokeWidth={1.7} aria-hidden="true" />
        <span className="sr-only">Search</span>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} />
      </label>
      {firstOptions && firstLabel && onFirstChange && (
        <label className="select-field">
          <span>{firstLabel}</span>
          <select value={firstValue} onChange={(event) => onFirstChange(event.target.value)}>
            {firstOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </label>
      )}
      {secondOptions && secondLabel && onSecondChange && (
        <label className="select-field">
          <span>{secondLabel}</span>
          <select value={secondValue} onChange={(event) => onSecondChange(event.target.value)}>
            {secondOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </label>
      )}
      {typeof resultCount === 'number' && <span className="filter-count" aria-live="polite">{resultCount} result{resultCount === 1 ? '' : 's'}</span>}
    </div>
  )
}
