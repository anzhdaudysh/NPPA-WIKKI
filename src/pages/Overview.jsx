import { Link } from 'react-router-dom'
import { siteInfo } from '../data/content.js'
import PrinciplesContent from '../components/sections/PrinciplesContent.jsx'
import ElementsContent from '../components/sections/ElementsContent.jsx'
import InternationalContent from '../components/sections/InternationalContent.jsx'
import Footer from '../components/Footer.jsx'

export default function Overview() {
  return (
    <article>
      <div className="eyebrow" id="intro">НППА · Обзор платформы</div>
      <h1>{siteInfo.title}</h1>
      <p>{siteInfo.description}</p>

      <hr className="rule" />

      <section id="principles">
        <PrinciplesContent headingLevel="h2" />
      </section>

      <hr className="rule" />

      <section id="elements">
        <ElementsContent headingLevel="h2" />
      </section>

      <hr className="rule" />

      <section id="international">
        <InternationalContent headingLevel="h2" />
      </section>

      <hr className="rule" />

      <section id="sections">
        <h2 style={{ marginTop: 0 }}>Разделы вики</h2>
        <ul>
          <li>
            <Link to="/stand/architecture">Распределённый стенд — Архитектура</Link> — хаб,
            сеть, площадки, информационная безопасность, сценарий интероперабельности, карта компонентов.
          </li>
          <li>
            <Link to="/stand/releases">Распределённый стенд — Релизы</Link> — релизный путь
            прототипа НППА: IV кв. 2025, II кв. 2026, ЦИПР-2026.
          </li>
          <li>
            <Link to="/components">Карта компонентов</Link> — реестр решений и дефицитов
            по компонентам открытой АСУ ТП.
          </li>
          <li>
            <Link to="/glossary">Глоссарий</Link> — термины, аббревиатуры и протоколы,
            используемые в материалах НППА.
          </li>
        </ul>
      </section>

      <Footer />
    </article>
  )
}
