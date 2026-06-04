// Ключ для сохранения прогресса в браузере.
const saveKey = 'aurelia18GameState';

// Начальное состояние игры. Пока это весь основной каркас данных.
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
    'Осмотреть корабль',
    'Собрать металл для ремонта корпуса'
  ]
};

// Текущее состояние игры. Оно загружается из localStorage или создаётся заново.
let gameState = loadGame();

// Элементы страницы для вывода состояния.
const heroState = document.getElementById('heroState');
const shipState = document.getElementById('shipState');
const resourcesState = document.getElementById('resourcesState');
const dronesState = document.getElementById('dronesState');
const sitesState = document.getElementById('sitesState');
const tasksState = document.getElementById('tasksState');

// Кнопки действий.
document.getElementById('collectMetalButton').addEventListener('click', collectMetal);
document.getElementById('collectWaterButton').addEventListener('click', collectWater);
document.getElementById('repairHullButton').addEventListener('click', repairHull);
document.getElementById('newGameButton').addEventListener('click', startNewGame);

// Загружает игру. Если сохранение отсутствует или сломано, начинает новую игру.
function loadGame() {
  const savedState = localStorage.getItem(saveKey);

  if (!savedState) {
    return createStartState();
  }

  try {
    return mergeState(createStartState(), JSON.parse(savedState));
  } catch (error) {
    localStorage.removeItem(saveKey);
    return createStartState();
  }
}

// Сохраняет текущее состояние в браузере.
function saveGame() {
  localStorage.setItem(saveKey, JSON.stringify(gameState));
}

// Создаёт копию начального состояния, чтобы не менять startState напрямую.
function createStartState() {
  return JSON.parse(JSON.stringify(startState));
}

// Добавляет сохранённые значения поверх начального состояния.
function mergeState(baseState, savedState) {
  for (const key in savedState) {
    if (isSimpleObject(baseState[key]) && isSimpleObject(savedState[key])) {
      baseState[key] = mergeState(baseState[key], savedState[key]);
    } else {
      baseState[key] = savedState[key];
    }
  }

  return baseState;
}

// Проверяет, что значение является простым объектом, а не массивом.
function isSimpleObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Действие: собрать металл на металлоломном участке.
function collectMetal() {
  const amount = 3 + gameState.sites.scrapYard + gameState.drones.miners;
  gameState.resources.metal += amount;
  addTask('Собрано металла: +' + amount);
  saveAndRender();
}

// Действие: добыть воду через водосборник.
function collectWater() {
  const amount = 2 + gameState.sites.waterCollector + gameState.drones.collectors;
  gameState.resources.water += amount;
  addTask('Добыто воды: +' + amount);
  saveAndRender();
}

// Действие: отремонтировать корпус корабля за металл.
function repairHull() {
  const metalCost = 5;
  const repairAmount = 10;

  if (gameState.resources.metal < metalCost) {
    addTask('Не хватает металла для ремонта корпуса. Нужно 5 металла.');
    saveAndRender();
    return;
  }

  if (gameState.ship.hull >= 100) {
    addTask('Корпус уже полностью отремонтирован.');
    saveAndRender();
    return;
  }

  gameState.resources.metal -= metalCost;
  gameState.ship.hull += repairAmount;

  if (gameState.ship.hull > 100) {
    gameState.ship.hull = 100;
  }

  addTask('Корпус отремонтирован: +10 прочности за 5 металла.');
  saveAndRender();
}

// Действие: начать новую игру и сбросить сохранение.
function startNewGame() {
  gameState = createStartState();
  saveAndRender();
}

// Добавляет запись в активные задачи. Последние события остаются сверху.
function addTask(text) {
  gameState.activeTasks.unshift(text);

  if (gameState.activeTasks.length > 8) {
    gameState.activeTasks.pop();
  }
}

// Сохраняет игру и обновляет экран после действия.
function saveAndRender() {
  saveGame();
  renderGame();
}

// Обновляет все блоки состояния на экране.
function renderGame() {
  renderStats(heroState, [
    ['Имя', gameState.hero.name],
    ['Сила', gameState.hero.strength],
    ['Мудрость', gameState.hero.wisdom],
    ['Ловкость', gameState.hero.agility],
    ['Здоровье', gameState.hero.health]
  ]);

  renderStats(shipState, [
    ['Корпус', gameState.ship.hull + ' / 100'],
    ['Реактор', gameState.ship.reactor + ' / 100'],
    ['Кислородный контур', gameState.ship.oxygenLoop + ' / 100'],
    ['Водный контур', gameState.ship.waterLoop + ' / 100'],
    ['Навигация', gameState.ship.navigation + ' / 100'],
    ['Двигатель', gameState.ship.engine + ' / 100']
  ]);

  renderStats(resourcesState, [
    ['Кредиты', gameState.resources.credits],
    ['Металл', gameState.resources.metal],
    ['Вода', gameState.resources.water],
    ['Энергия', gameState.resources.energy],
    ['Эфир', gameState.resources.ether],
    ['Данные', gameState.resources.data],
    ['Компоненты', gameState.resources.components]
  ]);

  renderStats(dronesState, [
    ['Фермеры', gameState.drones.farmers],
    ['Шахтёры', gameState.drones.miners],
    ['Сборщики', gameState.drones.collectors],
    ['Ремонтники', gameState.drones.repairers],
    ['Помощники', gameState.drones.helpers],
    ['Разведчики', gameState.drones.scouts]
  ]);

  renderStats(sitesState, [
    ['Водосборник', 'уровень ' + gameState.sites.waterCollector],
    ['Металлоломный участок', 'уровень ' + gameState.sites.scrapYard],
    ['Энергетический узел', 'уровень ' + gameState.sites.energyNode]
  ]);

  renderTasks();
}

// Рисует список характеристик внутри одного блока.
function renderStats(container, rows) {
  container.innerHTML = '';

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
    container.appendChild(row);
  }
}

// Рисует активные задачи и последние результаты действий.
function renderTasks() {
  tasksState.innerHTML = '';

  for (let i = 0; i < gameState.activeTasks.length; i++) {
    const task = document.createElement('li');
    task.textContent = gameState.activeTasks[i];
    tasksState.appendChild(task);
  }
}

// Первый вывод состояния при открытии страницы.
renderGame();
