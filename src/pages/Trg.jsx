import { trgGroups } from '../data/trg.js'
import Footer from '../components/Footer.jsx'

function ContactBlock({ person }) {
  return (
    <div className="trg-contact">
      <div className="trg-contact-name">{person.name}</div>
      <div className="trg-contact-position">{person.position}, {person.org}</div>
      <a href={`mailto:${person.email}`} className="trg-contact-email">{person.email}</a>
    </div>
  )
}

function TrgCard({ group }) {
  return (
    <section className="trg-card" id={group.id}>
      <div className="eyebrow">Рабочая группа</div>
      <h2>{group.title}</h2>

      <div className="trg-grid">
        <div className="trg-goals">
          <div className="trg-section-label">Цели и задачи</div>
          <ul>
            {group.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>

          {group.definitions && group.definitions.length > 0 && (
            <>
              <div className="trg-section-label" style={{ marginTop: '1rem' }}>Определения</div>
              <dl className="trg-defs">
                {group.definitions.map(d => (
                  <div key={d.term} className="trg-def-item">
                    <dt>{d.term}</dt>
                    <dd>{d.def}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {group.standards && group.standards.length > 0 && (
            <>
              <div className="trg-section-label" style={{ marginTop: '1rem' }}>Разработанные документы</div>
              {group.standards.map(s => (
                <div key={s.id} className="trg-standard-link">
                  <a href={s.url} target="_blank" rel="noreferrer" className="btn-download">
                    ↓ {s.title}
                  </a>
                  <span className="trg-standard-date">{s.date}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="trg-sidebar">
          <div className="trg-section-label">Координатор</div>
          <ContactBlock person={group.coordinator} />
        </div>
      </div>

      {group.subgroups && group.subgroups.length > 0 && (
        <div className="trg-subgroups">
          {group.subgroups.map(sg => (
            <div key={sg.id} className="trg-subgroup" id={sg.id}>
              <div className="trg-section-label">Подгруппа</div>
              <h3>{sg.title}</h3>
              <div className="trg-grid">
                <div className="trg-goals">
                  <ul>
                    {sg.goals.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
                <div className="trg-sidebar">
                  <div className="trg-section-label">Координатор</div>
                  <ContactBlock person={sg.coordinator} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default function Trg() {
  return (
    <article>
      <div className="eyebrow">Рабочая группа</div>
      <h1>Технические рабочие группы</h1>
      <p>
        В рамках Межотраслевой рабочей группы «Открытая АСУ ТП» действуют тематические
        рабочие группы (ТРГ), каждая из которых отвечает за разработку требований и
        прототипов по конкретному техническому направлению.
        Координаторы ТРГ — представители компаний-участников рабочей группы.
      </p>

      <div className="trg-list">
        {trgGroups.map(group => (
          <TrgCard key={group.id} group={group} />
        ))}
      </div>

      <Footer />
    </article>
  )
}
