// ─────────────────────────────────────────────
// Карта компонентов ОАСУТП / Витрина решений
// Источник: Карта_компонентов_ОАСУТП_5.html
// Актуально на: II кв. 2026 (релиз q2-2026)
// ─────────────────────────────────────────────

// Расшифровка лидеров ТРГ
export const TRG_LEADERS = {
  gpn: 'ПАО «Газпром нефть»',
  tn:  'ПАО «Транснефть»',
  ss:  'ПАО «Северсталь»',
  rt:  'ПАО «Ростелеком»',
  kis: 'АО «НПО «КИС» (ГК «Росатом»)',
  eh:  'ПАО «ЕвроХим»',
  ia:  'ИНТИ + АСПЕКТ',
  ra:  'ГК «Росатом»',
}

// Расшифровка уровней готовности технологий (УГТ / TRL)
export const TRL_LABELS = {
  '89': 'УГТ 8–9',
  '57': 'УГТ 5–7',
  '14': 'УГТ 1–4',
}

export const SECTIONS = [
  {
    id: 'hw-asutp',
    name: 'Аппаратное обеспечение (АСУ ТП)',
    components: [
      {
        id: 'plc',
        name: 'Программируемый логический контроллер (ПЛК)',
        leaders: [],
        trg: 'ТРГ по ПЛК',
        solutions: [
          {
            name: 'АБАК ПЛК',
            vendor: 'ЗАО «НИЦ «ИНКОМСИСТЕМ»',
            trl: '57',
            trl_val: '7',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'ikip',
        name: 'Интеллектуальный КИП',
        leaders: ['kis'],
        trg: 'Подгруппа ТРГ (OCF-шина) по открытому полевому протоколу передачи данных',
        solutions: [
          {
            name: 'Полевая шина передачи данных «Колибри»',
            vendor: 'ООО «АСПЕКТ»',
            trl: '57',
            trl_val: '7',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'FieldNetRU (10BASE-T1L / Ethernet-APL) — аппаратная часть',
            vendor: 'АО «НПО «КИС» (ГК «Росатом»)',
            trl: null,
            trl_val: null,
            demo: false,
            status: 'Решение отсутствует на рынке РФ',
          },
        ],
      },
      {
        id: 'io-mod',
        name: 'Модули распределённого ввода/вывода',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'АПК удалённого ввода-вывода',
            vendor: 'ООО «СибБурМаш»',
            trl: '57',
            trl_val: '7',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
    ],
  },
  {
    id: 'hw-gen',
    name: 'Аппаратное обеспечение (общесистемное)',
    components: [
      {
        id: 'ipc',
        name: 'Промышленный ПК',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'Промышленный ПК',
            vendor: 'ООО «Ниеншанц-Автоматика»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'Промышленный ПК',
            vendor: 'АО «Систэм Электрик»',
            trl: null,
            trl_val: null,
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП; протестирована совместная работа с Виртуальным ПЛК Айсорс',
          },
        ],
      },
      {
        id: 'servers',
        name: 'Серверные платформы',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'Скала^р (ПАК АСУ ТП)',
            vendor: 'ООО «Скала-Р» (ГК Rubytech)',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'network',
        name: 'Сетевое оборудование',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'Промышленный коммутатор SICOM3000TSN (с поддержкой TSN)',
            vendor: 'Контролнекст Технолоджи Рус (Kyland)',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
    ],
  },
  {
    id: 'sw-base',
    name: 'ПО АСУ ТП — базовые функции',
    components: [
      {
        id: 'vplc',
        name: 'Виртуальный ПЛК',
        leaders: ['ss'],
        trg: 'ТРГ по открытому программному ПЛК',
        solutions: [
          {
            name: 'Виртуальный ПЛК (Flogic)',
            vendor: 'АО «Северсталь-инфоком»',
            trl: '57',
            trl_val: '6',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'Виртуальный ПЛК (VCSystem)',
            vendor: 'АО «Айсорс»',
            trl: '57',
            trl_val: '7',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'scada',
        name: 'ЧМИ (SCADA)',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'MasterSCADA 4D',
            vendor: 'ООО «МПС Софт»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'Сириус-ИС',
            vendor: 'НПА «Вира Реалтайм»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'historian',
        name: 'Сервис исторических данных',
        leaders: [],
        trg: null,
        solutions: [],
        missStatus: 'Нет решения, соответствующего требованиям открытой АСУ ТП',
      },
    ],
  },
  {
    id: 'sw-svc',
    name: 'ПО АСУ ТП — сервисные функции',
    components: [
      {
        id: 'orchestr',
        name: 'Оркестратор',
        leaders: ['gpn'],
        trg: 'ТРГ по архитектуре и оркестратору ОАСУ ТП',
        solutions: [
          {
            name: 'Оркестратор',
            vendor: 'ПАО «Газпром нефть»',
            trl: '14',
            trl_val: '4',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'monitoring',
        name: 'Мониторинг и логирование',
        leaders: ['gpn'],
        trg: null,
        solutions: [
          {
            name: 'СМиД',
            vendor: 'ПАО «Газпром нефть»',
            trl: '89',
            trl_val: '8',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'ide',
        name: 'Интегрированная среда разработки',
        leaders: ['ss'],
        trg: 'ТРГ по открытой интегрированной среде разработки',
        solutions: [],
        missStatus: 'Решение отсутствует на рынке РФ',
      },
    ],
  },
  {
    id: 'sw-data',
    name: 'ПО АСУ ТП — обмен данными',
    components: [
      {
        id: 'opc-ua-cs',
        name: 'OPC UA Клиент/Сервер',
        leaders: ['rt'],
        trg: 'ТРГ по открытой информационной шине данных и промышленному протоколу',
        solutions: [
          {
            name: 'Интеграционная шина OCF',
            vendor: 'ПАО «Ростелеком»',
            trl: '57',
            trl_val: '7',
            demo: true,
            status: 'Заявлена разработка решения; прототип продемонстрирован на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'opc-ua-ps',
        name: 'OPC UA PUB/SUB',
        leaders: ['rt'],
        trg: 'ТРГ по открытой информационной шине данных и промышленному протоколу',
        solutions: [],
        missStatus: 'Решение отсутствует на рынке РФ',
      },
      {
        id: 'connectors',
        name: 'Коннекторы промышленных протоколов',
        leaders: ['eh'],
        trg: 'ТРГ по конвертору протоколов',
        solutions: [
          {
            name: 'Edge-сервер / Edge-контроллер',
            vendor: 'ПАО «ЕвроХим»',
            trl: '57',
            trl_val: '5',
            demo: false,
            status: 'Заявлена разработка решения; работоспособность не продемонстрирована',
          },
        ],
      },
      {
        id: 'field-proto',
        name: 'Полевой протокол',
        leaders: ['kis'],
        trg: 'Подгруппа ТРГ (OCF-шина) по открытому полевому протоколу передачи данных',
        solutions: [
          {
            name: 'FieldNetRU (10BASE-T1L / Ethernet-APL) — программная часть',
            vendor: 'АО «НПО «КИС» (ГК «Росатом»)',
            trl: '14',
            trl_val: '4',
            demo: false,
            status: 'Заявлена разработка решения; работоспособность не продемонстрирована',
          },
        ],
      },
    ],
  },
  {
    id: 'sw-ext',
    name: 'ПО АСУ ТП — расширенные функции',
    components: [
      {
        id: 'math',
        name: 'Математические модели технологического процесса',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'Среда разработки математических моделей',
            vendor: 'АО «Нефтеавтоматика»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
    ],
  },
  {
    id: 'sw-gen',
    name: 'Программное обеспечение общесистемное',
    components: [
      {
        id: 'containers',
        name: 'Контейнеризация',
        leaders: ['ss'],
        trg: 'ТРГ по системному программному обеспечению (ОСПО)',
        solutions: [
          {
            name: 'Deckhouse',
            vendor: 'АО «Флант»',
            trl: null,
            trl_val: null,
            demo: false,
            status: 'Заявлена разработка решения; работоспособность не продемонстрирована',
          },
        ],
      },
      {
        id: 'virt',
        name: 'Виртуализация',
        leaders: ['ss'],
        trg: 'ТРГ по системному программному обеспечению (ОСПО)',
        solutions: [
          {
            name: 'zVirt',
            vendor: 'ООО «Орион»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'Скала^р (ПАК АСУ ТП)',
            vendor: 'ООО «Скала-Р» (ГК Rubytech)',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'os',
        name: 'Операционная система общего назначения',
        leaders: ['ss'],
        trg: 'ТРГ по системному программному обеспечению (ОСПО)',
        solutions: [
          {
            name: 'Astra Linux SE 1.8',
            vendor: 'ООО «РусБИТех-Астра»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'rtos',
        name: 'Операционная система реального времени',
        leaders: ['ss'],
        trg: 'ТРГ по системному программному обеспечению (ОСПО)',
        solutions: [
          {
            name: 'ОСРВ Нейтрино',
            vendor: 'ООО «СВД Встраиваемые Системы»',
            trl: '89',
            trl_val: '9',
            demo: false,
            status: 'Решение не тестировалось, но есть на рынке РФ',
          },
        ],
      },
      {
        id: 'backup',
        name: 'Программное обеспечение резервного копирования',
        leaders: ['ss'],
        trg: 'ТРГ по системному программному обеспечению (ОСПО)',
        solutions: [],
        missStatus: 'Решение не тестировалось, но есть на рынке РФ',
      },
      {
        id: 'ib',
        name: 'Программное обеспечение информационной безопасности',
        leaders: ['kis'],
        trg: 'ТРГ по информационной безопасности',
        solutions: [
          {
            name: 'ПАК PT ISIM',
            vendor: 'ПАО «Позитивные технологии»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
          {
            name: 'ПАК PT NGFW',
            vendor: 'ПАО «Позитивные технологии»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'dbms',
        name: 'Система управления базами данных',
        leaders: [],
        trg: null,
        solutions: [
          {
            name: 'Astra Linux SE 1.8 (PostgreSQL)',
            vendor: 'ООО «РусБИТех-Астра»',
            trl: '89',
            trl_val: '9',
            demo: true,
            status: 'Продемонстрирована работа на стенде РГ ОАСУТП',
          },
        ],
      },
      {
        id: 'tsdb',
        name: 'База данных временных рядов',
        leaders: [],
        trg: null,
        solutions: [],
        missStatus: 'Решение не тестировалось, но есть на рынке РФ',
      },
      {
        id: 'vault',
        name: 'Хранилище сертификатов, ключей, паролей',
        leaders: [],
        trg: null,
        solutions: [],
        missStatus: 'Решение не тестировалось, но есть на рынке РФ',
      },
      {
        id: 'auth',
        name: 'Авторизация и аутентификация',
        leaders: [],
        trg: null,
        solutions: [],
        missStatus: 'Решение не тестировалось, но есть на рынке РФ',
      },
    ],
  },
]

// ─────────────────────────────────────────────
// Хелперы
// ─────────────────────────────────────────────

export function getComponentById(id) {
  for (const section of SECTIONS) {
    const comp = section.components.find(c => c.id === id)
    if (comp) return { comp, section }
  }
  return null
}

export function getStats() {
  let total = 0, covered = 0, solutions = 0
  for (const section of SECTIONS) {
    for (const comp of section.components) {
      total++
      const hasSol = (comp.solutions || []).some(s => s.name)
      if (hasSol) { covered++; solutions += comp.solutions.filter(s => s.name).length }
    }
  }
  return { total, covered, missing: total - covered, solutions }
}
