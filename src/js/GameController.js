import { generatePosition, generateTeam, getRandomIntInclusive } from './generators';
import themes from './themes';
import Bowman from './Characters/Bowman';
import Daemon from './Characters/Daemon';
import Magician from './Characters/Magician';
import Swordsman from './Characters/Swordsman';
import Undead from './Characters/Undead';
import Vampire from './Characters/Vampire';
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.formationTeams();
  }

  formationTeams() {
    const playerTeam = generateTeam([Bowman, Swordsman, Magician], 4, 2);
    const enemyTeam = generateTeam([Vampire, Undead, Daemon], 4, 2);
    let positions = generatePosition(
      this.gamePlay.boardSize,
      [0, this.gamePlay.boardSize * 2],
      playerTeam.charactes.length,
    );
    const positionedCharacters = [];
    playerTeam.characters.forEach((character, index) => {
      positionedCharacters.push(
        new PositionedCharacter(character, positions[index]),
      );
    });
    positions = generatePosition(
      this.gamePlay.boardSize,
      [this.gamePlay.boardSize ** 2 - this.gamePlay.boardSize * 2, this.gamePlay.boardSize ** 2],
      playerTeam.charactes.length,
    );
    enemyTeam.characters.forEach((character, index) => {
      positionedCharacters.push(
        new PositionedCharacter(character, positions[index]),
      );
    });
    this.gamePlay.redrawPositions(positionedCharacters);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
