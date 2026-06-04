// Базовое состояние игры и ресурсов.
let credits = 120;
let water = 0;
let metal = 0;
let energy = 0;
let ether = 0;
let data = 0;
let components = 2;
let turn = 1;
let shipParts = 0;
let hullIntegrity = 45;
let gameOver = false;
let selectedSiteKey = 'water';
let logMessages = [];

// Настройки прототипа.
const maxTurns = 20;
const neededShipParts = 5;
const saveKey = 'aurelia-18-save-v3';
const legacySaveKey = 'aurelia-18-save-v2';
const maxLogMessages = 30;

const droneTypes = {
  farmers: {
    name: 'Дроны-фермеры',
    free: 2,
    assigned: 0
  },
  miners: {
    name: 'Дроны-шахтёры',
    free: 2,
    assigned: 0
  },
  collectors: {
    name: 'Дроны-сборщики',
    free: 2,
    assigned: 0
  },
  repairers: {
    name: 'Дроны-ремонтники',
    free: 1,
    assigned: 0
  },
  helpers: {
    name: 'Дроны-помощники',
    free: 1,
    assigned: 0
  },
  scouts: {
    name: 'Дроны-разведчики',
    free: 1,
    assigned: 0
  }
};

const productionSites = {
  water: {
    name: 'Водосборник',
    icon: '💧',
    resource: 'вода',
    functionText: 'Собирает конденсат и фильтрует влагу из песка вокруг места крушения.',
    description: 'Развёрнутые мембраны и резервуары дают базе стабильный источник воды.',
    level: 1,
    baseOutput: 2,
    outputLabel: 'воды за действие',
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'farmers',
    upgradeBaseCost: {
      metal: 4,
      energy: 2
    }
  },
  metal: {
    name: 'Металлоломный участок',
    icon: '⛓️',
    resource: 'металл',
    functionText: 'Разбирает обломки корабля и фрагменты грузовых контейнеров.',
    description: 'Главная зона для добычи металла из крушения и ближайших россыпей.',
    level: 1,
    baseOutput: 3,
    outputLabel: 'металла за действие',
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'miners',
    upgradeBaseCost: {
      water: 3,
      energy: 2
    }
  },
  energy: {
    name: 'Энергетический узел',
    icon: '⚡',
    resource: 'энергия',
    functionText: 'Питает базу уцелевшими батареями и импровизированными солнечными стойками.',
    description: 'Каждое улучшение увеличивает заряд, доступный для ремонта и производства.',
    level: 1,
    baseOutput: 2,
    outputLabel: 'энергии за действие',
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'collectors',
    upgradeBaseCost: {
      metal: 4,
      water: 2
    }
  },
  workshop: {
    name: 'Сборочный цех дронов',
    icon: '🛠️',
    resource: 'компоненты',
    functionText: 'Готовит площадки для сборки и обслуживания вспомогательных дронов.',
    description: 'Пока это декоративный модуль развития: уровень растёт, сложной сборки дронов ещё нет.',
    level: 1,
    baseOutput: 0,
    outputLabel: 'развитие инфраструктуры',
    assignedDrones: 0,
    droneLimit: 0,
    droneType: 'helpers',
    upgradeBaseCost: {
      metal: 5,
      energy: 3,
      components: 1
    }
  },
  repair: {
    name: 'Ремонтная площадка',
    icon: '🚧',
    resource: 'корпус',
    functionText: 'Сваривает повреждённые секции корабля и укрепляет командный узел.',
    description: 'Улучшение площадки снижает стоимость действия ремонта корпуса.',
    level: 1,
    baseOutput: 10,
    outputLabel: 'прочности корпуса за ремонт',
    assignedDrones: 0,
    droneLimit: 0,
    droneType: 'repairers',
    upgradeBaseCost: {
      metal: 6,
      energy: 3
    }
  },
  scanner: {
    name: 'Сканерный модуль',
    icon: '📡',
    resource: 'данные',
    functionText: 'Собирает телеметрию, строит сетку угроз и помечает безопасные маршруты.',
    description: 'Пока это декоративный модуль развития: уровень растёт, полноценной разведки ещё нет.',
    level: 1,
    baseOutput: 0,
    outputLabel: 'точность сканирования',
    assignedDrones: 0,
    droneLimit: 0,
    droneType: 'scouts',
    upgradeBaseCost: {
      energy: 4,
      metal: 3
    }
  }
};

