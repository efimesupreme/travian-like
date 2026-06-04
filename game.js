// Аурелия-18: разделы «Корабль» и «Территории».
const saveKey = 'aurelia-18-save-v4';
const legacySaveKeys = ['aurelia-18-save-v3', 'aurelia-18-save-v2'];
const maxLogMessages = 10;
const maxTurns = 20;

const initialResources = {
  credits: 100,
  metal: 15,
  water: 10,
  energy: 8,
  ether: 0,
  data: 0,
  components: 3
};

const resourceLabels = {
  credits: 'кредиты',
  metal: 'металл',
  water: 'вода',
  energy: 'энергия',
  ether: 'эфир',
  data: 'данные',
  components: 'компоненты'
};

const resourceGenitiveLabels = {
  credits: 'кредитов',
  metal: 'металла',
  water: 'воды',
  energy: 'энергии',
  ether: 'эфира',
  data: 'данных',
  components: 'компонентов'
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
    repairCost: { energy: 2, data: 1, components: 1 }
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
  etherVein: {
    name: 'Эфирная жила',
    biome: 'Светящиеся прожилки в породе дают редкий эфир при осторожной выемке.',
    resourceText: 'эфир',
    baseOutput: { ether: 3 }
  },
  oldStorage: {
    name: 'Старый склад проекта',
    biome: 'Полузасыпанный контейнерный ряд с совместимыми деталями старой экспедиции.',
    resourceText: 'компоненты',
    baseOutput: { components: 2 }
  },
  commNode: {
    name: 'Узел связи',
    biome: 'Поваленная мачта связи периодически отдаёт фрагменты технической телеметрии.',
    resourceText: 'данные',
    baseOutput: { data: 3 }
  },
  rustyFarm: {
    name: 'Ржавая ферма',
    biome: 'Старые гидропонные ванны сохранили влагу и немного обслуживающих деталей.',
    resourceText: 'вода и немного компонентов',
    baseOutput: { water: 3, components: 1 }
  },
  blackDune: {
    name: 'Чёрная дюна',
    biome: 'Магнитный песок скрывает случайные включения: металл, эфир или пакеты данных.',
    resourceText: 'случайно: металл, эфир или данные',
    baseOutput: { random: 4 },
    randomResources: ['metal', 'ether', 'data']
  }
};

let state = createInitialState();

const elements = {
  turn: document.getElementById('turn'),
  credits: document.getElementById('credits'),
  metal: document.getElementById('metal'),
  water: document.getElementById('water'),
  energy: document.getElementById('energy'),
  ether: document.getElementById('ether'),
  data: document.getElementById('data'),
  components: document.getElementById('components'),
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
  shipScreen: document.getElementById('shipScreen'),
  territoriesScreen: document.getElementById('territoriesScreen'),
  researchScreen: document.getElementById('researchScreen'),
  shipSystemsGrid: document.getElementById('shipSystemsGrid'),
  territoriesGrid: document.getElementById('territoriesGrid'),
  selectedEyebrow: document.getElementById('selectedEyebrow'),
  selectedStatus: document.getElementById('selectedStatus'),
  selectedName: document.getElementById('selectedName'),
  selectedBadge: document.getElementById('selectedBadge'),
  selectedDescription: document.getElementById('selectedDescription'),
  selectedDetails: document.getElementById('selectedDetails'),
  selectedActions: document.getElementById('selectedActions')
};

function createInitialState() {
  return {
    resources: { ...initialResources },
    turn: 1,
    mode: 'ship',
    selectedSystemKey: '',
    selectedTerritoryKey: '',
    drones: {
      total: 3,
      free: 3,
      assigned: 0
    },
    shipSystems: createSystems(),
    territories: createTerritories(),
    logMessages: ['Аварийный интерфейс Аурелии-18 запущен. Выберите режим работы.']
  };
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
      assignedDrones: 0,
      droneLimit: 3
    };
  }

  return territories;
}

function switchMode(mode) {
  if (!['ship', 'territories', 'research'].includes(mode)) {
    return;
  }

  state.mode = mode;
  saveGame();
  render();
}

function selectSystem(key) {
  if (!state.shipSystems[key]) {
    return;
  }

  state.mode = 'ship';
  state.selectedSystemKey = key;
  render();
  saveGame();
}

function selectTerritory(key) {
  if (!state.territories[key]) {
    return;
  }

  state.mode = 'territories';
  state.selectedTerritoryKey = key;
  render();
  saveGame();
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
  addLog('Дрон снят с территории ' + blueprint.name + '.');
}

