// Простые переменные состояния игры.
let water = 0;
let metal = 0;
let energy = 0;
let turn = 1;
let workshop = 1;
let shipParts = 0;
let gameOver = false;
let logMessages = [];

// Настройки игры вынесены в отдельные переменные, чтобы их легко было менять.
const maxTurns = 20;
const neededShipParts = 5;
const saveKey = 'aurelia-18-save-v2';
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
    name: 'водосборник',
    resource: 'вода',
    level: 1,
    baseOutput: 2,
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'farmers'
  },
  metal: {
    name: 'металлоломный участок',
    resource: 'металл',
    level: 1,
    baseOutput: 3,
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'miners'
  },
  energy: {
    name: 'энергетический узел',
    resource: 'энергия',
    level: 1,
    baseOutput: 2,
    assignedDrones: 0,
    droneLimit: 3,
    droneType: 'collectors'
  }
};

// Получаем элементы страницы, которые будем обновлять.
const turnText = document.getElementById('turn');
const waterText = document.getElementById('water');
const metalText = document.getElementById('metal');
const energyText = document.getElementById('energy');
const workshopText = document.getElementById('workshop');
const shipPartsText = document.getElementById('shipParts');
const shipStatus = document.getElementById('shipStatus');
const log = document.getElementById('log');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const droneStatus = document.getElementById('droneStatus');
const totalFreeDronesText = document.getElementById('totalFreeDrones');
const totalAssignedDronesText = document.getElementById('totalAssignedDrones');

const siteElements = {
  water: {
    resource: document.getElementById('waterSiteResource'),
    level: document.getElementById('waterSiteLevel'),
    baseOutput: document.getElementById('waterSiteBaseOutput'),
    assigned: document.getElementById('waterSiteAssigned'),
    droneLimit: document.getElementById('waterSiteDroneLimit'),
    output: document.getElementById('waterSiteOutput')
  },
  metal: {
    resource: document.getElementById('metalSiteResource'),
    level: document.getElementById('metalSiteLevel'),
    baseOutput: document.getElementById('metalSiteBaseOutput'),
    assigned: document.getElementById('metalSiteAssigned'),
    droneLimit: document.getElementById('metalSiteDroneLimit'),
    output: document.getElementById('metalSiteOutput')
  },
  energy: {
    resource: document.getElementById('energySiteResource'),
    level: document.getElementById('energySiteLevel'),
    baseOutput: document.getElementById('energySiteBaseOutput'),
    assigned: document.getElementById('energySiteAssigned'),
    droneLimit: document.getElementById('energySiteDroneLimit'),
    output: document.getElementById('energySiteOutput')
  }
};

const actionButtons = [
  document.getElementById('gatherWater'),
  document.getElementById('mineMetal'),
  document.getElementById('generateEnergy'),
  document.getElementById('upgradeWorkshop'),
  document.getElementById('buildShip')
];

const assignmentButtons = [
  document.getElementById('assignWaterDrone'),
  document.getElementById('removeWaterDrone'),
  document.getElementById('assignMetalDrone'),
  document.getElementById('removeMetalDrone'),
  document.getElementById('assignEnergyDrone'),
  document.getElementById('removeEnergyDrone')
];

// Добавляем обработчики кликов на кнопки действий.
document.getElementById('gatherWater').addEventListener('click', gatherWater);
document.getElementById('mineMetal').addEventListener('click', mineMetal);
document.getElementById('generateEnergy').addEventListener('click', generateEnergy);
document.getElementById('upgradeWorkshop').addEventListener('click', upgradeWorkshop);
document.getElementById('buildShip').addEventListener('click', buildShipPart);
document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('assignWaterDrone').addEventListener('click', function () {
  assignDrone('water');
});
document.getElementById('removeWaterDrone').addEventListener('click', function () {
  removeDrone('water');
});
document.getElementById('assignMetalDrone').addEventListener('click', function () {
  assignDrone('metal');
});
document.getElementById('removeMetalDrone').addEventListener('click', function () {
  removeDrone('metal');
});
document.getElementById('assignEnergyDrone').addEventListener('click', function () {
  assignDrone('energy');
});
document.getElementById('removeEnergyDrone').addEventListener('click', function () {
  removeDrone('energy');
});

// Водосборник добывает воду с учётом уровня и назначенных дронов.
function gatherWater() {
  const output = getSiteOutput('water');
  water += output;
  finishTurn('Водосборник собрал ' + output + ' воды.');
}

// Металлоломный участок добывает металл с учётом уровня и назначенных дронов.
function mineMetal() {
  const output = getSiteOutput('metal');
  metal += output;
  finishTurn('Металлоломный участок добыл ' + output + ' металла.');
}

// Энергетический узел добывает энергию с учётом уровня и назначенных дронов.
function generateEnergy() {
  const output = getSiteOutput('energy');
  energy += output;
  finishTurn('Энергетический узел выработал ' + output + ' энергии.');
}

// Улучшение цеха стоит ресурсов, но повышает уровень производственных участков.
function upgradeWorkshop() {
  const metalCost = 5;
  const energyCost = 3;

  if (metal < metalCost || energy < energyCost) {
    addLog('Не хватает ресурсов для улучшения цеха: нужно 5 металла и 3 энергии.');
    return;
  }

  metal -= metalCost;
  energy -= energyCost;
  workshop += 1;
  productionSites.water.level += 1;
  productionSites.metal.level += 1;
  productionSites.energy.level += 1;
  finishTurn('Цех улучшен. Уровни производственных участков выросли.');
}

