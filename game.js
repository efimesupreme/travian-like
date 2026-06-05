// Аурелия-18: единая оболочка сцен «Герой», «Пустоши», «Корабль» и «Город».
const saveKey = 'aurelia-18-save-v16';
const legacySaveKeys = ['aurelia-18-save-v15', 'aurelia-18-save-v14', 'aurelia-18-save-v13', 'aurelia-18-save-v12', 'aurelia-18-save-v11', 'aurelia-18-save-v10', 'aurelia-18-save-v9', 'aurelia-18-save-v8', 'aurelia-18-save-v7', 'aurelia-18-save-v6', 'aurelia-18-save-v5', 'aurelia-18-save-v4', 'aurelia-18-save-v3', 'aurelia-18-save-v2'];
const maxLogMessages = 10;
const maxTurns = 20;
const typewriterDelay = 22;
const typewriterCursor = '|';
const staminaActionCost = 1;

const researchApproaches = {
  strength: {
    stat: 'strength',
    baseDifficulty: 7,
    requiredStat: 1,
    title: 'Через Силу',
    successText: 'Герой берёт участок прямым усилием: сдвигает песок, проверяет твёрдые края и находит опорную линию, по которой зона перестаёт быть случайным пятном на карте.',
    failureText: 'Песок сопротивляется каждому движению. Герой успевает отметить несколько признаков, но контур зоны снова распадается на тяжёлую пыль и неровные тени.'
  },
  wisdom: {
    stat: 'wisdom',
    baseDifficulty: 7,
    requiredStat: 1,
    title: 'Через Мудрость',
    successText: 'Сканер отвечает не сразу. Сначала только шум, затем тонкая зелёная линия проходит по контуру объекта, и фрагмент старой системы перестаёт быть просто пятном под песком.',
    failureText: 'Сигнал распадается на шум раньше, чем Герой успевает закрепить направление. Пустошь снова становится плоской и молчаливой, будто ничего здесь и не было.'
  },
  agility: {
    stat: 'agility',
    baseDifficulty: 7,
    requiredStat: 1,
    title: 'Через Ловкость',
    successText: 'Герой меняет угол, ловит короткое окно между порывами ветра и успевает пройти по кромке следа. Карта получает чистую отметку вместо дрожащей догадки.',
    failureText: 'Порыв срывает ритм движения. Герой отступает на безопасную линию, а нужный след растворяется в песке быстрее, чем его удаётся закрепить.'
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

const shipSystemBlueprints = {
  hull: {
    name: 'Обшивка',
    description: 'Внешний слой корпуса держит давление и защищает командный узел от песчаных ударов.',
    status: 'повреждено',
    repairCost: { metal: 6, energy: 2, components: 1 }
  },
  reactor: {
    name: 'Реакторный отсек',
    description: 'Уцелевший реактор выдаёт нестабильное питание и требует калибровки контуров.',
    status: 'частично работает',
    repairCost: { metal: 5, energy: 4, components: 1 }
  },
  lifeSupport: {
    name: 'Жизнеобеспечение',
    description: 'Фильтры воздуха, теплообменники и аварийные пайки подключены к повреждённой магистрали.',
    status: 'повреждено',
    repairCost: { water: 4, energy: 3, components: 1 }
  },
  waterLoop: {
    name: 'Водный контур',
    description: 'Замкнутая система очистки воды разгерметизирована и теряет большую часть ресурса.',
    status: 'повреждено',
    repairCost: { metal: 3, water: 3, components: 1 }
  },
  droneWorkshop: {
    name: 'Ремонтный цех',
    description: 'Манипуляторы и станки аварийного обслуживания заблокированы после посадки.',
    status: 'повреждено',
    repairCost: { metal: 5, energy: 2, components: 2 }
  },
  navigation: {
    name: 'Навигационный модуль',
    description: 'Звёздные таблицы целы, но гироскопы и посадочный автопилот не отвечают.',
    status: 'повреждено',
    repairCost: { metal: 4, energy: 3, components: 1 }
  },
  scanner: {
    name: 'Сканерный модуль',
    description: 'Сенсорная решётка видит только ближайшие песчаные выбросы и нуждается в новых платах.',
    status: 'повреждено',
    repairCost: { energy: 3, components: 2 }
  },
  server: {
    name: 'Серверный узел',
    description: 'Бортовой архив хранит схемы ремонта, но часть кластеров отключена от питания.',
    status: 'повреждено',
    repairCost: { energy: 2, recon: 1, components: 1 }
  }
};

const territoryStatusLabels = {
  hidden: 'скрыта',
  discovered: 'обнаружена',
  researching: 'исследуется',
  open: 'открыта',
  settled: 'освоена'
};
const territoryStatusKeys = Object.keys(territoryStatusLabels);

const territoryBlueprints = {
  crashSite: {
    id: 'crashSite',
    name: 'Место крушения',
    status: 'open',
    description: 'Центральная зона вокруг корабля, где начинается игра.',
    resource: 'metal',
    baseGain: { metal: 2 },
    progress: 1,
    requiredProgress: 1
  },
  nearDebris: {
    id: 'nearDebris',
    name: 'Ближние обломки',
    status: 'open',
    description: 'Россыпь обшивки, посадочных опор и грузовых рам.',
    resource: 'metal',
    baseGain: { metal: 4 },
    progress: 1,
    requiredProgress: 1
  },
  wetLowland: {
    id: 'wetLowland',
    name: 'Влажная низина',
    status: 'open',
    description: 'Складка рельефа, где ночью собирается конденсат.',
    resource: 'water',
    baseGain: { water: 3 },
    progress: 1,
    requiredProgress: 1
  },
  sandRidge: {
    id: 'sandRidge',
    name: 'Песчаная гряда',
    status: 'discovered',
    description: 'На горизонте видна каменная кромка и следы старого ветра.',
    resource: '',
    baseGain: {},
    progress: 0,
    requiredProgress: 3
  },
  weakSignal: {
    id: 'weakSignal',
    name: 'Слабый сигнал',
    status: 'discovered',
    description: 'Аварийный приёмник ловит короткий неустойчивый импульс.',
    resource: '',
    baseGain: {},
    progress: 0,
    requiredProgress: 4
  },
  farWasteland: {
    id: 'farWasteland',
    name: 'Дальняя пустошь',
    status: 'hidden',
    description: 'Неизвестная зона за пределами уверенного обзора.',
    resource: '',
    baseGain: {},
    progress: 0,
    requiredProgress: 5
  },
  oldRoad: {
    id: 'oldRoad',
    name: 'Старая дорога',
    status: 'hidden',
    description: 'Возможный маршрут или след старой инфраструктуры.',
    resource: '',
    baseGain: {},
    progress: 0,
    requiredProgress: 5
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
  selectedActions: document.getElementById('selectedActions')
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
      level: 1,
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

  if (territory.status === 'open' || territory.status === 'settled') {
    territory.progress = territory.requiredProgress;
    return;
  }

  if (territory.status === 'hidden' || territory.status === 'discovered') {
    territory.progress = 0;
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
  ensureResearchEvent(key);
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
  const system = state.shipSystems[key];
  const blueprint = shipSystemBlueprints[key];

  if (!system || !blueprint) {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  if (system.status !== 'повреждено') {
    spendStamina();
    if (selection) {
      setNarrativeMessage(selection, 'Герой проверяет запасные контуры и останавливается: улучшение этой системы пока отмечено как будущая заглушка.');
    }
    addLog(blueprint.name + ' уже частично работает. Улучшение будет добавлено позже.');
    return;
  }

  const missing = getMissingResources(blueprint.repairCost);
  if (missing.length > 0) {
    if (selection) {
      setNarrativeMessage(selection, 'Герой прикладывает ладонь к панели, но аварийный список расходников краснеет. Ремонт придётся отложить до сбора ресурсов.');
    }
    addLog('Недостаточно ' + missing[0] + ' для ремонта ' + getGenitiveName(blueprint.name) + '. Нужно: ' + formatCost(blueprint.repairCost) + '.');
    return;
  }

  spendStamina();
  payCost(blueprint.repairCost);
  system.status = 'частично работает';
  if (selection) {
    setNarrativeMessage(selection, 'Герой запускает аварийный протокол ремонта. Панель отвечает не сразу; затем индикатор меняет цвет, и вибрация системы становится ровнее.');
  }
  addLog(blueprint.name + ' переведено в состояние: частично работает.');
}

function diagnoseSystem(key) {
  const system = state.shipSystems[key];
  const blueprint = shipSystemBlueprints[key];

  if (!system || !blueprint) {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  if (selection) {
    setNarrativeMessage(selection, 'Герой запускает короткую диагностику. Экран выдаёт рваный список ошибок, но без новых решений: подробная диагностика пока остаётся заглушкой.');
  }
  addLog(blueprint.name + ': диагностика выполнена. Новых действий пока нет.');
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
  const check = resolveGatherCheck(resource);
  const gain = { [resource]: check.gained };

  if (check.gained > 0) {
    addResources(gain);
  }

  if (selection) {
    setNarrativeMessage(selection, buildGatherResultPanel(check));
  }
  addLog('Действие «' + getGatherActionTitle(key) + '» на клетке ' + territory.name + ' выполнено. Бросок 2d6: ' + check.roll.d6_1 + ' + ' + check.roll.d6_2 + ' = ' + check.roll.total + '. Результат: ' + check.resultLabel + '. Получено: ' + formatGain(gain) + '. Потрачена 1 выносливость.');
}

function startTerritoryResearch(key) {
  const territory = state.territories[key];

  if (!territory || territory.status !== 'discovered') {
    return;
  }

  territory.status = 'researching';
  territory.progress = 0;
  ensureResearchEvent(key);
  const selection = getCurrentSelection();
  if (selection) {
    setNarrativeMessage(selection, 'Герой отмечает границы зоны. Дальше нужно выбрать подход: Сила, Мудрость или Ловкость.');
  }
  addLog('Герой начал исследование: ' + territory.name + '.');
}

function continueTerritoryResearch(key) {
  const territory = state.territories[key];

  if (!territory || territory.status !== 'researching') {
    return;
  }

  state.actionPanelMode = 'actions';
  clearNarrativeMessage();
  ensureResearchEvent(key);
  saveGame();
  render();
}

function performResearchApproach(key, approachKey) {
  const territory = state.territories[key];
  const approach = researchApproaches[approachKey];

  if (!territory || !approach || territory.status !== 'researching') {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  ensureResearchEvent(key);
  const check = resolveResearchCheck(approach);
  const progressGain = getResearchProgressGain(check);
  territory.progress = Math.min(territory.requiredProgress, territory.progress + progressGain);
  const opened = territory.progress >= territory.requiredProgress;

  if (opened) {
    territory.status = 'open';
    territory.progress = territory.requiredProgress;
    state.activeResearchEvent = null;
  }

  const currentSelection = getCurrentSelection();
  state.actionPanelMode = opened ? 'actions' : 'researchResult';
  if (currentSelection) {
    setNarrativeMessage(currentSelection, buildResearchResultPanel(territory, approach, check, progressGain, opened));
  }

  const outcome = check.success ? 'Успех.' : 'Провал.';
  addLog('Проверка: ' + heroStatLabels[approach.stat] + '. Бросок ' + check.roll.total + ' против сложности ' + check.finalDifficulty + '. ' + outcome);
  addLog('Исследование продвинулось: ' + territory.name + ' ' + territory.progress + ' / ' + territory.requiredProgress + '.');

  if (opened) {
    addLog('Клетка открыта: ' + territory.name + '.');
  }
}

function inspectTerritory(key, message) {
  const territory = state.territories[key];

  if (!territory) {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  if (selection) {
    setNarrativeMessage(selection, message);
  }
  saveGame();
  render();
}


function ensureResearchEvent(key) {
  const territory = state.territories[key];
  if (!territory || (territory.status !== 'discovered' && territory.status !== 'researching')) {
    return null;
  }

  if (!state.activeResearchEvent || state.activeResearchEvent.territoryKey !== key) {
    state.activeResearchEvent = {
      territoryKey: key,
      approaches: Object.keys(researchApproaches)
    };
  }

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

function resolveResearchCheck(approach) {
  const heroStat = savedNumber((state.hero && state.hero.stats && state.hero.stats[approach.stat]), 0);
  const modifier = getStatDifficultyModifier(heroStat, approach.requiredStat);
  const finalDifficulty = approach.baseDifficulty + modifier;
  const roll = roll2d6();
  const resultType = getRollResultType(roll.total);
  let success = roll.total >= finalDifficulty;

  if (roll.total === 2) {
    success = false;
  } else if (roll.total === 12) {
    success = true;
  }

  return {
    heroStat,
    modifier,
    finalDifficulty,
    roll,
    resultType,
    success
  };
}

function getStatDifficultyModifier(currentStat, requiredStat) {
  const difference = currentStat - requiredStat;

  if (difference <= -3) return 2;
  if (difference <= -1) return 1;
  if (difference >= 3) return -2;
  return 0;
}

function getRollResultType(total) {
  if (total === 2) return rollResultTypes.criticalFailure;
  if (total <= 5) return rollResultTypes.majorFailure;
  if (total <= 8) return rollResultTypes.mixed;
  if (total <= 11) return rollResultTypes.excellent;
  return rollResultTypes.criticalSuccess;
}

function getResearchProgressGain(check) {
  if (check.resultType === rollResultTypes.criticalFailure || check.resultType === rollResultTypes.majorFailure) {
    return 0;
  }

  if (check.resultType === rollResultTypes.mixed) {
    return check.success ? 1 : 0;
  }

  if (check.resultType === rollResultTypes.excellent) {
    return check.success ? 2 : 1;
  }

  return 3;
}

function resolveGatherCheck(resource) {
  const roll = roll2d6();
  const result = getGatherCheckResult(roll.total);

  return {
    resource,
    roll,
    resultLabel: result.label,
    gained: result.gained
  };
}

function getGatherCheckResult(total) {
  if (total === 2) return { label: 'Критический провал', gained: 0 };
  if (total <= 5) return { label: 'Провал', gained: 0 };
  if (total <= 8) return { label: 'Частичный успех', gained: 1 };
  if (total <= 11) return { label: 'Успех', gained: 2 };
  return { label: 'Критический успех', gained: 3 };
}

function buildGatherResultPanel(check) {
  return 'Бросок 2d6: ' + check.roll.total + '. ' + check.resultLabel + '. Получено: ' + formatGain({ [check.resource]: check.gained }) + '.';
}

function buildResearchResultPanel(territory, approach, check, progressGain, opened) {
  if (opened) {
    return 'Клетка открыта: ' + territory.name + '.\n\n' +
      'Зона перестаёт быть набором помех: контуры сходятся, опасные пустоты отмечены, а маршрут по участку теперь можно читать без догадок.';
  }

  const statLabel = heroStatLabels[approach.stat];
  const mechanical = [
    'Проверка: ' + statLabel,
    '',
    'Кубики: ' + check.roll.d6_1 + ' + ' + check.roll.d6_2 + ' = ' + check.roll.total,
    'Базовая сложность: ' + approach.baseDifficulty,
    'Требование: ' + statLabel + ' ' + approach.requiredStat,
    statLabel + ' Героя: ' + check.heroStat,
    'Модификатор: ' + formatSignedModifier(check.modifier),
    'Итоговая сложность: ' + check.finalDifficulty,
    '',
    'Результат: ' + check.roll.total + ' против ' + check.finalDifficulty,
    check.success ? 'Проверка успешна.' : 'Проверка провалена.',
    '',
    'Тип результата: ' + check.resultType + '.',
    '',
    'Прогресс исследования: +' + progressGain,
    '',
    check.success ? approach.successText : approach.failureText
  ];

  return mechanical.join('\n');
}

function formatSignedModifier(value) {
  return value > 0 ? '+' + value : String(value);
}

function getTerritoryOutputText(key) {
  const territory = state.territories[key] || territoryBlueprints[key];

  if (!territory || !territory.resource) {
    return 'ресурс скрыт';
  }

  return 'проверка 2d6 за ' + resourceLabels[territory.resource];
}

function getTerritoryResourceText(territory) {
  if (!territory.resource) {
    return 'ресурс скрыт';
  }

  return resourceLabels[territory.resource] || territory.resource;
}

function canGatherTerritory(territory) {
  return (territory.status === 'open' || territory.status === 'settled') && Boolean(territoryGatherActions[territory.resource]);
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
  elements.health.textContent = state.heroCondition.health + ' / ' + state.heroCondition.maxHealth;
  elements.stamina.textContent = state.heroCondition.stamina + ' / ' + state.heroCondition.maxStamina;
  elements.credits.textContent = state.heroCondition.credits;
  elements.energy.textContent = state.resources.energy + ' / 10';
  elements.water.textContent = state.resources.water + ' / 20';
  elements.components.textContent = state.resources.components + ' / 20';
  elements.metal.textContent = state.resources.metal + ' / 20';
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
      '<small>Ур. ' + system.level + ' · ' + system.status + '</small>' +
      '<p>' + blueprint.description + '</p>' +
      '<em>Ремонт: ' + formatCost(blueprint.repairCost) + '</em>' +
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
    if (territory.status === 'open' || territory.status === 'settled') {
      detailsHtml += '<p>' + territory.description + '</p>' +
        '<em>Ресурс: ' + getTerritoryResourceText(territory) + '</em>' +
        '<em>Выход: ' + getTerritoryOutputText(key) + '</em>';
      if (territory.status === 'settled') {
        detailsHtml += '<span class="territory-badge">освоена</span>';
      }
    } else if (territory.status === 'discovered') {
      detailsHtml += '<p>' + territory.description + '</p>' +
        '<em>Ресурс скрыт</em>' +
        '<em>Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '</em>';
    } else if (territory.status === 'researching') {
      detailsHtml += '<p>' + territory.description + '</p>' +
        '<em>Ресурс скрыт</em>' +
        '<em>Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '</em>';
    } else {
      detailsHtml += '<p>Неизвестная область за пределами уверенного обзора.</p>' +
        '<em>Ресурс скрыт</em>' +
        '<em>Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '</em>';
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

    elements.selectedActions.innerHTML = '';
    renderObjectActionOptions(currentSelection);
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
      description: getShipNarrative(key, false),
      inspectDescription: getShipNarrative(key, true) + ' Текущее состояние: ' + system.status + '. Стоимость ремонта: ' + formatCost(blueprint.repairCost) + '.'
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
      name: territory.name,
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


function getShipNarrative(key, inspected) {
  const narratives = {
    hull: inspected
      ? 'Герой проводит фонарём вдоль обшивки. Вмятины уходят в темноту, а на стыках ещё виден песок, забившийся после посадки.'
      : 'Обшивка держит остаточное давление и защищает командный узел от песчаных ударов, но каждый внешний лист напоминает о жёсткой посадке.',
    reactor: inspected
      ? 'Герой проводит ладонью по панели реакторного отсека. Металл вибрирует неровно: питание есть, но контур явно работает на пределе.'
      : 'Реакторный отсек отдаёт нестабильное питание в аварийную сеть корабля. Свет здесь дрожит чаще, чем должен.',
    lifeSupport: inspected
      ? 'Герой прислушивается к кашлю фильтров и сухому шороху аварийных пайков. Контур жив, но повреждённая магистраль тянет ресурс слишком жадно.'
      : 'Система жизнеобеспечения. Воздушные фильтры, теплообменники и аварийные пайки подключены к повреждённой магистрали. Без этого контура Герой не продержался бы в открытом космосе и нескольких часов.',
    waterLoop: inspected
      ? 'На полу под водным контуром темнеют кристаллические следы утечки. Герой отмечает клапаны, которые придётся закрывать вручную.'
      : 'Водный контур пытается гонять очистку по замкнутому циклу, но разгерметизация превращает каждую каплю в стратегический риск.',
    droneWorkshop: inspected
      ? 'Манипуляторы ремонтного цеха застыли над пустыми креплениями. Герой видит, где можно вернуть аварийному обслуживанию нормальную работу.'
      : 'Ремонтный цех хранит заблокированные станки, манипуляторы и крепления для будущего восстановления.',
    navigation: inspected
      ? 'Герой сверяет звёздные таблицы с дрожащими показаниями гироскопов. Карты целы, но корабль пока не доверяет собственному курсу.'
      : 'Навигационный модуль помнит маршруты между звёздами, хотя посадочный автопилот и гироскопы всё ещё молчат.',
    scanner: inspected
      ? 'Сенсорная решётка ловит песчаные выбросы и обрывает дальние сигналы. Несколько плат явно просят замены.'
      : 'Сканерный модуль видит ближайшую пыль, обломки и помехи, но дальняя картина Аурелии-18 остаётся рваной.',
    server: inspected
      ? 'В серверном узле щёлкают холодные реле. Архив схем доступен кусками, будто корабль вспоминает себя через боль.'
      : 'Серверный узел хранит ремонтные схемы и фрагменты бортового архива, но часть кластеров отключена от питания.'
  };

  return narratives[key] || shipSystemBlueprints[key].description;
}

function getTerritoryPanelDescription(territory) {
  if (territory.status === 'hidden') {
    return 'За границей обзора остаётся тёмный участок карты. Приборы дают только слабую форму рельефа без ресурса.';
  }

  if (territory.status === 'discovered') {
    return territory.description + ' Точные свойства ещё не подтверждены.';
  }

  if (territory.status === 'researching') {
    return territory.description + ' Исследование уже начато: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  if (territory.status === 'settled') {
    return territory.description + ' Участок уже отмечен как освоенный задел.';
  }

  return territory.description;
}

function getTerritoryInspectDescription(territory) {
  if (territory.status === 'open' || territory.status === 'settled') {
    return territory.description + ' Основной ресурс: ' + getTerritoryResourceText(territory) + '. Базовая добыча: ' + formatGain(territory.baseGain) + '.';
  }

  if (territory.status === 'discovered') {
    return territory.description + ' Сигнал или контур достаточно устойчив, чтобы начать исследование.';
  }

  if (territory.status === 'researching') {
    return territory.description + ' Прогресс исследования: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  return 'Песок, дальний рельеф и помехи скрывают детали. Зона пока не даёт точных данных.';
}

function renderObjectActionOptions(selection) {
  addActionLead('Твои действия:');

  if (state.actionPanelMode === 'exhausted' && state.narrativeObjectId === selection.id) {
    appendBackOption();
    return;
  }

  if (state.actionPanelMode === 'researchResult' && state.narrativeObjectId === selection.id && selection.kind === 'territory') {
    const territory = state.territories[selection.key];
    if (territory && territory.status === 'researching') {
      appendActionOption('🔍', formatActionTitle('Продолжить исследование', {}), 'Вернуться к выбору подхода', 'continueResearchKey', selection.key, false);
      appendBackOption();
      return;
    }
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
    const system = state.shipSystems[selection.key];
    const repairTitle = system.status === 'повреждено' ? 'Починить систему' : 'Улучшить систему';
    const repairCost = system.status === 'повреждено' ? shipSystemBlueprints[selection.key].repairCost : {};
    const repairNote = system.status === 'повреждено'
      ? ''
      : 'Улучшения будут добавлены позже';
    appendActionOption('🔧', formatActionTitle(repairTitle, repairCost), repairNote, 'repairKey', selection.key, false);
    appendActionOption('📟', formatActionTitle('Провести диагностику', {}), '', 'diagnosticKey', selection.key, false);
    appendBackOption();
    return;
  }

  if (selection.kind === 'territory') {
    const territory = state.territories[selection.key];
    if (territory.status === 'open') {
      appendActionOption('⛏️', formatActionTitle(getGatherActionTitle(selection.key), {}), 'Результат: ' + getTerritoryOutputText(selection.key), 'gatherKey', selection.key, false);
      appendActionOption('🔎', formatActionTitle('Осмотреть внимательнее', {}), '', 'inspectTerritoryKey', selection.key, false);
    } else if (territory.status === 'discovered') {
      appendActionOption('🔍', 'Начать исследование', 'Выбор подхода откроется без броска', 'startResearchKey', selection.key, false);
      appendActionOption('🔎', formatActionTitle('Осмотреть сигнал', {}), '', 'inspectTerritoryKey', selection.key, false);
    } else if (territory.status === 'hidden') {
      appendActionOption('👣', formatActionTitle('Осторожно приблизиться', {}), '', 'inspectTerritoryKey', selection.key, false);
      appendActionOption('🔎', formatActionTitle('Осмотреть горизонт', {}), '', 'inspectTerritoryKey', selection.key, false);
    } else if (territory.status === 'researching') {
      appendResearchApproachOptions(selection.key, territory);
    } else if (territory.status === 'settled') {
      appendActionOption('⛏️', formatActionTitle(getGatherActionTitle(selection.key), {}), 'Результат: ' + getTerritoryOutputText(selection.key), 'gatherKey', selection.key, false);
      appendActionOption('🔎', formatActionTitle('Осмотреть участок', {}), '', 'inspectTerritoryKey', selection.key, false);
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
    const statLabel = heroStatLabels[approach.stat];
    appendActionOption('🎲', formatActionTitle(approach.title, {}), statLabel + ' ' + approach.requiredStat + ' · сложность ' + approach.baseDifficulty + ' · прогресс: ' + territory.progress + ' / ' + territory.requiredProgress, 'researchApproachKey', key + ':' + approachKey, false);
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

  return formatCost(cost);
}


function getGatherActionTitle(key) {
  const territory = state.territories[key] || territoryBlueprints[key];

  if (!territory) {
    return 'Собрать ресурс';
  }

  return territoryGatherActions[territory.resource] || 'Собрать ресурс';
}

function formatActionTitle(title, cost) {
  const parts = ['-' + staminaActionCost + ' выносливость'];
  const keys = cost ? Object.keys(cost) : [];

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    parts.push('-' + cost[resource] + ' ' + resourceLabels[resource]);
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

function addActionLead(text) {
  const lead = document.createElement('p');
  lead.className = 'action-lead';
  lead.textContent = text;
  elements.selectedActions.appendChild(lead);
}

function appendBackOption() {
  appendActionOption('↩️', 'Отступить', '', 'backSelected', 'true', false);
}

function getRetreatNote() {
  if (state.mode === 'ship') return 'Вернуться к системам корабля';
  if (state.mode === 'territories') return 'Вернуться к пустошам';
  if (state.mode === 'city') return 'Вернуться к районам города';
  return 'Вернуться к обзору героя';
}

function appendActionOption(icon, title, note, datasetKey, key, disabled) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'action-choice';
  button.dataset[datasetKey] = key;
  button.disabled = disabled;
  button.innerHTML = '<span class="action-title">' + icon + ' ' + title + '</span>' + (note ? '<span class="action-note">' + note + '</span>' : '');
  elements.selectedActions.appendChild(button);
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
    item.textContent = state.logMessages[i];
    elements.log.appendChild(item);
  }
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
  let restored = 0;

  for (let i = 0; i < keys.length; i++) {
    if (state.shipSystems[keys[i]].status !== 'повреждено') {
      restored += 1;
    }
  }

  return restored;
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

function slugStatus(status) {
  if (status === 'частично работает') {
    return 'partial';
  }

  if (status === 'восстановлено') {
    return 'restored';
  }

  return 'damaged';
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
      territoryKey: saved.activeResearchEvent.territoryKey,
      approaches: Object.keys(researchApproaches)
    };
  }
  next.hero = mergeSavedHero(saved.hero);


  const savedSystems = saved.shipSystems || {};
  const systemKeys = Object.keys(next.shipSystems);
  for (let i = 0; i < systemKeys.length; i++) {
    const key = systemKeys[i];
    if (savedSystems[key]) {
      next.shipSystems[key].level = Math.max(1, savedNumber(savedSystems[key].level, 1));
      next.shipSystems[key].status = ['повреждено', 'частично работает', 'восстановлено'].includes(savedSystems[key].status)
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
      } else if (typeof savedTerritory.isOpen === 'boolean') {
        nextTerritory.status = savedTerritory.isOpen ? 'open' : nextTerritory.status;
      }
      nextTerritory.requiredProgress = savedNumber(savedTerritory.requiredProgress, nextTerritory.requiredProgress);
      nextTerritory.progress = savedNumber(savedTerritory.progress, nextTerritory.progress);
      normalizeTerritoryProgress(nextTerritory);
    }
  }

  next.logMessages = Array.isArray(saved.logMessages) && saved.logMessages.length > 0
    ? saved.logMessages.slice(0, maxLogMessages).map(migrateLogMessage)
    : ['Сохранение загружено. Продолжайте развитие базы.'];

  return next;
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
  } else if (target.dataset.startResearchKey) {
    startTerritoryResearch(target.dataset.startResearchKey);
  } else if (target.dataset.continueResearchKey) {
    continueTerritoryResearch(target.dataset.continueResearchKey);
  } else if (target.dataset.researchApproachKey) {
    const parts = target.dataset.researchApproachKey.split(':');
    performResearchApproach(parts[0], parts[1]);
  } else if (target.dataset.inspectTerritoryKey) {
    const territory = state.territories[target.dataset.inspectTerritoryKey];
    inspectTerritory(target.dataset.inspectTerritoryKey, getTerritoryInspectDescription(territory));
  }
});

document.getElementById('newGame').addEventListener('click', restartGame);

loadGame();