// Элементы интерфейса.
const turnText = document.getElementById('turn');
const creditsText = document.getElementById('credits');
const waterText = document.getElementById('water');
const metalText = document.getElementById('metal');
const energyText = document.getElementById('energy');
const etherText = document.getElementById('ether');
const dataText = document.getElementById('data');
const componentsText = document.getElementById('components');
const hullIntegrityText = document.getElementById('hullIntegrity');
const shipPartsText = document.getElementById('shipParts');
const shipStatus = document.getElementById('shipStatus');
const log = document.getElementById('log');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const droneStatus = document.getElementById('droneStatus');
const totalFreeDronesText = document.getElementById('totalFreeDrones');
const totalAssignedDronesText = document.getElementById('totalAssignedDrones');
const selectedSiteName = document.getElementById('selectedSiteName');
const selectedSiteLevel = document.getElementById('selectedSiteLevel');
const selectedSiteDescription = document.getElementById('selectedSiteDescription');
const selectedSiteFunction = document.getElementById('selectedSiteFunction');
const selectedSiteEffect = document.getElementById('selectedSiteEffect');
const selectedSiteCost = document.getElementById('selectedSiteCost');
const selectedSiteDrones = document.getElementById('selectedSiteDrones');
const upgradeMessage = document.getElementById('upgradeMessage');
const upgradeSelectedSiteButton = document.getElementById('upgradeSelectedSite');
const assignSelectedDroneButton = document.getElementById('assignSelectedDrone');
const removeSelectedDroneButton = document.getElementById('removeSelectedDrone');
const droneAssignment = document.getElementById('droneAssignment');
const zoneButtons = document.querySelectorAll('[data-site]');

const bottomActionButtons = [
  document.getElementById('gatherWater'),
  document.getElementById('mineMetal'),
  document.getElementById('generateEnergy'),
  document.getElementById('repairHull')
];

// Клики по карте и действиям.
for (let i = 0; i < zoneButtons.length; i++) {
  zoneButtons[i].addEventListener('click', function () {
    selectSite(zoneButtons[i].dataset.site);
  });
}

document.getElementById('gatherWater').addEventListener('click', gatherWater);
document.getElementById('mineMetal').addEventListener('click', mineMetal);
document.getElementById('generateEnergy').addEventListener('click', generateEnergy);
document.getElementById('repairHull').addEventListener('click', repairHull);
document.getElementById('newGame').addEventListener('click', restartGame);
upgradeSelectedSiteButton.addEventListener('click', upgradeSelectedSite);
assignSelectedDroneButton.addEventListener('click', function () {
  assignDrone(selectedSiteKey);
});
removeSelectedDroneButton.addEventListener('click', function () {
  removeDrone(selectedSiteKey);
});

// Выбор зоны на карте базы.
function selectSite(siteKey) {
  if (!productionSites[siteKey]) {
    return;
  }

  selectedSiteKey = siteKey;
  updateScreen();
}

// Водосборник добывает воду с учётом уровня и назначенных дронов.
function gatherWater() {
  if (gameOver) {
    return;
  }

  const output = getSiteOutput('water');
  water += output;
  finishTurn('Водосборник собрал ' + output + ' воды.');
}

// Металлоломный участок добывает металл с учётом уровня и назначенных дронов.
function mineMetal() {
  if (gameOver) {
    return;
  }

  const output = getSiteOutput('metal');
  metal += output;
  finishTurn('Металлоломный участок добыл ' + output + ' металла.');
}

// Энергетический узел добывает энергию с учётом уровня и назначенных дронов.
function generateEnergy() {
  if (gameOver) {
    return;
  }

  const output = getSiteOutput('energy');
  energy += output;
  finishTurn('Энергетический узел выработал ' + output + ' энергии.');
}

