import SpecTag from '../SpecTag.jsx'
import { sections, conclusion } from '../../data/international.js'

export default function InternationalContent({ headingLevel = 'h1' }) {
  const Heading = headingLevel

  return (
    <>
      <Heading>
        Международный опыт открытых архитектур промышленной автоматизации
      </Heading>
      <p>
        За последние десять лет в мировой процессной и обрабатывающей промышленности сформировалось
        несколько инициатив, направленных на преодоление зависимости предприятий от закрытых
        проприетарных систем управления и единственного поставщика. Их общая задача — сделать системы
        автоматизации модульными и совместимыми между производителями, сохранив требования к
        надёжности, безопасности и непрерывности производства.
      </p>

      {sections.map((sec, i) => (
        <section key={sec.id} id={sec.id} className="element-block">
          <span className="element-number">{String(i + 1).padStart(2, '0')}</span>
          <h3 style={{ marginTop: '0.3rem' }}>{sec.title}</h3>
          {sec.content.map((block, j) => {
            if (block.type === 'p') return <p key={j}>{block.text}</p>
            if (block.type === 'tags') return (
              <div key={j} style={{ margin: '0.8rem 0' }}>
                {block.tags.map(t => <SpecTag key={t}>{t}</SpecTag>)}
              </div>
            )
            return null
          })}
        </section>
      ))}

      <hr className="rule" />

      <section id="nppa-context">
        <h3>Применимость для НППА</h3>
        {conclusion.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>
    </>
  )
}
