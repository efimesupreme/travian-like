// Аурелия-18: единая оболочка сцен «Герой», «Пустоши», «Корабль» и «Город».
const saveKey = 'aurelia-18-save-v19';
const legacySaveKeys = ['aurelia-18-save-v18', 'aurelia-18-save-v17', 'aurelia-18-save-v16', 'aurelia-18-save-v15', 'aurelia-18-save-v14', 'aurelia-18-save-v13', 'aurelia-18-save-v12', 'aurelia-18-save-v11', 'aurelia-18-save-v10', 'aurelia-18-save-v9', 'aurelia-18-save-v8', 'aurelia-18-save-v7', 'aurelia-18-save-v6', 'aurelia-18-save-v5', 'aurelia-18-save-v4', 'aurelia-18-save-v3', 'aurelia-18-save-v2'];
const maxLogMessages = 10;
const maxTurns = 20;
const typewriterDelay = 8;
const typewriterCursor = '|';
const staminaActionCost = 1;
const restStaminaRecovery = 20;
const energyCircuitSystemKey = 'energyCircuit';
const lifeSupportSystemKey = 'lifeSupport';
const livingBlockSystemKey = 'habitation';
const engineeringBaySystemKey = 'engineeringBay';
const navigationNodeSystemKey = 'navigationNode';
const navigationResearchDifficultyEffects = {
  stabilized: 1,
  improved: 2
};
const energyCircuitBalanceEffects = {
  stabilized: 2,
  improved: 4
};
const engineeringBayStorageLimitEffects = {
  stabilized: 10,
  improved: 20
};
const livingBlockRestRecovery = {
  disabled: 10,
  damaged: restStaminaRecovery,
  stabilized: 35,
  improved: 50
};
const livingBlockRestNarratives = {
  disabled: 'Герой устраивается у холодной переборки. Отдых выходит коротким и тревожным.',
  damaged: 'Герой садится у переборки и выравнивает дыхание. Силы понемногу возвращаются.',
  stabilized: 'Жилая зона держит тепло и тишину. Отдых становится заметно глубже.',
  improved: 'Жилой блок работает почти как настоящий отсек восстановления. Тело быстро возвращает силы.'
};

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

const lifeSupportActionBlueprints = {
  manualWater: {
    title: 'Собрать воду вручную',
    icon: '💧',
    minStatusRank: 1,
    cost: {},
    statKey: 'strength',
    baseDifficulty: 8,
    resource: 'water',
    gains: { criticalFailure: 0, failure: 0, partial: 1, success: 2, criticalSuccess: 3 }
  },
  condensate: {
    title: 'Очистить конденсат',
    icon: '💧',
    minStatusRank: 2,
    cost: {},
    statKey: 'agility',
    baseDifficulty: 8,
    usesLifeSupportBonus: true,
    resource: 'water',
    gains: { criticalFailure: 0, failure: 0, partial: 2, success: 3, criticalSuccess: 4 }
  },
  ration: {
    title: 'Вырастить аварийный паёк',
    icon: '🍖',
    minStatusRank: 2,
    cost: { water: 1 },
    statKey: 'wisdom',
    baseDifficulty: 8,
    usesLifeSupportBonus: true,
    resource: 'food',
    gains: { criticalFailure: 0, failure: 0, partial: 1, success: 2, criticalSuccess: 3 }
  },
  cycle: {
    title: 'Запустить цикл жизнеобеспечения',
    icon: '♻️',
    minStatusRank: 3,
    cost: { water: 2 },
    statKey: 'wisdom',
    baseDifficulty: 8,
    usesLifeSupportBonus: true,
    resource: 'food',
    gains: { criticalFailure: 1, failure: 1, partial: 3, success: 4, criticalSuccess: 5 }
  }
};
const shipStatusRanks = {
  disabled: 0,
  damaged: 1,
  stabilized: 2,
  improved: 3
};
const legacyShipSystemGroups = {
  energyCircuit: ['reactor', 'solarPanels'],
  lifeSupport: ['lifeSupport', 'waterLoop', 'hydroponics', 'medical'],
  habitation: ['habitation'],
  engineeringBay: ['repairWorkshop', 'storage'],
  navigationNode: ['navigation', 'scanner', 'server'],
  engine: ['engine']
};
const legacySelectedSystemMap = {
  reactor: 'energyCircuit',
  solarPanels: 'energyCircuit',
  lifeSupport: 'lifeSupport',
  waterLoop: 'lifeSupport',
  hydroponics: 'lifeSupport',
  medical: 'lifeSupport',
  habitation: 'habitation',
  hull: '',
  repairWorkshop: 'engineeringBay',
  storage: 'engineeringBay',
  navigation: 'navigationNode',
  scanner: 'navigationNode',
  server: 'navigationNode',
  engine: 'engine'
};

const rollResultTypes = {
  criticalFailure: 'критический провал',
  majorFailure: 'крупная неудача',
  mixed: 'посредственный результат',
  excellent: 'отличный результат',
  criticalSuccess: 'критический успех'
};

const maxHeroLevel = 20;
const maxHeroStatValue = 5;
const LEVEL_CONFIG = [
  { level: 1, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 20 },
  { level: 2, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 30 },
  { level: 3, abilityPointsReward: 2, skillPointsReward: 0, xpToNext: 40 },
  { level: 4, abilityPointsReward: 2, skillPointsReward: 0, xpToNext: 60 },
  { level: 5, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 90 },
  { level: 6, abilityPointsReward: 2, skillPointsReward: 0, xpToNext: 130 },
  { level: 7, abilityPointsReward: 2, skillPointsReward: 0, xpToNext: 180 },
  { level: 8, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 240 },
  { level: 9, abilityPointsReward: 2, skillPointsReward: 0, xpToNext: 300 },
  { level: 10, abilityPointsReward: 3, skillPointsReward: 0, xpToNext: 380 },
  { level: 11, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 460 },
  { level: 12, abilityPointsReward: 3, skillPointsReward: 0, xpToNext: 550 },
  { level: 13, abilityPointsReward: 3, skillPointsReward: 0, xpToNext: 640 },
  { level: 14, abilityPointsReward: 0, skillPointsReward: 1, xpToNext: 750 },
  { level: 15, abilityPointsReward: 3, skillPointsReward: 0, xpToNext: 860 },
  { level: 16, abilityPointsReward: 3, skillPointsReward: 0, xpToNext: 980 },
  { level: 17, abilityPointsReward: 0, skillPointsReward: 2, xpToNext: 1100 },
  { level: 18, abilityPointsReward: 4, skillPointsReward: 0, xpToNext: 1200 },
  { level: 19, abilityPointsReward: 4, skillPointsReward: 0, xpToNext: 1400 },
  { level: 20, abilityPointsReward: 0, skillPointsReward: 2, xpToNext: null }
];



const questTypeLabels = {
  main: 'Основной квест',
  side: 'Задача',
  extra: 'Доп. задача'
};
const questTypeTitlePrefixes = {
  main: 'Квест',
  side: 'Задача',
  extra: 'Доп. задача'
};
const questStepCounts = {
  main: 5,
  side: 3,
  extra: 1
};
const questDistributionByLevel = [
  { level: 1, main: 1, side: 1, extra: 2 },
  { level: 2, main: 1, side: 1, extra: 2 },
  { level: 3, main: 1, side: 1, extra: 2 },
  { level: 4, main: 1, side: 1, extra: 3 },
  { level: 5, main: 1, side: 1, extra: 3 },
  { level: 6, main: 1, side: 1, extra: 3 },
  { level: 7, main: 1, side: 1, extra: 3 },
  { level: 8, main: 1, side: 1, extra: 3 },
  { level: 9, main: 1, side: 2, extra: 3 },
  { level: 10, main: 1, side: 2, extra: 3 },
  { level: 11, main: 1, side: 2, extra: 4 },
  { level: 12, main: 1, side: 2, extra: 4 },
  { level: 13, main: 1, side: 2, extra: 4 },
  { level: 14, main: 1, side: 2, extra: 4 },
  { level: 15, main: 1, side: 2, extra: 4 },
  { level: 16, main: 1, side: 2, extra: 4 },
  { level: 17, main: 1, side: 2, extra: 5 },
  { level: 18, main: 1, side: 2, extra: 5 },
  { level: 19, main: 1, side: 1, extra: 5 },
  { level: 20, main: 0, side: 0, extra: 0 }
];
const questXpRewardByLevelBracket = [
  { min: 1, max: 4, rewards: { main: 100, side: 40, extra: 20 } },
  { min: 5, max: 8, rewards: { main: 160, side: 70, extra: 30 } },
  { min: 9, max: 12, rewards: { main: 240, side: 100, extra: 50 } },
  { min: 13, max: 16, rewards: { main: 360, side: 150, extra: 70 } },
  { min: 17, max: 20, rewards: { main: 500, side: 220, extra: 100 } }
];
const questRegistry = buildQuestRegistry();
const questRegistryById = questRegistry.reduce(function (registryById, quest) {
  registryById[quest.id] = quest;
  return registryById;
}, {});

function getQuestXpReward(type, level) {
  const questType = questTypeLabels[type] ? type : 'extra';
  const questLevel = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(level, 1))));

  for (let i = 0; i < questXpRewardByLevelBracket.length; i++) {
    const bracket = questXpRewardByLevelBracket[i];
    if (questLevel >= bracket.min && questLevel <= bracket.max) {
      return bracket.rewards[questType];
    }
  }

  return questXpRewardByLevelBracket[0].rewards[questType];
}

function buildQuestRegistry() {
  const quests = [];
  const counters = { main: 0, side: 0, extra: 0 };
  const types = Object.keys(questTypeLabels);

  for (let i = 0; i < questDistributionByLevel.length; i++) {
    const distribution = questDistributionByLevel[i];
    for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
      const type = types[typeIndex];
      const count = distribution[type];
      for (let questIndex = 0; questIndex < count; questIndex++) {
        counters[type] += 1;
        quests.push(createQuestPlaceholder(type, counters[type], distribution.level));
      }
    }
  }

  return quests;
}

function createQuestPlaceholder(type, number, level) {
  const paddedNumber = String(number).padStart(3, '0');
  const stepCount = questStepCounts[type];
  const titlePrefix = questTypeTitlePrefixes[type];

  return {
    id: type + '-' + paddedNumber,
    type,
    typeLabel: questTypeLabels[type],
    level,
    title: titlePrefix + ' №' + number + ' (ур. ' + level + ')',
    description: '',
    xpReward: getQuestXpReward(type, level),
    steps: createQuestPlaceholderSteps(stepCount)
  };
}

function createQuestPlaceholderSteps(stepCount) {
  const steps = [];

  for (let i = 1; i <= stepCount; i++) {
    steps.push({
      index: i,
      title: '',
      description: '',
      condition: null
    });
  }

  return steps;
}

function getQuestRegistry() {
  return questRegistry;
}

function getQuestById(id) {
  return questRegistryById[id] || null;
}

function getQuestsByType(type) {
  return questRegistry.filter(function (quest) {
    return quest.type === type;
  });
}

function getQuestsByLevel(level) {
  const questLevel = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(level, 1))));
  return questRegistry.filter(function (quest) {
    return quest.level === questLevel;
  });
}

function createEmptyQuestProgress() {
  return {
    currentStep: 0,
    completedSteps: [],
    completed: false,
    rewardClaimed: false
  };
}

