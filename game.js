// Аурелия-18: единая оболочка сцен «Герой», «Пустоши», «Корабль» и «Город».
const saveKey = 'aurelia-18-save-v19';
const legacySaveKeys = ['aurelia-18-save-v18', 'aurelia-18-save-v17', 'aurelia-18-save-v16', 'aurelia-18-save-v15', 'aurelia-18-save-v14', 'aurelia-18-save-v13', 'aurelia-18-save-v12', 'aurelia-18-save-v11', 'aurelia-18-save-v10', 'aurelia-18-save-v9', 'aurelia-18-save-v8', 'aurelia-18-save-v7', 'aurelia-18-save-v6', 'aurelia-18-save-v5', 'aurelia-18-save-v4', 'aurelia-18-save-v3', 'aurelia-18-save-v2'];
const maxLogMessages = 10;
const maxTurns = 20;
const typewriterDelay = 8;
const typewriterCursor = '|';
const staminaActionCost = 1;

const researchApproaches = {
  direct: {
    title: 'Пробиться напрямую',
    statKey: 'strength',
    resultText: 'Герой действует грубо и быстро, расчищая путь через песок и обломки.'
  },
  signals: {
    title: 'Проанализировать сигналы',
    statKey: 'wisdom',
    resultText: 'Герой сверяет показания приборов и ищет закономерность в помехах.'
  },
  careful: {
    title: 'Пройти осторожно',
    statKey: 'agility',
    resultText: 'Герой медленно обходит опасные участки и проверяет зону без лишнего риска.'
  }
};

const rollResultTypes = {
  criticalFailure: 'критический провал',
  majorFailure: 'крупная неудача',
  mixed: 'посредственный результат',
  excellent: 'отличный результат',
  criticalSuccess: 'критический успех'
};


const initialHeroCondition = {
  health: 100,
  maxHealth: 100,
  stamina: 80,
  maxStamina: 100,
  credits: 5000
};

const initialHero = {
  name: 'Герой',
  status: 'выживший после крушения',
  type: 'выживший',
  description: 'Герой пытается выжить на Аурелии-18, восстановить корабль и понять, что скрывает планета.',
  stats: {
    strength: 1,
    wisdom: 1,
    agility: 1
  },
  equipment: {
    head: '',
    upperBody: '',
    lowerBody: '',
    legs: '',
    boots: ''
  },
  thoughts: ['', '', ''],
  items: ['', '', '']
};

const heroStatLabels = {
  strength: 'Сила',
  wisdom: 'Мудрость',
  agility: 'Ловкость'
};

const heroEquipmentLabels = {
  head: 'Голова',
  upperBody: 'Тело верх',
  lowerBody: 'Тело низ',
  legs: 'Ноги',
  boots: 'Ботинки'
};

const initialResources = {
  energy: 8,
  water: 10,
  components: 3,
  metal: 15,
  food: 0,
  recon: 0
};

const resourceLabels = {
  energy: 'энергия',
  water: 'вода',
  components: 'компоненты',
  metal: 'металл',
  food: 'еда',
  recon: 'разведданные'
};

const compactResourceLabels = {
  energy: '⚡',
  water: '💧',
  components: '⚙',
  metal: '⛓️',
  food: '🍖',
  recon: 'разведданные'
};

const resourceGenitiveLabels = {
  energy: 'энергии',
  water: 'воды',
  components: 'компонентов',
  metal: 'металла',
  food: 'еды',
  recon: 'разведданных'
};

const territoryGatherActions = {
  metal: 'Собрать металл',
  water: 'Собрать воду',
  components: 'Искать компоненты',
  food: 'Собрать еду'
};

const shipStatusLabels = {
  disabled: 'Выведена из строя',
  damaged: 'Повреждена',
  stabilized: 'Стабилизирована',
  improved: 'Улучшена'
};


const shipSystemBlueprints = {
  reactor: {
    name: 'Реакторный отсек',
    status: 'damaged',
    description: 'Повреждённый реактор даёт базовое питание корабля, но работает нестабильно.',
    role: 'Производство энергии'
  },
  solarPanels: {
    name: 'Солнечные панели',
    status: 'damaged',
    description: 'Часть панелей уцелела после падения. Их можно восстановить для дополнительной генерации.',
    role: 'Дополнительная генерация энергии'
  },
  lifeSupport: {
    name: 'Жизнеобеспечение',
    status: 'damaged',
    description: 'Система поддерживает пригодную среду внутри корабля, но требует ремонта.',
    role: 'Безопасность и пригодность корабля'
  },
  waterLoop: {
    name: 'Водный контур',
    status: 'damaged',
    description: 'Повреждённый контур отвечает за хранение, очистку и распределение воды.',
    role: 'Вода и очистка'
  },
  hydroponics: {
    name: 'Гидропонный блок',
    status: 'disabled',
    description: 'Блок выращивания пищи выведен из строя и пока не может использоваться.',
    role: 'Производство еды'
  },
  habitation: {
    name: 'Жилой блок',
    status: 'damaged',
    description: 'Жилая зона частично доступна и может использоваться для отдыха.',
    role: 'Отдых и восстановление'
  },
  medical: {
    name: 'Медицинский блок',
    status: 'disabled',
    description: 'Медицинский блок не работает. Для полноценного лечения его нужно восстановить.',
    role: 'Восстановление здоровья'
  },
  hull: {
    name: 'Обшивка / корпус',
    status: 'damaged',
    description: 'Корпус выдержал падение, но повреждён и плохо защищает от бурь и внешних угроз.',
    role: 'Защита корабля'
  },
  repairWorkshop: {
    name: 'Ремонтный цех',
    status: 'disabled',
    description: 'Цех выведен из строя. После восстановления поможет чинить сложные системы.',
    role: 'Ремонт и переработка'
  },
  storage: {
    name: 'Отсек хранения',
    status: 'damaged',
    description: 'Грузовой отсек повреждён, поэтому хранение ресурсов ограничено.',
    role: 'Хранение металла и компонентов'
  },
  navigation: {
    name: 'Навигационный модуль',
    status: 'disabled',
    description: 'Навигация не работает. Без неё опасно уходить далеко от корабля.',
    role: 'Маршруты и экспедиции'
  },
  scanner: {
    name: 'Сканерный модуль',
    status: 'disabled',
    description: 'Сканер не работает. Его восстановление поможет искать сигналы, ресурсы и угрозы.',
    role: 'Поиск и исследование'
  },
  server: {
    name: 'Серверный узел',
    status: 'disabled',
    description: 'Серверный узел повреждён. В нём могут быть данные корабля и доступ к старым системам.',
    role: 'Данные и взлом'
  },
  engine: {
    name: 'Двигатель',
    status: 'disabled',
    description: 'Двигатель критически повреждён. Его ремонт — главная долгосрочная цель героя.',
    role: 'Сюжетная цель'
  }
};

const territoryStatusLabels = {
  hidden: 'Скрыта',
  discovered: 'Обнаружена',
  open: 'открыта',
  depleted: 'истощённая'
};
const territoryStatusKeys = Object.keys(territoryStatusLabels);