function gatherTerritory(key) {
  const territory = state.territories[key];
  const blueprint = territoryBlueprints[key];

  if (!territory || !blueprint) {
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
  renderShipSystems();
  renderTerritories();
  renderSelectionPanel();
  renderLog();
}

function renderResources() {
  elements.turn.textContent = state.turn;
  elements.credits.textContent = state.resources.credits;
  elements.metal.textContent = state.resources.metal;
  elements.water.textContent = state.resources.water;
  elements.energy.textContent = state.resources.energy;
  elements.ether.textContent = state.resources.ether;
  elements.data.textContent = state.resources.data;
  elements.components.textContent = state.resources.components;
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
  const isShip = state.mode === 'ship';
  const isTerritories = state.mode === 'territories';
  const isResearch = state.mode === 'research';

  elements.shipScreen.classList.toggle('hidden', !isShip);
  elements.territoriesScreen.classList.toggle('hidden', !isTerritories);
  elements.researchScreen.classList.toggle('hidden', !isResearch);

  if (isShip) {
    elements.screenEyebrow.textContent = 'режим корабля';
    elements.screenTitle.textContent = 'Корабль / командный узел';
    elements.screenSubtitle.textContent = 'Внутренние системы корабля, которые нужно чинить.';
  } else if (isTerritories) {
    elements.screenEyebrow.textContent = 'режим территорий';
    elements.screenTitle.textContent = 'Прилегающие территории';
    elements.screenSubtitle.textContent = 'Внешние участки вокруг места крушения для ручной добычи ресурсов.';
  } else {
    elements.screenEyebrow.textContent = 'режим исследований';
    elements.screenTitle.textContent = 'Исследования';
    elements.screenSubtitle.textContent = 'Раздел пока недоступен.';
  }
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
      '</button>' +
      '<button class="card-action" type="button" data-repair-key="' + key + '">' + (system.status === 'повреждено' ? 'Починить' : 'Улучшить') + '</button>';
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
    const card = document.createElement('article');
    card.className = 'game-card territory-card territory-' + i;
    card.classList.toggle('selected', state.mode === 'territories' && state.selectedTerritoryKey === key);
    card.innerHTML = '<button class="card-select" type="button" data-territory-key="' + key + '">' +
      '<span class="card-kicker">территория</span>' +
      '<strong>' + blueprint.name + '</strong>' +
      '<small>Ур. ' + territory.level + ' · дроны ' + territory.assignedDrones + ' / ' + territory.droneLimit + '</small>' +
      '<p>' + blueprint.biome + '</p>' +
      '<em>Ресурс: ' + blueprint.resourceText + '</em>' +
      '<em>Выход: ' + getTerritoryOutputText(key) + '</em>' +
      '</button>' +
      '<div class="compact-actions">' +
      '<button type="button" data-assign-key="' + key + '">Назначить дрона</button>' +
      '<button type="button" data-remove-key="' + key + '">Снять дрона</button>' +
      '<button type="button" data-gather-key="' + key + '">Собрать ресурс</button>' +
      '</div>';
    elements.territoriesGrid.appendChild(card);
  }
}

function renderSelectionPanel() {
  elements.selectedDetails.innerHTML = '';
  elements.selectedActions.innerHTML = '';

  if (state.mode === 'ship') {
    renderSystemSelection();
  } else if (state.mode === 'territories') {
    renderTerritorySelection();
  } else {
    renderResearchHelp();
  }
}

function renderSystemSelection() {
  const key = state.selectedSystemKey;

  if (!key || !state.shipSystems[key]) {
    elements.selectedEyebrow.textContent = 'справка';
    elements.selectedStatus.textContent = 'корабль';
    elements.selectedName.textContent = 'Системы корабля';
    elements.selectedBadge.textContent = 'Выберите карточку системы';
    elements.selectedDescription.textContent = 'На этом экране показаны внутренние модули корабля. Повреждённые системы можно перевести в состояние «частично работает», если хватает ресурсов.';
    addDetail('Доступно', '8 систем: обшивка, реактор, жизнеобеспечение, контуры и модули управления.');
    addDetail('Ремонт', 'Тратит металл, энергию, компоненты, а для серверного узла также данные.');
    return;
  }

  const blueprint = shipSystemBlueprints[key];
  const system = state.shipSystems[key];
  elements.selectedEyebrow.textContent = 'выбранная система';
  elements.selectedStatus.textContent = system.status;
  elements.selectedName.textContent = blueprint.name;
  elements.selectedBadge.textContent = 'Уровень ' + system.level;
  elements.selectedDescription.textContent = blueprint.description;
  addDetail('Состояние', system.status);
  addDetail('Стоимость ремонта', formatCost(blueprint.repairCost));
  addDetail('Логика', system.status === 'повреждено' ? 'Починка переведёт систему в состояние «частично работает».' : 'Дальнейшее улучшение пока без сложной логики.');

  const button = document.createElement('button');
  button.className = 'primary-action';
  button.type = 'button';
  button.dataset.repairKey = key;
  button.textContent = system.status === 'повреждено' ? 'Починить' : 'Улучшить';
  button.disabled = system.status !== 'повреждено';
  elements.selectedActions.appendChild(button);
}