function normalizeQuestProgressForQuest(quest, savedProgress) {
  const nextProgress = createEmptyQuestProgress();
  const saved = savedProgress && typeof savedProgress === 'object' ? savedProgress : {};
  const stepCount = getQuestStepCount(quest);
  const completedStepSet = {};
  const savedCompletedSteps = Array.isArray(saved.completedSteps) ? saved.completedSteps : [];

  for (let i = 0; i < savedCompletedSteps.length; i++) {
    const stepIndex = Math.floor(savedNumber(savedCompletedSteps[i], 0));
    if (stepIndex >= 1 && stepIndex <= stepCount) {
      completedStepSet[stepIndex] = true;
    }
  }

  nextProgress.completedSteps = Object.keys(completedStepSet).map(function (stepIndex) {
    return Number(stepIndex);
  }).sort(function (first, second) {
    return first - second;
  });
  nextProgress.currentStep = Math.max(0, Math.min(stepCount, Math.floor(savedNumber(saved.currentStep, 0))));
  nextProgress.completed = nextProgress.completedSteps.length >= stepCount;
  nextProgress.rewardClaimed = nextProgress.completed && saved.rewardClaimed === true;

  return nextProgress;
}

function mergeSavedQuestProgress(savedQuestProgress) {
  const nextProgress = {};

  if (!savedQuestProgress || typeof savedQuestProgress !== 'object') {
    return nextProgress;
  }

  const questIds = Object.keys(savedQuestProgress);
  for (let i = 0; i < questIds.length; i++) {
    const questId = questIds[i];
    const quest = getQuestById(questId);
    if (!quest) {
      continue;
    }
    nextProgress[questId] = normalizeQuestProgressForQuest(quest, savedQuestProgress[questId]);
  }

  return nextProgress;
}

function normalizeQuestProgressCollection(questProgress) {
  return mergeSavedQuestProgress(questProgress);
}

function getQuestProgress(id) {
  if (!state) {
    return createEmptyQuestProgress();
  }

  if (!state.questProgress || typeof state.questProgress !== 'object') {
    state.questProgress = {};
  }

  const quest = getQuestById(id);
  if (!quest) {
    return createEmptyQuestProgress();
  }

  if (!state.questProgress[id]) {
    state.questProgress[id] = createEmptyQuestProgress();
  }

  state.questProgress[id] = normalizeQuestProgressForQuest(quest, state.questProgress[id]);
  return state.questProgress[id];
}

function isQuestCompleted(id) {
  return getQuestProgress(id).completed === true;
}

function getQuestStepCount(quest) {
  return quest && Array.isArray(quest.steps) ? quest.steps.length : 0;
}

function getQuestCompletedStepCount(quest) {
  const progress = quest && quest.id ? getQuestProgress(quest.id) : createEmptyQuestProgress();
  return progress.completedSteps.length;
}

function getQuestStatus(quest) {
  if (!quest || !quest.id) {
    return 'notStarted';
  }

  const progress = getQuestProgress(quest.id);
  if (progress.rewardClaimed) {
    return 'rewardClaimed';
  }
  if (progress.completed) {
    return 'completed';
  }
  if (progress.currentStep > 0 || progress.completedSteps.length > 0) {
    return 'inProgress';
  }
  return 'notStarted';
}

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
  level: 1,
  experience: 0,
  unspentAbilityPoints: 0,
  unspentSkillPoints: 1,
  spentAbilityPoints: {
    health: 0,
    stamina: 0
  },
  spentSkillPoints: {
    strength: 0,
    wisdom: 0,
    agility: 0
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

const baseResourceLimits = {
  water: 20,
  metal: 20,
  components: 20,
  food: 20
};
const storageResourceKeys = Object.keys(baseResourceLimits);

const shipStorageLimitEffects = {
  [engineeringBaySystemKey]: {
    resources: storageResourceKeys,
    stabilized: 10,
    improved: 20,
    label: 'ресурсов'
  }
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
  stamina: '🫁',
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

const shipRepairStages = {
  disabled: {
    action: 'Аварийно починить',
    transitionLabel: 'Система аварийно починена',
    nextStatus: 'damaged',
    statKey: 'strength',
    difficulty: 8,
    requiredProgress: 3,
    cost: { metal: 4, components: 1 }
  },
  damaged: {
    action: 'Стабилизировать',
    transitionLabel: 'Система стабилизирована',
    nextStatus: 'stabilized',
    statKey: 'agility',
    difficulty: 8,
    requiredProgress: 2,
    cost: { metal: 2, components: 1 }
  },
  stabilized: {
    action: 'Улучшить',
    transitionLabel: 'Система улучшена',
    nextStatus: 'improved',
    statKey: 'wisdom',
    difficulty: 9,
    requiredProgress: 4,
    cost: { metal: 2, components: 3 }
  }
};


const shipSystemBlueprints = {
  energyCircuit: {
    name: 'Энергоконтур',
    status: 'damaged',
    description: 'Объединяет реактор, солнечные панели и аварийные накопители. От него зависит доступный баланс энергии корабля.',
    role: 'Баланс энергии'
  },
  lifeSupport: {
    name: 'Жизнеобеспечение',
    status: 'damaged',
    description: 'Отвечает за воду, еду, фильтрацию и базовую пригодность корабля для жизни.',
    role: 'Вода, еда и выживание'
  },
  habitation: {
    name: 'Жилой блок',
    status: 'damaged',
    description: 'Жилая зона позволяет Герою восстановить выносливость и прийти в себя после вылазок.',
    role: 'Отдых'
  },
  engineeringBay: {
    name: 'Инженерный отсек',
    status: 'damaged',
    description: 'Объединяет ремонтную зону и хранилища. Чем лучше отсек, тем больше ресурсов можно держать на корабле.',
    role: 'Хранение ресурсов'
  },
  navigationNode: {
    name: 'Навигационный узел',
    status: 'disabled',
    description: 'Объединяет навигацию, сканеры и бортовые данные. Помогает исследовать пустоши и находить маршруты.',
    role: 'Исследование'
  },
  engine: {
    name: 'Двигатель',
    status: 'disabled',
    description: 'Двигатель критически повреждён. Его восстановление остаётся главной долгосрочной целью Героя.',
    role: 'Сюжетная цель'
  }
};

const territoryStatusLabels = {
  hidden: 'Скрыта',
  discovered: 'Обнаружена',
  open: 'Открыта',
  depleted: 'Истощённая'
};
const territoryStatusKeys = Object.keys(territoryStatusLabels);

const territoryBlueprints = {
  crashSite: {
    id: 'crashSite',
    name: 'Место крушения',
    status: 'open',
    description: 'Разбитый периметр вокруг корабля. Среди обломков ещё можно найти металл, крепёж и уцелевшие компоненты.',
    resourceNodes: [
      {
        key: 'metal',
        action: 'Собрать металл',
        yieldMin: 1,
        yieldMax: 2,
        remaining: 14
      },
      {
        key: 'components',
        action: 'Искать компоненты',
        yieldMin: 1,
        yieldMax: 1,
        remaining: 6
      }
    ],
    progress: 1,
    requiredProgress: 1
  },
  wetLowland: {
    id: 'wetLowland',
    name: 'Ущелье',
    status: 'open',
    description: 'Узкий разлом в сухой породе. Ночью на стенках собирается влага, а в тени дольше держится холод.',
    resourceNodes: [
      {
        key: 'water',
        action: 'Собрать воду',
        yieldMin: 1,
        yieldMax: 2,
        remaining: 14
      }
    ],
    progress: 1,
    requiredProgress: 1
  },
  nearDebris: {
    id: 'nearDebris',
    name: 'Северные холмы',
    status: 'discovered',
    description: 'Низкая гряда камня и песка к северу от корабля. Под завалами могут лежать тяжёлые фрагменты корпуса.',
    resourceNodes: [
      {
        key: 'metal',
        action: 'Разобрать каменные завалы',
        yieldMin: 2,
        yieldMax: 3,
        remaining: 22
      }
    ],
    approachDifficulties: {
      direct: 7,
      signals: 9,
      careful: 8
    },
    progress: 0,
    requiredProgress: 2
  },
  weakSignal: {
    id: 'weakSignal',
    name: 'Западные склоны',
    status: 'discovered',
    description: 'Покатые склоны уходят к зоне старых помех. Приборы ловят короткие всплески, похожие на работу повреждённой техники.',
    resourceNodes: [
      {
        key: 'components',
        action: 'Искать технические фрагменты',
        yieldMin: 1,
        yieldMax: 2,
        remaining: 10
      }
    ],
    approachDifficulties: {
      direct: 10,
      signals: 7,
      careful: 9
    },
    progress: 0,
    requiredProgress: 3
  },
  buriedServiceBlock: {
    id: 'buriedServiceBlock',
    name: 'Южные равнины',
    status: 'hidden',
    description: 'На юге тянется ровная пыльная поверхность. Она выглядит пустой, но следы ветра там обрываются слишком резко.',
    resourceNodes: [
      {
        key: 'components',
        action: 'Проверить старые крепления',
        yieldMin: 1,
        yieldMax: 2,
        remaining: 12
      }
    ],
    discoverProgressRequired: 1,
    approachDifficulties: {
      direct: 9,
      signals: 8,
      careful: 7
    },
    progress: 0,
    requiredProgress: 3
  },
  oldFallLine: {
    id: 'oldFallLine',
    name: 'Восточное косогорье',
    status: 'hidden',
    description: 'Косой каменный склон с плотными осыпями. В трещинах могут застревать тяжёлые металлические фрагменты.',
    resourceNodes: [
      {
        key: 'metal',
        action: 'Собрать тяжёлый лом',
        yieldMin: 2,
        yieldMax: 3,
        remaining: 24
      }
    ],
    discoverProgressRequired: 1,
    approachDifficulties: {
      direct: 7,
      signals: 9,
      careful: 8
    },
    progress: 0,
    requiredProgress: 3
  },
  dustyRepeater: {
    id: 'dustyRepeater',
    name: 'Котлован',
    status: 'hidden',
    description: 'Глубокая воронка с осыпавшимися краями. На дне видны тёмные пятна старой техники или обгоревшего груза.',
    resourceNodes: [
      {
        key: 'components',
        action: 'Разобрать старую технику',
        yieldMin: 1,
        yieldMax: 3,
        remaining: 14
      }
    ],
    discoverProgressRequired: 1,
    approachDifficulties: {
      direct: 10,
      signals: 8,
      careful: 9
    },
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

let state = null;

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
  mobileStrength: document.getElementById('mobileStrength'),
  mobileWisdom: document.getElementById('mobileWisdom'),
  mobileAgility: document.getElementById('mobileAgility'),
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
  toggleLog: document.getElementById('toggleLog'),
  selectedObject: document.querySelector('.selected-object')
};

const reducedMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };
const mobileCityQuery = window.matchMedia
  ? window.matchMedia('(max-width: 767px)')
  : { matches: false };
const mobileLockedModeFallback = 'territories';
const typewriterState = {
  timerId: 0,
  token: 0,
  currentKey: '',
  isTyping: false
};

function isStorageResource(resourceKey) {
  return Object.prototype.hasOwnProperty.call(baseResourceLimits, resourceKey);
}

function getResourceLimit(resourceKey, shipSystems) {
  let limit = savedNumber(baseResourceLimits[resourceKey], 0);
  const systems = shipSystems || (state ? state.shipSystems : null);

  if (!systems) {
    return limit;
  }

  const effectKeys = Object.keys(shipStorageLimitEffects);
  for (let i = 0; i < effectKeys.length; i++) {
    const systemKey = effectKeys[i];
    const effect = shipStorageLimitEffects[systemKey];
    if (!effect.resources.includes(resourceKey)) {
      continue;
    }

    const system = systems[systemKey];
    const status = system ? system.status : shipSystemBlueprints[systemKey].status;
    limit += Math.max(0, savedNumber(effect[status], 0));
  }

  return limit;
}


function getEnergyBalanceBonus(shipSystems) {
  const systems = shipSystems || (state ? state.shipSystems : null);
  const system = systems ? systems[energyCircuitSystemKey] : null;
  const status = system ? system.status : shipSystemBlueprints[energyCircuitSystemKey].status;

  return Math.max(0, savedNumber(energyCircuitBalanceEffects[status], 0));
}

function getAvailableEnergy(shipSystems) {
  return Math.max(0, savedNumber(initialResources.energy, 0)) + getEnergyBalanceBonus(shipSystems);
}

function getEnergyCircuitEffectLine(systemKey, status) {
  if (systemKey !== energyCircuitSystemKey) {
    return '';
  }

  const bonus = Math.max(0, savedNumber(energyCircuitBalanceEffects[status], 0));
  return bonus > 0 ? 'Эффект: баланс энергии +' + bonus : '';
}

function getLifeSupportDifficultyBonus(status) {
  if (status === 'stabilized') return 1;
  if (status === 'improved') return 2;
  return 0;
}

function getLifeSupportEffectLine(systemKey, status) {
  if (systemKey !== lifeSupportSystemKey) {
    return '';
  }

  if (status === 'stabilized') return 'Эффект: проверки воды и еды проще на 1';
  if (status === 'improved') return 'Эффект: проверки воды и еды проще на 2';
  if (status === 'damaged') return 'Эффект: базовые действия воды';
  return '';
}

function getEngineeringBayStorageLimitBonus(status) {
  return Math.max(0, savedNumber(engineeringBayStorageLimitEffects[status], 0));
}

function normalizeResources(resources, shipSystems) {
  const normalized = { ...initialResources, ...(resources || {}) };
  const resourceKeys = Object.keys(initialResources);

  for (let i = 0; i < resourceKeys.length; i++) {
    const key = resourceKeys[i];
    normalized[key] = Math.max(0, savedNumber(normalized[key], initialResources[key]));
  }
  normalized.energy = getAvailableEnergy(shipSystems);

  for (let i = 0; i < storageResourceKeys.length; i++) {
    const key = storageResourceKeys[i];
    normalized[key] = Math.min(getResourceLimit(key, shipSystems), Math.max(0, savedNumber(normalized[key], initialResources[key] || 0)));
  }

  return normalized;
}

function getShipStorageLimitBonus(systemKey, status) {
  const effect = shipStorageLimitEffects[systemKey];
  if (!effect) {
    return 0;
  }

  return Math.max(0, savedNumber(effect[status], 0));
}

function getShipStorageLimitEffectLine(systemKey, status) {
  const effect = shipStorageLimitEffects[systemKey];
  const bonus = getShipStorageLimitBonus(systemKey, status);

  if (!effect || bonus <= 0) {
    return '';
  }

  return systemKey === engineeringBaySystemKey ? 'Эффект: лимит ресурсов +' + bonus : 'Эффект: лимит ' + effect.label + ' +' + bonus;
}

function getLivingBlockStatus(shipSystems) {
  const systems = shipSystems || (state ? state.shipSystems : null);
  const system = systems ? systems[livingBlockSystemKey] : null;

  return system ? system.status : '';
}

function getRestStaminaRecovery(shipSystems) {
  const status = getLivingBlockStatus(shipSystems);

  return savedNumber(livingBlockRestRecovery[status], restStaminaRecovery);
}

function getRestNarrative() {
  const status = getLivingBlockStatus();

  return livingBlockRestNarratives[status] || livingBlockRestNarratives.damaged;
}

function getNavigationNodeStatus(shipSystems) {
  const systems = shipSystems || (state ? state.shipSystems : null);
  const system = systems ? systems[navigationNodeSystemKey] : null;

  return system ? system.status : '';
}

function getNavigationResearchDifficultyBonus(shipSystems) {
  const status = getNavigationNodeStatus(shipSystems);

  return Math.max(0, savedNumber(navigationResearchDifficultyEffects[status], 0));
}

function getEffectiveDifficulty(baseDifficulty, bonus) {
  return Math.max(1, savedNumber(baseDifficulty, 1) - Math.max(0, savedNumber(bonus, 0)));
}

function getResearchEffectiveDifficulty(baseDifficulty, shipSystems) {
  return getEffectiveDifficulty(baseDifficulty, getNavigationResearchDifficultyBonus(shipSystems));
}

function formatEffectiveDifficulty(baseDifficulty, effectiveDifficulty) {
  const base = Math.max(1, savedNumber(baseDifficulty, 1));
  const effective = Math.max(1, savedNumber(effectiveDifficulty, base));

  if (effective < base) {
    return 'Сложность: ' + effective + ' (-' + (base - effective) + ')';
  }

  return 'Сложность: ' + effective;
}

function getLivingBlockRestEffectLine(systemKey, status) {
  if (systemKey !== livingBlockSystemKey) {
    return '';
  }

  const recovery = savedNumber(livingBlockRestRecovery[status], restStaminaRecovery);
  return 'Эффект: отдых ' + formatStaminaGain(recovery);
}

function getShipStorageLimitLog(systemKey) {
  if (systemKey !== engineeringBaySystemKey) {
    return '';
  }

  return 'Лимит ресурсов увеличен: вода ' + getResourceLimit('water') + ', металл ' + getResourceLimit('metal') + ', компоненты ' + getResourceLimit('components') + ', еда ' + getResourceLimit('food') + '.';
}

function didGainHitResourceLimit(plannedGain, actualGain) {
  const keys = Object.keys(plannedGain || {});

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    if (isStorageResource(resource) && savedNumber(plannedGain[resource], 0) > savedNumber(actualGain[resource], 0)) {
      return true;
    }
  }

  return false;
}

function createInitialState() {
  const next = {
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
    questProgress: {},
    hero: createHero(),
    shipSystems: createSystems(),
    territories: createTerritories(),
    logMessages: ['Аварийный интерфейс Аурелии-18 запущен. Выберите сцену и объект для действий Героя.']
  };

  next.resources = normalizeResources(next.resources, next.shipSystems);
  return next;
}

function createHero() {
  return JSON.parse(JSON.stringify(initialHero));
}

function getLevelConfig(level) {
  const numericLevel = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(level, 1))));
  return LEVEL_CONFIG[numericLevel - 1] || LEVEL_CONFIG[0];
}