const territoryBlueprints = {
  crashSite: {
    id: 'crashSite',
    name: 'Место крушения',
    status: 'open',
    description: 'Центральная зона вокруг корабля, где начинается игра.',
    resource: 'metal',
    yieldMin: 2,
    yieldMax: 3,
    baseGain: { metal: 2 },
    remaining: 24,
    action: 'Собрать металл',
    progress: 1,
    requiredProgress: 1
  },
  nearDebris: {
    id: 'nearDebris',
    name: 'Ближние обломки',
    status: 'open',
    description: 'Россыпь обшивки, посадочных опор и грузовых рам.',
    resource: 'metal',
    yieldMin: 2,
    yieldMax: 4,
    baseGain: { metal: 2 },
    remaining: 28,
    action: 'Разобрать обломки',
    progress: 1,
    requiredProgress: 1
  },
  wetLowland: {
    id: 'wetLowland',
    name: 'Влажная низина',
    status: 'open',
    description: 'Складка рельефа, где ночью собирается конденсат.',
    resource: 'water',
    yieldMin: 1,
    yieldMax: 3,
    baseGain: { water: 1 },
    remaining: 20,
    action: 'Собрать воду',
    progress: 1,
    requiredProgress: 1
  },
  sandRidge: {
    id: 'sandRidge',
    name: 'Песчаная гряда',
    status: 'open',
    description: 'На горизонте видна каменная кромка и следы старого ветра.',
    resource: 'metal',
    yieldMin: 1,
    yieldMax: 3,
    baseGain: { metal: 1 },
    remaining: 18,
    action: 'Просеять песок',
    progress: 1,
    requiredProgress: 1
  },
  weakSignal: {
    id: 'weakSignal',
    name: 'Слабый сигнал',
    status: 'discovered',
    description: 'Аварийный приёмник ловит короткий неустойчивый импульс.',
    resource: 'components',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 10,
    baseGain: { components: 1 },
    remaining: 10,
    action: 'Искать компоненты',
    difficulty: 9,
    progress: 0,
    requiredProgress: 4
  },
  oldFallLine: {
    id: 'oldFallLine',
    name: 'Старая линия падения',
    status: 'discovered',
    description: 'По песку тянется длинный след давнего падения: под коркой могут лежать тяжёлые фрагменты.',
    resource: 'metal',
    yieldMin: 2,
    yieldMax: 4,
    capacity: 30,
    baseGain: { metal: 2 },
    remaining: 30,
    action: 'Пройти вдоль линии падения',
    difficulty: 8,
    progress: 0,
    requiredProgress: 2
  },
  tornCargoContainer: {
    id: 'tornCargoContainer',
    name: 'Разорванный грузовой контейнер',
    status: 'discovered',
    description: 'На краю обзора виден вскрытый грузовой модуль; часть креплений ещё уходит под песок.',
    resource: 'components',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 14,
    baseGain: { components: 1 },
    remaining: 14,
    action: 'Проверить контейнер',
    difficulty: 9,
    progress: 0,
    requiredProgress: 3
  },
  coolingCrack: {
    id: 'coolingCrack',
    name: 'Охладительная трещина',
    status: 'discovered',
    description: 'Из узкой трещины ночью выходит холодный пар, а утром на кромке остаются блестящие капли.',
    resource: 'water',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 22,
    baseGain: { water: 1 },
    remaining: 22,
    action: 'Собрать конденсат',
    difficulty: 9,
    progress: 0,
    requiredProgress: 3
  },
  buriedServiceBlock: {
    id: 'buriedServiceBlock',
    name: 'Закопанный сервисный блок',
    status: 'hidden',
    description: 'Под песком скрыт старый сервисный блок с уцелевшими техническими ячейками.',
    resource: 'components',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 12,
    baseGain: { components: 1 },
    remaining: 12,
    action: 'Искать компоненты',
    discoverProgressRequired: 1,
    difficulty: 9,
    progress: 0,
    requiredProgress: 3
  },
  saltDepression: {
    id: 'saltDepression',
    name: 'Соляная впадина',
    status: 'hidden',
    description: 'Белёсая впадина в рельефе может удерживать влагу под соляной коркой.',
    resource: 'water',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 18,
    baseGain: { water: 1 },
    remaining: 18,
    action: 'Собрать воду',
    discoverProgressRequired: 1,
    difficulty: 8,
    progress: 0,
    requiredProgress: 2
  },
  stoneScatter: {
    id: 'stoneScatter',
    name: 'Каменная россыпь',
    status: 'hidden',
    description: 'Неровная россыпь камня прячет под пылью тяжёлые металлические включения.',
    resource: 'metal',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 24,
    baseGain: { metal: 1 },
    remaining: 24,
    action: 'Собрать металл',
    discoverProgressRequired: 1,
    difficulty: 8,
    progress: 0,
    requiredProgress: 2
  },
  buriedSolarFarm: {
    id: 'buriedSolarFarm',
    name: 'Занесённая солнечная ферма',
    status: 'hidden',
    description: 'Под волнами пыли едва угадываются ряды старых солнечных панелей и кабельных коробов.',
    resource: 'components',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 12,
    baseGain: { components: 1 },
    remaining: 12,
    action: 'Разобрать солнечную ферму',
    discoverProgressRequired: 1,
    difficulty: 10,
    progress: 0,
    requiredProgress: 4
  },
  emergencyRationCompartment: {
    id: 'emergencyRationCompartment',
    name: 'Аварийный пайковый отсек',
    status: 'hidden',
    description: 'В песке скрыт аварийный отсек с герметичными контейнерами снабжения.',
    resource: 'food',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 10,
    baseGain: { food: 1 },
    remaining: 10,
    action: 'Собрать аварийные пайки',
    discoverProgressRequired: 1,
    difficulty: 8,
    progress: 0,
    requiredProgress: 2
  },
  brokenBiocontainer: {
    id: 'brokenBiocontainer',
    name: 'Разбитый биоконтейнер',
    status: 'hidden',
    description: 'Треснувшая оболочка биоконтейнера торчит из песка, но содержимое ещё нужно проверить.',
    resource: 'food',
    yieldMin: 1,
    yieldMax: 2,
    capacity: 8,
    baseGain: { food: 1 },
    remaining: 8,
    action: 'Проверить биоконтейнер',
    discoverProgressRequired: 1,
    difficulty: 9,
    progress: 0,
    requiredProgress: 3
  },
  dustyRepeater: {
    id: 'dustyRepeater',
    name: 'Пыльный ретранслятор',
    status: 'hidden',
    description: 'Пыльный корпус ретранслятора почти слился с камнями, оставив наружу только обломок мачты.',
    resource: 'components',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 15,
    baseGain: { components: 1 },
    remaining: 15,
    action: 'Разобрать ретранслятор',
    discoverProgressRequired: 1,
    difficulty: 10,
    progress: 0,
    requiredProgress: 4
  },
  metalScree: {
    id: 'metalScree',
    name: 'Металлическая осыпь',
    status: 'hidden',
    description: 'Склон покрыт металлической осыпью: часть фрагментов застряла глубоко между камнями.',
    resource: 'metal',
    yieldMin: 2,
    yieldMax: 4,
    capacity: 34,
    baseGain: { metal: 2 },
    remaining: 34,
    action: 'Разобрать осыпь',
    discoverProgressRequired: 1,
    difficulty: 9,
    progress: 0,
    requiredProgress: 3
  },
  dryReservoir: {
    id: 'dryReservoir',
    name: 'Сухой резервуар',
    status: 'hidden',
    description: 'Пустой резервуар выглядит пересохшим, но в нижних швах могли сохраниться остатки влаги.',
    resource: 'water',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 24,
    baseGain: { water: 1 },
    remaining: 24,
    action: 'Собрать остатки воды',
    discoverProgressRequired: 1,
    difficulty: 10,
    progress: 0,
    requiredProgress: 4
  },
  emergencySupplyCapsule: {
    id: 'emergencySupplyCapsule',
    name: 'Капсула аварийного снабжения',
    status: 'hidden',
    description: 'Небольшая капсула аварийного снабжения зарыта в песок после жёсткого падения.',
    resource: 'food',
    yieldMin: 1,
    yieldMax: 3,
    capacity: 12,
    baseGain: { food: 1 },
    remaining: 12,
    action: 'Проверить капсулу',
    discoverProgressRequired: 1,
    difficulty: 10,
    progress: 0,
    requiredProgress: 4
  }
};

const cityDistricts = {
  caravanGate: {
    name: 'Пыльные ворота',
    description: 'Въездной шлюз города: старые шлагбаумы, весовые платформы и архив пропусков.'
  },
  moistureMarket: {
    name: 'Рынок влаги',
    description: 'Торговля водой, фильтрами, пайками и мелкими услугами.'
  },
  lowerWorkshops: {
    name: 'Нижние мастерские',
    description: 'Ремонтные боксы, кустарные инженеры, детали и грязная работа.'
  },
  livingDomes: {
    name: 'Жилые купола',
    description: 'Жилые секции, дешёвые бары, остановки, местные разговоры.'
  },
  industrialOutskirts: {
    name: 'Промышленная окраина',
    description: 'Склады, электрохимические ванны, старые трубы и опасные подработки.'
  }
};

const cityActivities = [
  {
    key: 'bar',
    name: 'Бар',
    description: 'Полутёмный зал района: вода уходит быстро, зато старые записи ещё хранят обрывки маршрутов.',
    action: 'Проверить старые записи',
    cost: { water: 1 },
    result: { recon: 1 },
    successLog: 'Бар: найдена старая запись. Разведданные +1.',
    failureLog: 'Недостаточно воды, чтобы задержаться в баре.'
  },
  {
    key: 'shop',
    name: 'Магазин',
    description: 'Зарешеченная лавка снабжения района: фильтры, пайки и детали пока только отмечают в журнале.',
    action: 'Посмотреть ассортимент',
    cost: {},
    resultText: 'Журнал: торговля будет добавлена позже.',
    successLog: 'Магазин отмечен. Торговля будет добавлена позже.'
  },
  {
    key: 'stall',
    name: 'Ларёк',
    description: 'Узкий прилавок района для быстрых обменов без лишних вопросов.',
    action: 'Обменять металл на воду',
    cost: { metal: 3 },
    result: { water: 1 },
    successLog: 'Ларёк: металл обменян на воду. Вода +1.',
    failureLog: 'Недостаточно металла для обмена в ларьке.'
  },
  {
    key: 'sideJob',
    name: 'Подработка',
    description: 'Панель мелких ремонтов района: подтянуть кабель, закрыть клапан, перепаять силовую коробку.',
    action: 'Взяться за мелкий ремонт',
    cost: { energy: 1 },
    result: { components: 1 },
    successLog: 'Подработка: мелкий ремонт выполнен. Компоненты +1.',
    failureLog: 'Недостаточно энергии для мелкого ремонта.'
  },
  {
    key: 'caravanStop',
    name: 'Стоянка техники',
    description: 'Площадка района с пустыми креплениями, следами тяжёлых колёс и старым маршрутным терминалом.',
    action: 'Считать маршрутный журнал',
    cost: { water: 1 },
    result: { recon: 2 },
    successLog: 'Стоянка техники: считан маршрутный журнал. Разведданные +2.',
    failureLog: 'Недостаточно воды, чтобы запитать терминал стоянки.'
  },
  {
    key: 'electrochemistry',
    name: 'Электрохимия',
    description: 'Грязная ванна переработки района: кислотный пар, старый лом и закрытые сервисные боксы.',
    action: 'Переработать лом',
    cost: { metal: 4, energy: 1 },
    result: { components: 2 },
    successLog: 'Электрохимия: лом переработан. Компоненты +2.',
    failureLog: 'Недостаточно ресурсов для электрохимии. Нужно: металл 4, энергия 1.'
  }
];

const cityUniquePoints = {
  patrol: {
    name: 'Пост контроля',
    description: 'Автоматический пост контроля: проверка меток доступа, воды и грузов.',
    action: 'Пройти проверку',
    cost: {},
    resultText: 'Журнал: пост контроля пропустит вас дальше.',
    successLog: 'Пост контроля принял метку доступа и пропустил дальше.'
  },
  hippodrome: {
    name: 'Ипподром',
    description: 'Пыльная арена с засохшими трассами, табло ставок и архивом старых заездов.',
    action: 'Осмотреть заезд',
    cost: {},
    result: { recon: 1 },
    successLog: 'Ипподром: считан архив старых заездов. Получено: разведданные +1.'
  },
  prison: {
    name: 'Тюрьма',
    description: 'Законсервированный изолятор с глухими шлюзами, журналами нарушений и аварийными замками.',
    action: 'Осмотреть периметр',
    cost: {},
    resultText: 'Журнал: сюжетные события будут добавлены позже.',
    successLog: 'Тюрьма отмечена на карте. Сюжетные события будут добавлены позже.'
  },
  hospital: {
    name: 'Больница',
    description: 'Перегруженный медблок города: диагностические койки, закрытые шкафы и платные протоколы помощи.',
    action: 'Проверить медблок',
    cost: { water: 2 },
    resultText: 'Журнал: базовая помощь, полноценная система Героя появится позже.',
    successLog: 'Медблок провёл базовую проверку. Полноценная система Героя будет добавлена следующим шагом.',
    failureLog: 'Недостаточно воды, чтобы запустить протокол медблока.'
  }
};

let state = createInitialState();

const elements = {
  turn: document.getElementById('turn'),
  health: document.getElementById('health'),
  stamina: document.getElementById('stamina'),
  credits: document.getElementById('credits'),
  energy: document.getElementById('energy'),
  water: document.getElementById('water'),
  components: document.getElementById('components'),
  metal: document.getElementById('metal'),
  food: document.getElementById('food'),
  mobileHealth: document.getElementById('mobileHealth'),
  mobileStamina: document.getElementById('mobileStamina'),
  mobileEnergy: document.getElementById('mobileEnergy'),
  mobileWater: document.getElementById('mobileWater'),
  mobileComponents: document.getElementById('mobileComponents'),
  mobileMetal: document.getElementById('mobileMetal'),
  mobileFood: document.getElementById('mobileFood'),
  recon: document.getElementById('recon'),
  restoredSystems: document.getElementById('restoredSystems'),
  log: document.getElementById('log'),
  screenEyebrow: document.getElementById('screenEyebrow'),
  screenTitle: document.getElementById('screenTitle'),
  screenSubtitle: document.getElementById('screenSubtitle'),
  heroScreen: document.getElementById('heroScreen'),
  shipScreen: document.getElementById('shipScreen'),
  territoriesScreen: document.getElementById('territoriesScreen'),
  cityScreen: document.getElementById('cityScreen'),
  shipSystemsGrid: document.getElementById('shipSystemsGrid'),
  territoriesGrid: document.getElementById('territoriesGrid'),
  cityGrid: document.getElementById('cityGrid'),
  uniqueCityGrid: document.getElementById('uniqueCityGrid'),
  selectedName: document.getElementById('selectedName'),
  selectedDescription: document.getElementById('selectedDescription'),
  selectedActions: document.getElementById('selectedActions'),
  toggleLog: document.getElementById('toggleLog')
};

const reducedMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };
const typewriterState = {
  timerId: 0,
  token: 0,
  currentKey: '',
  isTyping: false
};

function createInitialState() {
  return {
    resources: { ...initialResources },
    heroCondition: { ...initialHeroCondition },
    turn: 1,
    mode: 'hero',
    selectedSystemKey: '',
    selectedTerritoryKey: '',
    selectedCityKey: '',
    selectedCityType: '',
    actionPanelMode: 'actions',
    inspectedObjectId: '',
    narrativeObjectId: '',
    narrativeMessage: '',
    activeResearchEvent: null,
    hero: createHero(),
    shipSystems: createSystems(),
    territories: createTerritories(),
    logMessages: ['Аварийный интерфейс Аурелии-18 запущен. Выберите сцену и объект для действий Героя.']
  };
}

function createHero() {
  return JSON.parse(JSON.stringify(initialHero));
}

function createSystems() {
  const systems = {};
  const keys = Object.keys(shipSystemBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    systems[key] = {
      status: shipSystemBlueprints[key].status
    };
  }

  return systems;
}

function createTerritories() {
  const territories = {};
  const keys = Object.keys(territoryBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    territories[key] = {
      ...territoryBlueprints[key],
      baseGain: { ...territoryBlueprints[key].baseGain }
    };
  }

  return territories;
}

function normalizeTerritoryProgress(territory) {
  territory.requiredProgress = Math.max(1, savedNumber(territory.requiredProgress, 1));
  if (territory.difficulty !== undefined) {
    territory.difficulty = Math.max(1, savedNumber(territory.difficulty, 1));
  }

  if (territory.status === 'open' || territory.status === 'depleted') {
    territory.progress = territory.requiredProgress;
    return;
  }

  if (territory.status === 'hidden') {
    territory.progress = 0;
    territory.discoverProgressRequired = getTerritoryDiscoverProgressRequired(territory);
    territory.discoverProgress = clampSavedNumber(territory.discoverProgress, 0, 0, territory.discoverProgressRequired);
    return;
  }

  territory.progress = clampSavedNumber(territory.progress, 0, 0, territory.requiredProgress);
}

function switchMode(mode) {
  if (!['hero', 'territories', 'ship', 'city'].includes(mode)) {
    return;
  }

  state.mode = mode;
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  state.activeResearchEvent = null;
  saveGame();
  render();
}

function selectSystem(key) {
  if (!state.shipSystems[key]) {
    return;
  }

  state.mode = 'ship';
  state.selectedSystemKey = key;
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  render();
  saveGame();
}

function selectTerritory(key) {
  if (!state.territories[key]) {
    return;
  }

  state.mode = 'territories';
  state.selectedTerritoryKey = key;
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  render();
  saveGame();
}


function selectCityDistrict(key) {
  if (!cityDistricts[key]) {
    return;
  }

  state.mode = 'city';
  state.selectedCityKey = key;
  state.selectedCityType = 'district';
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  render();
  saveGame();
}

function selectCityActivity(districtKey, activityKey) {
  const district = cityDistricts[districtKey];
  const activity = cityActivities.find(function (item) {
    return item.key === activityKey;
  });

  if (!district || !activity) {
    return;
  }

  state.mode = 'city';
  state.selectedCityKey = districtKey + ':' + activityKey;
  state.selectedCityType = 'activity';
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  render();
  saveGame();
}

function selectCityUnique(key) {
  if (!cityUniquePoints[key]) {
    return;
  }

  state.mode = 'city';
  state.selectedCityKey = key;
  state.selectedCityType = 'unique';
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  render();
  saveGame();
}

function performCityActivity(districtKey, activityKey) {
  const district = cityDistricts[districtKey];
  const activity = getCityActivity(activityKey);

  if (!district || !activity) {
    return;
  }

  state.mode = 'city';
  state.selectedCityKey = districtKey + ':' + activityKey;
  state.selectedCityType = 'activity';
  performCityAction(activity);
}

function performCityUnique(key) {
  const point = cityUniquePoints[key];

  if (!point) {
    return;
  }

  state.mode = 'city';
  state.selectedCityKey = key;
  state.selectedCityType = 'unique';
  performCityAction(point);
}

function performCityAction(entry) {
  const cost = entry.cost || {};
  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  const missing = getMissingResources(cost);
  if (missing.length > 0) {
    if (selection) {
      setNarrativeMessage(selection, 'Герой останавливается на пороге действия: ресурсов не хватает, и интерфейс не даёт подтвердить расход.');
    }
    addLog(entry.failureLog || 'Недостаточно ресурсов для действия. Нужно: ' + formatCost(cost) + '.');
    return;
  }

  spendStamina();
  payCost(cost);
  if (entry.result) {
    addResources(entry.result);
  }
  if (selection) {
    setNarrativeMessage(selection, 'Герой выполняет выбранное действие. Место отвечает коротким изменением в протоколе, а подробная городская сцена пока остаётся заглушкой.');
  }
  addLog(entry.successLog);
}

function addResources(gain) {
  const keys = Object.keys(gain);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    if (state.resources[resource] === undefined) {
      state.resources[resource] = 0;
    }
    state.resources[resource] += gain[resource];
  }
}

function repairSystem(key) {
  if (!state.shipSystems[key]) {
    return;
  }

  addLog('Действия с системой будут добавлены позже.');
}

function diagnoseSystem(key) {
  if (!state.shipSystems[key]) {
    return;
  }

  addLog('Действия с системой будут добавлены позже.');
}

function returnToSelectedPanel() {
  const selection = getCurrentSelection();
  if (!selection) return;
  state.actionPanelMode = 'actions';
  clearNarrativeMessage();
  addLog('Герой отступил от объекта: ' + selection.name + '.');
  saveGame();
  render();
}

