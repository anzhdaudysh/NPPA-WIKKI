import { useState } from 'react'
import { Link } from 'react-router-dom'
import { archPillars, interopChain, standMeta } from '../../data/stand.js'
import { getStats } from '../../data/components.js'
import SpecTag from '../../components/SpecTag.jsx'
import Footer from '../../components/Footer.jsx'

function PillarBlock({ pillar }) {
  const [open, setOpen] = useState(true)
  return (
    <section className="element-block" id={pillar.id}>
      <button
        className="pillar-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="pillar-title">{pillar.title}</span>
        {pillar.operator && (
          <span className="pillar-operator">{pillar.operator}</span>
        )}
        <span className={`pillar-chevron${open ? ' pillar-chevron--open' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="pillar-body">
          <p className="pillar-desc">{pillar.description}</p>
          <div className="pillar-blocks">
            {pillar.blocks.map(block => (
              <div key={block.id} className="arch-block">
                <div className="arch-block-title">{block.title}</div>
                <p className="arch-block-text">{block.text}</p>
                {block.specTags && (
                  <div>{block.specTags.map(t => <SpecTag key={t}>{t}</SpecTag>)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function InteropChain() {
  const [active, setActive] = useState(null)
  return (
    <div className="interop-wrap">
      <div className="interop-chain">
        {interopChain.map((node, i) => (
          <div key={node.id} className="interop-chain-row">
            <button
              className={`interop-node${active === node.id ? ' active' : ''}`}
              onClick={() => setActive(active === node.id ? null : node.id)}
            >
              <span className="interop-label">{node.label}</span>
              <span className="interop-sublabel">{node.sublabel}</span>
            </button>
            {i < interopChain.length - 1 && (
              <div className="interop-arrow">→</div>
            )}
          </div>
        ))}
      </div>
      {active && (() => {
        const node = interopChain.find(n => n.id === active)
        return (
          <div className="interop-detail">
            <div className="interop-detail-title">{node.label}</div>
            <p>{node.description}</p>
          </div>
        )
      })()}
    </div>
  )
}

function ComponentsSnapshot() {
  const stats = getStats()
  const pct = Math.round((stats.covered / stats.total) * 100)
  return (
    <div className="snapshot-block">
      <div className="snapshot-header">
        <div className="snapshot-title">Карта компонентов НППА</div>
        <div className="snapshot-release">
          <span className="spec-tag">II кв. 2026</span>
        </div>
      </div>
      <div className="snapshot-stats">
        <div className="snap-stat">
          <div className="snap-num ok">{stats.covered}</div>
          <div className="snap-label">Покрыто</div>
        </div>
        <div className="snap-stat">
          <div className="snap-num warn">{stats.missing}</div>
          <div className="snap-label">Нет решения</div>
        </div>
        <div className="snap-stat">
          <div className="snap-num">{stats.total}</div>
          <div className="snap-label">Компонентов</div>
        </div>
        <div className="snap-stat">
          <div className="snap-num">{stats.solutions}</div>
          <div className="snap-label">Решений</div>
        </div>
      </div>
      <div className="snap-bar-wrap">
        <div className="snap-bar">
          <div className="snap-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="snap-pct">{pct}%</span>
      </div>
      <Link to="/components" className="btn-download" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Открыть полную карту →
      </Link>
    </div>
  )
}

export default function StandArchitecture() {
  return (
    <article>
      <div className="eyebrow">Распределённый стенд · Архитектура</div>
      <h1>{standMeta.title}</h1>
      <p className="stand-subtitle">{standMeta.subtitle}</p>

      <div className="goal-block">
        <div className="eyebrow">Главная цель</div>
        <p>{standMeta.goal}</p>
      </div>

      <p>{standMeta.description}</p>

      <hr className="rule" />

      <h2>Архитектура: ключевые элементы</h2>
      {archPillars.map(pillar => (
        <PillarBlock key={pillar.id} pillar={pillar} />
      ))}

      <hr className="rule" />

      <h2 id="interop-scenario">Сценарий интероперабельности</h2>
      <p>
        Сквозной проход сигнала по единой цепочке — практическое подтверждение способности
        программных и аппаратных решений от независимых производителей работать в едином
        контуре управления. Нажмите на узел цепочки для получения подробной информации.
      </p>
      <InteropChain />

      <hr className="rule" />

      <h2 id="snapshot">Текущее покрытие компонентов</h2>
      <p>
        Карта компонентов фиксирует состояние платформы на каждый релиз.
        Переключение между релизами показывает динамику заполнения.
      </p>
      <ComponentsSnapshot />

      <Footer />
    </article>
  )
}