function getXpToNextLevel(level) {
  return getLevelConfig(level).xpToNext;
}

function getTotalXpForLevel(level) {
  const targetLevel = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(level, 1))));
  let total = 0;

  for (let i = 1; i < targetLevel; i++) {
    total += savedNumber(getXpToNextLevel(i), 0);
  }

  return total;
}

function getLevelForExperience(experience) {
  const totalExperience = Math.max(0, Math.floor(savedNumber(experience, 0)));
  let level = 1;

  while (level < maxHeroLevel) {
    const xpToNext = getXpToNextLevel(level);
    if (xpToNext === null || totalExperience < getTotalXpForLevel(level + 1)) {
      break;
    }
    level += 1;
  }

  return level;
}

function getCurrentLevelProgress(hero) {
  const sourceHero = hero || state.hero || createHero();
  const level = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(sourceHero.level, 1))));
  const xpToNext = getXpToNextLevel(level);
  const totalExperience = Math.max(0, Math.floor(savedNumber(sourceHero.experience, 0)));

  if (xpToNext === null) {
    return { level, current: 0, required: null, isMaxLevel: true };
  }

  return {
    level,
    current: Math.max(0, totalExperience - getTotalXpForLevel(level)),
    required: xpToNext,
    isMaxLevel: false
  };
}

function addHeroExperience(amount, sourceText) {
  state.hero = normalizeHeroProgression(state.hero);
  const experienceGain = Math.max(0, Math.floor(savedNumber(amount, 0)));

  if (experienceGain <= 0) {
    return;
  }

  state.hero.experience += experienceGain;
  if (sourceText) {
    state.logMessages.unshift('Опыт +' + experienceGain + ': ' + sourceText + '.');
    state.logMessages = state.logMessages.slice(0, maxLogMessages);
  }
  checkHeroLevelUps();
  saveGame();
  render();
}

function checkHeroLevelUps() {
  state.hero = normalizeHeroProgression(state.hero);
  const targetLevel = getLevelForExperience(state.hero.experience);

  while (state.hero.level < targetLevel && state.hero.level < maxHeroLevel) {
    state.hero.level += 1;
    applyLevelReward(state.hero.level);
  }
}

function applyLevelReward(level) {
  const config = getLevelConfig(level);
  const abilityReward = savedNumber(config.abilityPointsReward, 0);
  const skillReward = savedNumber(config.skillPointsReward, 0);

  state.hero.unspentAbilityPoints += abilityReward;
  state.hero.unspentSkillPoints += skillReward;
  state.logMessages.unshift('Герой достиг уровня ' + config.level + '.');
  if (abilityReward > 0 || skillReward > 0) {
    state.logMessages.unshift('Получено: очки способностей +' + abilityReward + ', очки навыков +' + skillReward + '.');
  }
  state.logMessages = state.logMessages.slice(0, maxLogMessages);
}

function normalizeHeroProgression(hero) {
  const defaults = createHero();
  const normalized = { ...defaults, ...(hero || {}) };
  normalized.stats = { ...defaults.stats, ...(normalized.stats || {}) };
  normalized.equipment = { ...defaults.equipment, ...(normalized.equipment || {}) };
  normalized.thoughts = Array.isArray(normalized.thoughts) ? normalized.thoughts : defaults.thoughts.slice();
  normalized.items = Array.isArray(normalized.items) ? normalized.items : defaults.items.slice();
  normalized.level = Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(normalized.level, getLevelForExperience(normalized.experience)))));
  normalized.experience = Math.max(0, Math.floor(savedNumber(normalized.experience, 0)));
  normalized.unspentAbilityPoints = Math.max(0, Math.floor(savedNumber(normalized.unspentAbilityPoints, 0)));
  normalized.unspentSkillPoints = Math.max(0, Math.floor(savedNumber(normalized.unspentSkillPoints, 1)));
  normalized.spentAbilityPoints = {
    health: Math.max(0, Math.floor(savedNumber(normalized.spentAbilityPoints && normalized.spentAbilityPoints.health, 0))),
    stamina: Math.max(0, Math.floor(savedNumber(normalized.spentAbilityPoints && normalized.spentAbilityPoints.stamina, 0)))
  };
  normalized.spentSkillPoints = {
    strength: Math.max(0, Math.floor(savedNumber(normalized.spentSkillPoints && normalized.spentSkillPoints.strength, 0))),
    wisdom: Math.max(0, Math.floor(savedNumber(normalized.spentSkillPoints && normalized.spentSkillPoints.wisdom, 0))),
    agility: Math.max(0, Math.floor(savedNumber(normalized.spentSkillPoints && normalized.spentSkillPoints.agility, 0)))
  };
  return normalized;
}

function createSystems() {
  const systems = {};
  const keys = Object.keys(shipSystemBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    systems[key] = normalizeShipSystem({
      status: shipSystemBlueprints[key].status
    });
  }

  return systems;
}