function gatherTerritory(key) {
  const territory = state.territories[key];

  if (!territory || !canGatherTerritory(territory)) {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  const resource = territory.resource;
  const check = resolveGatherCheck(resource, territory);
  const wasDepleted = territory.status === 'depleted';
  let actualGain = 0;

  if (check.gained > 0) {
    if (wasDepleted) {
      actualGain = 1;
    } else {
      territory.remaining = getTerritoryRemaining(territory);
      actualGain = Math.min(check.gained, territory.remaining);
      territory.remaining = Math.max(0, territory.remaining - actualGain);
    }
  } else if (!wasDepleted) {
    territory.remaining = getTerritoryRemaining(territory);
  }

  const depletedNow = !wasDepleted && territory.remaining === 0;
  if (depletedNow) {
    territory.status = 'depleted';
  }

  const gain = { [resource]: actualGain };
  if (actualGain > 0) {
    addResources(gain);
  }

  const remaining = getTerritoryRemaining(territory);
  if (selection) {
    setNarrativeMessage(selection, buildGatherResultPanel(check, actualGain, remaining, depletedNow));
  }
  addLog('Действие «' + getGatherActionTitle(key) + '» на клетке ' + territory.name + ' выполнено. Бросок 2d6: ' + check.roll.d6_1 + ' + ' + check.roll.d6_2 + ' = ' + check.roll.total + '. Результат: ' + check.resultLabel + '. Получено: ' + formatGain(gain) + '. Осталось в клетке: ' + remaining + '. Потрачено 1 🫁.');

  if (depletedNow) {
    addLog('Запас клетки исчерпан. Зона стала истощённой: ' + territory.name + '.');
  }
}

function exploreHiddenTerritory(key, approachKey) {
  const territory = state.territories[key];

  if (!territory || territory.status !== 'hidden') {
    return;
  }

  const selection = getCurrentSelection();
  const approach = getResearchApproach(approachKey);

  if (!hasEnoughStamina(selection)) {
    return;
  }

  const requiredProgress = getTerritoryDiscoverProgressRequired(territory);
  const currentProgress = getTerritoryDiscoverProgress(territory);
  territory.discoverProgressRequired = requiredProgress;
  territory.discoverProgress = currentProgress;

  spendStamina();
  const check = resolveDiscoverCheck(approach, territory);
  const progressGain = getDiscoverProgressGain(check);
  territory.discoverProgress = Math.min(requiredProgress, territory.discoverProgress + progressGain);
  const discovered = territory.discoverProgress >= requiredProgress;

  if (discovered) {
    territory.status = 'discovered';
    territory.discoverProgress = requiredProgress;
    territory.progress = clampSavedNumber(territory.progress, 0, 0, Math.max(1, savedNumber(territory.requiredProgress, 1)));
  }

  const currentSelection = getCurrentSelection();
  state.actionPanelMode = 'actions';
  if (currentSelection) {
    setNarrativeMessage(currentSelection, buildDiscoverResultPanel(territory, check, progressGain, discovered, approach));
  }

  addLog('Исследование неизвестной зоны выполнено. Подход: ' + approach.title + '. Характеристика: ' + check.statLabel + ' ' + check.statValue + '. Бросок 2d6: ' + check.roll.d6_1 + ' + ' + check.roll.d6_2 + ' = ' + check.roll.total + '. Итог: ' + check.total + '. Сложность: ' + check.difficulty + '. Результат: ' + check.resultLabel + '. Исследование до обнаружения: ' + territory.discoverProgress + ' / ' + territory.discoverProgressRequired + '. Потрачено 1 🫁.');

  if (discovered) {
    addLog('Зона обнаружена: ' + territory.name + '.');
  }
}

function researchTerritory(key, approachKey) {
  const territory = state.territories[key];

  if (!territory || territory.status !== 'discovered') {
    return;
  }

  const selection = getCurrentSelection();
  const approach = getResearchApproach(approachKey);

  if (!hasEnoughStamina(selection)) {
    return;
  }

  const requiredProgress = Math.max(1, savedNumber(territory.requiredProgress, 1));
  const currentProgress = clampSavedNumber(territory.progress, 0, 0, requiredProgress);
  territory.requiredProgress = requiredProgress;
  territory.progress = currentProgress;

  spendStamina();
  const check = resolveResearchCheck(approach, territory);
  const progressGain = getResearchProgressGain(check);
  territory.progress = Math.min(requiredProgress, territory.progress + progressGain);
  const opened = territory.progress >= requiredProgress;

  if (opened) {
    territory.status = 'open';
    territory.progress = requiredProgress;
    state.activeResearchEvent = null;
  }

  const currentSelection = getCurrentSelection();
  state.actionPanelMode = 'actions';
  if (currentSelection) {
    setNarrativeMessage(currentSelection, buildResearchResultPanel(territory, check, progressGain, opened, approach));
  }

  addLog('Подход к исследованию зоны «' + territory.name + '»: ' + approach.title + '. Использованная характеристика: ' + check.statLabel + ' ' + check.statValue + '. Потрачено 1 🫁.');
  addLog('Бросок 2d6: ' + check.roll.d6_1 + ' + ' + check.roll.d6_2 + ' = ' + check.roll.total + '. Итог с бонусом: ' + check.roll.total + ' + ' + check.statLabel + ' ' + check.statValue + ' = ' + check.total + ' против сложности ' + check.difficulty + '.');
  addLog('Результат исследования: ' + check.resultLabel + '.');
  addLog('Добавленный прогресс исследования: +' + progressGain + '. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.');

  if (opened) {
    addLog('Зона открыта: ' + territory.name + '.');
  }
}

function startTerritoryResearch(key) {
  researchTerritory(key);
}

function continueTerritoryResearch(key) {
  researchTerritory(key);
}

function performResearchApproach(key, approachKey) {
  researchTerritory(key, approachKey);
}


function ensureResearchEvent(key) {
  const territory = state.territories[key];
  if (!territory || territory.status !== 'discovered') {
    return null;
  }

  state.activeResearchEvent = {
    territoryKey: key
  };

  return state.activeResearchEvent;
}

function roll2d6() {
  const d6_1 = rollD6();
  const d6_2 = rollD6();

  return {
    d6_1,
    d6_2,
    total: d6_1 + d6_2
  };
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function resolveResearchCheck(approach, territory) {
  const roll = roll2d6();
  const statKey = approach.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const difficulty = Math.max(1, savedNumber(territory && territory.difficulty, 1));
  const result = getResearchCheckResult(roll.total, total, difficulty);

  return {
    roll,
    statKey,
    statLabel,
    statValue,
    total,
    difficulty,
    resultLabel: result.label,
    progressGain: result.progressGain
  };
}

function getHeroStatValue(statKey) {
  const hero = state.hero || createHero();
  const stats = hero.stats || {};
  return savedNumber(stats[statKey], 0);
}

function getResearchCheckResult(naturalTotal, total, difficulty) {
  if (naturalTotal === 2) return { label: 'Критический провал', progressGain: 0 };
  if (naturalTotal === 12) return { label: 'Критический успех', progressGain: 2 };
  if (total < difficulty) return { label: 'Провал', progressGain: 0 };
  if (total === difficulty) return { label: 'Частичный успех', progressGain: 1 };
  return { label: 'Успех', progressGain: 1 };
}

function resolveDiscoverCheck(approach, territory) {
  const roll = roll2d6();
  const statKey = approach.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const difficulty = Math.max(1, savedNumber(territory && territory.difficulty, 8));
  const result = getDiscoverCheckResult(roll.total, total, difficulty);

  return {
    roll,
    statKey,
    statLabel,
    statValue,
    total,
    difficulty,
    resultLabel: result.label,
    progressGain: result.progressGain
  };
}

function getDiscoverCheckResult(naturalTotal, total, difficulty) {
  if (naturalTotal === 2) return { label: 'Критический провал', progressGain: 0 };
  if (naturalTotal === 12) return { label: 'Критический успех', progressGain: 1 };
  if (total < difficulty) return { label: 'Провал', progressGain: 0 };
  if (total === difficulty) return { label: 'Частичный успех', progressGain: 1 };
  return { label: 'Успех', progressGain: 1 };
}

function getResearchProgressGain(check) {
  return Math.max(0, savedNumber(check.progressGain, 0));
}

function getDiscoverProgressGain(check) {
  return Math.max(0, savedNumber(check.progressGain, 0));
}

function resolveGatherCheck(resource, territory) {
  const roll = roll2d6();
  const result = getGatherCheckResult(roll.total, territory);

  return {
    resource,
    roll,
    resultLabel: result.label,
    gained: result.gained
  };
}

function getGatherCheckResult(total, territory) {
  const yieldMin = Math.max(0, savedNumber(territory.yieldMin, 1));
  const yieldMax = Math.max(yieldMin, savedNumber(territory.yieldMax, yieldMin));

  if (total === 2) return { label: 'Критический провал', gained: 0 };
  if (total <= 5) return { label: 'Провал', gained: 0 };
  if (total <= 8) return { label: 'Частичный успех', gained: yieldMin };
  if (total <= 11) return { label: 'Успех', gained: Math.max(yieldMin, yieldMax - 1) };
  return { label: 'Критический успех', gained: yieldMax };
}

function buildGatherResultPanel(check, actualGain, remaining, depletedNow) {
  const lines = [
    'Бросок 2d6: ' + check.roll.total + '. ' + check.resultLabel + '. Получено: ' + formatGain({ [check.resource]: actualGain }) + '. Остаток запаса: ' + remaining + '.'
  ];

  if (depletedNow) {
    lines.push('Запас клетки исчерпан. Зона стала истощённой.');
  }

  return lines.join(' ');
}

function buildResearchResultPanel(territory, check, progressGain, opened, approach) {
  const approachLine = 'Подход: ' + approach.title + '.';
  const resultLine = buildResearchRollLine(check) + ' ' + check.resultLabel + '. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  const progressLine = 'Прогресс: +' + progressGain + '.';

  if (opened) {
    return approach.resultText + '\n\n' + approachLine + '\n' + resultLine + '\n' + progressLine + '\n\nЗона открыта: ' + territory.name + '.';
  }

  return approach.resultText + '\n\n' + approachLine + '\n' + resultLine + ' ' + progressLine;
}

function buildDiscoverResultPanel(territory, check, progressGain, discovered, approach) {
  const approachLine = 'Подход: ' + approach.title + '.';
  const resultLine = buildResearchRollLine(check) + ' ' + check.resultLabel + '. Исследование до обнаружения: ' + territory.discoverProgress + ' / ' + territory.discoverProgressRequired + '.';
  const progressLine = 'Прогресс: +' + progressGain + '.';

  if (discovered) {
    return approach.resultText + '\n\n' + approachLine + '\n' + resultLine + '\n' + progressLine + '\n\nЗона обнаружена: ' + territory.name + '.';
  }

  return approach.resultText + '\n\n' + approachLine + '\n' + resultLine + ' ' + progressLine;
}

function getResearchApproach(approachKey) {
  return researchApproaches[approachKey] || researchApproaches.direct;
}

function buildResearchRollLine(check) {
  return 'Бросок 2d6: ' + check.roll.total + ' + ' + check.statLabel + ' ' + check.statValue + ' = ' + check.total + ' против сложности ' + check.difficulty + '.';
}

function formatSignedModifier(value) {
  return value > 0 ? '+' + value : String(value);
}

function getTerritoryOutputText(key) {
  const territory = state.territories[key] || territoryBlueprints[key];

  if (!territory || !territory.resource) {
    return 'ресурс скрыт';
  }

  if (territory.yieldMin !== undefined && territory.yieldMax !== undefined) {
    return getTerritoryYieldText(territory) + ' ' + resourceGenitiveLabels[territory.resource];
  }

  return 'проверка 2d6 за ' + resourceLabels[territory.resource];
}

function getTerritoryResourceText(territory) {
  if (!territory.resource) {
    return 'ресурс скрыт';
  }

  return resourceLabels[territory.resource] || territory.resource;
}

function getTerritoryYieldText(territory) {
  const min = savedNumber(territory.yieldMin, NaN);
  const max = savedNumber(territory.yieldMax, NaN);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return 'добыча скрыта';
  }

  return min === max ? String(min) : min + '–' + max;
}

function getTerritoryOpenSummaryLines(territory) {
  return [
    'Ресурс: ' + getTerritoryResourceText(territory),
    'Добыча: ' + getTerritoryYieldText(territory),
    getTerritoryStockText(territory)
  ];
}

function getTerritoryProgressRemaining(territory) {
  const required = Math.max(1, savedNumber(territory.requiredProgress, 1));
  const progress = clampSavedNumber(territory.progress, 0, 0, required);
  const remaining = Math.max(0, required - progress);

  return remaining + ' / ' + required;
}

function getTerritoryDiscoverProgressRequired(territory) {
  return Math.max(1, savedNumber(territory.discoverProgressRequired, 1));
}

function getTerritoryDiscoverProgress(territory) {
  const required = getTerritoryDiscoverProgressRequired(territory);
  return clampSavedNumber(territory.discoverProgress, 0, 0, required);
}

function getTerritoryDiscoverProgressRemaining(territory) {
  return Math.max(0, getTerritoryDiscoverProgressRequired(territory) - getTerritoryDiscoverProgress(territory));
}

function getTerritoryRemaining(territory) {
  return Math.max(0, savedNumber(territory.remaining, 0));
}

function getTerritoryStockText(territory) {
  if (territory.status === 'depleted') {
    return 'Запас истощён. Минимальная добыча: 1';
  }

  return 'Запас: ' + getTerritoryRemaining(territory);
}

function canGatherTerritory(territory) {
  return (territory.status === 'open' || territory.status === 'depleted') && Boolean(territoryGatherActions[territory.resource]);
}

function getMissingResources(cost) {
  const missing = [];
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    if (state.resources[resource] < cost[resource]) {
      missing.push(resourceGenitiveLabels[resource]);
    }
  }

  return missing;
}

function canPay(cost) {
  return getMissingResources(cost).length === 0;
}

function payCost(cost) {
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    state.resources[resource] -= cost[resource];
  }
}

function hasEnoughStamina(selection) {
  if (state.heroCondition.stamina >= staminaActionCost) {
    return true;
  }

  if (selection) {
    state.actionPanelMode = 'exhausted';
    setNarrativeMessage(selection, 'Герой слишком вымотан для этого действия.');
  }
  addLog('Недостаточно выносливости.');
  return false;
}

function spendStamina() {
  state.heroCondition.stamina = Math.max(0, state.heroCondition.stamina - staminaActionCost);
}

function addLog(message) {
  state.logMessages.unshift(message);
  state.logMessages = state.logMessages.slice(0, maxLogMessages);
  saveGame();
  render();
}

function render() {
  renderResources();
  renderNavigation();
  renderScreens();
  renderHeroScreen();
  renderShipSystems();
  renderTerritories();
  renderCity();
  renderSelectionPanel();
  renderLog();
}

