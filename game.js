// Аурелия-18: единая оболочка сцен «Герой», «Корабль», «Пустоши», «Город» и «Разведка».
const saveKey = 'aurelia-18-save-v9';
const legacySaveKeys = ['aurelia-18-save-v8', 'aurelia-18-save-v7', 'aurelia-18-save-v6', 'aurelia-18-save-v5', 'aurelia-18-save-v4', 'aurelia-18-save-v3', 'aurelia-18-save-v2'];
const maxLogMessages = 10;
const maxTurns = 20;


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
  recon: 'разведданные'
};

const resourceGenitiveLabels = {
  energy: 'энергии',
  water: 'воды',
  components: 'компонентов',
  metal: 'металла',
  recon: 'разведданных'
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
    name: 'Сборочный цех дронов',
    description: 'Манипуляторы и станки для обслуживания дронов заблокированы после посадки.',
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

const territoryBlueprints = {
  debrisField: {
    name: 'Поле обломков',
    biome: 'Россыпь обшивки, грузовых ферм и остывших посадочных опор.',
    resourceText: 'металл',
    baseOutput: { metal: 6 }
  },
  dustyCollector: {
    name: 'Пыльный водосборник',
    biome: 'Складки рельефа собирают ночной конденсат под слоем красной пыли.',
    resourceText: 'вода',
    baseOutput: { water: 4 }
  },
  solarRidge: {
    name: 'Солнечная гряда',
    biome: 'Открытая каменная кромка с сильным ветром и стабильным световым потоком.',
    resourceText: 'энергия',
    baseOutput: { energy: 5 }
  },
  oldStorage: {
    name: 'Старый склад проекта',
    openCost: 4,
    biome: 'Полузасыпанный контейнерный ряд с совместимыми деталями старой экспедиции.',
    resourceText: 'компоненты',
    baseOutput: { components: 2 }
  },
  commNode: {
    name: 'Узел связи',
    openCost: 5,
    biome: 'Поваленная мачта связи периодически отдаёт фрагменты технической телеметрии.',
    resourceText: 'разведданные',
    baseOutput: { recon: 3 }
  },
  rustyFarm: {
    name: 'Ржавая ферма',
    openCost: 6,
    biome: 'Старые гидропонные ванны сохранили влагу и немного обслуживающих деталей.',
    resourceText: 'вода и компоненты',
    baseOutput: { water: 3, components: 1 }
  },
  brokenDrill: {
    name: 'Разбитая буровая',
    openCost: 7,
    biome: 'Сорванная буровая платформа оставила металл и пригодные к перепайке узлы.',
    resourceText: 'металл и компоненты',
    baseOutput: { metal: 4, components: 1 }
  },
  blackDune: {
    name: 'Чёрная дюна',
    openCost: 9,
    biome: 'Магнитный песок скрывает случайные включения: металл, компоненты или разведданные.',
    resourceText: 'случайно: металл, компоненты или разведданные',
    baseOutput: { random: 4 },
    randomResources: ['metal', 'components', 'recon']
  }
};

const cityDistricts = {
  caravanGate: {
    name: 'Караванные ворота',
    description: 'Въезд в город, стоянка караванов, проверка грузов, первые слухи.'
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
    description: 'Дешёвый полутёмный зал района: вода уходит быстро, зато слухи проходят через каждую стойку.',
    action: 'Расспросить посетителей',
    cost: { water: 1 },
    result: { recon: 1 },
    successLog: 'Бар: получен слух. Разведданные +1.',
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
    description: 'Доска мелких ремонтов района: подтянуть кабель, закрыть клапан, перепаять силовую коробку.',
    action: 'Взяться за мелкий ремонт',
    cost: { energy: 1 },
    result: { components: 1 },
    successLog: 'Подработка: мелкий ремонт выполнен. Компоненты +1.',
    failureLog: 'Недостаточно энергии для мелкого ремонта.'
  },
  {
    key: 'caravanStop',
    name: 'Караванная остановка',
    description: 'Площадка района, где караванщики ждут пропусков и меняют новости на воду.',
    action: 'Расспросить караванщиков',
    cost: { water: 1 },
    result: { recon: 2 },
    successLog: 'Караванная остановка: караванщики поделились маршрутом. Разведданные +2.',
    failureLog: 'Недостаточно воды, чтобы разговорить караванщиков.'
  },
  {
    key: 'electrochemistry',
    name: 'Электрохимия',
    description: 'Грязная ванна переработки района: кислотный пар, старый лом и мастера с закрытыми лицами.',
    action: 'Переработать лом',
    cost: { metal: 4, energy: 1 },
    result: { components: 2 },
    successLog: 'Электрохимия: лом переработан. Компоненты +2.',
    failureLog: 'Недостаточно ресурсов для электрохимии. Нужно: металл 4, энергия 1.'
  }
];

const cityUniquePoints = {
  patrol: {
    name: 'Патруль',
    description: 'Городская охрана, проверки документов, контроль воды и грузов.',
    action: 'Пройти проверку',
    cost: {},
    resultText: 'Журнал: патруль пропустит вас дальше.',
    successLog: 'Патруль проверил вас и пропустил дальше.'
  },
  hippodrome: {
    name: 'Ипподром',
    description: 'Пыльная арена для гонок, ставок и споров между караванщиками.',
    action: 'Осмотреть заезд',
    cost: {},
    result: { recon: 1 },
    successLog: 'Вы послушали разговоры на ипподроме. Получено: разведданные +1.'
  },
  prison: {
    name: 'Тюрьма',
    description: 'Изолятор для должников, нарушителей режима и неудобных людей.',
    action: 'Осмотреть периметр',
    cost: {},
    resultText: 'Журнал: сюжетные события будут добавлены позже.',
    successLog: 'Тюрьма отмечена на карте. Сюжетные события будут добавлены позже.'
  },
  hospital: {
    name: 'Больница',
    description: 'Перегруженный медблок города, где лечат за воду, услуги и связи.',
    action: 'Запросить помощь',
    cost: { water: 2 },
    resultText: 'Журнал: базовая помощь, полноценная система Героя появится позже.',
    successLog: 'Медики оказали базовую помощь. Полноценная система Героя будет добавлена следующим шагом.',
    failureLog: 'Недостаточно воды, чтобы запросить помощь в больнице.'
  }
};

let state = createInitialState();

const elements = {
  turn: document.getElementById('turn'),
  energy: document.getElementById('energy'),
  water: document.getElementById('water'),
  components: document.getElementById('components'),
  metal: document.getElementById('metal'),
  recon: document.getElementById('recon'),
  totalDrones: document.getElementById('totalDrones'),
  totalFreeDrones: document.getElementById('totalFreeDrones'),
  totalAssignedDrones: document.getElementById('totalAssignedDrones'),
  headerFreeDrones: document.getElementById('headerFreeDrones'),
  restoredSystems: document.getElementById('restoredSystems'),
  droneStatus: document.getElementById('droneStatus'),
  log: document.getElementById('log'),
  screenEyebrow: document.getElementById('screenEyebrow'),
  screenTitle: document.getElementById('screenTitle'),
  screenSubtitle: document.getElementById('screenSubtitle'),
  heroScreen: document.getElementById('heroScreen'),
  shipScreen: document.getElementById('shipScreen'),
  territoriesScreen: document.getElementById('territoriesScreen'),
  cityScreen: document.getElementById('cityScreen'),
  reconScreen: document.getElementById('reconScreen'),
  reconScreenAmount: document.getElementById('reconScreenAmount'),
  reconOpenedCount: document.getElementById('reconOpenedCount'),
  reconClosedCount: document.getElementById('reconClosedCount'),
  reconClosedList: document.getElementById('reconClosedList'),
  shipSystemsGrid: document.getElementById('shipSystemsGrid'),
  territoriesGrid: document.getElementById('territoriesGrid'),
  cityGrid: document.getElementById('cityGrid'),
  uniqueCityGrid: document.getElementById('uniqueCityGrid'),
  selectedEyebrow: document.getElementById('selectedEyebrow'),
  selectedStatus: document.getElementById('selectedStatus'),
  selectedName: document.getElementById('selectedName'),
  selectedBadge: document.getElementById('selectedBadge'),
  selectedDescription: document.getElementById('selectedDescription'),
  selectedDetails: document.getElementById('selectedDetails'),
  selectedActions: document.getElementById('selectedActions'),
  inspectSelected: document.getElementById('inspectSelected'),
  showObjectActions: document.getElementById('showObjectActions')
};

function createInitialState() {
  return {
    resources: { ...initialResources },
    turn: 1,
    mode: 'hero',
    selectedSystemKey: '',
    selectedTerritoryKey: '',
    selectedCityKey: '',
    selectedCityType: '',
    actionPanelMode: 'selected',
    inspectedObjectId: '',
    hero: createHero(),
    drones: {
      total: 3,
      free: 3,
      assigned: 0
    },
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
      level: 1,
      isOpen: !territoryBlueprints[key].openCost,
      assignedDrones: 0,
      droneLimit: 3
    };
  }

  return territories;
}

