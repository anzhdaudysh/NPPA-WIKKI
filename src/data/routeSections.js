// ─────────────────────────────────────────────
// Карта разделов по страницам — используется:
//  1. Sidebar.jsx — для разворачивания списка глав активного раздела
//  2. Overview.jsx — для рендера встроенных секций (Принципы, Ключевые
//     элементы, Международный опыт) на одной странице
// ─────────────────────────────────────────────

export const routeSections = {
  '/': [
    { id: 'intro', title: 'Что такое НППА' },
    { id: 'principles', title: 'Принципы' },
    { id: 'elements', title: 'Ключевые элементы' },
    { id: 'international', title: 'Международный опыт' },
    { id: 'sections', title: 'Разделы вики' },
  ],
  '/stand/architecture': [
    { id: 'hub', title: 'Хаб' },
    { id: 'network', title: 'Сеть стенда' },
    { id: 'security', title: 'Информационная безопасность' },
    { id: 'sites', title: 'Подключаемые площадки' },
    { id: 'interop-scenario', title: 'Сценарий интероперабельности' },
    { id: 'snapshot', title: 'Покрытие компонентов' },
  ],
  '/stand/releases': [
    { id: 'q4-2025', title: 'IV кв. 2025' },
    { id: 'q2-2026', title: 'II кв. 2026' },
    { id: 'cipr-2026', title: 'ЦИПР-2026' },
  ],
  '/components': [],
  '/showcase': [
    { id: 'intro', title: 'Концепция' },
    { id: 'pipeline', title: 'Конвейер верификации' },
    { id: 'principles', title: 'Принципы' },
  ],
  '/trg': [
    { id: 'trg-ide-plc', title: 'ТРГ по ОИСР и ОП ПЛК' },
    { id: 'trg-ocf', title: 'ТРГ по ИШД / OCF-шина' },
    { id: 'trg-gateway', title: 'ТРГ по конвертору протоколов' },
    { id: 'trg-security', title: 'ТРГ по ИБ' },
    { id: 'trg-architecture', title: 'ТРГ по архитектуре' },
    { id: 'trg-software', title: 'ТРГ по ОСПО' },
    { id: 'trg-hr', title: 'Подгруппа: кадры и НИОКР' },
  ],
  '/standards': [],
  '/glossary': [
    { id: 'glossary-platform', title: 'Платформа и организация' },
    { id: 'glossary-protocols', title: 'Протоколы и технологии' },
    { id: 'glossary-architecture', title: 'Компоненты архитектуры' },
    { id: 'glossary-security', title: 'Информационная безопасность' },
    { id: 'glossary-lifecycle', title: 'Жизненный цикл оборудования' },
    { id: 'glossary-international', title: 'Международный опыт' },
  ],
  '/contacts': [],
}