function renderTerritorySelection() {
  const key = state.selectedTerritoryKey;

  if (!key || !state.territories[key]) {
    elements.selectedEyebrow.textContent = 'справка';
    elements.selectedStatus.textContent = 'территории';
    elements.selectedName.textContent = 'Внешние участки';
    elements.selectedBadge.textContent = 'Выберите территорию';
    elements.selectedDescription.textContent = 'Назначайте свободных дронов на участки вокруг места крушения. Сбор ресурса работает только вручную и только при назначенных дронах.';
    addDetail('Дроны', 'Всего 3, лимит на территории — 3.');
    addDetail('Добыча', '1 дрон даёт базовый выход, 2 — x2, 3 — x3.');
    return;
  }

  const blueprint = territoryBlueprints[key];
  const territory = state.territories[key];
  elements.selectedEyebrow.textContent = 'выбранная территория';
  elements.selectedStatus.textContent = 'дроны ' + territory.assignedDrones + '/3';
  elements.selectedName.textContent = blueprint.name;
  elements.selectedBadge.textContent = 'Уровень ' + territory.level;
  elements.selectedDescription.textContent = blueprint.biome;
  addDetail('Основной ресурс', blueprint.resourceText);
  addDetail('Назначенные дроны', territory.assignedDrones + ' / ' + territory.droneLimit);
  addDetail('Текущий выход', territory.assignedDrones === 0 ? 'Нет добычи без дронов.' : getTerritoryOutputText(key));

  appendActionButton('Назначить дрона', 'assignKey', key, state.drones.free <= 0 || territory.assignedDrones >= territory.droneLimit);
  appendActionButton('Снять дрона', 'removeKey', key, territory.assignedDrones <= 0);
  appendActionButton('Собрать ресурс', 'gatherKey', key, false);
}

function renderResearchHelp() {
  elements.selectedEyebrow.textContent = 'справка';
  elements.selectedStatus.textContent = 'заглушка';
  elements.selectedName.textContent = 'Исследования';
  elements.selectedBadge.textContent = 'Раздел недоступен';
  elements.selectedDescription.textContent = 'Исследовательский раздел недоступен. Он не содержит действий и пока служит заглушкой будущего экрана.';
  addDetail('Доступно сейчас', 'Корабль и Территории.');
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
    next.resources[key] = savedNumber(savedResources[key], initialResources[key]);
  }

  next.turn = savedNumber(saved.turn, 1);
  next.mode = ['ship', 'territories', 'research'].includes(saved.mode) ? saved.mode : 'ship';
  next.selectedSystemKey = shipSystemBlueprints[saved.selectedSystemKey] ? saved.selectedSystemKey : '';
  next.selectedTerritoryKey = territoryBlueprints[saved.selectedTerritoryKey] ? saved.selectedTerritoryKey : '';

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
      next.territories[key].assignedDrones = Math.max(0, Math.min(3, savedNumber(savedTerritories[key].assignedDrones, 0)));
      next.territories[key].droneLimit = 3;
    }
  }

  normalizeDrones(next);
  next.logMessages = Array.isArray(saved.logMessages) && saved.logMessages.length > 0
    ? saved.logMessages.slice(0, maxLogMessages)
    : ['Сохранение загружено. Продолжайте развитие базы.'];

  return next;
}

function normalizeDrones(next) {
  const keys = Object.keys(next.territories);
  let assigned = 0;

  for (let i = 0; i < keys.length; i++) {
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
  } else if (target.dataset.systemKey) {
    selectSystem(target.dataset.systemKey);
  } else if (target.dataset.territoryKey) {
    selectTerritory(target.dataset.territoryKey);
  } else if (target.dataset.repairKey) {
    repairSystem(target.dataset.repairKey);
  } else if (target.dataset.assignKey) {
    assignDrone(target.dataset.assignKey);
  } else if (target.dataset.removeKey) {
    removeDrone(target.dataset.removeKey);
  } else if (target.dataset.gatherKey) {
    gatherTerritory(target.dataset.gatherKey);
  }
});

document.getElementById('newGame').addEventListener('click', restartGame);

loadGame();