function switchMode(mode) {
  if (!['hero', 'ship', 'territories', 'city', 'recon'].includes(mode)) {
    return;
  }

  state.mode = mode;
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
  saveGame();
  render();
}

function selectSystem(key) {
  if (!state.shipSystems[key]) {
    return;
  }

  state.mode = 'ship';
  state.selectedSystemKey = key;
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
  render();
  saveGame();
}

function selectTerritory(key) {
  if (!state.territories[key]) {
    return;
  }

  state.mode = 'territories';
  state.selectedTerritoryKey = key;
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
  render();
  saveGame();
}


function selectReconTerritory(key) {
  if (!state.territories[key]) {
    return;
  }

  state.mode = 'recon';
  state.selectedTerritoryKey = key;
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
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
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
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
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
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
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = '';
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
  const missing = getMissingResources(cost);

  if (missing.length > 0) {
    addLog(entry.failureLog || 'Недостаточно ресурсов для действия. Нужно: ' + formatCost(cost) + '.');
    return;
  }

  payCost(cost);
  if (entry.result) {
    addResources(entry.result);
  }
  addLog(entry.successLog);
}

function addResources(gain) {
  const keys = Object.keys(gain);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    state.resources[resource] += gain[resource];
  }
}

function repairSystem(key) {
  const system = state.shipSystems[key];
  const blueprint = shipSystemBlueprints[key];

  if (!system || !blueprint) {
    return;
  }

  if (system.status !== 'повреждено') {
    addLog(blueprint.name + ' уже частично работает. Улучшение будет добавлено позже.');
    return;
  }

  const missing = getMissingResources(blueprint.repairCost);
  if (missing.length > 0) {
    addLog('Недостаточно ' + missing[0] + ' для ремонта ' + getGenitiveName(blueprint.name) + '. Нужно: ' + formatCost(blueprint.repairCost) + '.');
    return;
  }

  payCost(blueprint.repairCost);
  system.status = 'частично работает';
  addLog(blueprint.name + ' переведено в состояние: частично работает.');
}