function cloneResourceNode(node) {
  return {
    key: node.key,
    action: node.action,
    yieldMin: node.yieldMin,
    yieldMax: node.yieldMax,
    remaining: node.remaining
  };
}

function cloneTerritoryBlueprint(blueprint) {
  const territory = {
    ...blueprint,
    resourceNodes: getBlueprintResourceNodes(blueprint).map(cloneResourceNode)
  };

  if (blueprint.approachDifficulties) {
    territory.approachDifficulties = { ...blueprint.approachDifficulties };
  }

  return territory;
}

function getBlueprintResourceNodes(territory) {
  if (Array.isArray(territory.resourceNodes) && territory.resourceNodes.length > 0) {
    return territory.resourceNodes;
  }

  if (!territory.resource) {
    return [];
  }

  return [{
    key: territory.resource,
    action: territory.action || territoryGatherActions[territory.resource] || 'Собрать ресурс',
    yieldMin: territory.yieldMin,
    yieldMax: territory.yieldMax,
    remaining: territory.remaining
  }];
}

function createTerritories() {
  const territories = {};
  const keys = Object.keys(territoryBlueprints);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    territories[key] = cloneTerritoryBlueprint(territoryBlueprints[key]);
  }

  return territories;
}


function normalizeTerritoryResourceNodes(territory) {
  territory.resourceNodes = getBlueprintResourceNodes(territory).map(function (node) {
    return {
      key: node.key,
      action: node.action || territoryGatherActions[node.key] || 'Собрать ресурс',
      yieldMin: Math.max(0, savedNumber(node.yieldMin, 1)),
      yieldMax: Math.max(Math.max(0, savedNumber(node.yieldMin, 1)), savedNumber(node.yieldMax, node.yieldMin)),
      remaining: Math.max(0, savedNumber(node.remaining, 0))
    };
  });

  const primaryNode = territory.resourceNodes[0];
  territory.resource = primaryNode ? primaryNode.key : '';
  territory.action = primaryNode ? primaryNode.action : '';
  territory.yieldMin = primaryNode ? primaryNode.yieldMin : 0;
  territory.yieldMax = primaryNode ? primaryNode.yieldMax : 0;
  territory.remaining = primaryNode ? primaryNode.remaining : 0;
}

function getTerritoryResourceNodes(territory) {
  if (!territory) {
    return [];
  }

  normalizeTerritoryResourceNodes(territory);
  return territory.resourceNodes;
}

function getTerritoryResourceNode(territory, nodeKey) {
  const nodes = getTerritoryResourceNodes(territory);
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].key === nodeKey) {
      return nodes[i];
    }
  }

  return nodes[0] || null;
}

function areAllTerritoryNodesDepleted(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  if (nodes.length === 0) {
    return false;
  }

  for (let i = 0; i < nodes.length; i++) {
    if (getResourceNodeRemaining(nodes[i]) > 0) {
      return false;
    }
  }

  return true;
}

function syncTerritoryPrimaryResourceFields(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  const primaryNode = nodes[0];
  territory.resource = primaryNode ? primaryNode.key : '';
  territory.action = primaryNode ? primaryNode.action : '';
  territory.yieldMin = primaryNode ? primaryNode.yieldMin : 0;
  territory.yieldMax = primaryNode ? primaryNode.yieldMax : 0;
  territory.remaining = primaryNode ? primaryNode.remaining : 0;
}

function normalizeTerritoryProgress(territory) {
  normalizeTerritoryResourceNodes(territory);
  territory.requiredProgress = Math.max(1, savedNumber(territory.requiredProgress, 1));
  if (territory.difficulty !== undefined) {
    territory.difficulty = Math.max(1, savedNumber(territory.difficulty, 1));
  }

  if (territory.approachDifficulties) {
    const approachKeys = Object.keys(researchApproaches);
    for (let i = 0; i < approachKeys.length; i++) {
      const approachKey = approachKeys[i];
      territory.approachDifficulties[approachKey] = Math.max(1, savedNumber(territory.approachDifficulties[approachKey], territory.difficulty || 8));
    }
  }

  if ((territory.status === 'open' || territory.status === 'depleted') && areAllTerritoryNodesDepleted(territory)) {
    territory.status = 'depleted';
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

function isCityLockedOnMobile() {
  return Boolean(mobileCityQuery.matches);
}

function getAllowedMode(mode) {
  return mode === 'city' && isCityLockedOnMobile() ? mobileLockedModeFallback : mode;
}

function protectMobileMode() {
  const allowedMode = getAllowedMode(state.mode);

  if (allowedMode === state.mode) {
    return false;
  }

  state.mode = allowedMode;
  state.actionPanelMode = 'actions';
  state.inspectedObjectId = '';
  clearNarrativeMessage();
  state.activeResearchEvent = null;
  return true;
}

function switchMode(mode) {
  if (!['hero', 'territories', 'ship', 'city'].includes(mode)) {
    return;
  }

  mode = getAllowedMode(mode);
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
    clearNarrativeMessage();
    addLog(formatMissingResourcesMessage(cost));
    return;
  }

  spendStamina();
  payCost(cost);
  const actualGain = entry.result ? addResources(entry.result) : null;
  if (selection) {
    setNarrativeMessage(selection, 'Герой выполняет выбранное действие. Место отвечает коротким изменением в протоколе, а подробная городская сцена пока остаётся заглушкой.');
  }
  addLog(formatCityActionLog(entry, actualGain));
}

function addResources(gain) {
  const actualGain = {};
  const keys = Object.keys(gain || {});

  state.resources = normalizeResources(state.resources, state.shipSystems);
  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    const requested = Math.max(0, savedNumber(gain[resource], 0));

    if (isStorageResource(resource)) {
      const before = savedNumber(state.resources[resource], 0);
      const limit = getResourceLimit(resource);
      const received = Math.max(0, Math.min(requested, limit - before));
      state.resources[resource] = Math.min(limit, before + received);
      actualGain[resource] = received;
    } else {
      if (state.resources[resource] === undefined) {
        state.resources[resource] = 0;
      }
      state.resources[resource] = savedNumber(state.resources[resource], 0) + requested;
      actualGain[resource] = requested;
    }
  }
  state.resources = normalizeResources(state.resources, state.shipSystems);

  return actualGain;
}


function getLifeSupportActions(status) {
  const rank = savedNumber(shipStatusRanks[status], 0);
  const keys = Object.keys(lifeSupportActionBlueprints);
  const actions = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const action = lifeSupportActionBlueprints[key];
    if (rank >= action.minStatusRank) {
      actions.push({ key, ...action });
    }
  }

  return actions;
}

function getLifeSupportActionDifficulty(action, status) {
  const bonus = action.usesLifeSupportBonus ? getLifeSupportDifficultyBonus(status) : 0;
  return getEffectiveDifficulty(action.baseDifficulty, bonus);
}

function formatLifeSupportActionNote(action, status) {
  const difficulty = getLifeSupportActionDifficulty(action, status);
  const statLabel = heroStatLabels[action.statKey] || 'Характеристика';
  return statLabel + ' · ' + formatEffectiveDifficulty(action.baseDifficulty, difficulty);
}

function resolveLifeSupportCheck(action, status) {
  const roll = roll2d6();
  const statKey = action.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const difficulty = getLifeSupportActionDifficulty(action, status);
  const result = getLifeSupportCheckResult(roll.total, total, difficulty);

  return {
    roll,
    statKey,
    statLabel,
    statValue,
    total,
    difficulty,
    resultLabel: result.label,
    resultKey: result.key
  };
}

function getLifeSupportCheckResult(naturalTotal, total, difficulty) {
  if (naturalTotal === 2) return { label: 'Критический провал', key: 'criticalFailure' };
  if (naturalTotal === 12) return { label: 'Критический успех', key: 'criticalSuccess' };
  if (total < difficulty) return { label: 'Провал', key: 'failure' };
  if (total === difficulty) return { label: 'Частичный успех', key: 'partial' };
  return { label: 'Успех', key: 'success' };
}

function performLifeSupportAction(actionKey) {
  const system = state.shipSystems[lifeSupportSystemKey];
  if (!system) {
    return;
  }

  normalizeShipSystem(system);
  const actions = getLifeSupportActions(system.status);
  const action = actions.find(function (item) { return item.key === actionKey; });
  if (!action) {
    return;
  }

  const selection = getCurrentSelection();
  if (!hasEnoughStamina(selection)) {
    return;
  }

  const missing = getMissingResources(action.cost);
  if (missing.length > 0) {
    clearNarrativeMessage();
    addLog(formatMissingResourcesMessage(action.cost));
    return;
  }

  spendStamina();
  payCost(action.cost);
  const check = resolveLifeSupportCheck(action, system.status);
  const planned = Math.max(0, savedNumber(action.gains[check.resultKey], 0));
  const plannedGain = { [action.resource]: planned };
  const actualGain = addResources(plannedGain);
  const limitReached = didGainHitResourceLimit(plannedGain, actualGain);
  const currentSelection = getCurrentSelection();

  state.actionPanelMode = 'actions';
  if (currentSelection) {
    setNarrativeMessage(currentSelection, action.title + ': ' + String(check.resultLabel).toLowerCase() + '. Получено: ' + formatCompactGain(actualGain) + (limitReached ? ' · лимит' : '') + '.');
  }

  addLog(action.title + ': ' + formatCompactCheckResult(check, formatCompactGain(actualGain)) + (limitReached ? ' · лимит' : ''));
}

function repairSystem(key) {
  const system = state.shipSystems[key];
  const blueprint = shipSystemBlueprints[key];

  if (!system || !blueprint) {
    return;
  }

  normalizeShipSystem(system);
  const stage = getShipRepairStage(system);
  const selection = getCurrentSelection();

  if (!stage) {
    const message = 'Система улучшена и работает в усиленном режиме.';
    clearNarrativeMessage();
    addLog(message + ' ' + blueprint.name + '.');
    return;
  }

  if (!hasEnoughStamina(selection)) {
    return;
  }

  const missing = getMissingResources(stage.cost);
  if (missing.length > 0) {
    clearNarrativeMessage();
    addLog(formatMissingResourcesMessage(stage.cost));
    return;
  }

  spendStamina();
  payCost(stage.cost);

  const previousStatus = system.status;
  const check = resolveShipRepairCheck(stage);
  const progressGain = getShipRepairProgressGain(check);
  const requiredProgress = stage.requiredProgress;
  system.requiredProgress = requiredProgress;
  system.progress = Math.min(requiredProgress, savedNumber(system.progress, 0) + progressGain);

  const advanced = system.progress >= requiredProgress;
  if (advanced) {
    system.status = stage.nextStatus;
    system.progress = 0;
    system.requiredProgress = getShipRequiredProgress(system.status);
    state.resources = normalizeResources(state.resources, state.shipSystems);
  }

  state.actionPanelMode = 'actions';
  clearNarrativeMessage();

  addLog(formatCompactCheckResult(check, 'прогресс +' + progressGain));

  if (advanced) {
    addLog(stage.transitionLabel + ': ' + blueprint.name + '. Новый статус: ' + getShipStatusLabel(system.status) + '.');
    if (getShipStorageLimitBonus(key, system.status) !== getShipStorageLimitBonus(key, previousStatus)) {
      addLog(getShipStorageLimitLog(key));
    }
  }
}