// Одна часть корабля стоит металл, энергию и воду.
function buildShipPart() {
  const metalCost = 6;
  const energyCost = 4;
  const waterCost = 3;

  if (metal < metalCost || energy < energyCost || water < waterCost) {
    addLog('Не хватает ресурсов для части корабля: нужно 6 металла, 4 энергии и 3 воды.');
    return;
  }

  metal -= metalCost;
  energy -= energyCost;
  water -= waterCost;
  shipParts += 1;
  finishTurn('Построена часть корабля.');
}

// Назначает свободного дрона подходящего типа на участок без траты хода.
function assignDrone(siteKey) {
  const site = productionSites[siteKey];
  const drone = droneTypes[site.droneType];

  if (gameOver) {
    return;
  }

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
  const drone = droneTypes[site.droneType];

  if (gameOver) {
    return;
  }

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

// Считает текущий выход ресурса за одно действие на участке.
function getSiteOutput(siteKey) {
  const site = productionSites[siteKey];
  return site.baseOutput * site.level + site.baseOutput * site.assignedDrones;
}

// Завершает ход после успешного действия.
function finishTurn(message) {
  addLog('Ход ' + turn + ': ' + message);

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
    resultText.textContent = 'Корабль готов. Колонисты могут улететь с планеты.';
    addLog('Итог: победа. Корабль построен вовремя.');
  } else {
    resultTitle.textContent = 'Поражение';
    resultText.textContent = 'Ходы закончились, а корабль не достроен.';
    addLog('Итог: поражение. Нужно было построить 5 частей корабля за 20 ходов.');
  }

  saveGame();
}

// Полностью возвращает игру к начальному состоянию.
function restartGame() {
  resetState();
  logMessages = [];
  localStorage.removeItem(saveKey);
  addLog('Новая колония основана. Постройте 5 частей корабля за 20 ходов.');
  updateScreen();
}

// Возвращает игровые числа, дронов и участки к начальному состоянию.
function resetState() {
  water = 0;
  metal = 0;
  energy = 0;
  turn = 1;
  workshop = 1;
  shipParts = 0;
  gameOver = false;

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
  productionSites.water.level = 1;
  productionSites.water.assignedDrones = 0;
  productionSites.metal.level = 1;
  productionSites.metal.assignedDrones = 0;
  productionSites.energy.level = 1;
  productionSites.energy.assignedDrones = 0;
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
  waterText.textContent = water;
  metalText.textContent = metal;
  energyText.textContent = energy;
  workshopText.textContent = workshop;
  shipPartsText.textContent = shipParts;

  updateDroneStatus();
  updateSiteStatus();
  updateShipStatus();

  for (let i = 0; i < actionButtons.length; i++) {
    actionButtons[i].disabled = gameOver;
  }

  for (let i = 0; i < assignmentButtons.length; i++) {
    assignmentButtons[i].disabled = gameOver;
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
    const siteKey = keys[i];
    const site = productionSites[siteKey];
    const elements = siteElements[siteKey];

    elements.resource.textContent = site.resource;
    elements.level.textContent = site.level;
    elements.baseOutput.textContent = site.baseOutput;
    elements.assigned.textContent = site.assignedDrones;
    elements.droneLimit.textContent = site.droneLimit;
    elements.output.textContent = getSiteOutput(siteKey);
  }
}

// Рисует 5 ячеек корабля и отмечает уже построенные части.
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

// Сохраняет текущее состояние в localStorage после действий и назначения дронов.
function saveGame() {
  const savedState = {
    water: water,
    metal: metal,
    energy: energy,
    turn: turn,
    workshop: workshop,
    shipParts: shipParts,
    gameOver: gameOver,
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
  const savedText = localStorage.getItem(saveKey);

  if (!savedText) {
    restartGame();
    return;
  }

  resetState();

  try {
    const savedState = JSON.parse(savedText);
    water = Number(savedState.water) || 0;
    metal = Number(savedState.metal) || 0;
    energy = Number(savedState.energy) || 0;
    turn = Number(savedState.turn) || 1;
    workshop = Number(savedState.workshop) || 1;
    shipParts = Number(savedState.shipParts) || 0;
    gameOver = Boolean(savedState.gameOver);
    logMessages = Array.isArray(savedState.logMessages) ? savedState.logMessages.slice(0, maxLogMessages) : [];

    loadSavedDrones(savedState.drones);
    loadSavedSites(savedState.sites);
  } catch (error) {
    resetState();
    logMessages = [];
    addLog('Сохранение повреждено. Начата новая колония.');
  }

  if (logMessages.length === 0) {
    logMessages.push('Сохранение загружено. Продолжайте развитие колонии.');
  }

  if (gameOver) {
    result.classList.remove('hidden');
    resultTitle.textContent = shipParts >= neededShipParts ? 'Победа!' : 'Поражение';
    resultText.textContent = shipParts >= neededShipParts
      ? 'Корабль готов. Колонисты могут улететь с планеты.'
      : 'Ходы закончились, а корабль не достроен.';
  }

  renderLog();
  updateScreen();
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

    droneTypes[key].free = Number(savedDrones[key].free) || 0;
    droneTypes[key].assigned = Number(savedDrones[key].assigned) || 0;
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

    productionSites[key].level = Number(savedSites[key].level) || 1;
    productionSites[key].assignedDrones = Number(savedSites[key].assignedDrones) || 0;
  }
}

// Первый запуск игры.
loadGame();
