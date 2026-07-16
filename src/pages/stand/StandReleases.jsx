import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { releases } from '../../data/stand.js'
import SpecTag from '../../components/SpecTag.jsx'
import Footer from '../../components/Footer.jsx'

function DeltaItem({ item }) {
  return (
    <div className="delta-item">
      <div className="delta-item-title">+ {item.title}</div>
      <p className="delta-item-text">{item.text}</p>
      {item.specTags && (
        <div>{item.specTags.map(t => <SpecTag key={t}>{t}</SpecTag>)}</div>
      )}
    </div>
  )
}

function CyberStandards({ standards }) {
  return (
    <div className="cyber-standards">
      {standards.map(s => (
        <div key={s} className="spec-tag" style={{ marginBottom: '0.3rem', display: 'inline-flex' }}>
          {s}
        </div>
      ))}
    </div>
  )
}

function ReleaseCard({ release, isActive, onToggle }) {
  const pct = release.componentsCovered
    ? Math.round((release.componentsCovered / release.componentsTotal) * 100)
    : null

  return (
    <div className={`release-card${isActive ? ' release-card--open' : ''}${release.status === 'upcoming' ? ' release-card--upcoming' : ''}`}
      id={release.id}>

      {/* Timeline dot */}
      <div className="release-dot" />

      {/* Header — always visible */}
      <button className="release-card-header" onClick={onToggle}>
        <div className="release-card-meta">
          <span className="eyebrow" style={{ margin: 0 }}>{release.period}</span>
          {release.status === 'upcoming' && (
            <span className="release-badge upcoming">в подготовке</span>
          )}
          {release.status === 'published' && (
            <span className="release-badge published">опубликован</span>
          )}
        </div>
        <div className="release-card-event">{release.event}</div>
        {pct !== null && (
          <div className="release-mini-bar">
            <div className="snap-bar" style={{ width: '160px' }}>
              <div className="snap-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="snap-pct">{release.componentsCovered}/{release.componentsTotal} компонентов</span>
          </div>
        )}
        <span className={`release-chevron${isActive ? ' release-chevron--open' : ''}`}>▾</span>
      </button>

      {/* Body — expanded */}
      {isActive && (
        <div className="release-card-body">
          <div className="release-section">
            <div className="release-section-label">Стенд</div>
            <div className="release-section-title">{release.standTitle}</div>
          </div>

          <div className="release-section">
            <div className="release-section-label">Фокус релиза</div>
            <p>{release.focus}</p>
          </div>

          {/* Architecture (Q4-2025) */}
          {release.standArchitecture && (
            <div className="release-section">
              <div className="release-section-label">Архитектура стенда</div>
              <p>{release.standArchitecture.intro}</p>
              {release.standArchitecture.contours.map(c => (
                <div key={c.id} className="arch-block" style={{ marginTop: '0.8rem' }}>
                  <div className="arch-block-title">{c.title}</div>
                  <p className="arch-block-text">{c.text}</p>
                  {c.specTags && <div>{c.specTags.map(t => <SpecTag key={t}>{t}</SpecTag>)}</div>}
                </div>
              ))}
              <div className="arch-block" style={{ marginTop: '0.8rem' }}>
                <div className="arch-block-title">{release.standArchitecture.dispatcher.title}</div>
                <p className="arch-block-text">{release.standArchitecture.dispatcher.text}</p>
              </div>
              {release.standArchitecture.remoteSites?.length > 0 && (
                <div style={{ marginTop: '0.8rem' }}>
                  <div className="release-section-label">Удалённые площадки</div>
                  <ul>
                    {release.standArchitecture.remoteSites.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Delta (Q2-2026) */}
          {release.delta && (
            <div className="release-section">
              <div className="release-section-label">{release.delta.intro}</div>
              {release.delta.items.map(item => (
                <DeltaItem key={item.title} item={item} />
              ))}
            </div>
          )}

          {/* Interop scenario (Q2-2026) */}
          {release.interopScenario && (
            <div className="release-section">
              <div className="release-section-label">Сценарий интероперабельности</div>
              <p><strong>Технологический фундамент:</strong> {release.interopScenario.foundation}</p>
              {release.interopScenario.chain.map(level => (
                <div key={level.level} style={{ marginTop: '0.8rem' }}>
                  <div className="arch-block-title">{level.level}</div>
                  {level.note && <p className="arch-block-text" style={{ fontStyle: 'italic' }}>{level.note}</p>}
                  <ul>{level.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          )}

          {/* Cybersecurity */}
          {release.cybersecurity && (
            <div className="release-section">
              <div className="release-section-label">Информационная безопасность</div>
              <ul>
                {release.cybersecurity.components.map(c => <li key={c}>{c}</li>)}
              </ul>
              <div style={{ marginTop: '0.8rem' }}>
                <div className="release-section-label" style={{ marginBottom: '0.4rem' }}>Применяемые стандарты</div>
                <CyberStandards standards={release.cybersecurity.standards} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="release-actions">
            {release.componentsCovered && (
              <Link
                to={`/components?release=${release.id}`}
                className="btn-download"
              >
                Карта компонентов этого релиза →
              </Link>
            )}
            {release.downloadUrl && (
              <a
                href={release.downloadUrl}
                className="btn-download"
                target="_blank"
                rel="noreferrer"
                style={{ background: 'var(--color-ink-soft)' }}
              >
                ↓ Скачать описание стенда (PDF)
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function StandReleases() {
  const [activeId, setActiveId] = useState('q2-2026')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const anchor = searchParams.get('to')
    if (anchor && releases.some(r => r.id === anchor)) {
      setActiveId(anchor)
    }
  }, [searchParams])

  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <article>
      <div className="eyebrow">Распределённый стенд · Релизный путь</div>
      <h1>Релизы</h1>
      <p>
        Рабочая группа ОАСУ ТП реализует релизный путь прототипа НППА: результаты работы
        фиксируются и демонстрируются публично на профильных мероприятиях. Каждый релиз —
        документально подтверждённый срез технической готовности платформы с описанием
        состава стенда, реализованных сценариев и покрытия компонентов.
      </p>

      <div className="releases-timeline">
        {releases.map(release => (
          <ReleaseCard
            key={release.id}
            release={release}
            isActive={activeId === release.id}
            onToggle={() => toggle(release.id)}
          />
        ))}
      </div>

      <Footer />
    </article>
  )
}