// Ремонт корпуса использует ресурсы и восстанавливает прочность корабля.
function repairHull() {
  if (gameOver) {
    return;
  }

  const cost = getRepairCost();

  if (!canPay(cost)) {
    addLog('Не хватает ресурсов для ремонта корпуса: нужно ' + formatCost(cost) + '.');
    updateScreen();
    return;
  }

  if (hullIntegrity >= 100) {
    addLog('Корпус уже стабилизирован на 100%.');
    updateScreen();
    return;
  }

  payCost(cost);
  hullIntegrity = Math.min(100, hullIntegrity + getSiteOutput('repair'));
  finishTurn('Ремонтная площадка восстановила корпус до ' + hullIntegrity + '%.');
}

// Улучшение выбранной зоны тратит ресурсы и повышает её уровень.
function upgradeSelectedSite() {
  if (gameOver) {
    return;
  }

  const site = productionSites[selectedSiteKey];
  const cost = getUpgradeCost(selectedSiteKey);

  if (!canPay(cost)) {
    addLog('Не хватает ресурсов для улучшения зоны «' + site.name + '»: нужно ' + formatCost(cost) + '.');
    updateScreen();
    return;
  }

  payCost(cost);
  site.level += 1;
  finishTurn('Зона «' + site.name + '» улучшена до уровня ' + site.level + '.');
}

// Назначает свободного дрона подходящего типа на участок без траты хода.
function assignDrone(siteKey) {
  const site = productionSites[siteKey];

  if (gameOver || !site || site.droneLimit <= 0) {
    return;
  }

  const drone = droneTypes[site.droneType];

  if (site.assignedDrones >= site.droneLimit) {
    addLog('Лимит дронов на участке «' + site.name + '» уже достигнут.');
    return;
  }

  if (drone.free <= 0) {
    addLog('Нет свободных единиц типа «' + drone.name + '».');
    return;
  }

  drone.free -= 1;
  drone.assigned += 1;
  site.assignedDrones += 1;
  addLog('Дрон назначен на участок «' + site.name + '».');
  updateScreen();
}

// Снимает назначенного дрона с участка без траты хода.
function removeDrone(siteKey) {
  const site = productionSites[siteKey];

  if (gameOver || !site || site.droneLimit <= 0) {
    return;
  }

  const drone = droneTypes[site.droneType];

  if (site.assignedDrones <= 0) {
    addLog('На участке «' + site.name + '» нет назначенных дронов.');
    return;
  }

  drone.free += 1;
  drone.assigned -= 1;
  site.assignedDrones -= 1;
  addLog('Дрон снят с участка «' + site.name + '».');
  updateScreen();
}

// Считает текущий выход ресурса или эффект за одно действие.
function getSiteOutput(siteKey) {
  const site = productionSites[siteKey];

  if (!site || site.baseOutput === 0) {
    return 0;
  }

  return site.baseOutput * site.level + site.baseOutput * site.assignedDrones;
}

function getUpgradeCost(siteKey) {
  const site = productionSites[siteKey];
  const cost = {};
  const keys = Object.keys(site.upgradeBaseCost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    cost[resource] = site.upgradeBaseCost[resource] + site.level * 2;
  }

  return cost;
}

function getRepairCost() {
  const repairLevel = productionSites.repair.level;
  return {
    metal: Math.max(2, 5 - repairLevel),
    energy: Math.max(1, 3 - Math.floor(repairLevel / 2)),
    water: 1
  };
}

function canPay(cost) {
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];

    if (getResource(resource) < cost[resource]) {
      return false;
    }
  }

  return true;
}

function payCost(cost) {
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    setResource(resource, getResource(resource) - cost[resource]);
  }
}

function getResource(resource) {
  if (resource === 'credits') return credits;
  if (resource === 'metal') return metal;
  if (resource === 'water') return water;
  if (resource === 'energy') return energy;
  if (resource === 'ether') return ether;
  if (resource === 'data') return data;
  if (resource === 'components') return components;
  return 0;
}

function setResource(resource, value) {
  if (resource === 'credits') credits = value;
  if (resource === 'metal') metal = value;
  if (resource === 'water') water = value;
  if (resource === 'energy') energy = value;
  if (resource === 'ether') ether = value;
  if (resource === 'data') data = value;
  if (resource === 'components') components = value;
}

