import { generatePosition, generateTeam } from './generators';
import themes from './themes';
import Bowman from './Characters/Bowman';
import Daemon from './Characters/Daemon';
import Magician from './Characters/Magician';
import Swordsman from './Characters/Swordsman';
import Undead from './Characters/Undead';
import Vampire from './Characters/Vampire';
import PositionedCharacter from './PositionedCharacter';
import { getTooltipMessage } from './utils';
import GamePlay from './GamePlay';

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
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  formationTeams() {
    const playerTeam = generateTeam([Bowman, Swordsman, Magician], 4, 2);
    const enemyTeam = generateTeam([Vampire, Undead, Daemon], 4, 2);
    let positions = generatePosition(
      this.gamePlay.boardSize,
      [0, this.gamePlay.boardSize * 2],
      playerTeam.characters.length,
    );
    this.positionedCharacters = [];
    playerTeam.characters.forEach((character, index) => {
      this.positionedCharacters.push(
        new PositionedCharacter(character, positions[index]),
      );
    });
    positions = generatePosition(
      this.gamePlay.boardSize,
      [this.gamePlay.boardSize ** 2 - this.gamePlay.boardSize * 2, this.gamePlay.boardSize ** 2],
      playerTeam.characters.length,
    );
    enemyTeam.characters.forEach((character, index) => {
      this.positionedCharacters.push(
        new PositionedCharacter(character, positions[index]),
      );
    });
    this.gamePlay.redrawPositions(this.positionedCharacters);
  }

  onCellClick(index) {
    // TODO: react to click
    const positionedCharacter = this.positionedCharacters.find((el) => el.position === index);
    if (positionedCharacter) {
      const char = positionedCharacter.character;
      if (['bowman', 'swordsman', 'magician'].includes(char.type)) {
        if (this.gamePlay.cells[index].classList.contains('selected')) {
          this.gamePlay.deselectCell(index);
        } else {
          const position = this.gamePlay.cells
            .findIndex((o) => o.classList.contains('selected'));
          if (position >= 0) {
            this.gamePlay.deselectCell(position);
          }
          this.gamePlay.selectCell(index);
        }
      } else {
        GamePlay.showError('Not player character');
      }
    } else {
      GamePlay.showError('No character on cell');
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.gamePlay.cells[index].querySelector('.character')) {
      const message = getTooltipMessage(
        this.positionedCharacters.find((character) => character.position === index).character,
      );
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
