import { calcTileType, getTooltipMessage } from '../utils';

test.each([
  { index: 0, boardSize: 8, expected: 'top-left' },
  { index: 7, boardSize: 8, expected: 'top-right' },
  { index: 3, boardSize: 8, expected: 'top' },
  { index: 8, boardSize: 8, expected: 'left' },
  { index: 13, boardSize: 8, expected: 'center' },
  { index: 55, boardSize: 8, expected: 'right' },
  { index: 56, boardSize: 8, expected: 'bottom-left' },
  { index: 60, boardSize: 8, expected: 'bottom' },
  { index: 63, boardSize: 8, expected: 'bottom-right' },
])('Testing calcTileType function', ({ index, boardSize, expected }) => {
  expect(calcTileType(index, boardSize)).toBe(expected);
});

test.each([
  {
    character: {
      level: 1, attack: 20, defence: 30, health: 50,
    },
    expected: '\u{1F396}1\u{2694}20\u{1F6E1}30\u{2764}50',
  },
  {
    character: {
      level: 3, attack: 40, defence: 10, health: 87,
    },
    expected: '\u{1F396}3\u{2694}40\u{1F6E1}10\u{2764}87',
  },
])('Testing getTooltipMessage function', ({ character, expected }) => {
  const result = getTooltipMessage(character);
  expect(result).toBe(expected);
});
