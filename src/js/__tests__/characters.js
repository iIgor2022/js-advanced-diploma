import Character from '../Character';
import Bowman from '../Characters/Bowman';
import Daemon from '../Characters/Daemon';
import Magician from '../Characters/Magician';
import Swordsman from '../Characters/Swordsman';
import Undead from '../Characters/Undead';
import Vampire from '../Characters/Vampire';
import { characterGenerator, generateTeam } from '../generators';

test('Testing error on creating Character with new', () => {
  expect(() => new Character(1, 'bowman')).toThrow('Cannot create base class');
});

test('Testing creating character', () => {
  const character = new Bowman(1);
  expect(character.level).toBe(1);
});

test.each([
  { parameter: 'attack', character: new Bowman(1), expected: 25 },
  { parameter: 'defence', character: new Bowman(1), expected: 25 },
  { parameter: 'attack', character: new Daemon(1), expected: 10 },
  { parameter: 'defence', character: new Daemon(1), expected: 10 },
  { parameter: 'attack', character: new Magician(1), expected: 10 },
  { parameter: 'defence', character: new Magician(1), expected: 40 },
  { parameter: 'attack', character: new Swordsman(1), expected: 40 },
  { parameter: 'defence', character: new Swordsman(1), expected: 10 },
  { parameter: 'attack', character: new Undead(1), expected: 40 },
  { parameter: 'defence', character: new Undead(1), expected: 10 },
  { parameter: 'attack', character: new Vampire(1), expected: 25 },
  { parameter: 'defence', character: new Vampire(1), expected: 25 },
])('Testing $parameter of $character.type', ({ parameter, character, expected }) => {
  expect(character[parameter]).toBe(expected);
});

test.each([
  { allowedType: [Bowman] },
  { allowedType: [Daemon] },
  { allowedType: [Magician] },
  { allowedType: [Swordsman] },
  { allowedType: [Undead] },
  { allowedType: [Vampire] },
])('Testing characterGenerator function', ({ allowedType }) => {
  const character = characterGenerator(allowedType, 1).next().value;
  expect(character instanceof allowedType[0]).toBeTruthy();
});

test('Testing generateTeam function', () => {
  const team = generateTeam([Bowman, Swordsman, Magician], 4, 2);
  expect(team.characters[0].level <= 4).toBeTruthy();
  expect(team.characters.length).toBe(2);
});
