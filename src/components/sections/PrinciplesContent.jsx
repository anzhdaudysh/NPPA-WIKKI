import { principles, principlesIntro } from '../../data/content.js'

export default function PrinciplesContent({ headingLevel = 'h1' }) {
  const Heading = headingLevel

  return (
    <>
      <Heading>Принципы НППА</Heading>
      <p>{principlesIntro}</p>

      <div className="principles-grid principles-grid--detailed">
        {principles.map((p) => (
          <div className="principle-cell" key={p.id} id={`principle-${p.id}`}>
            <div className="eyebrow">Принцип</div>
            <p className="principle-title">{p.title}</p>
            {p.description && <p className="principle-desc">{p.description}</p>}
          </div>
        ))}
      </div>
    </>
  )
}