function diagnoseSystem(key) {
  selectSystem(key);
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

function gatherTerritory(key, nodeKey) {
  const territory = state.territories[key];

  if (!territory || !canGatherTerritory(territory)) {
    return;
  }

  const node = getTerritoryResourceNode(territory, nodeKey);
  if (!node) {
    return;
  }

  const selection = getCurrentSelection();

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  const resource = node.key;
  const check = resolveGatherCheck(resource, territory, node);
  const wasDepleted = territory.status === 'depleted';
  let plannedGain = 0;

  if (check.gained > 0) {
    if (wasDepleted) {
      plannedGain = 1;
    } else {
      node.remaining = getResourceNodeRemaining(node);
      plannedGain = Math.min(check.gained, node.remaining);
    }
  } else if (!wasDepleted) {
    node.remaining = getResourceNodeRemaining(node);
  }

  const plannedResourceGain = { [resource]: plannedGain };
  const gain = addResources(plannedResourceGain);
  const actualGain = savedNumber(gain[resource], 0);

  if (!wasDepleted && actualGain > 0) {
    node.remaining = Math.max(0, node.remaining - actualGain);
  }

  const depletedNow = !wasDepleted && areAllTerritoryNodesDepleted(territory);
  if (depletedNow) {
    territory.status = 'depleted';
  }
  syncTerritoryPrimaryResourceFields(territory);

  const remaining = getResourceNodeRemaining(node);
  if (selection) {
    setNarrativeMessage(selection, buildGatherResultPanel(check, actualGain, remaining, depletedNow));
  }
  addLog(formatCompactGatherResult(check, gain, didGainHitResourceLimit(plannedResourceGain, gain)));

  if (depletedNow) {
    addLog('Запасы клетки исчерпаны. Зона стала истощённой: ' + territory.name + '.');
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
  const check = resolveDiscoverCheck(approach, territory, approachKey);
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

  addLog(formatCompactCheckResult(check, 'прогресс +' + progressGain));

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
  const check = resolveResearchCheck(approach, territory, approachKey);
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

  addLog(formatCompactCheckResult(check, 'прогресс +' + progressGain));

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

function normalizeShipSystem(system) {
  if (!system || typeof system !== 'object') {
    return { status: 'damaged', progress: 0, requiredProgress: getShipRequiredProgress('damaged') };
  }

  if (!shipStatusLabels[system.status]) {
    system.status = 'damaged';
  }

  const requiredProgress = getShipRequiredProgress(system.status);
  system.requiredProgress = requiredProgress;
  system.progress = clampSavedNumber(system.progress, 0, 0, requiredProgress);

  if (system.status === 'improved') {
    system.progress = 0;
  }

  return system;
}

function getShipRepairStage(system) {
  return system ? shipRepairStages[system.status] : null;
}

function getShipRequiredProgress(status) {
  const stage = shipRepairStages[status];
  return stage ? stage.requiredProgress : 0;
}

function resolveShipRepairCheck(stage) {
  const roll = roll2d6();
  const statKey = stage.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const difficulty = Math.max(1, savedNumber(stage.difficulty, 8));
  const result = getShipRepairCheckResult(roll.total, total, difficulty);

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

function getShipRepairCheckResult(naturalTotal, total, difficulty) {
  if (naturalTotal === 2) return { label: 'Критический провал', progressGain: 0 };
  if (naturalTotal === 12) return { label: 'Критический успех', progressGain: 3 };
  if (total < difficulty) return { label: 'Провал', progressGain: 0 };
  if (total === difficulty) return { label: 'Частичный успех', progressGain: 1 };
  return { label: 'Успех', progressGain: 2 };
}

function getShipRepairProgressGain(check) {
  return Math.max(0, savedNumber(check.progressGain, 0));
}

function getShipProgressText(system) {
  normalizeShipSystem(system);
  if (system.status === 'improved') {
    return 'Система улучшена и работает в усиленном режиме';
  }

  return 'Прогресс: ' + system.progress + ' / ' + system.requiredProgress;
}

function formatActionCostText(cost) {
  return formatCompactCost(cost, { includeStamina: true });
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


function getTerritoryApproachBaseDifficulty(territory, approachKey) {
  const difficulties = territory && territory.approachDifficulties ? territory.approachDifficulties : null;
  if (difficulties && difficulties[approachKey] !== undefined) {
    return Math.max(1, savedNumber(difficulties[approachKey], 8));
  }

  return Math.max(1, savedNumber(territory && territory.difficulty, 8));
}

function resolveResearchCheck(approach, territory, approachKey) {
  const roll = roll2d6();
  const statKey = approach.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const baseDifficulty = getTerritoryApproachBaseDifficulty(territory, approachKey);
  const difficulty = getResearchEffectiveDifficulty(baseDifficulty);
  const result = getResearchCheckResult(roll.total, total, difficulty);

  return {
    roll,
    statKey,
    statLabel,
    statValue,
    total,
    baseDifficulty,
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

function resolveDiscoverCheck(approach, territory, approachKey) {
  const roll = roll2d6();
  const statKey = approach.statKey || 'strength';
  const statLabel = heroStatLabels[statKey] || 'Характеристика';
  const statValue = getHeroStatValue(statKey);
  const total = roll.total + statValue;
  const baseDifficulty = getTerritoryApproachBaseDifficulty(territory, approachKey);
  const difficulty = getResearchEffectiveDifficulty(baseDifficulty);
  const result = getDiscoverCheckResult(roll.total, total, difficulty);

  return {
    roll,
    statKey,
    statLabel,
    statValue,
    total,
    baseDifficulty,
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

function resolveGatherCheck(resource, territory, node) {
  const roll = roll2d6();
  const result = getGatherCheckResult(roll.total, node || territory);

  return {
    resource,
    roll,
    resultLabel: result.label,
    gained: result.gained
  };
}

function getGatherCheckResult(total, resourceNode) {
  const yieldMin = Math.max(0, savedNumber(resourceNode.yieldMin, 1));
  const yieldMax = Math.max(yieldMin, savedNumber(resourceNode.yieldMax, yieldMin));

  if (total === 2) return { label: 'Критический провал', gained: 0 };
  if (total <= 5) return { label: 'Провал', gained: 0 };
  if (total <= 8) return { label: 'Частичный успех', gained: yieldMin };
  if (total <= 11) return { label: 'Успех', gained: Math.max(yieldMin, yieldMax - 1) };
  return { label: 'Критический успех', gained: yieldMax };
}

function buildGatherResultPanel(check, actualGain, remaining, depletedNow) {
  const lines = [
    formatCompactGatherResult(check, { [check.resource]: actualGain }) + '. Остаток: ' + remaining + '.'
  ];

  if (depletedNow) {
    lines.push('Запас исчерпан. Зона истощена.');
  }

  return lines.join(' ');
}

function buildResearchResultPanel(territory, check, progressGain, opened, approach) {
  const summary = formatCompactCheckResult(check, 'прогресс +' + progressGain) + '. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';

  if (opened) {
    return approach.resultText + '\n' + summary + ' Зона открыта: ' + territory.name + '.';
  }

  return approach.resultText + '\n' + summary;
}

function buildDiscoverResultPanel(territory, check, progressGain, discovered, approach) {
  const summary = formatCompactCheckResult(check, 'прогресс +' + progressGain) + '. Поиск: ' + territory.discoverProgress + ' / ' + territory.discoverProgressRequired + '.';

  if (discovered) {
    return approach.resultText + '\n' + summary + ' Зона обнаружена: ' + territory.name + '.';
  }

  return approach.resultText + '\n' + summary;
}

function getResearchApproach(approachKey) {
  return researchApproaches[approachKey] || researchApproaches.direct;
}

function buildResearchRollLine(check) {
  return formatCompactCheckResult(check);
}

function formatSignedModifier(value) {
  return value > 0 ? '+' + value : String(value);
}

function getTerritoryOutputText(key) {
  const territory = state.territories[key] || territoryBlueprints[key];
  const nodes = getTerritoryResourceNodes(territory);

  if (!territory || nodes.length === 0) {
    return 'ресурс скрыт';
  }

  return nodes.map(function (node) {
    return getResourceNodeYieldText(node) + ' ' + resourceGenitiveLabels[node.key];
  }).join(', ');
}

function getTerritoryResourceText(territory) {
  const nodes = getTerritoryResourceNodes(territory);

  if (nodes.length === 0) {
    return 'ресурс скрыт';
  }

  return nodes.map(function (node) {
    return resourceLabels[node.key] || node.key;
  }).join(', ');
}

function getResourceNodeYieldText(node) {
  const min = savedNumber(node.yieldMin, NaN);
  const max = savedNumber(node.yieldMax, NaN);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return 'добыча скрыта';
  }

  return min === max ? String(min) : min + '–' + max;
}

function getTerritoryYieldText(territory) {
  const nodes = getTerritoryResourceNodes(territory);

  if (nodes.length === 0) {
    return 'добыча скрыта';
  }

  return nodes.map(function (node) {
    return (resourceLabels[node.key] || node.key) + ': ' + getResourceNodeYieldText(node);
  }).join('; ');
}

function getTerritoryOpenSummaryLines(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  const lines = [];

  for (let i = 0; i < nodes.length; i++) {
    lines.push(getResourceNodeSummaryLine(nodes[i], territory.status));
  }

  return lines;
}

function getTerritoryShortSummaryLine(territory) {
  return getTerritoryOpenSummaryLines(territory).join(' · ');
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

function getResourceNodeRemaining(node) {
  return Math.max(0, savedNumber(node.remaining, 0));
}

function getTerritoryRemaining(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  let total = 0;

  for (let i = 0; i < nodes.length; i++) {
    total += getResourceNodeRemaining(nodes[i]);
  }

  return total;
}

function getResourceNodeSummaryLine(node, territoryStatus) {
  const label = resourceLabels[node.key] || node.key;
  if (territoryStatus === 'depleted') {
    return label + ': добыча минимальная, 1 за действие';
  }

  return label + ': добыча ' + getResourceNodeYieldText(node) + ', запас ' + getResourceNodeRemaining(node);
}

function getTerritoryStockText(territory) {
  if (territory.status === 'depleted') {
    return 'Запасы истощены. Минимальная добыча: 1 на каждый ресурсный узел';
  }

  return getTerritoryResourceNodes(territory).map(function (node) {
    return (resourceLabels[node.key] || node.key) + ': запас ' + getResourceNodeRemaining(node);
  }).join('; ');
}

function canGatherTerritory(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  return (territory.status === 'open' || territory.status === 'depleted') && nodes.length > 0;
}

function getMissingResources(cost) {
  return Object.keys(getMissingResourceCosts(cost));
}

function getMissingResourceCosts(cost) {
  const missing = {};
  const keys = Object.keys(cost || {});

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    const required = savedNumber(cost[resource], 0);
    const available = savedNumber(state.resources[resource], 0);
    const shortage = required - available;
    if (shortage > 0) {
      missing[resource] = shortage;
    }
  }

  return missing;
}

function formatMissingResourcesMessage(cost) {
  return 'Не хватает: ' + formatCompactResourceList(getMissingResourceCosts(cost));
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
  state.resources = normalizeResources(state.resources, state.shipSystems);
}

function normalizeHeroCondition(condition) {
  const normalized = { ...initialHeroCondition, ...(condition || {}) };
  const savedMaxStamina = savedNumber(normalized.maxStamina, initialHeroCondition.maxStamina);
  const maxStamina = savedMaxStamina > 0 ? savedMaxStamina : initialHeroCondition.maxStamina;
  const savedMaxHealth = savedNumber(normalized.maxHealth, initialHeroCondition.maxHealth);
  const maxHealth = savedMaxHealth > 0 ? savedMaxHealth : initialHeroCondition.maxHealth;

  normalized.maxStamina = maxStamina;
  normalized.stamina = clampSavedNumber(normalized.stamina, initialHeroCondition.stamina, 0, maxStamina);
  normalized.maxHealth = maxHealth;
  normalized.health = clampSavedNumber(normalized.health, initialHeroCondition.health, 0, maxHealth);
  normalized.credits = Math.max(0, savedNumber(normalized.credits, initialHeroCondition.credits));

  return normalized;
}

function hasEnoughStamina(selection) {
  state.heroCondition = normalizeHeroCondition(state.heroCondition);

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
  state.heroCondition = normalizeHeroCondition(state.heroCondition);
  state.heroCondition.stamina = Math.max(0, state.heroCondition.stamina - staminaActionCost);
}

function recoverStamina(amount) {
  state.heroCondition = normalizeHeroCondition(state.heroCondition);

  const before = state.heroCondition.stamina;
  const maxStamina = state.heroCondition.maxStamina;
  const requested = Math.max(0, savedNumber(amount, 0));
  state.heroCondition.stamina = Math.min(maxStamina, before + requested);

  return state.heroCondition.stamina - before;
}

function formatStaminaGain(amount) {
  return '+' + amount + getCompactResourceLabel('stamina');
}

function spendAbilityPoint(target) {
  state.hero = normalizeHeroProgression(state.hero);
  state.heroCondition = normalizeHeroCondition(state.heroCondition);

  if (!['health', 'stamina'].includes(target)) {
    addLog('Неизвестное направление развития способности.');
    return;
  }

  if (state.hero.unspentAbilityPoints <= 0) {
    addLog('Нет нераспределённых очков способностей.');
    return;
  }

  if (target === 'health') {
    state.heroCondition.maxHealth += 5;
    state.heroCondition.health = Math.min(state.heroCondition.maxHealth, state.heroCondition.health + 5);
    state.hero.spentAbilityPoints.health += 1;
    state.hero.unspentAbilityPoints -= 1;
    addLog('Развитие: максимум здоровья +5.');
    return;
  }

  state.heroCondition.maxStamina += 5;
  state.heroCondition.stamina = Math.min(state.heroCondition.maxStamina, state.heroCondition.stamina + 5);
  state.hero.spentAbilityPoints.stamina += 1;
  state.hero.unspentAbilityPoints -= 1;
  addLog('Развитие: максимум выносливости +5.');
}

function spendSkillPoint(statKey) {
  state.hero = normalizeHeroProgression(state.hero);
  const statKeys = Object.keys(heroStatLabels);

  if (!statKeys.includes(statKey)) {
    addLog('Неизвестная характеристика для развития.');
    return;
  }

  if (state.hero.unspentSkillPoints <= 0) {
    addLog('Нет нераспределённых очков навыков.');
    return;
  }

  state.hero.stats[statKey] = Math.floor(savedNumber(state.hero.stats[statKey], 1));
  if (state.hero.stats[statKey] >= maxHeroStatValue) {
    addLog(heroStatLabels[statKey] + ' уже достигла максимума ' + maxHeroStatValue + '.');
    return;
  }

  state.hero.stats[statKey] += 1;
  state.hero.spentSkillPoints[statKey] += 1;
  state.hero.unspentSkillPoints -= 1;
  addLog('Развитие: ' + heroStatLabels[statKey] + ' +1.');
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
  state.resources = normalizeResources(state.resources, state.shipSystems);
  const energyText = String(state.resources.energy);
  const waterText = state.resources.water + ' / ' + getResourceLimit('water');
  const componentsText = state.resources.components + ' / ' + getResourceLimit('components');
  const metalText = state.resources.metal + ' / ' + getResourceLimit('metal');
  const foodText = state.resources.food + ' / ' + getResourceLimit('food');

  elements.health.textContent = healthText;
  elements.stamina.textContent = staminaText;
  elements.credits.textContent = state.heroCondition.credits;
  elements.energy.textContent = energyText;
  elements.water.textContent = waterText;
  elements.components.textContent = componentsText;
  elements.metal.textContent = metalText;
  elements.food.textContent = foodText;
  const hero = state.hero || createHero();
  const heroStats = hero.stats || {};
  elements.mobileStrength.textContent = savedNumber(heroStats.strength, 1);
  elements.mobileWisdom.textContent = savedNumber(heroStats.wisdom, 1);
  elements.mobileAgility.textContent = savedNumber(heroStats.agility, 1);
  elements.mobileHealth.textContent = healthText.replace(/ /g, '');
  elements.mobileStamina.textContent = staminaText.replace(/ /g, '');
  elements.mobileEnergy.textContent = energyText;
  elements.mobileWater.textContent = waterText.replace(/ /g, '');
  elements.mobileComponents.textContent = componentsText.replace(/ /g, '');
  elements.mobileMetal.textContent = metalText.replace(/ /g, '');
  elements.mobileFood.textContent = foodText.replace(/ /g, '');
  elements.recon.textContent = state.resources.recon;
  elements.restoredSystems.textContent = countRestoredSystems();
}

function renderNavigation() {
  const buttons = document.querySelectorAll('[data-mode]');
  const isMobileCityLocked = isCityLockedOnMobile();

  for (let i = 0; i < buttons.length; i++) {
    const isCityButton = buttons[i].dataset.mode === 'city';
    buttons[i].classList.toggle('active', buttons[i].dataset.mode === state.mode);

    if (isCityButton) {
      buttons[i].disabled = isMobileCityLocked;
      buttons[i].classList.toggle('mobile-locked', isMobileCityLocked);

      if (isMobileCityLocked) {
        buttons[i].title = 'Будет открыто позже';
        buttons[i].setAttribute('aria-label', 'Город. Будет открыто позже');
      } else {
        buttons[i].removeAttribute('title');
        buttons[i].removeAttribute('aria-label');
      }
    }
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
  const hero = normalizeHeroProgression(state.hero || createHero());
  state.hero = hero;
  elements.heroScreen.innerHTML =
    '<article class="hero-scene-card" aria-label="Карточка героя">' +
      '<div class="hero-compact-layout">' +
        '<div class="hero-info-column">' +
          renderHeroDevelopment(hero) +
          renderHeroStats(hero.stats) +
          renderHeroSlots('Мысли', hero.thoughts, null, 'thoughts') +
          renderHeroSlots('Предметы', hero.items, null, 'items') +
        '</div>' +
        renderHeroEquipment(hero.equipment) +
      '</div>' +
    '</article>';
}

function renderHeroDevelopment(hero) {
  const progress = getCurrentLevelProgress(hero);
  const experienceLine = progress.isMaxLevel
    ? 'Максимальный уровень'
    : progress.current + ' / ' + progress.required + ' до следующего уровня';
  const hasAbilityPoints = hero.unspentAbilityPoints > 0;
  const hasSkillPoints = hero.unspentSkillPoints > 0;
  const statKeys = Object.keys(heroStatLabels);
  let skillButtons = '';

  for (let i = 0; i < statKeys.length; i++) {
    const key = statKeys[i];
    const disabled = !hasSkillPoints || savedNumber(hero.stats[key], 1) >= maxHeroStatValue;
    skillButtons += '<button class="development-button" type="button" data-spend-skill="' + key + '"' + (disabled ? ' disabled' : '') + '>+1 ' + heroStatLabels[key] + '</button>';
  }

  return '<section class="hero-section hero-development" aria-label="Развитие героя">' +
    '<h4>Развитие</h4>' +
    '<div class="hero-development-summary">' +
      '<div class="hero-stat"><span>Уровень:</span><strong>' + hero.level + '</strong></div>' +
      '<div class="hero-stat"><span>Опыт:</span><strong>' + experienceLine + '</strong></div>' +
      '<div class="hero-stat"><span>Очки способностей:</span><strong>' + hero.unspentAbilityPoints + '</strong></div>' +
      '<div class="hero-stat"><span>Очки навыков:</span><strong>' + hero.unspentSkillPoints + '</strong></div>' +
    '</div>' +
    '<div class="hero-development-actions" aria-label="Трата очков способностей">' +
      '<button class="development-button" type="button" data-spend-ability="health"' + (hasAbilityPoints ? '' : ' disabled') + '>+5 здоровье</button>' +
      '<button class="development-button" type="button" data-spend-ability="stamina"' + (hasAbilityPoints ? '' : ' disabled') + '>+5 выносливость</button>' +
    '</div>' +
    '<div class="hero-development-actions" aria-label="Трата очков навыков">' + skillButtons + '</div>' +
  '</section>';
}

function renderHeroStats(stats) {
  const keys = Object.keys(heroStatLabels);
  let html = '<section class="hero-section hero-stats" aria-label="Характеристики героя"><h4>Характеристики</h4><div class="hero-stat-list">';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    html += '<div class="hero-stat"><span>' + heroStatLabels[key] + ':</span><strong>' + stats[key] + '</strong></div>';
  }

  return html + '</div></section>';
}

function renderHeroEquipment(equipment) {
  const keys = Object.keys(heroEquipmentLabels);
  const slotClasses = ['equipment-head', 'equipment-torso', 'equipment-waist', 'equipment-legs', 'equipment-boots'];
  let html = '<section class="hero-section hero-equipment" aria-label="Экипировка героя"><h4>Экипировка</h4><div class="hero-equipment-figure" aria-label="Слоты одежды по силуэту героя"><div class="hero-equipment-silhouette" aria-hidden="true"><span></span></div>';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    html += '<div class="hero-slot equipment-slot ' + slotClasses[i] + '"><span>' + heroEquipmentLabels[key] + '</span><strong>' + (equipment[key] || 'пусто') + '</strong></div>';
  }

  return html + '</div></section>';
}

function renderHeroSlots(title, slots, labels, className) {
  const keys = Array.isArray(slots) ? slots.map(function (_, index) { return index; }) : Object.keys(slots);
  let html = '<section class="hero-section hero-slots hero-' + className + '" aria-label="' + title + '"><h4>' + title + '</h4><div class="hero-mini-slot-list">';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = Array.isArray(slots) ? slots[key] : slots[key];
    html += '<div class="hero-slot"><strong>' + (value || 'пусто') + '</strong></div>';
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
      '<small>' + getShipProgressText(system) + '</small>' +
      '<em>Роль: ' + blueprint.role + '</em>' +
      '<p>' + blueprint.description + '</p>' +
      '</button>';
    elements.shipSystemsGrid.appendChild(card);
  }
}

function getShipSelectionDescription(key, blueprint, system) {
  const lines = [
    'Статус: ' + getShipStatusLabel(system.status) + '.',
    blueprint.description,
    getShipProgressText(system) + '.'
  ];
  const effectLine = getShipStorageLimitEffectLine(key, system.status);
  const restEffectLine = getLivingBlockRestEffectLine(key, system.status);
  const energyEffectLine = getEnergyCircuitEffectLine(key, system.status);
  const lifeSupportEffectLine = getLifeSupportEffectLine(key, system.status);

  if (effectLine) {
    lines.push(effectLine);
  }

  if (restEffectLine) {
    lines.push(restEffectLine);
  }

  if (energyEffectLine) {
    lines.push(energyEffectLine);
  }

  if (lifeSupportEffectLine) {
    lines.push(lifeSupportEffectLine);
  }

  return lines.join('\n');
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
      detailsHtml += '<em>Обнаружение: ' + getTerritoryDiscoverProgress(territory) + ' / ' + getTerritoryDiscoverProgressRequired(territory) + '</em>';
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
  updateSelectedObjectClass(selection);

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

function updateSelectedObjectClass(selection) {
  if (!elements.selectedObject) return;

  elements.selectedObject.classList.remove('system-selection', 'territory-selection', 'hero-selection');

  if (!selection) {
    return;
  }

  if (selection.kind === 'system') {
    elements.selectedObject.classList.add('system-selection');
  } else if (selection.kind === 'territory') {
    elements.selectedObject.classList.add('territory-selection');
  } else if (selection.kind === 'hero') {
    elements.selectedObject.classList.add('hero-selection');
  }
}

function getSelectionPanelText(selection) {
  if (selection.kind === 'system') {
    return getSelectionBaseDescription(selection);
  }

  if (state.narrativeObjectId === selection.id && state.narrativeMessage) {
    return state.narrativeMessage;
  }

  return getSelectionBaseDescription(selection);
}

function getSelectionBaseDescription(selection) {
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
  updateSelectedObjectClass(null);
}

function getCurrentSelection() {
  if (state.mode === 'hero') {
    const hero = state.hero || createHero();
    return {
      id: 'hero:main',
      kind: 'hero',
      name: hero.name,
      type: hero.type,
      description: 'Герой стоит у аварийного интерфейса и сверяет маршрут между кораблём, пустошами и городом. Развитие показывает уровень, опыт и доступные очки для усиления характеристик.',
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
      description: getShipSelectionDescription(key, blueprint, system),
      inspectDescription: 'Статус: ' + getShipStatusLabel(system.status) + '. ' + blueprint.description + ' ' + getShipProgressText(system) + '.'
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
    return 'Статус: Скрыта. Обнаружение: ' + getTerritoryDiscoverProgress(territory) + ' / ' + getTerritoryDiscoverProgressRequired(territory) + '.';
  }

  if (territory.status === 'discovered') {
    return territory.description + '\nИсследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  return territory.description + '\n' + getTerritoryShortSummaryLine(territory);
}

function getTerritoryInspectDescription(territory) {
  if (territory.status === 'open' || territory.status === 'depleted') {
    return territory.description + '\n' + getTerritoryOpenSummaryLines(territory).join('\n');
  }

  if (territory.status === 'discovered') {
    return territory.description + ' Статус: Обнаружена. Исследование: ' + territory.progress + ' / ' + territory.requiredProgress + '.';
  }

  return 'Статус: Скрыта. Обнаружение: ' + getTerritoryDiscoverProgress(territory) + ' / ' + getTerritoryDiscoverProgressRequired(territory) + '.';
}

function renderObjectActionOptions(selection) {
  if (state.actionPanelMode === 'exhausted' && state.narrativeObjectId === selection.id) {
    appendBackOption();
    return;
  }

  if (selection.kind === 'hero') {
    const hero = normalizeHeroProgression(state.hero);
    appendActionOption('🛌', 'Отдохнуть', formatStaminaGain(getRestStaminaRecovery()), 'heroAction', 'rest', false);
    appendActionOption('❤️', 'Развить здоровье', 'Потратить 1 очко способностей', 'spendAbility', 'health', hero.unspentAbilityPoints <= 0);
    appendActionOption('🫁', 'Развить выносливость', 'Потратить 1 очко способностей', 'spendAbility', 'stamina', hero.unspentAbilityPoints <= 0);
    appendActionOption('💪', 'Развить Силу', 'Потратить 1 очко навыков', 'spendSkill', 'strength', hero.unspentSkillPoints <= 0 || savedNumber(hero.stats.strength, 1) >= maxHeroStatValue);
    appendActionOption('🧠', 'Развить Мудрость', 'Потратить 1 очко навыков', 'spendSkill', 'wisdom', hero.unspentSkillPoints <= 0 || savedNumber(hero.stats.wisdom, 1) >= maxHeroStatValue);
    appendActionOption('🏃', 'Развить Ловкость', 'Потратить 1 очко навыков', 'spendSkill', 'agility', hero.unspentSkillPoints <= 0 || savedNumber(hero.stats.agility, 1) >= maxHeroStatValue);
    appendActionOption('🎒', formatActionTitle('Проверить экипировку', {}), 'Осмотреть личные слоты', 'heroAction', 'equipment', false);
    appendActionOption('💭', formatActionTitle('Проверить мысли', {}), 'Заглянуть во внутренний список', 'heroAction', 'thoughts', false);
    appendActionOption('📦', formatActionTitle('Проверить предметы', {}), 'Сверить пустые ячейки', 'heroAction', 'items', false);
    appendBackOption();
    return;
  }

  if (selection.kind === 'system') {
    const system = state.shipSystems[selection.key];
    normalizeShipSystem(system);

    if (selection.key === lifeSupportSystemKey) {
      const lifeSupportActions = getLifeSupportActions(system.status);
      for (let i = 0; i < lifeSupportActions.length; i++) {
        const action = lifeSupportActions[i];
        appendActionOption(action.icon, formatActionTitle(action.title, action.cost), formatLifeSupportActionNote(action, system.status), 'lifeSupportActionKey', action.key, false);
      }
    }

    const stage = getShipRepairStage(system);

    if (!stage) {
      if (selection.key !== lifeSupportSystemKey || getLifeSupportActions(system.status).length === 0) {
        addActionLead('Система улучшена и работает в усиленном режиме.');
      }
      return;
    }

    appendActionOption('🛠️', formatActionTitle(stage.action, stage.cost), (heroStatLabels[stage.statKey] || 'Характеристика') + ' ' + stage.difficulty, 'repairKey', selection.key, false);
    return;
  }

  if (selection.kind === 'territory') {
    const territory = state.territories[selection.key];
    if (territory.status === 'open' || territory.status === 'depleted') {
      appendGatherResourceNodeOptions(selection.key, territory);
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


function appendGatherResourceNodeOptions(key, territory) {
  const nodes = getTerritoryResourceNodes(territory);

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    appendActionOption(getGatherActionIcon(node), formatActionTitle(getGatherActionTitle(key, node.key), {}), getGatherActionNote(node), 'gatherKey', key + ':' + node.key, false);
  }
}

function appendResearchApproachOptions(key, territory) {
  const approachKeys = Object.keys(researchApproaches);

  for (let i = 0; i < approachKeys.length; i++) {
    const approachKey = approachKeys[i];
    const approach = researchApproaches[approachKey];
    const baseDifficulty = getTerritoryApproachBaseDifficulty(territory, approachKey);
    const difficulty = getResearchEffectiveDifficulty(baseDifficulty);
    const statLabel = heroStatLabels[approach.statKey] || 'Характеристика';
    appendActionOption('🔍', formatActionTitle('Исследовать зону', {}), statLabel + ' · ' + formatEffectiveDifficulty(baseDifficulty, difficulty), 'researchApproachKey', key + ':' + approachKey, false);
  }
}

function appendDiscoverApproachOptions(key, territory) {
  const approachKeys = Object.keys(researchApproaches);

  for (let i = 0; i < approachKeys.length; i++) {
    const approachKey = approachKeys[i];
    const approach = researchApproaches[approachKey];
    const statLabel = heroStatLabels[approach.statKey] || 'Характеристика';
    const baseDifficulty = getTerritoryApproachBaseDifficulty(territory, approachKey);
    const difficulty = getResearchEffectiveDifficulty(baseDifficulty);
    appendActionOption('🔍', formatActionTitle('Исследовать зону', {}), statLabel + ' · ' + formatEffectiveDifficulty(baseDifficulty, difficulty), 'discoverApproachKey', key + ':' + approachKey, false);
  }
}

function performHeroAction(action) {
  state.mode = 'hero';
  state.actionPanelMode = 'actions';

  const selection = getCurrentSelection();

  if (action === 'rest') {
    performRestAction(selection);
    return;
  }

  if (!hasEnoughStamina(selection)) {
    return;
  }

  spendStamina();
  const narratives = {
    equipment: 'Пальцы проходят по креплениям и пустым слотам. Снаряжение держится, но список экипировки всё ещё почти пуст.',
    thoughts: 'Герой пытается разложить мысли по ячейкам. Внутри только шум аварии, молчание планеты и необходимость двигаться дальше.',
    items: 'Личные карманы проверены один за другим. Предметные слоты ждут будущих находок.'
  };
  const messages = {
    equipment: 'Слоты экипировки осмотрены.',
    thoughts: 'Слоты мыслей пусты.',
    items: 'Слоты предметов пусты.'
  };

  if (selection) {
    setNarrativeMessage(selection, narratives[action] || 'Герой пробует действие, но эта часть интерфейса пока остаётся заглушкой.');
  }
  addLog(messages[action] || 'Действие Героя пока недоступно.');
}

function performRestAction(selection) {
  const recovery = getRestStaminaRecovery();
  const recovered = recoverStamina(recovery);

  if (selection) {
    setNarrativeMessage(selection, getRestNarrative());
  }

  if (recovered <= 0) {
    addLog('Выносливость уже полная');
    return;
  }

  const limitLabel = recovered < recovery ? ' · максимум' : '';
  addLog('Отдых: ' + formatStaminaGain(recovered) + limitLabel);
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


function getGatherActionIcon(resourceSource) {
  if (!resourceSource) {
    return '⛏️';
  }

  const icons = {
    water: '💧',
    metal: '⛓️',
    components: '⚙️',
    food: '🍖'
  };
  const resource = resourceSource.key || resourceSource.resource;

  return icons[resource] || '⛏️';
}

function getGatherActionNote(resourceSource) {
  if (!resourceSource) {
    return 'Собрать доступный ресурс';
  }

  const notes = {
    water: 'Пополнить запасы воды',
    metal: 'Поиск металла и обломков',
    components: 'Поиск компонентов',
    food: 'Пополнить запасы еды'
  };
  const resource = resourceSource.key || resourceSource.resource;

  return notes[resource] || 'Собрать доступный ресурс';
}

function getGatherActionTitle(key, nodeKey) {
  const territory = state.territories[key] || territoryBlueprints[key];

  if (!territory) {
    return 'Собрать ресурс';
  }

  const node = getTerritoryResourceNode(territory, nodeKey);
  if (node) {
    return node.action || territoryGatherActions[node.key] || 'Собрать ресурс';
  }

  return territory.action || territoryGatherActions[territory.resource] || 'Собрать ресурс';
}

function getCompactResourceLabel(resource) {
  return compactResourceLabels[resource] || resourceLabels[resource] || resource;
}

function formatCompactCost(cost, options) {
  const parts = [];

  if (options && options.includeStamina) {
    parts.push('-' + staminaActionCost + getCompactResourceLabel('stamina'));
  }

  return parts.concat(formatCompactResourceParts(cost, '-')).join(' ');
}

function formatCompactResourceList(resources) {
  return formatCompactResourceParts(resources, '').join(' ');
}

function formatCompactResourceParts(resources, prefix) {
  const parts = [];
  const keys = Object.keys(resources || {});

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    const value = savedNumber(resources[resource], 0);
    if (value > 0) {
      parts.push(prefix + value + getCompactResourceLabel(resource));
    }
  }

  return parts;
}

function formatCompactGain(gain) {
  const parts = [];
  const zeroParts = [];
  const keys = Object.keys(gain || {});

  for (let i = 0; i < keys.length; i++) {
    const resource = keys[i];
    const value = savedNumber(gain[resource], 0);
    const part = '+' + value + getCompactResourceLabel(resource);
    if (value > 0) {
      parts.push(part);
    } else if (value === 0) {
      zeroParts.push(part);
    }
  }

  if (parts.length) {
    return parts.join(' ');
  }

  return zeroParts.length ? zeroParts.join(' ') : '+0';
}

function formatCompactCheckResult(check, suffix) {
  const result = '🎲 ' + check.roll.total + ' + ' + check.statLabel + ' ' + check.statValue + ' = ' + check.total + ' · ' + String(check.resultLabel).toLowerCase();
  return suffix ? result + ' · ' + suffix : result;
}

function formatCompactGatherResult(check, gain, limitReached) {
  const result = '🎲 ' + check.roll.total + ' · ' + String(check.resultLabel).toLowerCase() + ' · ' + formatCompactGain(gain);
  return limitReached ? result + ' · лимит' : result;
}

function formatCityActionLog(entry, actualGain) {
  if (!actualGain) {
    return entry.successLog;
  }

  const result = (entry.name || 'Город') + ': успех · ' + formatCompactGain(actualGain);
  return didGainHitResourceLimit(entry.result, actualGain) ? result + ' · лимит' : result;
}

function formatActionTitle(title, cost) {
  return title + ' · ' + formatCompactCost(cost, { includeStamina: true });
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

function addActionLead() {
  // Обычные списки действий начинаются сразу с кнопок без вводной строки.
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
  const fullTitleParts = splitActionTitle(entry.title || titleText);

  const icon = document.createElement('span');
  icon.className = 'action-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = entry.icon;
  button.appendChild(icon);

  const main = document.createElement('span');
  main.className = 'action-main';

  const title = document.createElement('span');
  title.className = 'action-title';
  title.textContent = titleParts.label;
  main.appendChild(title);

  if (entry.note) {
    const note = document.createElement('span');
    note.className = 'action-note action-check';
    note.textContent = noteText;
    main.appendChild(note);
  }

  button.appendChild(main);

  const cost = document.createElement('span');
  cost.className = 'action-cost';
  cost.textContent = fullTitleParts.cost ? titleParts.cost : '—';
  button.appendChild(cost);

  const chevron = document.createElement('span');
  chevron.className = 'action-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '›';
  button.appendChild(chevron);

  return button;
}

function splitActionTitle(text) {
  const source = String(text || '');
  const separator = ' · ';
  const separatorIndex = source.lastIndexOf(separator);

  if (separatorIndex === -1) {
    return { label: source, cost: '' };
  }

  const label = source.slice(0, separatorIndex);
  const cost = source.slice(separatorIndex + separator.length);
  if (!cost || cost.charAt(0) !== '-') {
    return { label: source, cost: '' };
  }

  return { label, cost };
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
  const costNode = button.querySelector('.action-cost');
  const fullTitleParts = splitActionTitle(entry.title);
  const fullTitle = fullTitleParts.label;
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
      if (costNode) {
        costNode.textContent = fullTitleParts.cost || '—';
      }
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
  if (text.includes('🎲')) return '🎲';
  if (text.includes('вода') || text.includes('💧')) return '💧';
  if (text.includes('металл') || text.includes('⛓')) return '⛓';
  if (text.includes('еда') || text.includes('🍖')) return '🍖';
  if (text.includes('компонент') || text.includes('⚙')) return '⚙';
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
    parts.push(formatCompactGain({ [resource]: gain[resource] }));
  }

  return parts.join(', ');
}

function getGenitiveName(name) {
  const names = {
    'Энергоконтур': 'Энергоконтура',
    'Жизнеобеспечение': 'Жизнеобеспечения',
    'Жилой блок': 'Жилого блока',
    'Инженерный отсек': 'Инженерного отсека',
    'Навигационный узел': 'Навигационного узла',
    'Двигатель': 'Двигателя'
  };

  return names[name] || name;
}


function saveGame() {
  state.resources = normalizeResources(state.resources, state.shipSystems);
  state.hero = normalizeHeroProgression(state.hero);
  state.heroCondition = normalizeHeroCondition(state.heroCondition);
  state.questProgress = normalizeQuestProgressCollection(state.questProgress);
  localStorage.setItem(saveKey, JSON.stringify(state));
}

function loadGame() {
  const savedText = localStorage.getItem(saveKey) || getLegacySave();

  if (!savedText) {
    protectMobileMode();
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

  protectMobileMode();
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


function getBetterShipStatus(firstStatus, secondStatus) {
  const firstRank = savedNumber(shipStatusRanks[firstStatus], 0);
  const secondRank = savedNumber(shipStatusRanks[secondStatus], 0);
  return secondRank > firstRank ? secondStatus : firstStatus;
}

function getMigratedShipStatus(systemKey, savedSystems, fallbackStatus) {
  let status = fallbackStatus;
  let hasLegacyStatus = false;
  const legacyKeys = legacyShipSystemGroups[systemKey] || [systemKey];

  for (let i = 0; i < legacyKeys.length; i++) {
    const legacyKey = legacyKeys[i];
    const savedSystem = savedSystems[legacyKey];
    if (savedSystem && shipStatusLabels[savedSystem.status]) {
      if (!hasLegacyStatus) {
        status = 'disabled';
      }
      hasLegacyStatus = true;
      status = getBetterShipStatus(status, savedSystem.status);
    }
  }

  return status;
}

function getMigratedSelectedSystemKey(savedKey) {
  if (shipSystemBlueprints[savedKey]) {
    return savedKey;
  }

  return legacySelectedSystemMap[savedKey] || '';
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
  next.heroCondition = normalizeHeroCondition(savedCondition);

  next.turn = savedNumber(saved.turn, 1);
  next.mode = ['hero', 'territories', 'ship', 'city'].includes(saved.mode) ? saved.mode : (['recon', 'drones', 'map', 'research', 'Разведка', 'Дроны', 'Карта', 'карта'].includes(saved.mode) ? 'territories' : 'hero');
  next.selectedSystemKey = getMigratedSelectedSystemKey(saved.selectedSystemKey);
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
  next.questProgress = mergeSavedQuestProgress(saved.questProgress);


  const savedSystems = saved.shipSystems || {};
  const systemKeys = Object.keys(next.shipSystems);
  for (let i = 0; i < systemKeys.length; i++) {
    const key = systemKeys[i];
    next.shipSystems[key].status = getMigratedShipStatus(key, savedSystems, next.shipSystems[key].status);
    if (savedSystems[key]) {
      next.shipSystems[key].progress = savedNumber(savedSystems[key].progress, next.shipSystems[key].progress);
      next.shipSystems[key].requiredProgress = savedNumber(savedSystems[key].requiredProgress, next.shipSystems[key].requiredProgress);
    }
    normalizeShipSystem(next.shipSystems[key]);
  }
  next.resources = normalizeResources(next.resources, next.shipSystems);

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
      migrateSavedTerritoryResourceNodes(nextTerritory, savedTerritory);
      if (nextTerritory.status === 'depleted') {
        depleteTerritoryResourceNodes(nextTerritory);
      }
      normalizeTerritoryProgress(nextTerritory);
    }
  }

  if (next.activeResearchEvent && next.territories[next.activeResearchEvent.territoryKey].status !== 'discovered') {
    next.activeResearchEvent = null;
  }

  next.logMessages = Array.isArray(saved.logMessages) && saved.logMessages.length > 0
    ? saved.logMessages.slice(0, maxLogMessages).map(migrateLogMessage)
    : ['Сохранение загружено. Продолжайте развитие базы.'];

  return next;
}


function migrateSavedTerritoryResourceNodes(nextTerritory, savedTerritory) {
  const nodes = getTerritoryResourceNodes(nextTerritory);
  const savedNodes = Array.isArray(savedTerritory.resourceNodes) ? savedTerritory.resourceNodes : [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let savedNode = null;
    for (let j = 0; j < savedNodes.length; j++) {
      if (savedNodes[j] && savedNodes[j].key === node.key) {
        savedNode = savedNodes[j];
        break;
      }
    }

    if (savedNode) {
      node.remaining = clampSavedNumber(savedNode.remaining, node.remaining, 0, node.remaining);
    } else if (savedTerritory.resource === node.key || nodes.length === 1) {
      node.remaining = clampSavedNumber(savedTerritory.remaining, node.remaining, 0, node.remaining);
    }
  }

  syncTerritoryPrimaryResourceFields(nextTerritory);
}

function depleteTerritoryResourceNodes(territory) {
  const nodes = getTerritoryResourceNodes(territory);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].remaining = 0;
  }
  syncTerritoryPrimaryResourceFields(territory);
}

function applyStarterTerritoryConcept() {
  // Стартовый состав Пустошей теперь задаётся только territoryBlueprints.
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
      hero.stats[key] = clampSavedNumber(savedHero.stats[key], hero.stats[key], 1, maxHeroStatValue);
    }
  }

  hero.experience = Math.max(0, Math.floor(savedNumber(savedHero.experience, hero.experience)));
  hero.level = savedHero.level === undefined
    ? getLevelForExperience(hero.experience)
    : Math.max(1, Math.min(maxHeroLevel, Math.floor(savedNumber(savedHero.level, hero.level))));
  hero.unspentAbilityPoints = Math.max(0, Math.floor(savedNumber(savedHero.unspentAbilityPoints, hero.unspentAbilityPoints)));
  hero.unspentSkillPoints = Math.max(0, Math.floor(savedNumber(savedHero.unspentSkillPoints, hero.unspentSkillPoints)));

  if (savedHero.spentAbilityPoints && typeof savedHero.spentAbilityPoints === 'object') {
    hero.spentAbilityPoints.health = Math.max(0, Math.floor(savedNumber(savedHero.spentAbilityPoints.health, hero.spentAbilityPoints.health)));
    hero.spentAbilityPoints.stamina = Math.max(0, Math.floor(savedNumber(savedHero.spentAbilityPoints.stamina, hero.spentAbilityPoints.stamina)));
  }

  if (savedHero.spentSkillPoints && typeof savedHero.spentSkillPoints === 'object') {
    const skillKeys = Object.keys(hero.spentSkillPoints);
    for (let i = 0; i < skillKeys.length; i++) {
      const key = skillKeys[i];
      hero.spentSkillPoints[key] = Math.max(0, Math.floor(savedNumber(savedHero.spentSkillPoints[key], hero.spentSkillPoints[key])));
    }
  }

  return normalizeHeroProgression(hero);
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
  } else if (target.dataset.spendAbility) {
    spendAbilityPoint(target.dataset.spendAbility);
  } else if (target.dataset.spendSkill) {
    spendSkillPoint(target.dataset.spendSkill);
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
  } else if (target.dataset.lifeSupportActionKey) {
    performLifeSupportAction(target.dataset.lifeSupportActionKey);
  } else if (target.dataset.gatherKey) {
    const parts = target.dataset.gatherKey.split(':');
    gatherTerritory(parts[0], parts[1]);
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

function handleMobileCityLockChange() {
  if (protectMobileMode()) {
    saveGame();
  }

  render();
}

if (mobileCityQuery.addEventListener) {
  mobileCityQuery.addEventListener('change', handleMobileCityLockChange);
} else if (mobileCityQuery.addListener) {
  mobileCityQuery.addListener(handleMobileCityLockChange);
}

state = createInitialState();
loadGame();