function assignDrone(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint) {
    return;
  }

  if (!territory.isOpen) {
    addLog('Нельзя назначить дрона для добычи: ' + blueprint.name + ' ещё не открыта.');
    return;
  }

  if (state.drones.free <= 0) {
    addLog('Свободных дронов нет: нельзя назначить дрона на ' + blueprint.name + '.');
    return;
  }

  if (territory.assignedDrones >= territory.droneLimit) {
    addLog(blueprint.name + ': достигнут лимит 3 дрона.');
    return;
  }

  territory.assignedDrones += 1;
  state.drones.free -= 1;
  state.drones.assigned += 1;
  addLog('Назначен дрон на ' + blueprint.name + '.');
}

function removeDrone(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint) {
    return;
  }

  if (territory.assignedDrones <= 0) {
    addLog(blueprint.name + ': назначенных дронов нет.');
    return;
  }

  territory.assignedDrones -= 1;
  state.drones.free += 1;
  state.drones.assigned -= 1;
  addLog('Дрон снят с пустоши ' + blueprint.name + '.');
}

function gatherTerritory(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint) {
    return;
  }

  if (!territory.isOpen) {
    addLog(blueprint.name + ': закрытая зона недоступна для добычи.');
    return;
  }

  if (territory.assignedDrones <= 0) {
    addLog(blueprint.name + ': добыча невозможна без назначенных дронов.');
    return;
  }

  const gain = getTerritoryGain(key);
  const gainKeys = Object.keys(gain);

  for (let i = 0; i < gainKeys.length; i++) {
    const resource = gainKeys[i];
    state.resources[resource] += gain[resource];
  }

  addLog('Получено: ' + formatGain(gain) + '.');
}

