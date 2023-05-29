/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor() {
    this.characters = [];
  }

  add(character) {
    this.characters.push(character);
  }

  [Symbol.iterator]() {
    let index = 0;
    let characters = [];
    characters = this.characters;
    return {
      next() {
        index += 1;
        if (index > characters.length) {
          return {
            value: undefined,
            done: true,
          };
        }
        return {
          value: characters[index - 1],
          done: false,
        };
      },
    };
  }
}
