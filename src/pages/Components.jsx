import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SECTIONS, TRG_LEADERS, TRL_LABELS, getStats } from '../data/components.js'

// ─── Цвета лидеров ТРГ ───────────────────────
const LEADER_COLORS = {
  gpn: '#f59e0b',
  tn:  '#16a34a',
  ss:  '#2563eb',
  rt:  '#dc2626',
  kis: '#06b6d4',
  eh:  '#4f46e5',
  ia:  '#be123c',
  ra:  '#0891b2',
}

const LEADER_SHORT = {
  gpn: 'Газпромнефть',
  tn:  'Транснефть',
  ss:  'Северсталь',
  rt:  'Ростелеком',
  kis: 'НПО КИС',
  eh:  'ЕвроХим',
  ia:  'ИНТИ+АСПЕКТ',
  ra:  'Росатом',
}

// ─── Утилиты ──────────────────────────────────
function compBestTrl(comp) {
  const sols = (comp.solutions || []).filter(s => s.name)
  if (!sols.length) return null
  const order = { '89': 3, '57': 2, '14': 1 }
  let best = null
  for (const s of sols) {
    if (s.trl && (order[s.trl] || 0) > (order[best] || 0)) best = s.trl
  }
  return best
}

function cardClass(comp, selectedId) {
  const sols = (comp.solutions || []).filter(s => s.name)
  const hasSol = sols.length > 0
  const trl = compBestTrl(comp)
  let cls = 'cm-card'
  if (!hasSol) cls += ' cm-card--miss'
  else if (trl === '89') cls += ' cm-card--trl89'
  else if (trl === '57') cls += ' cm-card--trl57'
  else if (trl === '14') cls += ' cm-card--trl14'
  else cls += ' cm-card--hassol'
  if (comp.id === selectedId) cls += ' cm-card--selected'
  return cls
}

// ─── Карточка компонента ──────────────────────
function CompCard({ comp, selectedId, onSelect }) {
  const sols = (comp.solutions || []).filter(s => s.name)
  const hasSol = sols.length > 0
  const hasDemo = sols.some(s => s.demo)

  return (
    <button
      className={cardClass(comp, selectedId)}
      onClick={() => onSelect(comp)}
      tabIndex={0}
    >
      <div className="cm-card-name">{comp.name}</div>
      <div className="cm-card-badge">{hasSol ? sols.length : '—'}</div>
      {hasDemo && <div className="cm-card-star" title="Демо на стенде РГ ОАСУТП">★</div>}
    </button>
  )
}