function formatCost(cost) {
  const labels = {
    credits: 'кредитов',
    metal: 'металла',
    water: 'воды',
    energy: 'энергии',
    ether: 'эфира',
    data: 'данных',
    components: 'компонентов'
  };
  const parts = [];
  const keys = Object.keys(cost);

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    parts.push(cost[resource] + ' ' + labels[resource]);
  }

  return parts.join(', ');
}

// Завершает ход после успешного действия.
function finishTurn(message) {
  addLog('Цикл ' + turn + ': ' + message);

  if (hullIntegrity >= 100 && shipParts < neededShipParts) {
    shipParts += 1;
    hullIntegrity = 65;
    addLog('Стабилизирована секция корабля: ' + shipParts + ' / ' + neededShipParts + '.');
  }

  if (shipParts >= neededShipParts) {
    endGame(true);
    return;
  }

  if (turn >= maxTurns) {
    endGame(false);
    return;
  }

  turn += 1;
  updateScreen();
}

// Показывает победу или поражение и выключает кнопки действий.
function endGame(isWin) {
  gameOver = true;
  updateScreen();
  result.classList.remove('hidden');

  if (isWin) {
    resultTitle.textContent = 'Победа!';
    resultText.textContent = 'Командный узел стабилизирован, корабль готов к эвакуации с Аурелии-18.';
    addLog('Итог: победа. Корабль восстановлен вовремя.');
  } else {
    resultTitle.textContent = 'Поражение';
    resultText.textContent = 'Циклы закончились, а корабль всё ещё не готов.';
    addLog('Итог: поражение. Нужно было стабилизировать 5 секций корабля за 20 циклов.');
  }

  saveGame();
}

// Полностью возвращает игру к начальному состоянию.
function restartGame() {
  resetState();
  logMessages = [];
  localStorage.removeItem(saveKey);
  localStorage.removeItem(legacySaveKey);
  addLog('Новая база развёрнута у места крушения. Выберите зоны, добывайте ресурсы и ремонтируйте корпус.');
  updateScreen();
}

// Возвращает игровые числа, дронов и участки к начальному состоянию.
function resetState() {
  credits = 120;
  water = 0;
  metal = 0;
  energy = 0;
  ether = 0;
  data = 0;
  components = 2;
  turn = 1;
  shipParts = 0;
  hullIntegrity = 45;
  gameOver = false;
  selectedSiteKey = 'water';

  resetDrones();
  resetSites();

  result.classList.add('hidden');
  resultTitle.textContent = '';
  resultText.textContent = '';
}

function resetDrones() {
  droneTypes.farmers.free = 2;
  droneTypes.farmers.assigned = 0;
  droneTypes.miners.free = 2;
  droneTypes.miners.assigned = 0;
  droneTypes.collectors.free = 2;
  droneTypes.collectors.assigned = 0;
  droneTypes.repairers.free = 1;
  droneTypes.repairers.assigned = 0;
  droneTypes.helpers.free = 1;
  droneTypes.helpers.assigned = 0;
  droneTypes.scouts.free = 1;
  droneTypes.scouts.assigned = 0;
}

function resetSites() {
  const keys = Object.keys(productionSites);

  for (let i = 0; i < keys.length; i++) {
    productionSites[keys[i]].level = 1;
    productionSites[keys[i]].assignedDrones = 0;
  }
}

// Добавляет новую строку в журнал событий сверху списка.
function addLog(message) {
  logMessages.unshift(message);

  if (logMessages.length > maxLogMessages) {
    logMessages.pop();
  }

  renderLog();
  saveGame();
}

function renderLog() {
  log.innerHTML = '';

  for (let i = 0; i < logMessages.length; i++) {
    const item = document.createElement('li');
    item.textContent = logMessages[i];
    log.appendChild(item);
  }
}

// Обновляет все числа и состояние кнопок на странице.
function updateScreen() {
  turnText.textContent = turn;
  creditsText.textContent = credits;
  waterText.textContent = water;
  metalText.textContent = metal;
  energyText.textContent = energy;
  etherText.textContent = ether;
  dataText.textContent = data;
  componentsText.textContent = components;
  hullIntegrityText.textContent = hullIntegrity;
  shipPartsText.textContent = shipParts;

  updateDroneStatus();
  updateSiteStatus();
  updateSelectedSitePanel();
  updateShipStatus();

  for (let i = 0; i < bottomActionButtons.length; i++) {
    bottomActionButtons[i].disabled = gameOver;
  }

  saveGame();
}