function renderResources() {
  elements.turn.textContent = state.turn;
  const healthText = state.heroCondition.health + ' / ' + state.heroCondition.maxHealth;
  const staminaText = state.heroCondition.stamina + ' / ' + state.heroCondition.maxStamina;
  const energyText = String(state.resources.energy);
  const waterText = state.resources.water + ' / 20';
  const componentsText = state.resources.components + ' / 20';
  const metalText = state.resources.metal + ' / 20';
  const foodText = (state.resources.food || 0) + ' / 20';

  elements.health.textContent = healthText;
  elements.stamina.textContent = staminaText;
  elements.credits.textContent = state.heroCondition.credits;
  elements.energy.textContent = energyText;
  elements.water.textContent = waterText;
  elements.components.textContent = componentsText;
  elements.metal.textContent = metalText;
  elements.food.textContent = foodText;
  elements.mobileHealth.textContent = healthText;
  elements.mobileStamina.textContent = staminaText;
  elements.mobileEnergy.textContent = energyText;
  elements.mobileWater.textContent = waterText;
  elements.mobileComponents.textContent = componentsText;
  elements.mobileMetal.textContent = metalText;
  elements.mobileFood.textContent = foodText;
  elements.recon.textContent = state.resources.recon;
  elements.restoredSystems.textContent = countRestoredSystems();
}

function renderNavigation() {
  const buttons = document.querySelectorAll('[data-mode]');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('active', buttons[i].dataset.mode === state.mode);
  }
}

function renderScreens() {
  document.body.dataset.scene = state.mode;
  const isHero = state.mode === 'hero';
  const isShip = state.mode === 'ship';
  const isTerritories = state.mode === 'territories';
  const isCity = state.mode === 'city';
  elements.heroScreen.classList.toggle('hidden', !isHero);
  elements.shipScreen.classList.toggle('hidden', !isShip);
  elements.territoriesScreen.classList.toggle('hidden', !isTerritories);
  elements.cityScreen.classList.toggle('hidden', !isCity);
  if (isHero) {
    elements.screenTitle.textContent = 'Герой';
    elements.screenSubtitle.textContent = 'Состояние, характеристики и личные слоты героя.';
  } else if (isShip) {
    elements.screenTitle.textContent = 'Корабль';
    elements.screenSubtitle.textContent = 'Внутренние системы аварийной базы.';
  } else if (isTerritories) {
    elements.screenTitle.textContent = 'Пустоши';
    elements.screenSubtitle.textContent = 'Открытые и неизвестные зоны вокруг места крушения.';
  } else if (isCity) {
    elements.screenTitle.textContent = 'Город';
    elements.screenSubtitle.textContent = 'Ашхаб-18: районы, активности и уникальные точки.';
  }
}

function renderHeroScreen() {
  const hero = state.hero || createHero();
  elements.heroScreen.innerHTML =
    '<article class="hero-scene-card" aria-label="Карточка героя">' +
      '<div class="hero-card-header">' +
        '<div>' +
          '<span class="card-kicker">карточка героя</span>' +
          '<h3>' + hero.name + '</h3>' +
          '<p class="hero-status">Статус: ' + hero.status + '</p>' +
        '</div>' +
        '<button type="button" data-hero-select="true">Выбрать Героя</button>' +
      '</div>' +
      '<p class="hero-description">' + hero.description + '</p>' +
      renderHeroStats(hero.stats) +
      renderHeroSlots('Экипировка', hero.equipment, heroEquipmentLabels, 'equipment') +
      renderHeroSlots('Мысли', hero.thoughts, null, 'thoughts') +
      renderHeroSlots('Предметы', hero.items, null, 'items') +
    '</article>';
}

function renderHeroStats(stats) {
  const keys = Object.keys(heroStatLabels);
  let html = '<section class="hero-section hero-stats" aria-label="Характеристики героя"><h4>Характеристики</h4><div class="hero-stat-grid">';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    html += '<div class="hero-stat"><span>' + heroStatLabels[key] + '</span><strong>' + stats[key] + '</strong></div>';
  }

  return html + '</div></section>';
}

function renderHeroSlots(title, slots, labels, className) {
  const keys = Array.isArray(slots) ? slots.map(function (_, index) { return index; }) : Object.keys(slots);
  let html = '<section class="hero-section hero-slots hero-' + className + '" aria-label="' + title + '"><h4>' + title + '</h4><div class="hero-slot-grid">';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const label = labels ? labels[key] : 'Слот ' + (i + 1);
    const value = Array.isArray(slots) ? slots[key] : slots[key];
    html += '<div class="hero-slot"><span>' + label + '</span><strong>' + (value || 'пусто') + '</strong></div>';
  }

  return html + '</div></section>';
}

function renderShipSystems() {
  elements.shipSystemsGrid.innerHTML = '';
  const keys = Object.keys(shipSystemBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const blueprint = shipSystemBlueprints[key];
    const system = state.shipSystems[key];
    const card = document.createElement('article');
    card.className = 'game-card system-card status-' + slugStatus(system.status);
    card.classList.toggle('selected', state.mode === 'ship' && state.selectedSystemKey === key);
    card.innerHTML = '<button class="card-select" type="button" data-system-key="' + key + '">' +
      '<span class="card-kicker">система корабля</span>' +
      '<strong>' + blueprint.name + '</strong>' +
      '<small>Статус: ' + getShipStatusLabel(system.status) + '</small>' +
      '<em>Роль: ' + blueprint.role + '</em>' +
      '<p>' + blueprint.description + '</p>' +
      '</button>';
    elements.shipSystemsGrid.appendChild(card);
  }
}

function renderTerritories() {
  elements.territoriesGrid.innerHTML = '';
  const keys = Object.keys(territoryBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const territory = state.territories[key] || territoryBlueprints[key];
    const card = document.createElement('article');
    card.className = 'game-card territory-card territory-' + i + ' territory-status-' + territory.status;
    card.classList.toggle('territory-closed', territory.status === 'hidden');
    card.classList.toggle('selected', state.mode === 'territories' && state.selectedTerritoryKey === key);

    let detailsHtml = '<small>Статус: ' + territoryStatusLabels[territory.status] + '</small>';
    if (territory.status === 'open' || territory.status === 'depleted') {
      detailsHtml += '<p>' + territory.description + '</p>' +
        '<em>Ресурс: ' + getTerritoryResourceText(territory) + '</em>' +
        '<em>Добыча: ' + getTerritoryYieldText(territory) + '</em>' +
        '<em>' + getTerritoryStockText(territory) + '</em>';
    } else if (territory.status === 'discovered') {
      detailsHtml += '<p>' + territory.description + '</p>' +
        '<em>Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '</em>';
    } else {
      detailsHtml += '<em>Исследований до обнаружения: ' + getTerritoryDiscoverProgressRemaining(territory) + '</em>';
    }

    card.innerHTML = '<button class="card-select" type="button" data-territory-key="' + key + '">' +
      '<span class="card-kicker">пустошь</span>' +
      '<strong>' + (territory.status === 'hidden' ? 'Неизвестная зона' : territory.name) + '</strong>' +
      detailsHtml +
      '</button>';
    elements.territoriesGrid.appendChild(card);
  }
}

function renderCity() {
  elements.cityGrid.innerHTML = '';
  elements.uniqueCityGrid.innerHTML = '';
  const districtKeys = Object.keys(cityDistricts);

  for (let i = 0; i < districtKeys.length; i++) {
    const key = districtKeys[i];
    const district = cityDistricts[key];
    const card = document.createElement('article');
    card.className = 'game-card city-card';
    card.classList.toggle('selected', state.mode === 'city' && state.selectedCityType === 'district' && state.selectedCityKey === key);
    card.classList.toggle('has-selected-activity', state.mode === 'city' && state.selectedCityType === 'activity' && state.selectedCityKey.indexOf(key + ':') === 0);
    let activitiesHtml = '';

    for (let j = 0; j < cityActivities.length; j++) {
      const activity = cityActivities[j];
      activitiesHtml += '<button type="button" data-city-district-key="' + key + '" data-city-activity-key="' + activity.key + '">' + activity.name + '</button>';
    }

    card.innerHTML = '<button class="card-select" type="button" data-city-district-key="' + key + '">' +
      '<span class="card-kicker">район</span>' +
      '<strong>' + district.name + '</strong>' +
      '<small>Ашхаб-18 · район полулегальной карты</small>' +
      '<p>' + district.description + '</p>' +
      '</button>' +
      '<div class="compact-actions city-actions">' + activitiesHtml + '</div>';
    elements.cityGrid.appendChild(card);
  }

  const uniqueKeys = Object.keys(cityUniquePoints);
  for (let i = 0; i < uniqueKeys.length; i++) {
    const key = uniqueKeys[i];
    const point = cityUniquePoints[key];
    const card = document.createElement('article');
    card.className = 'game-card unique-card';
    card.classList.toggle('selected', state.mode === 'city' && state.selectedCityType === 'unique' && state.selectedCityKey === key);
    card.innerHTML = '<button class="card-select" type="button" data-city-unique-key="' + key + '">' +
      '<span class="card-kicker">уникальная точка</span>' +
      '<strong>' + point.name + '</strong>' +
      '<small>Уникальная точка Ашхаб-18</small>' +
      '<p>' + point.description + '</p>' +
      '</button>';
    elements.uniqueCityGrid.appendChild(card);
  }
}

function renderSelectionPanel() {
  elements.selectedActions.innerHTML = '';

  const selection = getCurrentSelection();
  if (!selection) {
    stopTypewriter();
    renderEmptyHeroActions();
    return;
  }

  const panelText = getSelectionPanelText(selection);
  const panelKey = selection.id + ':' + panelText;

  elements.selectedName.textContent = selection.name;

  if (reducedMotionQuery.matches) {
    stopTypewriter(panelKey);
    elements.selectedDescription.textContent = panelText;
    elements.selectedDescription.classList.remove('typing');
    renderObjectActionOptions(selection);
    return;
  }

  if (typewriterState.currentKey === panelKey) {
    if (typewriterState.isTyping) {
      return;
    }

    elements.selectedDescription.textContent = panelText;
    elements.selectedDescription.classList.remove('typing');
    renderObjectActionOptions(selection);
    return;
  }

  startTypewriter(panelText, panelKey, function () {
    const currentSelection = getCurrentSelection();
    if (!currentSelection || currentSelection.id + ':' + getSelectionPanelText(currentSelection) !== panelKey) {
      return;
    }

    startActionTypewriter(currentSelection, panelKey);
  });
}

function getSelectionPanelText(selection) {
  if (state.narrativeObjectId === selection.id && state.narrativeMessage) {
    return state.narrativeMessage;
  }

  return selection.description;
}