// ─── Боковая панель детали ────────────────────
function SidePanel({ comp }) {
  if (!comp) {
    return (
      <div className="cm-side-empty">
        <div className="cm-side-empty-icon">◷</div>
        <p>Выберите компонент на карте слева</p>
      </div>
    )
  }

  const sols = (comp.solutions || []).filter(s => s.name)
  const hasSol = sols.length > 0
  const trl = compBestTrl(comp)
  const hdrMod = trl === '57' ? ' cm-side-hdr--57' : trl === '14' ? ' cm-side-hdr--14' : !trl ? ' cm-side-hdr--miss' : ''

  const mailSubj = encodeURIComponent(`Предложение решения для компонента «${comp.name}» — Витрина НППА`)
  const mailBody = encodeURIComponent(
    `Здравствуйте!\n\nПредлагаю включить в витрину решений НППА следующее решение:\n\n` +
    `Компонент: ${comp.name}\n\nНазвание решения: \nПроизводитель (официальное наименование): \n` +
    `Официальный сайт: \nУГТ: \nЗапись в Реестре отечественного ПО (если есть): \n` +
    `Краткое описание (1–2 предложения): \n\nНастоящим письмом подтверждаю готовность предоставить решение на тестирование на совместимость с НППА.\n\nС уважением,\n[ФИО, организация, контакт]`
  )

  return (
    <div className="cm-side-content">
      {/* Хедер панели */}
      <div className={`cm-side-hdr${hdrMod}`}>
        <div className="cm-side-row">Компонент</div>
        <div className="cm-side-title">{comp.name}</div>
      </div>

      {/* Лидеры ТРГ */}
      <div className="cm-side-sec">
        <div className="cm-side-sec-title">Лидеры ТРГ</div>
        <div className="cm-lchips">
          {comp.leaders && comp.leaders.length > 0
            ? comp.leaders.map(l => (
                <span key={l} className="cm-lchip">
                  <span className="cm-lchip-dot" style={{ background: LEADER_COLORS[l] || '#888' }} />
                  {TRG_LEADERS[l] || l}
                </span>
              ))
            : <span className="cm-lchip cm-lchip--none">
                <span className="cm-lchip-dot" style={{ background: '#6b7a91' }} />
                Лидер ТРГ не определён
              </span>
          }
        </div>
      </div>

      {/* ТРГ */}
      <div className="cm-side-sec">
        <div className="cm-side-sec-title">Требования разрабатываются в ТРГ</div>
        <div className="cm-trg-box">
          {comp.trg
            ? comp.trg
            : <span className="cm-trg-none">ТРГ не определена</span>
          }
        </div>
      </div>

      {/* Решения */}
      <div className="cm-side-sec">
        <div className="cm-side-sec-title">Решения{hasSol ? ` · ${sols.length}` : ''}</div>
        {!hasSol ? (
          <div className="cm-no-sol">
            <strong>Нет решения.</strong>{' '}
            {comp.missStatus || 'По данному компоненту решение не найдено или не тестировалось на совместимость с НППА.'}
          </div>
        ) : sols.map((s, i) => (
          <div key={i} className="cm-sol">
            <p className="cm-sol-name">
              {s.demo && <span className="cm-sol-star" title="Продемонстрировано на стенде РГ ОАСУТП">★ </span>}
              {s.name}
            </p>
            <p className="cm-sol-vendor">{s.vendor}</p>
            {s.trl && (
              <div className="cm-meta-row">
                <span className={`cm-chip cm-chip--${s.trl === '89' ? 'trl89' : s.trl === '57' ? 'trl57' : 'trl14'}`}>
                  {s.trl_val ? `УГТ-${s.trl_val}` : TRL_LABELS[s.trl] || s.trl}
                </span>
              </div>
            )}
            {s.status && (
              <div className="cm-meta-row">
                <span className="cm-chip cm-chip--status">Статус РГ</span>
                <span className="cm-meta-text">{s.status}</span>
              </div>
            )}
            <div className="cm-meta-row">
              <span className="cm-chip cm-chip--compat">Совместимость НППА</span>
              <span className="cm-meta-text cm-meta-stub">Не протестировано — совместимость заявлена</span>
            </div>
            <div className="cm-meta-row">
              <span className="cm-chip cm-chip--rg">Участие в РГ</span>
              <span className="cm-meta-text cm-meta-stub">Данные будут добавлены</span>
            </div>
            <div className="cm-meta-row">
              <span className="cm-chip cm-chip--export">Рекомендовано на экспорт</span>
              <span className="cm-meta-text cm-meta-stub">Оценка будет добавлена</span>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка предложить решение */}
      <div className="cm-side-sec cm-side-sec--last">
        <a
          className="cm-add-sol-btn"
          href={`mailto:mt@openapc.ru?subject=${mailSubj}&body=${mailBody}`}
        >
          + Предложить решение
        </a>
      </div>
    </div>
  )
}

// ─── Главная страница ─────────────────────────
export default function Components() {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [filterMiss, setFilterMiss] = useState(false)
  const stats = useMemo(() => getStats(), [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return SECTIONS.map(sec => ({
      ...sec,
      components: sec.components.filter(comp => {
        const hasSol = (comp.solutions || []).some(s => s.name)
        if (filterMiss && hasSol) return false
        if (!q) return true
        return comp.name.toLowerCase().includes(q) ||
          (comp.solutions || []).some(s =>
            s.name?.toLowerCase().includes(q) || s.vendor?.toLowerCase().includes(q)
          )
      }),
    })).filter(s => s.components.length > 0)
  }, [query, filterMiss])

  const handleSelect = (comp) => {
    setSelected(prev => prev?.id === comp.id ? null : comp)
  }

  return (
    <div className="cm-page">

      {/* ── ТОПБАР ── */}
      <header className="cm-topbar">
        <div>
          <h1 className="cm-topbar-title">Витрина решений НППА</h1>
          <div className="cm-topbar-sub">Компоненты НППА · Рабочая группа по ОАСУТП · Минпромторг РФ</div>
        </div>
        <div className="cm-topbar-stats">
          <div className="cm-stat">
            <div className="cm-stat-num cm-stat-num--ok">{stats.covered}</div>
            <div className="cm-stat-label">Покрыто</div>
          </div>
          <div className="cm-stat">
            <div className="cm-stat-num cm-stat-num--warn">{stats.missing}</div>
            <div className="cm-stat-label">Нет решения</div>
          </div>
          <div className="cm-stat">
            <div className="cm-stat-num">{stats.total}</div>
            <div className="cm-stat-label">Компонентов</div>
          </div>
          <div className="cm-stat">
            <div className="cm-stat-num">{stats.solutions}</div>
            <div className="cm-stat-label">Решений</div>
          </div>
        </div>
      </header>

      {/* ── NOTICE BAR ── */}
      <div className="cm-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>Стандарты на компоненты НППА: </span>
        <Link to="/standards" className="cm-notice-link">Раздел «Стандарты и ТТ»</Link>
      </div>

      {/* ── ТУЛБАР ── */}
      <div className="cm-toolbar">
        <div className="cm-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cm-search-icon">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="cm-search"
            type="text"
            placeholder="Поиск компонента или решения..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <span className="cm-toolbar-label">Фильтр:</span>
        <button
          className={`cm-toggle${!filterMiss ? ' cm-toggle--active' : ''}`}
          onClick={() => setFilterMiss(false)}
        >
          Все компоненты
        </button>
        <button
          className={`cm-toggle${filterMiss ? ' cm-toggle--active' : ''}`}
          onClick={() => setFilterMiss(f => !f)}
        >
          <span className={`cm-toggle-dot${filterMiss ? ' cm-toggle-dot--active' : ''}`} />
          Нет решения
        </button>
      </div>

      {/* ── ОСНОВНОЙ LAYOUT ── */}
      <div className="cm-layout">

        {/* Карта компонентов */}
        <div className="cm-map-col">
          {filtered.length === 0
            ? <div className="cm-empty">Ничего не найдено</div>
            : filtered.map(sec => (
                <div key={sec.id} className="cm-section">
                  <div className="cm-section-hdr">
                    <div className="cm-section-label">{sec.name}</div>
                    <div className="cm-section-cards">
                      {sec.components.map(comp => (
                        <CompCard
                          key={comp.id}
                          comp={comp}
                          selectedId={selected?.id}
                          onSelect={handleSelect}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Боковая панель */}
        <div className="cm-side-col">
          <SidePanel comp={selected} />
        </div>
      </div>

      {/* ── ЛЕГЕНДА ── */}
      <div className="cm-legend">
        <div className="cm-lg">
          <span className="cm-lg-label">УГТ:</span>
          <span className="cm-li"><span className="cm-lsw" style={{background:'#6ee7b7',border:'1px solid #34d399'}}/>УГТ 8–9</span>
          <span className="cm-li"><span className="cm-lsw" style={{background:'#fcd34d',border:'1px solid #f59e0b'}}/>УГТ 5–7</span>
          <span className="cm-li"><span className="cm-lsw" style={{background:'#fca5a5',border:'1px solid #f87171'}}/>УГТ 1–4</span>
          <span className="cm-li"><span className="cm-lsw" style={{background:'#e2e8f0',border:'1px solid #94a3b8'}}/>Нет решения</span>
        </div>
        <div className="cm-lg">
          <span className="cm-lg-label">Лидеры ТРГ:</span>
          {Object.entries(LEADER_COLORS).map(([key, color]) => (
            <span key={key} className="cm-li">
              <span className="cm-ldotl" style={{background: color}}/>
              {LEADER_SHORT[key]}
            </span>
          ))}
        </div>
        <div className="cm-lg">
          <span className="cm-li"><span style={{color:'#f59e0b',fontSize:'13px'}}>★</span> Демо на стенде РГ ОАСУТП</span>
        </div>
      </div>

    </div>
  )
}
