import { Link } from 'react-router-dom'

// Карта: значение тега -> id в глоссарии (якорь внутри группы или конкретного термина)
// Если тег есть в этой карте — рендерится как ссылка на глоссарий
// Если нет — рендерится как статичный тег (или не рендерится совсем, если убрать из данных)
const GLOSSARY_MAP = {
  // Протоколы
  'OPC UA':           'glossary-protocols',
  'Ethernet APL':     'glossary-protocols',
  'Ethernet-APL':     'glossary-protocols',
  'HART':             'glossary-protocols',
  'Modbus':           'glossary-protocols',
  'Modbus TCP':       'glossary-protocols',
  'IEC 61850':        'glossary-protocols',
  'МЭК 61850':        'glossary-protocols',
  'S7':               'glossary-protocols',
  'МЭК 61131-3':      'glossary-protocols',
  'МЭК 61499':        'glossary-protocols',
  'TOSCA':            'glossary-protocols',
  'MQTT':             'glossary-protocols',
  // Архитектура
  'ФОС':              'glossary-architecture',
  'СМиД':             'glossary-architecture',
  'ИУП':              'glossary-architecture',
  'ВАСУТП':           'glossary-architecture',
  'SCADA':            'glossary-architecture',
  'SoftPLC':          'glossary-architecture',
  'ПАЗ':              'glossary-architecture',
  'ЦДЭС / ЦДТЭС':    'glossary-architecture',
  // ИБ
  'ISA/IEC 62443':    'glossary-security',
  'Secure by design': 'glossary-security',
  'СКЗИ':             'glossary-security',
  'ИБ':               'glossary-security',
  'ЗОКИИ':            'glossary-security',
  'КИИ':              'glossary-security',
  'PT NGFW':          'glossary-security',
  'PT ISIM':          'glossary-security',
  'ViPNet':           'glossary-security',
  'ISASecure':        'glossary-security',
  // Платформа
  'РЭП Минпромторга России': 'glossary-platform',
  'ЕРРП Минцифры России':    'glossary-platform',
  'РЭП':              'glossary-platform',
  'ЕРРП':             'glossary-platform',
  'ТРГ':              'glossary-platform',
  'УГТ / TRL':        'glossary-platform',
  'НППА':             'glossary-platform',
  'ОАСУ ТП':          'glossary-platform',
  // Международный опыт
  'NOA':              'glossary-international',
  'O-PAS':            'glossary-international',
  'OPAF':             'glossary-international',
  'MTP':              'glossary-international',
  'DCS':              'glossary-international',
  // ЖЦ оборудования
  'Цифровой машиночитаемый паспорт': 'glossary-lifecycle',
  // CI/CD — добавим в глоссарий
  'CI/CD':            'glossary-architecture',
  'SAST':             'glossary-security',
  'DAST':             'glossary-security',
}

export default function SpecTag({ children }) {
  const anchor = GLOSSARY_MAP[children]

  if (anchor) {
    return (
      <Link
        to={`/glossary?to=${anchor}`}
        className="spec-tag spec-tag--link"
        title={`Глоссарий: ${children}`}
      >
        {children}
      </Link>
    )
  }

  return <span className="spec-tag">{children}</span>
}
