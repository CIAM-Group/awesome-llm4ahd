import { atlas, assetUrl } from '../lib/data'

interface InstitutionMarkProps {
  ids: string[]
  compact?: boolean
}

export function InstitutionMark({ ids, compact = false }: InstitutionMarkProps) {
  const visible = ids.slice(0, 2)
  const overflow = ids.length - visible.length

  return (
    <span className={`institution-marks${compact ? ' institution-marks--compact' : ''}`} aria-label={ids.map((id) => atlas.institutions[id]?.name).filter(Boolean).join(', ')}>
      {visible.map((id) => {
        const institution = atlas.institutions[id]
        if (!institution) return null
        return (
          <span
            className="institution-mark"
            key={id}
            title={institution.name}
            style={{ '--institution-accent': institution.accent } as React.CSSProperties}
          >
            {institution.logo ? (
              <img src={assetUrl(institution.logo)} alt="" loading="lazy" />
            ) : (
              institution.initials
            )}
          </span>
        )
      })}
      {overflow > 0 && <span className="institution-overflow" title={ids.slice(2).map((id) => atlas.institutions[id]?.name).join(', ')}>+{overflow}</span>}
    </span>
  )
}
