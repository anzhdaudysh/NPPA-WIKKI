import { keyElements } from '../../data/content.js'
import SpecTag from '../SpecTag.jsx'

export default function ElementsContent({ headingLevel = 'h1' }) {
  const Heading = headingLevel

  return (
    <>
      <Heading>Ключевые элементы НППА</Heading>
      <p>
        Платформа объединяет пять взаимосвязанных направлений — от единой системы стандартов
        до образовательной инфраструктуры, поддерживающей развитие отечественной промышленной автоматизации.
      </p>

      {keyElements.map((el, i) => (
        <section className="element-block" key={el.id} id={el.id}>
          <span className="element-number">{String(i + 1).padStart(2, '0')}</span>
          <h3>{el.title}</h3>
          <ul>
            {el.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
          {el.tags && (
            <div>
              {el.tags.map((tag) => (
                <SpecTag key={tag}>{tag}</SpecTag>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  )
}