function startTypewriter(text, panelKey, onComplete) {
  stopTypewriter(panelKey);

  const token = typewriterState.token;
  typewriterState.currentKey = panelKey;
  typewriterState.isTyping = true;
  elements.selectedDescription.classList.add('typing');
  elements.selectedDescription.textContent = typewriterCursor;

  let index = 0;
  function typeNextCharacter() {
    if (token !== typewriterState.token || typewriterState.currentKey !== panelKey) {
      return;
    }

    index += 1;
    elements.selectedDescription.textContent = text.slice(0, index) + (index < text.length ? typewriterCursor : '');

    if (index >= text.length) {
      typewriterState.isTyping = false;
      elements.selectedDescription.classList.remove('typing');
      onComplete();
      return;
    }

    typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
  }

  typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
}

function stopTypewriter(nextKey) {
  if (typewriterState.timerId) {
    window.clearTimeout(typewriterState.timerId);
  }

  typewriterState.timerId = 0;
  typewriterState.token += 1;
  typewriterState.currentKey = nextKey || '';
  typewriterState.isTyping = false;
  elements.selectedDescription.classList.remove('typing');
}

function renderEmptyHeroActions() {
  elements.selectedName.textContent = 'Объект не выбран';
  elements.selectedDescription.textContent = 'Выберите объект в центральной сцене, чтобы увидеть описание и доступные действия.';
  addActionLead('Твои действия:');
}

function getCurrentSelection() {
  if (state.mode === 'hero') {
    const hero = state.hero || createHero();
    return {
      id: 'hero:main',
      kind: 'hero',
      name: hero.name,
      type: hero.type,
      description: 'Герой стоит у аварийного интерфейса и сверяет маршрут между кораблём, пустошами и городом. Личные показатели пока служат ориентиром, а не отдельной механикой.',
      inspectDescription: 'Герой проверяет снаряжение и дыхание. Тело держится. Паника отступила, но усталость пока просто некуда записать в протокол.'
    };
  }

  if (state.mode === 'ship' && state.selectedSystemKey) {
    const key = state.selectedSystemKey;
    const blueprint = shipSystemBlueprints[key];
    const system = state.shipSystems[key];
    if (!blueprint || !system) return null;
    return {
      id: 'ship:' + key,
      kind: 'system',
      key,
      name: blueprint.name,
      type: 'система корабля',
      description: 'Статус: ' + getShipStatusLabel(system.status) + '.\n' + blueprint.description,
      inspectDescription: 'Статус: ' + getShipStatusLabel(system.status) + '. ' + blueprint.description
    };
  }

  if (state.mode === 'territories' && state.selectedTerritoryKey) {
    const key = state.selectedTerritoryKey;
    const territory = state.territories[key];
    if (!territory) return null;
    return {
      id: 'territory:' + key,
      kind: 'territory',
      key,
      name: territory.status === 'hidden' ? 'Неизвестная зона' : territory.name,
      type: territoryStatusLabels[territory.status] + ' пустошь',
      description: getTerritoryPanelDescription(territory),
      inspectDescription: getTerritoryInspectDescription(territory)
    };
  }

  if (state.mode === 'city' && state.selectedCityKey && state.selectedCityType) {
    return getCitySelection();
  }

  return null;
}

function getCitySelection() {
  if (state.selectedCityType === 'district') {
    const district = cityDistricts[state.selectedCityKey];
    if (!district) return null;
    return {
      id: 'city:district:' + state.selectedCityKey,
      kind: 'district',
      key: state.selectedCityKey,
      name: district.name,
      type: 'район',
      description: district.description,
      inspectDescription: 'Герой задерживается у входа в район: шум воды в трубах, ремонтные запахи и старые указатели складываются в карту возможностей. Доступны активности: ' + cityActivities.map(function (activity) { return activity.name; }).join(', ') + '.'
    };
  }

  if (state.selectedCityType === 'activity') {
    const parts = state.selectedCityKey.split(':');
    const district = cityDistricts[parts[0]];
    const activity = getCityActivity(parts[1]);
    if (!district || !activity) return null;
    return {
      id: 'city:activity:' + state.selectedCityKey,
      kind: 'activity',
      key: state.selectedCityKey,
      name: activity.name,
      type: 'городская активность',
      description: activity.description,
      inspectDescription: 'Герой оценивает место внимательнее: ' + activity.description + ' Район: ' + district.name + '. Стоимость: ' + formatMaybeCost(activity.cost) + '. Результат: ' + formatCityResult(activity) + '.'
    };
  }

  const point = cityUniquePoints[state.selectedCityKey];
  if (!point) return null;
  return {
    id: 'city:unique:' + state.selectedCityKey,
    kind: 'unique',
    key: state.selectedCityKey,
    name: point.name,
    type: 'уникальная точка',
    description: point.description,
    inspectDescription: 'Герой осматривает точку отдельно от шума инфраструктуры: ' + point.description + ' Стоимость: ' + formatMaybeCost(point.cost) + '. Результат: ' + formatCityResult(point) + '.'
  };
}


function getShipStatusLabel(status) {
  return shipStatusLabels[status] || shipStatusLabels.damaged;
}


function getTerritoryPanelDescription(territory) {
  if (territory.status === 'hidden') {
    return 'Статус: Скрыта. Исследований до обнаружения: ' + getTerritoryDiscoverProgressRemaining(territory) + '.';
  }

  if (territory.status === 'discovered') {
    return territory.description + ' Статус: Обнаружена. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  if (territory.status === 'depleted') {
    return territory.description + '\n' + getTerritoryOpenSummaryLines(territory).join('\n');
  }

  return territory.description + '\n' + getTerritoryOpenSummaryLines(territory).join('\n');
}

function getTerritoryInspectDescription(territory) {
  if (territory.status === 'open' || territory.status === 'depleted') {
    return territory.description + '\n' + getTerritoryOpenSummaryLines(territory).join('\n');
  }

  if (territory.status === 'discovered') {
    return territory.description + ' Статус: Обнаружена. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  return 'Статус: Скрыта. Исследований до обнаружения: ' + getTerritoryDiscoverProgressRemaining(territory) + '.';
}

function renderObjectActionOptions(selection) {
  addActionLead('Твои действия:');

  if (state.actionPanelMode === 'exhausted' && state.narrativeObjectId === selection.id) {
    appendBackOption();
    return;
  }

  if (selection.kind === 'hero') {
    appendActionOption('🛌', formatActionTitle('Отдохнуть', {}), 'Короткая передышка', 'heroAction', 'rest', false);
    appendActionOption('🎒', formatActionTitle('Проверить экипировку', {}), 'Осмотреть личные слоты', 'heroAction', 'equipment', false);
    appendActionOption('💭', formatActionTitle('Проверить мысли', {}), 'Заглянуть во внутренний список', 'heroAction', 'thoughts', false);
    appendActionOption('📦', formatActionTitle('Проверить предметы', {}), 'Сверить пустые ячейки', 'heroAction', 'items', false);
    appendBackOption();
    return;
  }

  if (selection.kind === 'system') {
    addActionLead('Действия с системой будут добавлены позже');
    return;
  }

  if (selection.kind === 'territory') {
    const territory = state.territories[selection.key];
    if (territory.status === 'open' || territory.status === 'depleted') {
      appendActionOption('⛏️', formatActionTitle(getGatherActionTitle(selection.key), {}), 'Результат: ' + getTerritoryOutputText(selection.key), 'gatherKey', selection.key, false);
    } else if (territory.status === 'discovered') {
      appendResearchApproachOptions(selection.key, territory);
    } else if (territory.status === 'hidden') {
      appendDiscoverApproachOptions(selection.key, territory);
    }
    appendBackOption();
    return;
  }

  if (selection.kind === 'district') {
    for (let i = 0; i < cityActivities.length; i++) {
      const activity = cityActivities[i];
      appendActionOption('⚙️', formatActionTitle(activity.action, activity.cost), 'Результат: ' + formatCityResult(activity), 'cityActionKey', selection.key + ':' + activity.key, false);
    }
    appendBackOption();
    return;
  }

  if (selection.kind === 'activity') {
    const activity = getCityActivity(selection.key.split(':')[1]);
    appendActionOption('⚙️', formatActionTitle(activity.action, activity.cost), 'Результат: ' + formatCityResult(activity), 'cityActionKey', selection.key, false);
    appendBackOption();
    return;
  }

  if (selection.kind === 'unique') {
    const point = cityUniquePoints[selection.key];
    appendActionOption('⚙️', formatActionTitle(point.action, point.cost), 'Результат: ' + formatCityResult(point), 'cityUniqueActionKey', selection.key, false);
    appendBackOption();
  }
}

function appendResearchApproachOptions(key, territory) {
  const approachKeys = Object.keys(researchApproaches);

  for (let i = 0; i < approachKeys.length; i++) {
    const approachKey = approachKeys[i];
    const approach = researchApproaches[approachKey];
    appendActionOption('🔍', formatActionTitle(approach.title, {}), 'Бросок 2d6 · исследование: ' + territory.progress + ' / ' + territory.requiredProgress, 'researchApproachKey', key + ':' + approachKey, false);
  }
}

function appendDiscoverApproachOptions(key, territory) {
  const approachKeys = Object.keys(researchApproaches);

  for (let i = 0; i < approachKeys.length; i++) {
    const approachKey = approachKeys[i];
    const approach = researchApproaches[approachKey];
    const statLabel = heroStatLabels[approach.statKey] || 'Характеристика';
    appendActionOption('🔍', formatActionTitle(approach.title, {}), 'Бросок 2d6 + ' + statLabel + ' · до обнаружения: ' + territory.discoverProgress + ' / ' + territory.discoverProgressRequired, 'discoverApproachKey', key + ':' + approachKey, false);
  }
}

function performHeroAction(action) {
  state.mode = 'hero';
  state.actionPanelMode = 'actions';

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  const narratives = {
    rest: 'Герой садится у холодной переборки и несколько минут слушает, как корабль скрипит под песком. Отдых пока остаётся короткой паузой без отдельной механики.',
    equipment: 'Пальцы проходят по креплениям и пустым слотам. Снаряжение держится, но список экипировки всё ещё почти пуст.',
    thoughts: 'Герой пытается разложить мысли по ячейкам. Внутри только шум аварии, молчание планеты и необходимость двигаться дальше.',
    items: 'Личные карманы проверены один за другим. Предметные слоты ждут будущих находок.'
  };
  const messages = {
    rest: 'Герой отдохнул несколько минут. Система состояния будет добавлена позже.',
    equipment: 'Слоты экипировки осмотрены.',
    thoughts: 'Слоты мыслей пусты.',
    items: 'Слоты предметов пусты.'
  };

  if (selection) {
    setNarrativeMessage(selection, narratives[action] || 'Герой пробует действие, но эта часть интерфейса пока остаётся заглушкой.');
  }
  addLog(messages[action] || 'Действие Героя пока недоступно.');
}

function getCityActivity(key) {
  return cityActivities.find(function (item) {
    return item.key === key;
  });
}

function formatMaybeCost(cost) {
  if (!cost || Object.keys(cost).length === 0) {
    return 'нет';
  }

  return formatCompactCost(cost);
}


function getGatherActionTitle(key) {
  const territory = state.territories[key] || territoryBlueprints[key];

  if (!territory) {
    return 'Собрать ресурс';
  }

  return territory.action || territoryGatherActions[territory.resource] || 'Собрать ресурс';
}

function getCompactResourceLabel(resource) {
  return compactResourceLabels[resource] || resourceLabels[resource] || resource;
}

function formatCompactCost(cost) {
  const parts = [];
  const keys = Object.keys(cost || {});

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    parts.push('-' + cost[resource] + ' ' + getCompactResourceLabel(resource));
  }

  return parts.join(', ');
}

