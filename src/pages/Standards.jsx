import { allStandards, trgGroups } from '../data/trg.js'
import Footer from '../components/Footer.jsx'

export default function Standards() {
  return (
    <article>
      <div className="eyebrow">Документы РГ</div>
      <h1>Стандарты и технические требования</h1>
      <p>
        Рабочая группа разрабатывает открытые технические требования (ТТ) и
        функционально-технические требования (ФТТ) к компонентам открытой АСУ ТП.
        Приоритет — адаптация существующих международных стандартов; при отсутствии
        применимых норм рабочая группа разрабатывает оригинальные требования.
      </p>

      <div className="standards-list">
        {allStandards.map(s => (
          <div key={s.id} className="standard-card">
            <div className="standard-card-header">
              <div>
                <div className="standard-trg-tag">{s.trgTitle}</div>
                <div className="standard-title">{s.title}</div>
              </div>
              <div className="standard-meta">
                <div className="standard-date">{s.date}</div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-download"
                >
                  ↓ Скачать
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="rule" />

      <h2>Приоритетные технические направления</h2>
      <p>
        Направления разработки стандартов и требований, определённые рабочей группой:
      </p>
      <div className="standards-directions">
        {[
          { title: 'Стандарты', text: 'Отраслевые и межотраслевые стандарты в области ОАСУ ТП' },
          { title: 'Среда разработки АСУ ТП', text: 'Открытая виртуальная универсальная сквозная среда разработки АСУ ТП' },
          { title: 'Протокол передачи данных', text: 'Открытый универсальный промышленный протокол передачи данных' },
          { title: 'Программный ПЛК', text: 'Открытый виртуальный программный ПЛК' },
          { title: 'ОВ ОСРВ', text: 'Открытая виртуальная операционная система реального времени' },
          { title: 'Универсальный конвертор', text: 'Открытый универсальный конвертор типовых промышленных протоколов для обеспечения обратной совместимости ОАСУ ТП с действующими АСУ ТП' },
        ].map(d => (
          <div key={d.title} className="direction-cell">
            <div className="direction-title">{d.title}</div>
            <p className="direction-text">{d.text}</p>
          </div>
        ))}
      </div>

      <Footer />
    </article>
  )
}
