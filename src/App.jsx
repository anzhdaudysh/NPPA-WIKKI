import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Overview from './pages/Overview.jsx'
import Elements from './pages/Elements.jsx'
import Principles from './pages/Principles.jsx'
import International from './pages/International.jsx'
import StandArchitecture from './pages/stand/StandArchitecture.jsx'
import StandReleases from './pages/stand/StandReleases.jsx'
import Components from './pages/Components.jsx'
import Showcase from './pages/Showcase.jsx'
import Glossary from './pages/Glossary.jsx'
import Trg from './pages/Trg.jsx'
import Standards from './pages/Standards.jsx'
import Contacts from './pages/Contacts.jsx'
import useAnchorScroll from './hooks/useAnchorScroll.js'

function Layout() {
  // Должен вызываться внутри <HashRouter>, поэтому вынесен в отдельный компонент
  useAnchorScroll()
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content">
        {/* key={pathname} перезапускает CSS-анимацию page-transition при каждой навигации.
            См. комментарий "ПЛАВНОСТЬ ИНТЕРФЕЙСА" в global.css для отключения. */}
        <div className="page-transition" key={pathname}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/elements" element={<Elements />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/international" element={<International />} />
            <Route path="/stand" element={<Navigate to="/stand/architecture" replace />} />
            <Route path="/stand/architecture" element={<StandArchitecture />} />
            <Route path="/stand/releases" element={<StandReleases />} />
            <Route path="/components" element={<Components />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/trg" element={<Trg />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}
