import { useState, useRef, useCallback, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { routeSections } from '../data/routeSections.js'

const nl = () => ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

const MIN_WIDTH = 48
const MAX_WIDTH = 480
const DEFAULT_WIDTH = 280
const COLLAPSED_THRESHOLD = 120 // ниже этого — считаем "свёрнутым"
const STORAGE_KEY = 'nppa-sidebar-width'

function SectionList({ sections, basePath }) {
  if (!sections || sections.length === 0) return null
  return (
    <div className="nav-sublist">
      {sections.map(sec => (
        <Link key={sec.id} to={`${basePath}?to=${sec.id}`} className="nav-sublink">
          {sec.title}
        </Link>
      ))}
    </div>
  )
}

function NavItem({ to, label }) {
  const { pathname } = useLocation()
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))
  const sections = routeSections[to]

  return (
    <div className="nav-item">
      <NavLink to={to} end={to === '/'} className={nl()}>
        {label}
      </NavLink>
      {isActive && <SectionList sections={sections} basePath={to} />}
    </div>
  )
}

export default function Sidebar() {
  const [width, setWidth] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage?.getItem?.(STORAGE_KEY) : null
    return saved ? Number(saved) : DEFAULT_WIDTH
  })
  const draggingRef = useRef(false)

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    draggingRef.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX))
      setWidth(next)
    }
    function onUp() {
      if (!draggingRef.current) return
      draggingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      try { localStorage?.setItem?.(STORAGE_KEY, String(width)) } catch {}
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [width])

  const onDoubleClick = useCallback(() => {
    setWidth(DEFAULT_WIDTH)
    try { localStorage?.setItem?.(STORAGE_KEY, String(DEFAULT_WIDTH)) } catch {}
  }, [])

  const isCollapsed = width < COLLAPSED_THRESHOLD

  return (
    <nav
      className={`sidebar${isCollapsed ? ' sidebar--collapsed' : ''}`}
      style={{ width: `${width}px` }}
      aria-label="Навигация по вики НППА"
    >
      <div className="sidebar-inner">
        <Link to="/" className="brand">НППА · Вики</Link>
        <span className="brand-sub">openapc.ru/nppa</span>

        <div className="nav-group">
          <Link to="/" className="nav-group-title nav-group-title--link">Платформа</Link>
          <NavItem to="/" label="Обзор" />
          <Link to="/?to=principles" className="nav-link nav-link--sub">Принципы</Link>
          <Link to="/?to=elements" className="nav-link nav-link--sub">Ключевые элементы</Link>
          <Link to="/?to=international" className="nav-link nav-link--sub">Международный опыт</Link>
        </div>

        <div className="nav-group">
          <Link to="/stand/architecture" className="nav-group-title nav-group-title--link">Распределённый стенд</Link>
          <NavItem to="/stand/architecture" label="Архитектура" />
          <NavItem to="/stand/releases" label="Релизы" />
        </div>

        <div className="nav-group">
          <Link to="/components" className="nav-group-title nav-group-title--link">Реестр</Link>
          <NavItem to="/components" label="Карта компонентов" />
          <NavItem to="/showcase" label="Витрина решений" />
        </div>

        <div className="nav-group">
          <Link to="/trg" className="nav-group-title nav-group-title--link">Документы РГ</Link>
          <NavItem to="/trg" label="Технические рабочие группы" />
          <NavItem to="/standards" label="Стандарты и ТТ" />
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Справочник</div>
          <NavItem to="/glossary" label="Глоссарий" />
          <NavItem to="/contacts" label="Контакты" />
        </div>
      </div>

      <div
        className="sidebar-resize-handle"
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        role="separator"
        aria-orientation="vertical"
        aria-label="Изменить ширину (двойной клик — сбросить)"
        tabIndex={0}
      />
    </nav>
  )
}
