// Простые переменные состояния игры.
let metal = 0;
let energy = 0;
let food = 0;
let turn = 1;
let workshop = 1;
let shipParts = 0;
let gameOver = false;

// Настройки игры вынесены в отдельные переменные, чтобы их легко было менять.
const maxTurns = 20;
const neededShipParts = 5;

// Получаем элементы страницы, которые будем обновлять.
const turnText = document.getElementById('turn');
const metalText = document.getElementById('metal');
const energyText = document.getElementById('energy');
const foodText = document.getElementById('food');
const workshopText = document.getElementById('workshop');
const shipPartsText = document.getElementById('shipParts');
const shipStatus = document.getElementById('shipStatus');
const log = document.getElementById('log');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');

const actionButtons = [
  document.getElementById('mineMetal'),
  document.getElementById('gatherFood'),
  document.getElementById('generateEnergy'),
  document.getElementById('upgradeWorkshop'),
  document.getElementById('buildShip')
];

// Добавляем обработчики кликов на кнопки действий.
document.getElementById('mineMetal').addEventListener('click', mineMetal);
document.getElementById('gatherFood').addEventListener('click', gatherFood);
document.getElementById('generateEnergy').addEventListener('click', generateEnergy);
document.getElementById('upgradeWorkshop').addEventListener('click', upgradeWorkshop);
document.getElementById('buildShip').addEventListener('click', buildShipPart);
document.getElementById('restart').addEventListener('click', restartGame);

// Шахтёр приносит металл. Чем лучше цех, тем больше добыча.
function mineMetal() {
  metal += 3 + workshop;
  finishTurn('Шахтёр добыл металл.');
}

// Фермер приносит еду. Чем лучше цех, тем больше добыча.
function gatherFood() {
  food += 2 + workshop;
  finishTurn('Фермер вырастил еду.');
}

// Энергетик приносит энергию. Чем лучше цех, тем больше добыча.
function generateEnergy() {
  energy += 2 + workshop;
  finishTurn('Энергетик зарядил аккумуляторы.');
}

// Улучшение цеха стоит ресурсов, но повышает добычу дронов.
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
  finishTurn('Цех улучшен. Дроны работают лучше.');
}

// Одна часть корабля стоит металл, энергию и еду.
function buildShipPart() {
  const metalCost = 6;
  const energyCost = 4;
  const foodCost = 3;

  if (metal < metalCost || energy < energyCost || food < foodCost) {
    addLog('Не хватает ресурсов для части корабля: нужно 6 металла, 4 энергии и 3 еды.');
    return;
  }

  metal -= metalCost;
  energy -= energyCost;
  food -= foodCost;
  shipParts += 1;
  finishTurn('Построена часть корабля.');
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
}

// Полностью возвращает игру к начальному состоянию.
function restartGame() {
  metal = 0;
  energy = 0;
  food = 0;
  turn = 1;
  workshop = 1;
  shipParts = 0;
  gameOver = false;

  log.innerHTML = '';
  result.classList.add('hidden');
  addLog('Новая колония основана. Постройте 5 частей корабля за 20 ходов.');
  updateScreen();
}

// Добавляет новую строку в журнал событий сверху списка.
function addLog(message) {
  const item = document.createElement('li');
  item.textContent = message;
  log.prepend(item);
}

// Обновляет все числа и состояние кнопок на странице.
function updateScreen() {
  turnText.textContent = turn;
  metalText.textContent = metal;
  energyText.textContent = energy;
  foodText.textContent = food;
  workshopText.textContent = workshop;
  shipPartsText.textContent = shipParts;

  updateShipStatus();

  for (let i = 0; i < actionButtons.length; i++) {
    actionButtons[i].disabled = gameOver;
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

// Первый запуск игры.
restartGame();