function updateDroneStatus() {
  droneStatus.innerHTML = '';
  const keys = Object.keys(droneTypes);
  let totalFree = 0;
  let totalAssigned = 0;

  for (let i = 0; i < keys.length; i++) {
    const drone = droneTypes[keys[i]];
    totalFree += drone.free;
    totalAssigned += drone.assigned;

    const card = document.createElement('article');
    const title = document.createElement('h3');
    const free = document.createElement('p');
    const assigned = document.createElement('p');

    card.className = 'drone-card';
    title.textContent = drone.name;
    free.textContent = 'Свободно: ' + drone.free;
    assigned.textContent = 'Назначено: ' + drone.assigned;

    card.appendChild(title);
    card.appendChild(free);
    card.appendChild(assigned);
    droneStatus.appendChild(card);
  }

  totalFreeDronesText.textContent = totalFree;
  totalAssignedDronesText.textContent = totalAssigned;
}

function updateSiteStatus() {
  const keys = Object.keys(productionSites);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const site = productionSites[key];
    const levelLabels = document.querySelectorAll('[data-site-level="' + key + '"]');
    const outputLabels = document.querySelectorAll('[data-site-output="' + key + '"]');

    for (let levelIndex = 0; levelIndex < levelLabels.length; levelIndex++) {
      levelLabels[levelIndex].textContent = site.level;
    }

    for (let outputIndex = 0; outputIndex < outputLabels.length; outputIndex++) {
      outputLabels[outputIndex].textContent = getSiteOutput(key);
    }
  }

  for (let buttonIndex = 0; buttonIndex < zoneButtons.length; buttonIndex++) {
    const button = zoneButtons[buttonIndex];
    button.classList.toggle('selected', button.dataset.site === selectedSiteKey);
  }
}

function updateSelectedSitePanel() {
  const site = productionSites[selectedSiteKey];
  const cost = getUpgradeCost(selectedSiteKey);
  const hasEnough = canPay(cost);

  selectedSiteName.textContent = site.icon + ' ' + site.name;
  selectedSiteLevel.textContent = site.level;
  selectedSiteDescription.textContent = site.description;
  selectedSiteFunction.textContent = site.functionText;
  selectedSiteEffect.textContent = getSiteEffectText(selectedSiteKey);
  selectedSiteCost.textContent = formatCost(cost);
  upgradeMessage.textContent = hasEnough
    ? 'Ресурсов хватает для улучшения.'
    : 'Не хватает ресурсов: нужно ' + formatCost(cost) + '.';
  upgradeSelectedSiteButton.disabled = gameOver || !hasEnough;

  if (site.droneLimit > 0) {
    const drone = droneTypes[site.droneType];
    droneAssignment.classList.remove('hidden');
    selectedSiteDrones.textContent = 'Назначено: ' + site.assignedDrones + ' / ' + site.droneLimit + '. Свободно подходящих: ' + drone.free + '.';
    assignSelectedDroneButton.disabled = gameOver || site.assignedDrones >= site.droneLimit || drone.free <= 0;
    removeSelectedDroneButton.disabled = gameOver || site.assignedDrones <= 0;
  } else {
    droneAssignment.classList.add('hidden');
    assignSelectedDroneButton.disabled = true;
    removeSelectedDroneButton.disabled = true;
  }
}

function getSiteEffectText(siteKey) {
  const site = productionSites[siteKey];

  if (siteKey === 'water' || siteKey === 'metal' || siteKey === 'energy') {
    return '+' + getSiteOutput(siteKey) + ' ' + site.outputLabel + '.';
  }

  if (siteKey === 'repair') {
    return '+' + getSiteOutput(siteKey) + ' прочности за ремонт; текущая цена ремонта: ' + formatCost(getRepairCost()) + '.';
  }

  if (siteKey === 'workshop') {
    return 'Уровень цеха ' + site.level + '; сборка новых дронов пока заглушка.';
  }

  return 'Уровень сканера ' + site.level + '; разведка и данные пока заглушка.';
}