function scoutTerritoryWithDrone(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint || territory.isOpen) {
    return;
  }

  if (state.drones.free <= 0) {
    addLog('Нет свободных дронов для разведки.');
    return;
  }

  if (state.resources.energy < 1) {
    addLog('Недостаточно энергии для разведки дроном.');
    return;
  }

  state.resources.energy -= 1;
  state.resources.recon += 1;
  addLog('Дрон исследовал зону: ' + blueprint.name + '. Получено: разведданные +1.');
}

function scoutTerritoryPersonally(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint || territory.isOpen) {
    return;
  }

  if (state.resources.water < 2 && state.resources.energy < 1) {
    addLog('Недостаточно воды и энергии для личной разведки. Нужно: вода 2, энергия 1.');
    return;
  }

  if (state.resources.water < 2) {
    addLog('Недостаточно воды для личной разведки. Нужно: вода 2.');
    return;
  }

  if (state.resources.energy < 1) {
    addLog('Недостаточно энергии для личной разведки. Нужно: энергия 1.');
    return;
  }

  state.resources.water -= 2;
  state.resources.energy -= 1;
  state.resources.recon += 2;
  addLog('Герой лично исследовал зону: ' + blueprint.name + '. Получено: разведданные +2.');
}

function openTerritory(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint || territory.isOpen) {
    return;
  }

  if (state.resources.recon < blueprint.openCost) {
    addLog('Недостаточно разведданных для открытия: ' + blueprint.name + '.');
    return;
  }

  state.resources.recon -= blueprint.openCost;
  territory.isOpen = true;
  addLog('Открыта новая пустошь: ' + blueprint.name + '.');
}

function getTerritoryGain(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];
  const multiplier = territory.assignedDrones;

  if (blueprint.randomResources) {
    const randomIndex = Math.floor(Math.random() * blueprint.randomResources.length);
    const resource = blueprint.randomResources[randomIndex];
    return { [resource]: blueprint.baseOutput.random * multiplier };
  }

  const gain = {};
  const keys = Object.keys(blueprint.baseOutput);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    gain[resource] = blueprint.baseOutput[resource] * multiplier;
  }

  return gain;
}

function getTerritoryOutputText(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];
  const drones = Math.max(1, territory.assignedDrones);

  if (blueprint.randomResources) {
    return '+' + (blueprint.baseOutput.random * drones) + ' случайного ресурса за действие';
  }

  const gain = {};
  const keys = Object.keys(blueprint.baseOutput);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    gain[resource] = blueprint.baseOutput[resource] * drones;
  }

  return formatGain(gain) + ' за действие';
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

function addLog(message) {
  state.logMessages.unshift(message);
  state.logMessages = state.logMessages.slice(0, maxLogMessages);
  saveGame();
  render();
}

function render() {
  renderResources();
  renderNavigation();
  renderDrones();
  renderScreens();
  renderHeroScreen();
  renderShipSystems();
  renderTerritories();
  renderCity();
  renderReconScreen();
  renderSelectionPanel();
  renderLog();
}

function renderResources() {
  elements.turn.textContent = state.turn;
  elements.energy.textContent = state.resources.energy;
  elements.water.textContent = state.resources.water;
  elements.components.textContent = state.resources.components;
  elements.metal.textContent = state.resources.metal;
  elements.recon.textContent = state.resources.recon;
  if (elements.reconScreenAmount) {
    elements.reconScreenAmount.textContent = state.resources.recon;
  }
  if (elements.reconOpenedCount) {
    elements.reconOpenedCount.textContent = countOpenTerritories();
  }
  if (elements.reconClosedCount) {
    elements.reconClosedCount.textContent = countClosedTerritories();
  }
  elements.headerFreeDrones.textContent = state.drones.free;
  elements.restoredSystems.textContent = countRestoredSystems();
}

function renderNavigation() {
  const buttons = document.querySelectorAll('[data-mode]');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('active', buttons[i].dataset.mode === state.mode);
  }
}

function renderDrones() {
  elements.totalDrones.textContent = state.drones.total;
  elements.totalFreeDrones.textContent = state.drones.free;
  elements.totalAssignedDrones.textContent = state.drones.assigned;
  elements.droneStatus.innerHTML = '';

  const assignedTerritories = Object.keys(state.territories).filter(function (key) {
    return state.territories[key].assignedDrones > 0;
  });

  if (assignedTerritories.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Все дроны ждут приказа.';
    elements.droneStatus.appendChild(empty);
    return;
  }

  for (let i = 0; i < assignedTerritories.length; i++) {
    const key = assignedTerritories[i];
    const card = document.createElement('div');
    card.className = 'drone-card';
    card.innerHTML = '<h3>' + territoryBlueprints[key].name + '</h3><p>Дронов: ' + state.territories[key].assignedDrones + ' / 3</p>';
    elements.droneStatus.appendChild(card);
  }
}

