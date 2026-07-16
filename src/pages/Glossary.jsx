import { glossaryGroups } from '../data/glossary.js'
import Footer from '../components/Footer.jsx'

export default function Glossary() {
  return (
    <article>
      <div className="eyebrow">Справочник</div>
      <h1>Глоссарий</h1>
      <p>
        Термины, аббревиатуры и протоколы, используемые в материалах НППА — на платформе,
        распределённом стенде и в обзоре международного опыта.
      </p>

      {glossaryGroups.map(group => (
        <section key={group.id} id={group.id} className="glossary-group">
          <h2>{group.title}</h2>
          <dl className="glossary-list">
            {group.terms.map(({ term, def }) => (
              <div className="glossary-item" key={term}>
                <dt className="glossary-term">{term}</dt>
                <dd className="glossary-def">{def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <Footer />
    </article>
  )
}
