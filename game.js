// Ключ, по которому игра хранит прогресс в localStorage браузера.
const saveKey = 'aurelia18GameState';

// Начальное состояние игры. Это главный каркас данных проекта.
const startState = {
  hero: {
    name: 'Капитан Рина',
    strength: 4,
    wisdom: 5,
    agility: 3,
    health: 100
  },
  ship: {
    hull: 60,
    reactor: 40,
    oxygenLoop: 70,
    waterLoop: 55,
    navigation: 30,
    engine: 25
  },
  resources: {
    credits: 20,
    metal: 10,
    water: 8,
    energy: 6,
    ether: 0,
    data: 0,
    components: 1
  },
  drones: {
    farmers: 1,
    miners: 1,
    collectors: 1,
    repairers: 1,
    helpers: 0,
    scouts: 0
  },
  sites: {
    waterCollector: 1,
    scrapYard: 1,
    energyNode: 1
  },
  activeTasks: [
    'Проверить состояние корабля',
    'Собрать металл для ремонта корпуса'
  ]
};

// Рабочая копия состояния. Она меняется во время игры.
let gameState = loadGame();

// Находим элементы страницы, куда будем выводить состояние.
const heroBlock = document.getElementById('heroBlock');
const shipBlock = document.getElementById('shipBlock');
const resourcesBlock = document.getElementById('resourcesBlock');
const dronesBlock = document.getElementById('dronesBlock');
const sitesBlock = document.getElementById('sitesBlock');
const tasksBlock = document.getElementById('tasksBlock');

// Подключаем кнопки к простым действиям без таймеров.
document.getElementById('collectMetalButton').addEventListener('click', collectMetal);
document.getElementById('collectWaterButton').addEventListener('click', collectWater);
document.getElementById('repairHullButton').addEventListener('click', repairHull);
document.getElementById('newGameButton').addEventListener('click', newGame);

// Загружает сохранение. Если его нет, создаёт новое состояние.
function loadGame() {
  const savedState = localStorage.getItem(saveKey);

  if (savedState) {
    return JSON.parse(savedState);
  }

  return copyState(startState);
}

// Сохраняет текущее состояние, чтобы прогресс не пропал после перезагрузки.
function saveGame() {
  localStorage.setItem(saveKey, JSON.stringify(gameState));
}

// Делает простую глубокую копию объекта состояния.
function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

// Действие: собрать металл на металлоломном участке.
function collectMetal() {
  const amount = 3 + gameState.sites.scrapYard + gameState.drones.miners;
  gameState.resources.metal += amount;
  addTask('Собрано металла: +' + amount);
  updateAfterAction();
}

// Действие: добыть воду через водосборник.
function collectWater() {
  const amount = 2 + gameState.sites.waterCollector + gameState.drones.collectors;
  gameState.resources.water += amount;
  addTask('Добыто воды: +' + amount);
  updateAfterAction();
}

// Действие: отремонтировать корпус корабля за металл.
function repairHull() {
  const metalCost = 5;
  const repairAmount = 10;

  if (gameState.resources.metal < metalCost) {
    addTask('Не хватает металла для ремонта корпуса. Нужно 5 металла.');
    updateAfterAction();
    return;
  }

  if (gameState.ship.hull >= 100) {
    addTask('Корпус уже полностью отремонтирован.');
    updateAfterAction();
    return;
  }

  gameState.resources.metal -= metalCost;
  gameState.ship.hull += repairAmount;

  if (gameState.ship.hull > 100) {
    gameState.ship.hull = 100;
  }

  addTask('Корпус отремонтирован: +10 прочности за 5 металла.');
  updateAfterAction();
}

// Сбрасывает прогресс и начинает новую игру.
function newGame() {
  gameState = copyState(startState);
  saveGame();
  renderGame();
}

// Добавляет запись в список текущих задач. Старые записи оставляем как простой журнал.
function addTask(text) {
  gameState.activeTasks.unshift(text);

  if (gameState.activeTasks.length > 8) {
    gameState.activeTasks.pop();
  }
}

// После любого действия сохраняем состояние и перерисовываем экран.
function updateAfterAction() {
  saveGame();
  renderGame();
}

// Перерисовывает весь экран состояния.
function renderGame() {
  renderStats(heroBlock, [
    ['Имя', gameState.hero.name],
    ['Сила', gameState.hero.strength],
    ['Мудрость', gameState.hero.wisdom],
    ['Ловкость', gameState.hero.agility],
    ['Здоровье', gameState.hero.health]
  ]);

  renderStats(shipBlock, [
    ['Корпус', gameState.ship.hull + ' / 100'],
    ['Реактор', gameState.ship.reactor + ' / 100'],
    ['Кислородный контур', gameState.ship.oxygenLoop + ' / 100'],
    ['Водный контур', gameState.ship.waterLoop + ' / 100'],
    ['Навигация', gameState.ship.navigation + ' / 100'],
    ['Двигатель', gameState.ship.engine + ' / 100']
  ]);

  renderStats(resourcesBlock, [
    ['Кредиты', gameState.resources.credits],
    ['Металл', gameState.resources.metal],
    ['Вода', gameState.resources.water],
    ['Энергия', gameState.resources.energy],
    ['Эфир', gameState.resources.ether],
    ['Данные', gameState.resources.data],
    ['Компоненты', gameState.resources.components]
  ]);

  renderStats(dronesBlock, [
    ['Фермеры', gameState.drones.farmers],
    ['Шахтёры', gameState.drones.miners],
    ['Сборщики', gameState.drones.collectors],
    ['Ремонтники', gameState.drones.repairers],
    ['Помощники', gameState.drones.helpers],
    ['Разведчики', gameState.drones.scouts]
  ]);

  renderStats(sitesBlock, [
    ['Водосборник', 'уровень ' + gameState.sites.waterCollector],
    ['Металлоломный участок', 'уровень ' + gameState.sites.scrapYard],
    ['Энергетический узел', 'уровень ' + gameState.sites.energyNode]
  ]);

  renderTasks();
}

// Выводит список характеристик в одинаковом формате.
function renderStats(block, rows) {
  block.innerHTML = '';

  for (let i = 0; i < rows.length; i++) {
    const row = document.createElement('div');
    const name = document.createElement('span');
    const value = document.createElement('span');

    row.className = 'stat-row';
    name.className = 'stat-name';
    value.className = 'stat-value';

    name.textContent = rows[i][0];
    value.textContent = rows[i][1];

    row.appendChild(name);
    row.appendChild(value);
    block.appendChild(row);
  }
}

// Выводит текущие задачи и последние результаты действий.
function renderTasks() {
  tasksBlock.innerHTML = '';

  for (let i = 0; i < gameState.activeTasks.length; i++) {
    const task = document.createElement('li');
    task.textContent = gameState.activeTasks[i];
    tasksBlock.appendChild(task);
  }
}

// Первый вывод игры на экран.
renderGame();
