import Team from './Team';

export function getRandomIntInclusive(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function generatePosition(capacity, interval, count) {
  const result = new Set();
  while (result.size < count) {
    result.add(getRandomIntInclusive(interval[0], interval[1] - 1));
  }
  const obj = {};
  for (let row = 0, index = 0; row < capacity; row += 1) {
    obj[row] = [];
    for (let column = 0; column < capacity; column += 1, index += 1) {
      obj[row].push(result.has(index));
    }
  }
  result.clear();
  for (let column = capacity - 1, index = 0; column >= 0; column -= 1) {
    for (let row = 0; row < capacity; row += 1, index += 1) {
      if (obj[row][column]) {
        result.add(index);
      }
    }
  }
  return Array.from(result);
}

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const level = getRandomIntInclusive(1, maxLevel);
  const CharacterClass = allowedTypes[getRandomIntInclusive(0, allowedTypes.length - 1)];
  yield new CharacterClass(level);
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 *          Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = new Team();
  while (team.characters.length < characterCount) {
    team.add(characterGenerator(allowedTypes, maxLevel).next().value);
  }
  return team;
}