function renderScreens() {
  const isHero = state.mode === 'hero';
  const isShip = state.mode === 'ship';
  const isTerritories = state.mode === 'territories';
  const isCity = state.mode === 'city';
  const isRecon = state.mode === 'recon';

  elements.heroScreen.classList.toggle('hidden', !isHero);
  elements.shipScreen.classList.toggle('hidden', !isShip);
  elements.territoriesScreen.classList.toggle('hidden', !isTerritories);
  elements.cityScreen.classList.toggle('hidden', !isCity);
  elements.reconScreen.classList.toggle('hidden', !isRecon);

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
  } else {
    elements.screenTitle.textContent = 'Разведка';
    elements.screenSubtitle.textContent = 'Сводка по разведданным и неизвестным пустошам.';
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
    const blueprint = territoryBlueprints[key];
    const territory = state.territories[key];
    const isOpen = territory.isOpen;
    const card = document.createElement('article');
    card.className = 'game-card territory-card territory-' + i;
    card.classList.toggle('territory-closed', !isOpen);
    card.classList.toggle('selected', state.mode === 'territories' && state.selectedTerritoryKey === key);

    let detailsHtml = '';
    if (isOpen) {
      detailsHtml = '<small>Статус: открыта · дроны ' + territory.assignedDrones + ' / ' + territory.droneLimit + '</small>' +
        '<p>' + blueprint.biome + '</p>' +
        '<em>Ресурс: ' + blueprint.resourceText + '</em>' +
        '<em>Выход: ' + getTerritoryOutputText(key) + '</em>';
    } else {
      detailsHtml = '<small>Статус: неизвестная зона</small>' +
        '<p>Контуры зоны видны на сканере, но точный ресурс и опасные участки ещё не подтверждены.</p>' +
        '<em>Потенциальный ресурс неизвестен</em>' +
        '<em>Открытие: разведданные ' + blueprint.openCost + '</em>';
    }

    card.innerHTML = '<button class="card-select" type="button" data-territory-key="' + key + '">' +
      '<span class="card-kicker">пустошь</span>' +
      '<strong>' + blueprint.name + '</strong>' +
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

function renderReconScreen() {
  if (!elements.reconClosedList) {
    return;
  }

  elements.reconClosedList.innerHTML = '';
  const closedKeys = Object.keys(territoryBlueprints).filter(function (key) {
    return !state.territories[key].isOpen;
  });

  if (closedKeys.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'recon-empty';
    empty.textContent = 'Все известные пустоши открыты. Новые цели появятся в будущих обновлениях.';
    elements.reconClosedList.appendChild(empty);
    return;
  }

  for (let i = 0; i < closedKeys.length; i++) {
    const key = closedKeys[i];
    const blueprint = territoryBlueprints[key];
    const card = document.createElement('article');
    card.className = 'recon-target-card';
    card.classList.toggle('selected', state.mode === 'recon' && state.selectedTerritoryKey === key);
    card.innerHTML = '<button class="card-select" type="button" data-recon-territory-key="' + key + '">' +
      '<span class="card-kicker">объект разведки</span>' +
      '<strong>' + blueprint.name + '</strong>' +
      '<small>Стоимость открытия: разведданные ' + blueprint.openCost + '</small>' +
      '<p>Неизвестная пустошь доступна для разведки Героя или дрона.</p>' +
      '</button>';
    elements.reconClosedList.appendChild(card);
  }
}

function renderSelectionPanel() {
  elements.selectedDetails.innerHTML = '';
  elements.selectedActions.innerHTML = '';
  elements.inspectSelected.disabled = false;
  elements.showObjectActions.disabled = false;

  const selection = getCurrentSelection();
  if (!selection) {
    renderEmptyHeroActions();
    return;
  }

  elements.selectedEyebrow.textContent = state.actionPanelMode === 'actions' ? 'варианты действия' : 'выбранный объект';
  elements.selectedStatus.textContent = selection.type;
  elements.selectedName.textContent = selection.name;
  elements.selectedBadge.textContent = 'Тип: ' + selection.type;
  elements.selectedDescription.textContent = state.inspectedObjectId === selection.id ? selection.inspectDescription : selection.description;

  for (let i = 0; i < selection.details.length; i++) {
    addDetail(selection.details[i][0], selection.details[i][1]);
  }

  if (state.actionPanelMode === 'actions') {
    renderObjectActionOptions(selection);
  } else {
    addDetail('Подсказка', 'Нажмите «Осмотреть» для описания или «Действовать» для выбора действия Героя.');
  }
}

function renderEmptyHeroActions() {
  elements.selectedEyebrow.textContent = 'нет выбора';
  elements.selectedStatus.textContent = 'ожидание';
  elements.selectedName.textContent = 'Объект не выбран';
  elements.selectedBadge.textContent = 'Выберите объект на сцене';
  elements.selectedDescription.textContent = state.mode === 'recon'
    ? 'Выберите неизвестную пустошь, чтобы отправить Героя или дрона на разведку.'
    : 'Выберите объект на сцене, чтобы Герой мог его осмотреть или использовать.';
  elements.inspectSelected.disabled = true;
  elements.showObjectActions.disabled = true;
}

function getCurrentSelection() {
  if (state.mode === 'hero') {
    const hero = state.hero || createHero();
    return {
      id: 'hero:main',
      kind: 'hero',
      name: hero.name,
      type: hero.type,
      description: hero.description,
      inspectDescription: 'Состояние стабильное. Полноценная система здоровья будет добавлена позже.',
      details: [['Статус', hero.status], ['Сила', hero.stats.strength], ['Мудрость', hero.stats.wisdom], ['Ловкость', hero.stats.agility]]
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
      description: blueprint.description,
      inspectDescription: blueprint.description + ' Текущее состояние: ' + system.status + '. Стоимость ремонта: ' + formatCost(blueprint.repairCost) + '.',
      details: [['Статус', system.status], ['Уровень', system.level], ['Ремонт', formatCost(blueprint.repairCost)]]
    };
  }

  if ((state.mode === 'territories' || state.mode === 'recon') && state.selectedTerritoryKey) {
    const key = state.selectedTerritoryKey;
    const blueprint = territoryBlueprints[key];
    const territory = state.territories[key];
    if (!blueprint || !territory) return null;
    const isOpen = territory.isOpen;
    return {
      id: 'territory:' + key,
      kind: 'territory',
      key,
      name: blueprint.name,
      type: isOpen ? 'открытая пустошь' : 'неизвестная пустошь',
      description: isOpen ? blueprint.biome : 'Контуры зоны видны на сканере, но точный ресурс и опасные участки ещё не подтверждены.',
      inspectDescription: isOpen ? blueprint.biome + ' Основной ресурс: ' + blueprint.resourceText + '.' : 'Неизвестная пустошь требует разведки. Герой может отправить дрона, пойти лично или открыть зону за разведданные.',
      details: isOpen
        ? [['Статус', 'открыта'], ['Ресурс', blueprint.resourceText], ['Дроны', territory.assignedDrones + ' / ' + territory.droneLimit], ['Выход', territory.assignedDrones === 0 ? 'нет добычи без дронов' : getTerritoryOutputText(key)]]
        : [['Статус', 'неизвестная зона'], ['Открытие', 'разведданные ' + blueprint.openCost], ['Подсказка', 'Разведайте или откройте пустошь через действия Героя.']]
    };
  }

  if (state.mode === 'city' && state.selectedCityKey && state.selectedCityType) {
    return getCitySelection();
  }

  if (state.mode === 'recon') {
    return null;
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
      inspectDescription: district.description + ' В районе доступны активности: ' + cityActivities.map(function (activity) { return activity.name; }).join(', ') + '.',
      details: [['Город', 'Ашхаб-18'], ['Активности', cityActivities.length + ' вариантов']]
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
      inspectDescription: activity.description + ' Район: ' + district.name + '. Стоимость: ' + formatMaybeCost(activity.cost) + '. Результат: ' + formatCityResult(activity) + '.',
      details: [['Район', district.name], ['Стоимость', formatMaybeCost(activity.cost)], ['Результат', formatCityResult(activity)]]
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
    inspectDescription: point.description + ' Стоимость: ' + formatMaybeCost(point.cost) + '. Результат: ' + formatCityResult(point) + '.',
    details: [['Город', 'Ашхаб-18'], ['Стоимость', formatMaybeCost(point.cost)], ['Результат', formatCityResult(point)]]
  };
}

function renderObjectActionOptions(selection) {
  if (selection.kind === 'hero') {
    appendActionButton('Отдохнуть', 'heroAction', 'rest', false);
    appendActionButton('Проверить экипировку', 'heroAction', 'equipment', false);
    appendActionButton('Проверить мысли', 'heroAction', 'thoughts', false);
    appendActionButton('Проверить предметы', 'heroAction', 'items', false);
    return;
  }

  if (selection.kind === 'system') {
    const system = state.shipSystems[selection.key];
    appendActionButton(system.status === 'повреждено' ? 'Починить' : 'Улучшить', 'repairKey', selection.key, false);
    return;
  }

  if (selection.kind === 'territory') {
    const territory = state.territories[selection.key];
    if (territory.isOpen) {
      appendActionButton('Назначить дрона', 'assignKey', selection.key, state.drones.free <= 0 || territory.assignedDrones >= territory.droneLimit);
      appendActionButton('Снять дрона', 'removeKey', selection.key, territory.assignedDrones <= 0);
      appendActionButton('Собрать ресурс', 'gatherKey', selection.key, territory.assignedDrones <= 0);
    } else {
      appendActionButton('Исследовать дроном', 'scoutDroneKey', selection.key, state.drones.free <= 0 || state.resources.energy < 1);
      appendActionButton('Исследовать лично', 'scoutHeroKey', selection.key, state.resources.water < 2 || state.resources.energy < 1);
      appendActionButton('Открыть пустошь', 'openTerritoryKey', selection.key, state.resources.recon < territoryBlueprints[selection.key].openCost);
    }
    return;
  }

  if (selection.kind === 'district') {
    for (let i = 0; i < cityActivities.length; i++) {
      appendActionButton(cityActivities[i].name, 'cityActivitySelectKey', selection.key + ':' + cityActivities[i].key, false);
    }
    return;
  }

  if (selection.kind === 'activity') {
    appendActionButton(getCityActivity(selection.key.split(':')[1]).action, 'cityActionKey', selection.key, false);
    return;
  }

  if (selection.kind === 'unique') {
    appendActionButton(cityUniquePoints[selection.key].action, 'cityUniqueActionKey', selection.key, false);
  }
}

function inspectCurrentSelection() {
  const selection = getCurrentSelection();
  if (!selection) return;
  state.actionPanelMode = 'selected';
  state.inspectedObjectId = selection.id;
  addLog(selection.kind === 'hero' ? 'Герой проверил своё состояние.' : 'Герой осмотрел ' + getInspectLogType(selection) + ': ' + selection.name + '.');
}

function getInspectLogType(selection) {
  if (selection.kind === 'system') return 'систему';
  if (selection.kind === 'territory') return 'пустошь';
  if (selection.kind === 'district') return 'район';
  if (selection.kind === 'unique') return 'точку';
  if (selection.kind === 'activity') return 'активность';
  return 'состояние';
}

function showCurrentActions() {
  if (!getCurrentSelection()) return;
  state.actionPanelMode = 'actions';
  saveGame();
  render();
}

function performHeroAction(action) {
  state.mode = 'hero';
  state.actionPanelMode = 'actions';

  const messages = {
    rest: 'Герой отдохнул несколько минут. Система состояния будет добавлена позже.',
    equipment: 'Слоты экипировки осмотрены.',
    thoughts: 'Слоты мыслей пусты.',
    items: 'Слоты предметов пусты.'
  };

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

function formatCityResult(entry) {
  if (entry.result) {
    return formatGain(entry.result);
  }

  return entry.resultText || 'Запись в журнал.';
}

function renderReconHelp() {
  elements.selectedEyebrow.textContent = 'справка';
  elements.selectedStatus.textContent = 'разведка';
  elements.selectedName.textContent = 'Разведка';
  elements.selectedBadge.textContent = 'Разведданные: ' + state.resources.recon;
  elements.selectedDescription.textContent = 'Разведданные нужны для открытия новых пустошей. Их можно получить, исследуя неизвестные зоны дроном или лично.';
  addDetail('Открыто пустошей', countOpenTerritories());
  addDetail('Осталось открыть', countClosedTerritories());
  addDetail('Действия', 'Выберите неизвестную зону на экране «Пустоши» или используйте список целей разведки в центре экрана.');
}


function migrateLogMessage(message) {
  return String(message)
    .replace(/территории/g, 'пустоши')
    .replace(/территорию/g, 'пустошь')
    .replace(/территория/g, 'пустошь')
    .replace(/данных/g, 'разведданных')
    .replace(/данные/g, 'разведданные');
}

function addDetail(term, value) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<dt>' + term + '</dt><dd>' + value + '</dd>';
  elements.selectedDetails.appendChild(wrapper);
}

function appendActionButton(text, datasetKey, key, disabled) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.dataset[datasetKey] = key;
  button.disabled = disabled;
  elements.selectedActions.appendChild(button);
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
    if (state.territories[keys[i]].isOpen) {
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
    'Сборочный цех дронов': 'Сборочного цеха дронов',
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

  next.turn = savedNumber(saved.turn, 1);
  next.mode = ['hero', 'ship', 'territories', 'city', 'recon'].includes(saved.mode) ? saved.mode : (saved.mode === 'research' ? 'recon' : 'hero');
  next.selectedSystemKey = shipSystemBlueprints[saved.selectedSystemKey] ? saved.selectedSystemKey : '';
  next.selectedTerritoryKey = territoryBlueprints[saved.selectedTerritoryKey] ? saved.selectedTerritoryKey : '';
  next.selectedCityKey = saved.selectedCityKey || '';
  next.selectedCityType = saved.selectedCityType || '';
  next.actionPanelMode = saved.actionPanelMode === 'actions' ? 'actions' : 'selected';
  next.inspectedObjectId = typeof saved.inspectedObjectId === 'string' ? saved.inspectedObjectId : '';
  next.hero = mergeSavedHero(saved.hero);

  if (saved.drones) {
    next.drones.total = savedNumber(saved.drones.total, 3);
    next.drones.free = savedNumber(saved.drones.free, 3);
    next.drones.assigned = savedNumber(saved.drones.assigned, 0);
  }

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
    if (savedTerritories[key]) {
      next.territories[key].level = Math.max(1, savedNumber(savedTerritories[key].level, 1));
      if (typeof savedTerritories[key].isOpen === 'boolean') {
        next.territories[key].isOpen = savedTerritories[key].isOpen;
      }
      next.territories[key].assignedDrones = Math.max(0, Math.min(3, savedNumber(savedTerritories[key].assignedDrones, 0)));
      next.territories[key].droneLimit = 3;
    }
  }

  normalizeDrones(next);
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

function normalizeDrones(next) {
  const keys = Object.keys(next.territories);
  let assigned = 0;

  for (let i = 0; i < keys.length; i++) {
    if (!next.territories[keys[i]].isOpen) {
      next.territories[keys[i]].assignedDrones = 0;
    }
    assigned += next.territories[keys[i]].assignedDrones;
  }

  next.drones.total = 3;
  next.drones.assigned = Math.min(3, assigned);
  next.drones.free = Math.max(0, next.drones.total - next.drones.assigned);
}

function savedNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
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
  } else if (target.dataset.inspectSelected) {
    inspectCurrentSelection();
  } else if (target.dataset.showObjectActions) {
    showCurrentActions();
  } else if (target.dataset.heroAction) {
    performHeroAction(target.dataset.heroAction);
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
  } else if (target.dataset.reconTerritoryKey) {
    selectReconTerritory(target.dataset.reconTerritoryKey);
  } else if (target.dataset.repairKey) {
    repairSystem(target.dataset.repairKey);
  } else if (target.dataset.assignKey) {
    assignDrone(target.dataset.assignKey);
  } else if (target.dataset.removeKey) {
    removeDrone(target.dataset.removeKey);
  } else if (target.dataset.gatherKey) {
    gatherTerritory(target.dataset.gatherKey);
  } else if (target.dataset.scoutDroneKey) {
    scoutTerritoryWithDrone(target.dataset.scoutDroneKey);
  } else if (target.dataset.scoutHeroKey) {
    scoutTerritoryPersonally(target.dataset.scoutHeroKey);
  } else if (target.dataset.scoutPersonKey) {
    scoutTerritoryPersonally(target.dataset.scoutPersonKey);
  } else if (target.dataset.openTerritoryKey) {
    openTerritory(target.dataset.openTerritoryKey);
  }
});

document.getElementById('newGame').addEventListener('click', restartGame);

loadGame();
