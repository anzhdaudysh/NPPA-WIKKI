import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// HashRouter использует "#" для самого роутинга (например, "#/stand/architecture"),
// поэтому внутристраничные якоря приходится передавать через query-параметр (?to=)
// вместо обычного location.hash, который React Router перехватывает первым.
//
// Ссылки на якоря должны иметь вид: /#/?to=principles  или  /#/stand/architecture?to=hub
export default function useAnchorScroll() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const anchor = params.get('to')
    if (!anchor) return

    // Небольшая задержка — даём странице (и анимациям раскрытия карточек) отрендериться перед скроллом
    const id = setTimeout(() => {
      const el = document.getElementById(anchor)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 120)

    return () => clearTimeout(id)
  }, [pathname, search])
}