function formatActionTitle(title, cost) {
  const parts = ['-' + staminaActionCost + ' 🫁'];
  const extraCost = formatCompactCost(cost);

  if (extraCost) {
    parts.push(extraCost);
  }

  return title + ' (' + parts.join(', ') + ')';
}

function formatCityResult(entry) {
  if (entry.result) {
    return formatGain(entry.result);
  }

  return entry.resultText || 'Запись в журнал.';
}


function migrateLogMessage(message) {
  const text = String(message);

  if (/дрон/i.test(text)) {
    return 'Старая запись скрыта: временно недоступная механика убрана из интерфейса.';
  }

  return text
    .replace(/территории/g, 'пустоши')
    .replace(/территорию/g, 'пустошь')
    .replace(/территория/g, 'пустошь')
    .replace(/данных/g, 'разведданных')
    .replace(/данные/g, 'разведданные');
}

let actionRenderCollector = null;

function addActionLead(text) {
  if (actionRenderCollector) {
    actionRenderCollector.push({ type: 'lead', text });
    return;
  }

  elements.selectedActions.appendChild(createActionLead(text));
}

function createActionLead(text) {
  const lead = document.createElement('p');
  lead.className = 'action-lead';
  lead.textContent = text;
  return lead;
}

function appendBackOption() {
  // Действие возврата скрыто из списка действий героя, чтобы панель оставалась компактной.
}

function getRetreatNote() {
  if (state.mode === 'ship') return 'Вернуться к системам корабля';
  if (state.mode === 'territories') return 'Вернуться к пустошам';
  if (state.mode === 'city') return 'Вернуться к районам города';
  return 'Вернуться к обзору героя';
}

function appendActionOption(icon, title, note, datasetKey, key, disabled) {
  if (actionRenderCollector) {
    actionRenderCollector.push({ type: 'option', icon, title, note, datasetKey, key, disabled });
    return;
  }

  elements.selectedActions.appendChild(createActionButton({ icon, title, note, datasetKey, key, disabled }, title, note, disabled));
}

function createActionButton(entry, titleText, noteText, disabled) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'action-choice';
  button.dataset[entry.datasetKey] = entry.key;
  button.disabled = disabled;

  const titleParts = splitActionTitle(titleText);

  const title = document.createElement('span');
  title.className = 'action-title';
  title.textContent = entry.icon + ' ' + titleParts.label + (titleParts.cost ? ' [' + titleParts.cost + ']' : '');
  button.appendChild(title);

  if (entry.note) {
    const note = document.createElement('span');
    note.className = 'action-note';
    note.textContent = noteText;
    button.appendChild(note);
  }

  return button;
}

function splitActionTitle(text) {
  const source = String(text || '');
  const match = source.match(/^(.*?)\s*\(([^()]*)\)\s*$/);

  if (!match) {
    return { label: source, cost: '' };
  }

  return { label: match[1], cost: match[2] };
}

function collectObjectActionEntries(selection) {
  actionRenderCollector = [];
  renderObjectActionOptions(selection);
  const entries = actionRenderCollector;
  actionRenderCollector = null;
  return entries;
}

function startActionTypewriter(selection, panelKey) {
  const entries = collectObjectActionEntries(selection);
  elements.selectedActions.innerHTML = '';

  const token = typewriterState.token;
  typewriterState.currentKey = panelKey;
  typewriterState.isTyping = true;

  let entryIndex = 0;
  function typeNextEntry() {
    if (token !== typewriterState.token || typewriterState.currentKey !== panelKey) {
      return;
    }

    if (entryIndex >= entries.length) {
      typewriterState.isTyping = false;
      return;
    }

    const entry = entries[entryIndex];
    entryIndex += 1;

    if (entry.type === 'lead') {
      typeTextNode(createActionLead(''), entry.text, token, panelKey, typeNextEntry);
      return;
    }

    typeActionButton(entry, token, panelKey, typeNextEntry);
  }

  typeNextEntry();
}

function typeTextNode(node, text, token, panelKey, onComplete) {
  elements.selectedActions.appendChild(node);

  let index = 0;
  function typeNextCharacter() {
    if (token !== typewriterState.token || typewriterState.currentKey !== panelKey || !typewriterState.isTyping) {
      return;
    }

    index += 1;
    node.textContent = text.slice(0, index) + (index < text.length ? typewriterCursor : '');

    if (index >= text.length) {
      onComplete();
      return;
    }

    typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
  }

  typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
}

function typeActionButton(entry, token, panelKey, onComplete) {
  const button = createActionButton(entry, '', '', true);
  elements.selectedActions.appendChild(button);

  const titleNode = button.querySelector('.action-title');
  const noteNode = button.querySelector('.action-note');
  const fullTitleParts = splitActionTitle(entry.title);
  const fullTitle = entry.icon + ' ' + fullTitleParts.label + (fullTitleParts.cost ? ' [' + fullTitleParts.cost + ']' : '');
  const fullNote = entry.note || '';
  const fullText = fullNote ? fullTitle + '\n' + fullNote : fullTitle;

  let index = 0;
  function typeNextCharacter() {
    if (token !== typewriterState.token || typewriterState.currentKey !== panelKey || !typewriterState.isTyping) {
      return;
    }

    index += 1;
    const visibleText = fullText.slice(0, index);
    const parts = visibleText.split('\n');
    titleNode.textContent = parts[0] + (index < fullText.length && parts.length === 1 ? typewriterCursor : '');

    if (noteNode) {
      noteNode.textContent = parts[1] || '';
      if (index < fullText.length && parts.length > 1) {
        noteNode.textContent += typewriterCursor;
      }
    }

    if (index >= fullText.length) {
      titleNode.textContent = fullTitle;
      if (noteNode) {
        noteNode.textContent = fullNote;
      }
      button.disabled = entry.disabled;
      onComplete();
      return;
    }

    typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
  }

  typewriterState.timerId = window.setTimeout(typeNextCharacter, typewriterDelay);
}

function setNarrativeMessage(selection, message) {
  state.narrativeObjectId = selection.id;
  state.narrativeMessage = message;
}

function clearNarrativeMessage() {
  state.narrativeObjectId = '';
  state.narrativeMessage = '';
}

function renderLog() {
  elements.log.innerHTML = '';

  for (let i = 0; i < state.logMessages.length; i++) {
    const item = document.createElement('li');

    const time = document.createElement('span');
    time.className = 'log-time';
    time.textContent = 'T-' + String(i).padStart(2, '0');
    item.appendChild(time);

    const icon = document.createElement('span');
    icon.className = 'log-icon';
    icon.textContent = getLogIcon(state.logMessages[i]);
    item.appendChild(icon);

    const text = document.createElement('span');
    text.className = 'log-text';
    text.textContent = state.logMessages[i];
    item.appendChild(text);

    elements.log.appendChild(item);
  }
}

function getLogIcon(message) {
  const text = String(message).toLowerCase();

  if (text.includes('недостаточно') || text.includes('повреждено')) return '⚠';
  if (text.includes('вода')) return '💧';
  if (text.includes('металл')) return '⛓';
  if (text.includes('еда')) return '🍖';
  if (text.includes('компонент')) return '🔩';
  if (text.includes('кораб') || text.includes('систем')) return '◆';
  return '▸';
}

function countOpenTerritories() {
  const keys = Object.keys(state.territories);
  let opened = 0;

  for (let i = 0; i < keys.length; i++) {
    if (canGatherTerritory(state.territories[keys[i]])) {
      opened += 1;
    }
  }

  return opened;
}

function countClosedTerritories() {
  return Object.keys(territoryBlueprints).length - countOpenTerritories();
}

function countRestoredSystems() {
  const keys = Object.keys(state.shipSystems);
  let active = 0;

  for (let i = 0; i < keys.length; i++) {
    if (state.shipSystems[keys[i]].status !== 'disabled') {
      active += 1;
    }
  }

  return active;
}

function slugStatus(status) {
  if (status === 'disabled') {
    return 'disabled';
  }

  if (status === 'stabilized') {
    return 'stabilized';
  }

  if (status === 'improved') {
    return 'improved';
  }

  return 'damaged';
}

function formatCost(cost) {
  const parts = [];
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    parts.push(resourceLabels[resource] + ' ' + cost[resource]);
  }

  return parts.join(', ');
}

function formatGain(gain) {
  const parts = [];
  const keys = Object.keys(gain);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    parts.push(resourceLabels[resource] + ' +' + gain[resource]);
  }

  return parts.join(', ');
}

function getGenitiveName(name) {
  const names = {
    'Обшивка': 'Обшивки',
    'Реакторный отсек': 'Реакторного отсека',
    'Жизнеобеспечение': 'Жизнеобеспечения',
    'Водный контур': 'Водного контура',
    'Ремонтный цех': 'Ремонтного цеха',
    'Навигационный модуль': 'Навигационного модуля',
    'Сканерный модуль': 'Сканерного модуля',
    'Серверный узел': 'Серверного узла'
  };

  return names[name] || name;
}


function saveGame() {
  localStorage.setItem(saveKey, JSON.stringify(state));
}

function loadGame() {
  const savedText = localStorage.getItem(saveKey) || getLegacySave();

  if (!savedText) {
    render();
    saveGame();
    return;
  }

  try {
    const saved = JSON.parse(savedText);
    state = mergeSavedState(saved);
  } catch (error) {
    state = createInitialState();
    state.logMessages.unshift('Сохранение повреждено. Начата новая игра.');
  }

  render();
  saveGame();
}

function getLegacySave() {
  for (let i = 0; i < legacySaveKeys.length; i++) {
    const saved = localStorage.getItem(legacySaveKeys[i]);
    if (saved) {
      return saved;
    }
  }

  return '';
}

