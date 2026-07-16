import { contacts } from '../data/content.js'
import { trgGroups } from '../data/trg.js'
import Footer from '../components/Footer.jsx'

export default function Contacts() {
  return (
    <article>
      <div className="eyebrow">Связь с рабочей группой</div>
      <h1>Контакты</h1>

      <h2 style={{ marginTop: '0.5rem' }}>Рабочая группа</h2>
      <div className="contact-block">
        <p>E-mail: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></p>
        <p>Телефон: <a href={contacts.phoneHref}>{contacts.phone}</a></p>
        {contacts.links.map((l) => (
          <p key={l.url}>
            <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          </p>
        ))}
        <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--color-ink-soft)' }}>
          {contacts.org}
        </p>
      </div>

      <hr className="rule" />

      <h2>Координаторы технических рабочих групп</h2>
      <p>По вопросам участия в конкретной ТРГ обращайтесь напрямую к координаторам.</p>

      <div className="contacts-trg-list">
        {trgGroups.map(group => (
          <div key={group.id} className="contacts-trg-item">
            <div className="contacts-trg-group">{group.shortTitle}</div>
            <div className="contacts-trg-name">{group.coordinator.name}</div>
            <div className="contacts-trg-org">{group.coordinator.org}</div>
            <a
              href={`mailto:${group.coordinator.email}`}
              className="contacts-trg-email"
            >
              {group.coordinator.email}
            </a>

            {group.subgroups && group.subgroups.map(sg => (
              <div key={sg.id} className="contacts-trg-subgroup">
                <div className="contacts-trg-group" style={{ fontSize: '0.78rem' }}>
                  Подгруппа: {sg.title.replace(/^Подгруппа ТРГ \(OCF - шина\) /, '')}
                </div>
                <div className="contacts-trg-name">{sg.coordinator.name}</div>
                <div className="contacts-trg-org">{sg.coordinator.org}</div>
                <a href={`mailto:${sg.coordinator.email}`} className="contacts-trg-email">
                  {sg.coordinator.email}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </article>
  )
}