// Рисует 5 ячеек корабля и отмечает уже стабилизированные секции.
function updateShipStatus() {
  shipStatus.innerHTML = '';

  for (let i = 1; i <= neededShipParts; i++) {
    const part = document.createElement('div');
    part.className = 'ship-part';

    if (i <= shipParts) {
      part.classList.add('ready');
    }

    shipStatus.appendChild(part);
  }
}

// Сохраняет текущее состояние в localStorage.
function saveGame() {
  const savedState = {
    credits: credits,
    water: water,
    metal: metal,
    energy: energy,
    ether: ether,
    data: data,
    components: components,
    turn: turn,
    shipParts: shipParts,
    hullIntegrity: hullIntegrity,
    gameOver: gameOver,
    selectedSiteKey: selectedSiteKey,
    logMessages: logMessages,
    drones: {},
    sites: {}
  };

  const droneKeys = Object.keys(droneTypes);
  for (let i = 0; i < droneKeys.length; i++) {
    const key = droneKeys[i];
    savedState.drones[key] = {
      free: droneTypes[key].free,
      assigned: droneTypes[key].assigned
    };
  }

  const siteKeys = Object.keys(productionSites);
  for (let i = 0; i < siteKeys.length; i++) {
    const key = siteKeys[i];
    savedState.sites[key] = {
      level: productionSites[key].level,
      assignedDrones: productionSites[key].assignedDrones
    };
  }

  localStorage.setItem(saveKey, JSON.stringify(savedState));
}

// Загружает сохранение, если игрок уже начинал партию в этом браузере.
function loadGame() {
  const savedText = localStorage.getItem(saveKey) || localStorage.getItem(legacySaveKey);

  if (!savedText) {
    restartGame();
    return;
  }

  resetState();

  try {
    const savedState = JSON.parse(savedText);
    credits = savedNumber(savedState.credits, 120);
    water = savedNumber(savedState.water, 0);
    metal = savedNumber(savedState.metal, 0);
    energy = savedNumber(savedState.energy, 0);
    ether = savedNumber(savedState.ether, 0);
    data = savedNumber(savedState.data, 0);
    components = savedNumber(savedState.components, 2);
    turn = savedNumber(savedState.turn, 1);
    shipParts = savedNumber(savedState.shipParts, 0);
    hullIntegrity = savedNumber(savedState.hullIntegrity, 45);
    gameOver = Boolean(savedState.gameOver);
    selectedSiteKey = productionSites[savedState.selectedSiteKey] ? savedState.selectedSiteKey : 'water';
    logMessages = Array.isArray(savedState.logMessages) ? savedState.logMessages.slice(0, maxLogMessages) : [];

    loadSavedDrones(savedState.drones);
    loadSavedSites(savedState.sites);
  } catch (error) {
    resetState();
    logMessages = [];
    addLog('Сохранение повреждено. Начата новая база.');
  }

  if (logMessages.length === 0) {
    logMessages.push('Сохранение загружено. Продолжайте развитие базы.');
  }

  if (gameOver) {
    result.classList.remove('hidden');
    resultTitle.textContent = shipParts >= neededShipParts ? 'Победа!' : 'Поражение';
    resultText.textContent = shipParts >= neededShipParts
      ? 'Командный узел стабилизирован, корабль готов к эвакуации с Аурелии-18.'
      : 'Циклы закончились, а корабль всё ещё не готов.';
  }

  renderLog();
  updateScreen();
}

function savedNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function loadSavedDrones(savedDrones) {
  if (!savedDrones) {
    return;
  }

  const keys = Object.keys(droneTypes);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!savedDrones[key]) {
      continue;
    }

    droneTypes[key].free = savedNumber(savedDrones[key].free, droneTypes[key].free);
    droneTypes[key].assigned = savedNumber(savedDrones[key].assigned, droneTypes[key].assigned);
  }
}

function loadSavedSites(savedSites) {
  if (!savedSites) {
    return;
  }

  const keys = Object.keys(productionSites);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!savedSites[key]) {
      continue;
    }

    productionSites[key].level = Math.max(1, savedNumber(savedSites[key].level, 1));
    productionSites[key].assignedDrones = Math.max(0, savedNumber(savedSites[key].assignedDrones, 0));
  }
}

// Первый запуск игры.
loadGame();