function mergeSavedState(saved) {
  const next = createInitialState();
  const savedResources = saved.resources || saved;
  const resourceKeys = Object.keys(initialResources);

  for (let i = 0; i < resourceKeys.length; i++) {
    const key = resourceKeys[i];
    const legacyValue = key === 'recon' && savedResources.recon === undefined ? savedResources.data : savedResources[key];
    next.resources[key] = savedNumber(legacyValue, initialResources[key]);
  }

  const savedCondition = saved.heroCondition && typeof saved.heroCondition === 'object'
    ? { ...saved.heroCondition }
    : (saved.condition && typeof saved.condition === 'object' ? { ...saved.condition } : {});
  if (savedCondition.health === undefined && saved.health !== undefined) savedCondition.health = saved.health;
  if (savedCondition.stamina === undefined && saved.stamina !== undefined) savedCondition.stamina = saved.stamina;
  if (savedCondition.credits === undefined && saved.credits !== undefined) savedCondition.credits = saved.credits;
  next.heroCondition.health = clampSavedNumber(savedCondition.health, initialHeroCondition.health, 0, initialHeroCondition.maxHealth);
  next.heroCondition.maxHealth = initialHeroCondition.maxHealth;
  next.heroCondition.stamina = clampSavedNumber(savedCondition.stamina, initialHeroCondition.stamina, 0, initialHeroCondition.maxStamina);
  next.heroCondition.maxStamina = initialHeroCondition.maxStamina;
  next.heroCondition.credits = Math.max(0, savedNumber(savedCondition.credits, initialHeroCondition.credits));

  next.turn = savedNumber(saved.turn, 1);
  next.mode = ['hero', 'territories', 'ship', 'city'].includes(saved.mode) ? saved.mode : (['recon', 'drones', 'map', 'research', 'Разведка', 'Дроны', 'Карта', 'карта'].includes(saved.mode) ? 'territories' : 'hero');
  next.selectedSystemKey = shipSystemBlueprints[saved.selectedSystemKey] ? saved.selectedSystemKey : '';
  next.selectedTerritoryKey = territoryBlueprints[saved.selectedTerritoryKey] ? saved.selectedTerritoryKey : '';
  next.selectedCityKey = saved.selectedCityKey || '';
  next.selectedCityType = saved.selectedCityType || '';
  next.actionPanelMode = 'actions';
  next.inspectedObjectId = typeof saved.inspectedObjectId === 'string' ? saved.inspectedObjectId : '';
  next.narrativeObjectId = typeof saved.narrativeObjectId === 'string' ? saved.narrativeObjectId : '';
  next.narrativeMessage = typeof saved.narrativeMessage === 'string' ? saved.narrativeMessage : '';
  if (saved.activeResearchEvent && territoryBlueprints[saved.activeResearchEvent.territoryKey]) {
    next.activeResearchEvent = {
      territoryKey: saved.activeResearchEvent.territoryKey
    };
  }
  next.hero = mergeSavedHero(saved.hero);


  const savedSystems = saved.shipSystems || {};
  const systemKeys = Object.keys(next.shipSystems);
  for (let i = 0; i < systemKeys.length; i++) {
    const key = systemKeys[i];
    if (savedSystems[key]) {
      next.shipSystems[key].status = shipStatusLabels[savedSystems[key].status]
        ? savedSystems[key].status
        : next.shipSystems[key].status;
    }
  }

  const savedTerritories = saved.territories || saved.sites || {};
  const territoryKeys = Object.keys(next.territories);
  for (let i = 0; i < territoryKeys.length; i++) {
    const key = territoryKeys[i];
    const savedTerritory = savedTerritories[key];
    if (savedTerritory) {
      const nextTerritory = next.territories[key];
      const savedStatus = savedTerritory.status;
      if (territoryStatusKeys.includes(savedStatus)) {
        nextTerritory.status = savedStatus;
      } else if (savedStatus === 'researching') {
        nextTerritory.status = 'discovered';
      } else if (savedStatus === 'settled') {
        nextTerritory.status = 'open';
      } else if (typeof savedTerritory.isOpen === 'boolean') {
        nextTerritory.status = savedTerritory.isOpen ? 'open' : nextTerritory.status;
      }
      nextTerritory.requiredProgress = savedNumber(savedTerritory.requiredProgress, nextTerritory.requiredProgress);
      nextTerritory.progress = savedNumber(savedTerritory.progress, nextTerritory.progress);
      nextTerritory.discoverProgressRequired = savedNumber(savedTerritory.discoverProgressRequired, nextTerritory.discoverProgressRequired);
      nextTerritory.discoverProgress = savedNumber(savedTerritory.discoverProgress, nextTerritory.discoverProgress);
      nextTerritory.remaining = Math.max(0, savedNumber(savedTerritory.remaining, nextTerritory.remaining || 0));
      if (nextTerritory.status === 'depleted') {
        nextTerritory.remaining = 0;
      }
      normalizeTerritoryProgress(nextTerritory);
    }
  }

  applyStarterTerritoryConcept(next.territories);
  if (next.activeResearchEvent && next.territories[next.activeResearchEvent.territoryKey].status !== 'discovered') {
    next.activeResearchEvent = null;
  }

  next.logMessages = Array.isArray(saved.logMessages) && saved.logMessages.length > 0
    ? saved.logMessages.slice(0, maxLogMessages).map(migrateLogMessage)
    : ['Сохранение загружено. Продолжайте развитие базы.'];

  return next;
}

function applyStarterTerritoryConcept(territories) {
  const keys = ['crashSite', 'nearDebris', 'wetLowland', 'sandRidge'];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const territory = territories[key];
    const blueprint = territoryBlueprints[key];

    if (!territory || !blueprint) {
      continue;
    }

    territory.status = blueprint.status;
    territory.resource = blueprint.resource;
    territory.yieldMin = blueprint.yieldMin;
    territory.yieldMax = blueprint.yieldMax;
    territory.baseGain = { ...blueprint.baseGain };
    territory.remaining = blueprint.remaining;
    territory.action = blueprint.action;
    territory.progress = blueprint.progress;
    territory.requiredProgress = blueprint.requiredProgress;
  }
}

function mergeSavedHero(savedHero) {
  const hero = createHero();

  if (!savedHero || typeof savedHero !== 'object') {
    return hero;
  }

  hero.name = typeof savedHero.name === 'string' && savedHero.name ? savedHero.name : hero.name;
  hero.status = typeof savedHero.status === 'string' && savedHero.status ? savedHero.status : hero.status;
  hero.type = typeof savedHero.type === 'string' && savedHero.type ? savedHero.type : hero.type;
  hero.description = typeof savedHero.description === 'string' && savedHero.description ? savedHero.description : hero.description;

  if (savedHero.stats) {
    const statKeys = Object.keys(hero.stats);
    for (let i = 0; i < statKeys.length; i++) {
      const key = statKeys[i];
      hero.stats[key] = savedNumber(savedHero.stats[key], hero.stats[key]);
    }
  }

  return hero;
}

function savedNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clampSavedNumber(value, fallback, min, max) {
  const number = savedNumber(value, fallback);
  return Math.min(max, Math.max(min, number));
}

function restartGame() {
  localStorage.removeItem(saveKey);
  for (let i = 0; i < legacySaveKeys.length; i++) {
    localStorage.removeItem(legacySaveKeys[i]);
  }

  state = createInitialState();
  state.logMessages.unshift('Новая игра начата. Состояние полностью сброшено.');
  saveGame();
  render();
}

document.addEventListener('click', function (event) {
  const target = event.target.closest('button');

  if (!target) {
    return;
  }

  if (target.dataset.mode) {
    switchMode(target.dataset.mode);
  } else if (target.dataset.heroSelect) {
    switchMode('hero');
  } else if (target.dataset.heroAction) {
    performHeroAction(target.dataset.heroAction);
  } else if (target.dataset.backSelected) {
    returnToSelectedPanel();
  } else if (target.dataset.diagnosticKey) {
    diagnoseSystem(target.dataset.diagnosticKey);
  } else if (target.dataset.cityActivitySelectKey) {
    const parts = target.dataset.cityActivitySelectKey.split(':');
    selectCityActivity(parts[0], parts[1]);
  } else if (target.dataset.cityActionKey) {
    const parts = target.dataset.cityActionKey.split(':');
    performCityActivity(parts[0], parts[1]);
  } else if (target.dataset.cityUniqueActionKey) {
    performCityUnique(target.dataset.cityUniqueActionKey);
  } else if (target.dataset.cityActivityKey) {
    selectCityActivity(target.dataset.cityDistrictKey, target.dataset.cityActivityKey);
  } else if (target.dataset.cityUniqueKey) {
    selectCityUnique(target.dataset.cityUniqueKey);
  } else if (target.dataset.cityDistrictKey) {
    selectCityDistrict(target.dataset.cityDistrictKey);
  } else if (target.dataset.systemKey) {
    selectSystem(target.dataset.systemKey);
  } else if (target.dataset.territoryKey) {
    selectTerritory(target.dataset.territoryKey);
  } else if (target.dataset.repairKey) {
    repairSystem(target.dataset.repairKey);
  } else if (target.dataset.gatherKey) {
    gatherTerritory(target.dataset.gatherKey);
  } else if (target.dataset.researchKey) {
    researchTerritory(target.dataset.researchKey);
  } else if (target.dataset.startResearchKey) {
    startTerritoryResearch(target.dataset.startResearchKey);
  } else if (target.dataset.continueResearchKey) {
    continueTerritoryResearch(target.dataset.continueResearchKey);
  } else if (target.dataset.researchApproachKey) {
    const parts = target.dataset.researchApproachKey.split(':');
    performResearchApproach(parts[0], parts[1]);
  } else if (target.dataset.discoverApproachKey) {
    const parts = target.dataset.discoverApproachKey.split(':');
    exploreHiddenTerritory(parts[0], parts[1]);
  } else if (target.dataset.discoverTerritoryKey) {
    exploreHiddenTerritory(target.dataset.discoverTerritoryKey, 'direct');
  }
});

document.getElementById('newGame').addEventListener('click', restartGame);
const mobileNewGameButton = document.getElementById('mobileNewGame');
if (mobileNewGameButton) {
  mobileNewGameButton.addEventListener('click', restartGame);
}

if (elements.toggleLog) {
  elements.toggleLog.addEventListener('click', function () {
    const panel = elements.toggleLog.closest('.log-panel');
    const isCollapsed = panel.classList.toggle('collapsed');
    elements.toggleLog.textContent = isCollapsed ? 'Развернуть' : 'Свернуть';
    elements.toggleLog.setAttribute('aria-expanded', String(!isCollapsed));
  });
}

loadGame();
